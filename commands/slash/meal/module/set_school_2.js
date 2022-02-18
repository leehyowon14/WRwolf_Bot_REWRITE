const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const meal = require('../../../../db/meal')

async function result_to_array(result, object, array, len) {
    for (let i = 0; i < len; i++) {
        object.label = result[i].name
        object.description = result[i].address
        object.value = i.toString()
        array.push(object)
    }
}

module.exports = {
    run:async (interaction, result, school_name, school_type, region) => {
        if (!result) return interaction.reply({ content: "에러: 학교 검색에 실패하였습니다.", ephemeral: true });
        let len = Object.keys(result).length
        if (len == 0) {
            interaction.reply({ content: "에러: 학교 검색에 실패하였습니다.", ephemeral: true });
        }

        let array = []
        let object = {
            label: '',
            description: '',
            value: ''
        }

        await result_to_array(result, object, array, len)
        //console.log(array[0])

        const row = (state) => [ new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('학교를 선택하여주세요!')
					.addOptions(array),
			),
        ]

        let embed = new MessageEmbed()
            .setTitle('학교 선택')
            .setDescription('학교를 선택해주세요.')
            .setColor(0x00AE86)
        interaction.reply({ embeds: [embed], components: row(false), ephemeral: true });
            const collector = interaction.channel.createMessageComponentCollector({componentType: "SELECT_MENU", time: 30000 });
            let school_code
            collector.on('collect', (i) => {
                if (i.user.id !== interaction.user.id) {
                    i.reply({
                      content: `This element is not for you!`,
                      ephemeral: true
                    });
                } else {
                    collector.stop()
                    school_code = result[i.values[0]].schoolCode
                    interaction.editReply({ components: [], ephemeral: true });
                    set_school(interaction.member.id, school_type, school_name, school_code, region, i)
                }
            });
        }
    }
    async function set_school(id, type, name, code, region, interaction) {
        let user = await meal.findOne({user_id: id})
        if (!user) {
            user = new meal({
                user_id: id,
                school_type: type,
                school_name: name,
                school_region: region,
                school_code: code
            })
            await user.save()
            let embed = new MessageEmbed()
                .setTitle('완료!')
                .setDescription('학교가 선택되었습니다')
                .setColor(0x00AE86)
            return interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            await meal.findOneAndUpdate({ user_id: id }, { school_type: type, school_name: name, school_region: region, school_code: code });
            let embed = new MessageEmbed()
                .setTitle('완료!')
                .setDescription('학교가 선택되었습니다')
                .setColor(0x00AE86)
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }