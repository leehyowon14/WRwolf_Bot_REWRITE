const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
    config: {
        name: `lewdavatar`,
        aliases: [`${prefix}lewdavatar`],
        description: "",
        usage: "",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
  //command

  //Checks channel for nsfw
   
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply({ content : `이곳은 NSFW채널이 아닙니다.`, allowedMentions: {repliedUser: true} })
      
  }

  async function emsend() {
    let uwu = (await neko.nsfw.avatar());

    const embed = new Discord.MessageEmbed()
    .setTitle("avatar")
    .setImage(uwu.url)
    .setColor(`#FF0000`)
    .setURL(uwu.url);
    message.channel.send({ embeds: [embed] });

    }
        emsend();
    }
};