const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const { MessageButton } = require("discord-buttons")
const { Color } = require("../../config.js");

module.exports = {
  name: "links",
  aliases: ["link", "invite", "support", "link"],
  description: "links",
  usage: "links",
  run: async (client, message, args) => {
  
      let invite = new MessageButton().setStyle('url').setLabel('Invite Me').setURL('https://discord.com/api/oauth2/authorize?client_id=914082317344059402&permissions=8&scope=bot')
      let support = new MessageButton().setStyle('url').setLabel('Support Server').setURL('https://discord.gg/bwfsd4qfkn')
     
      const allbuttons = [invite, support]

    let mybuttonsmsg = await message.channel.send({
        embed: new MessageEmbed()
          .setColor(Color)
          .setDescription('**Click on The buttons below to redirect**'),
        buttons: allbuttons
      });
  }
}