const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));

var girdev = db["developer"]




const perrembed = new Discord.MessageEmbed()
    .setColor('ff0000')
    .setTitle("Error Occured")


module.exports = {
    name: 'peppapig',
    aliases: ['peppa-pig', 'peppa-pig-rp', 'peppapigrp', 'pprp'],
    description: "A command that registers you to the Peppa Pig Meme RP.",
    cooldown: 86400,
    usage: "<characterName>",
    async execute(message, args) {

        if (message.member.roles.cache.has("715103105834025021") || message.member.roles.cache.has("731202734031634455")) {
            if (args) {

                let pb = JSON.parse(fs.readFileSync("commands/peppadatabase.json", "utf8"));

                let characterName = args.join(" ").toUpperCase();

                if (pb.playerCharactersOnly.includes(characterName)) {
                    message.channel.send(perrembed.setDescription("The character is taken."));
                    return;
                };

                pb.playerCharacters.push(`${characterName} - <@${message.author.id}>`);
                pb.playerCharactersOnly.push(`${characterName}`);

                fs.writeFile("commands/peppadatabase.json", JSON.stringify(pb), (x) => {
                    if (x) console.error(x)
                });

                message.guild.channels.cache.get('912802456994463774').messages.fetch('913403621117399081').then(peppamsg => {

                    let peppaembed = new Discord.MessageEmbed()
                        .setTitle("Characters Taken:")
                        .setColor("#fab0d5")
                        .addField("\u200b", pb.playerCharacters.join("\n"), true)

                    peppamsg.edit(peppaembed)
                })

                let role = message.guild.roles.cache.find(r => r.id = "913648810138423367");
                message.member.roles.add(role).catch((error) => {
                    console.log(error)
                });


            } else { message.channel.send(perrembed.setDescription("You have not mentioned a character name.")); return; };
        } else { message.channel.send(perrembed.setDescription("You do not have the required roles.")); return; }
    }
};