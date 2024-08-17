const Poll = require('../../db/poll');

module.exports = async (bot, reaction, user) => {
    if (user.bot) return;

    let poll = await Poll.findOne({ poll_id: `${reaction.message.channel.id}-${reaction.message.id}` });
    if (!poll) return;

    let emoji_index = reaction.emoji.name === '🔟' ? 9 : parseInt(reaction.emoji.name[0]) - 1;
    
    // 사용자가 이미 다른 이모지에 반응했는지 확인 
    for (let i = 0; i < poll.poll_array.length; i++) {
        if (poll.poll_array[i].includes(user.id)) {
            // 기존 반응 제거
            poll.poll_array[i] = poll.poll_array[i].filter(id => id !== user.id);
            break;
        }
    }

    // 새로운 반응 추가
    poll.poll_array[emoji_index].push(user.id);
    await poll.updateOne({ poll_array: poll.poll_array });

    // 사용자 반응 제거
    reaction.users.remove(user.id);
}
