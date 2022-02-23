const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const set_school_2 = require('./module/set_school_2')
const School = require('school-kr')
const school = new School()
module.exports = {
    data: new SlashCommandBuilder()
        .setName('학교등록')
        .setDescription('급식 학교 설정')
        .addStringOption(option =>
            option.setName('학교이름')
              .setDescription(
                '학교이름을 입력해주세요. 예) 민족사관고등학교'
              )
              .setRequired(true)
          )
          .addStringOption(option =>
            option.setName('학교타입')
              .setDescription("병설유치원, 초등학교, 중학교, 고등학교 중 선택해주세요.")
              .addChoice('병설유치원', '병설유치원')
              .addChoice('초등학교', '초등학교')
              .addChoice('중학교', '중학교')
              .addChoice('고등학교', '고등학교')
              .setRequired(true)
          ),

    async execute(interaction) {

        //school Type
        const schoolType = interaction.options.get('학교타입').value
        let school_type
        if (schoolType == '초등학교') {
            school_type = School.Type.ELEMENTARY
        } else if (schoolType == '중학교') {
            school_type = School.Type.MIDDLE
            //console.log(school_type)
        } else if (schoolType == '고등학교') {
            school_type = School.Type.HIGH
        } else if (schoolType == '병설유치원') {
            school_type = School.Type.KINDERGARTEN
        } else {
            return interaction.reply("에러: 학교 타입을 초등학교, 중학교, 고등학교, 병설유치원 중 하나로 적어주세요.")
        }
        

        const row = (state) => [ new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('지역을 선택하여주세요! (도)')
					.addOptions([
						{
							label: '서울',
							description: '서울특별시',
							value: '서울',
						},
						{
							label: '인천',
							description: '인천광역시',
							value: '인천',
						},
                        {
							label: '부산',
							description: '부산광역시',
							value: '부산',
						},
                        {
							label: '세종',
							description: '세종특별자치시',
							value: '세종',
						},
                        {
							label: '울산',
							description: '울산광역시',
							value: '울산',
						},
                        {
							label: '경기',
							description: '경기도',
							value: '경기',
						},
                        {
							label: '강원',
							description: '강원도',
							value: '강원',
						},
                        {
							label: '충북',
							description: '충청북도',
							value: '충북',
						},
                        {
							label: '충남',
							description: '충청남도',
							value: '충남',
						},
                        {
							label: '경북',
							description: '경상북도',
							value: '경북',
						},
                        {
							label: '경남',
							description: '경상남도',
							value: '경남',
						},
                        {
							label: '전북',
							description: '전라북도',
							value: '전북',
						},
                        {
							label: '전남',
							description: '전라남도',
							value: '전남',
						},
                        {
							label: '제주',
							description: '제주특별자치도',
							value: '제주',
						},
					]),
			),
        ]
        let embed = new MessageEmbed()
            .setTitle('학교 정보 입력')
            .setDescription('지역을 선택하여주세요! (도)')
            .setColor(0x00AE86)
        const initial_message = await interaction.reply({ embeds: [embed], components: row(false), ephemeral: true });
            const collector = interaction.channel.createMessageComponentCollector({ componentType: "SELECT_MENU", time: 30000 });
            let region
            collector.on('collect', async (i) => {
                if (i.user.id !== interaction.user.id) {
                    i.reply({
                      content: `This element is not for you!`,
                      ephemeral: true
                    });
                } else {
                    collector.stop()
                    if (i.values[0] == '서울') {
                        region = School.Region.SEOUL
                    } else if (i.values[0] == '인천') {
                        region = School.Region.INCHEON
                    } else if (i.values[0] == '부산') {
                        region = School.Region.BUSAN
                    } else if (i.values[0] == '세종') {
                        region = School.Region.SEJONG
                    } else if (i.values[0] == '울산') {
                        region = School.Region.ULSAN
                    } else if (i.values[0] == '경기') {
                        region = School.Region.GYEONGGI
                    } else if (i.values[0] == '강원') {
                        region = School.Region.KANGWON
                    } else if (i.values[0] == '충북') {
                        region = School.Region.CHUNGBUK
                    } else if (i.values[0] == '충남') {
                        region = School.Region.CHUNGNAM
                    } else if (i.values[0] == '경북') {
                        region = School.Region.GYEONGBUK
                    } else if (i.values[0] == '경남') {
                        region = School.Region.GYEONGNAM
                    } else if (i.values[0] == '전북') {
                        region = School.Region.JEONBUK
                    } else if (i.values[0] == '전남') {
                        region = School.Region.JEONNAM
                    } else if (i.values[0] == '제주') {
                        region = School.Region.JEJU
                    }
                    //console.log(interaction.options.getString('학교이름', true))
                    search_n_run(i, interaction.options.getString('학교이름', true), school_type, region)
                }
            });

            collector.on('end', () => {
                let embed = new MessageEmbed()
                    .setTitle('학교 정보 입력')
                    .setDescription('지역 선택완료!')
                    .setColor(0x00AE86)
                interaction.editReply({ embeds:[embed], components:[], ephemeral: true });
            });
        }
    }

    async function search_n_run(interaction, school_name, school_type, region) {
        let result
        try {
            result = await school.search(region, school_name)
        } catch (e) {
            console.log(e)
        }
        
        set_school_2.run(interaction, result, school_name, school_type, region)
    }