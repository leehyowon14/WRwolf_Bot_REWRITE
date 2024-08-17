const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
        name: `blind_gomoku`,
        aliases: [`${prefix}블라인드오목`, `${prefix}blind_gomoku`],
        description: "블라인드 오목 게임",
        usage: "blind_gomoku",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        // 봇이 메시지에 반응한 경우 게임을 시작하지 않음
        if (message.author.bot) return;

        // 게임 상태 초기화
        const gameState = initializeGameState(message.author);

        // 룰 설명 임베드 전송
        await sendRuleEmbed(message.channel);

        // 플레이어 2 모집
        const player2 = await recruitPlayer2(message.channel);
        if (!player2) return; // 플레이어 모집 실패 시 게임 종료

        gameState.players.push(player2);

        // 게임 보드 이미지 생성 및 전송
        const gameMsg = await sendGameBoard(message.channel, gameState);

        // 게임 진행
        while (true) {
            const result = await playTurn(message.channel, gameState, gameMsg);
            if (result.gameOver) break;
        }
    }
};

// 게임 상태 초기화 함수
function initializeGameState(firstPlayer) {
    return {
        board: Array(15).fill().map(() => Array(15).fill(0)),
        currentPlayer: 1,
        players: [firstPlayer],
        lastMove: '',
        consecutiveInvalidMoves: 0
    };
}

// 룰 설명 임베드 전송 함수
async function sendRuleEmbed(channel) {
    const ruleEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('블라인드 오목 게임 룰')
        .setDescription('블라인드 오목은 일반 오목과 비슷하지만, 상대방의 돌이 보이지 않는 상태에서 진행됩니다.')
        .addFields(
            { name: '기본 규칙', value: '- 15x15 크기의 바둑판에서 진행됩니다.\n- 흑돌이 먼저 시작합니다.\n- 5개의 돌을 연속으로 놓으면 승리합니다.' },
            { name: '블라인드 규칙', value: '- 상대방의 돌은 보이지 않습니다.\n- 이미 돌이 있는 위치에 착수하면 실수로 간주됩니다.\n- 3번 연속으로 잘못된 위치에 착수하면 패배합니다.' },
            { name: '착수 방법', value: '- A1부터 P15까지의 좌표를 입력하여 착수합니다. 이때, I열은 존재하지 않습니다.\n- 예: A1, H8, P15' },
            { name: '주의사항', value: '- 30초 안에 착수하지 않으면 패배합니다.\n- 상대방의 돌 위치를 잘 기억하며 전략적으로 플레이하세요!' }
        );

    await channel.send({ embeds: [ruleEmbed] });
}

// 플레이어 2 모집 함수
async function recruitPlayer2(channel) {
    const recruitEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('블라인드 오목 게임')
        .setDescription('플레이어 2를 모집합니다. 참여하려면 반응을 달아주세요.');

    const recruitMsg = await channel.send({ embeds: [recruitEmbed] });
    await recruitMsg.react('👍');

    const filter = (reaction, user) => reaction.emoji.name === '👍' && !user.bot;

    try {
        const collected = await recruitMsg.awaitReactions({ filter, max: 1, time: 30000, errors: ['time'] });
        return collected.first().users.cache.last();
    } catch (error) {
        await channel.send('30초 동안 플레이어가 모집되지 않아 게임이 취소되었습니다.');
        return null;
    }
}

// 게임 보드 전송 함수
async function sendGameBoard(channel, gameState) {
    const gameEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('블라인드 오목 게임')
        .setDescription('흑돌을 착수해주세요')
        .addFields({ name: '마지막 착수', value: '없음' });

    return await channel.send({ embeds: [gameEmbed], files: ['./commands/non-slash/gomoku/image/board.png'] });
}

// 턴 진행 함수
async function playTurn(channel, gameState, gameMsg) {
    const currentPlayerIndex = gameState.currentPlayer - 1;
    const filter = m => m.author.id === gameState.players[currentPlayerIndex].id && !m.author.bot;

    try {
        // 30초 동안 플레이어의 착수 대기
        const collected = await channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] });
        const move = collected.first().content.toUpperCase();
        await collected.first().delete(); // 플레이어가 보낸 메시지 삭제

        if (isValidMove(move, gameState.board)) {
            // 유효한 착수 처리
            const [row, col] = convertMove(move);
            gameState.board[row][col] = gameState.currentPlayer;
            gameState.lastMove = `${gameState.currentPlayer === 1 ? '흑' : '백'}, ${move}`;
            gameState.consecutiveInvalidMoves = 0;

            if (checkWin(gameState.board, row, col)) {
                // 승리 처리
                await updateGameEmbed(gameMsg, `게임 종료! ${gameState.players[currentPlayerIndex].username}님이 승리하셨습니다!`, gameState.lastMove);
                return { gameOver: true };
            }

            // 다음 플레이어로 턴 넘김
            gameState.currentPlayer = 3 - gameState.currentPlayer;
            await updateGameEmbed(gameMsg, `${gameState.currentPlayer === 1 ? '흑' : '백'}돌을 착수해주세요`, gameState.lastMove);
        } else {
            // 잘못된 착수 처리
            gameState.consecutiveInvalidMoves++;
            if (gameState.consecutiveInvalidMoves >= 3) {
                await updateGameEmbed(gameMsg, `게임 종료! ${gameState.players[currentPlayerIndex].username}님이 3번 연속 잘못된 곳에 착수하여 패배하셨습니다.`, gameState.lastMove);
                return { gameOver: true };
            }
            await channel.send('잘못된 위치입니다. 다시 착수해주세요.').then(msg => setTimeout(() => msg.delete(), 3000));
        }
    } catch (error) {
        // 시간 초과 처리
        await updateGameEmbed(gameMsg, `게임 종료! ${gameState.players[currentPlayerIndex].username}님이 30초 동안 착수하지 않아 패배하셨습니다.`, gameState.lastMove);
        return { gameOver: true };
    }

    return { gameOver: false };
}

// 게임 임베드 업데이트 함수
async function updateGameEmbed(gameMsg, description, lastMove) {
    const updatedEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('블라인드 오목 게임')
        .setDescription(description)
        .addFields({ name: '마지막 착수', value: lastMove });

    await gameMsg.edit({ embeds: [updatedEmbed] });
}

// 유효한 착수인지 확인하는 함수
function isValidMove(move, board) {
    if (!/^[A-HJ-O](1[0-5]|[1-9])$/.test(move)) return false;
    const [row, col] = convertMove(move);
    return board[row][col] === 0;
}

// 착수 위치를 배열 인덱스로 변환하는 함수
function convertMove(move) {
    let col = move.charCodeAt(0) - 65;
    if (col >= 8) col--;
    const row = parseInt(move.slice(1)) - 1;
    return [row, col];
}

// 승리 조건을 확인하는 함수
function checkWin(board, row, col) {
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
    for (let [dx, dy] of directions) {
        let count = 1;
        for (let i = 1; i <= 4; i++) {
            if (board[row + dx * i]?.[col + dy * i] === board[row][col]) count++;
            else break;
        }
        for (let i = 1; i <= 4; i++) {
            if (board[row - dx * i]?.[col - dy * i] === board[row][col]) count++;
            else break;
        }
        if (count >= 5) return true;
    }
    return false;
}