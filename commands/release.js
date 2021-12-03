const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));
var userban = db["bannedpeople"];

module.exports = {
    name: 'release',
    aliases: 'release',
    description: 'A command exclusive to @Arrest Perms for releasing arrested users.',
    cooldown: 5,
    usage: '<criminal>',
    execute(message, args) {
        if (userban.includes(message.author.id) === true) return;
        if (!db["developer"].includes(message.author.id) && !message.member.roles.cache.has("849336483068641321")) return;


        let arrembed = new Discord.MessageEmbed()
            .setColor("#c3b1e1")
            .setTitle("You have been released!")
            .setDescription("You have served your sentence well. You are now free to leave. Move Along. Move Along.")
            .setTimestamp()
            .setFooter('The Galactic Republic', 'https://cdn.discordapp.com/attachments/698076494131625995/731641899349180426/Logo45fps.gif', 'https://discord.gg/thegalacticrepublic')



        let role = message.guild.roles.cache.find(r => r.id = "713490236780445706");
        let auser = message.mentions.members.first()
        auser.roles.remove(role).catch(console.error)
        message.channel.send(arrembed)

    }
}