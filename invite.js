const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Prefix } = require("../../config.js");
module.exports = {
  name: "invite",
  aliases: ["support", "Invite"],
  description: "Support invite",
  usage: "Invite",
  run: async(client, message, args) => {
    let lost = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(Extra Links!)
    .setDescription(Choose the buttons to get other links! )
    .setFooter(${message.author.username})
    .setImage(``)
    const disbut = require("discord-buttons")
    let button = new disbut.MessageButton()
    .setStyle('url')
    .setLabel('Support Link!')
    .setURL('https://discord.gg/2VnaZj9wEY%27);
            let button2 = new disbut.MessageButton()
    .setStyle('url')
    .setLabel('Invite Link!')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=779007687245299724&permissions=8&scope=bot%27); 
            message.channel.send({ embed : lost , buttons : [button,button2] }) 