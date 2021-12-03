const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));
var userban = db["bannedpeople"];

module.exports = {
    name: 'arrest2',
    aliases: 'arrest2hr',
    description: 'Arrest command exclusive to the arrest perms for arresting shitposters in #server-feedback who dont have a record.',
    cooldown: 5,
    usage: '<criminal>',
    execute(message, args) {
        if (userban.includes(message.author.id) === true) return;
        if (!db["developer"].includes(message.author.id) && !message.member.roles.cache.has("849336483068641321")) return;


        let arrembed = new Discord.MessageEmbed()
            .setColor("#c3b1e1")
            .setTitle("You are under arrest!")
            .setDescription("Stop! You have violated the Law! \nPay the court a fine or serve your sentence. \nYour shitposts in <#707655229662822550> are now forfeit. \nYou will be <@&713490236780445706> for 2hrs to serve your sentence!")
            .setTimestamp()
            .setFooter('The Galactic Republic', 'https://cdn.discordapp.com/attachments/698076494131625995/731641899349180426/Logo45fps.gif', 'https://discord.gg/thegalacticrepublic')

        let arrester = message.author


        let role = message.guild.roles.cache.find(r => r.id = "713490236780445706");
        let auser = message.mentions.members.first()
        auser.roles.add(role).catch((error) => {
            message.guild.channels.cache.get('854539454319427624').send(error)
        })
        message.channel.send(arrembed)
        let logembed = new Discord.MessageEmbed()
            .setColor("#c3b1e1")
            .setTitle("A criminal has been arrested!")
            .setDescription(`<@${arrester.id}> used the +arrest2 command on <@${auser.id}> for 2 hours.\nPlease add a reason and necessary screenshots and/or links to the offence.`)



        message.guild.channels.cache.get('854539454319427624').send(`${arrester} ${auser}`, {
            embed: logembed
        })

            .then(message => {
                setTimeout(function () {
                    if (auser.roles.cache.has(713490236780445706)) {
                        auser.roles.remove(role).catch((error) => {
                            message.guild.channels.cache.get('854539454319427624').send(error)
                        }
                        )
                        auser.send(arrembed.setTitle("You have served your sentence well.").setDescription("You have served your sentence of 2 hours well. You are now free to leave. Move Along. Move Along."))
                    }
                }, 7200000);
            }
            );
    }
}