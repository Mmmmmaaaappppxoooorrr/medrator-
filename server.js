 const Discord = require("discord.js");    
    const fs = require("fs");
    const client = new Discord.Client();
    const disbut = require('discord-buttons')
    disbut(client)
    const { MessageMenuOption, MessageMenu } = require("discord-buttons");
    const config = require("./config.js");
    const { Prefix, Token, Color } = require("./config.js");
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    client.slash = new Discord.Collection();
    client.db = require("quick.db");
    

    client.on("message", async message => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.member)
    message.member = await message.guild.fetchMember(message);
    
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>`))) {
    return message.channel.send(`Bot Prefix : ${Prefix}`);
    }
    });
    
    let modules = [ "info", "moderation", "fun", "gif"];
    
    modules.forEach(function(module) {
    fs.readdir(`./commands/${module}`, function(err, files) {
    if (err)
    return new Error(
    "Missing Folder Of Commands! Example : Commands/<Folder>/<Command>.js"
    );
    files.forEach(function(file) {
    if (!file.endsWith(".js")) return;
    let command = require(`./commands/${module}/${file}`);
    console.log(`${command.name} Command Has Been Loaded - ✅`);
    if (command.name) client.commands.set(command.name, command);
    if (command.aliases) {
    command.aliases.forEach(alias =>
    client.aliases.set(alias, command.name)
    );
    }
    if (command.aliases.length === 0) command.aliases = null;
    });
    });
    });
    
    fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    });
    });
    
    
    client.on("message", async message => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.member)
    message.member = await message.guild.fetchMember(message);
    
    if (!message.content.startsWith(Prefix)) return;
    
    const args = message.content
    .slice(Prefix.length)
    .trim()
    .split(" ");
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    
    if (!command) return;
    
    if (command) {
    if (!message.guild.me.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
    "I Don't Have Enough Permission To Use This Or Any Of My Commands | Require : Administrator"
    );
    command.run(client, message, args);
    }
    client.channels.cache.get("997071213358755890").send(
    `User : ${message.author.tag} (${message.author.id}) Server : ${message.guild.name} (${message.guild.id}) Command : ${command.name}`
    );
    });
    
    client.login(process.env.token)