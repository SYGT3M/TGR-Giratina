const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const Canvas = require('canvas');
client.commands = new Discord.Collection();
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));
let pb = JSON.parse(fs.readFileSync("commands/piratedatabase.json", "utf8"));

var userban = db["bannedpeople"]
var girdev = db["developer"]

const permserrembed = new Discord.MessageEmbed()
    .setColor('ff0000')
    .setTitle("Error Occured")
    .setDescription("You do not have the <@&748304348865364049> Role.")


module.exports = {
    name: 'pirate-raid',
    aliases: ['pirate', 'pirate-hunt', 'ph', 'pr', 'piratehunt'],
    description: 'A +bounty type of command exclusive to the Ohnaka Pirates! ',
    cooldown: 86400,
    usage: "** **",
    execute(message, args) {

        if (!message.member.roles.cache.has("748304348865364049") && !message.member.roles.cache.has("750806405749014549") && !girdev.includes(message.author.id) === true) {
            message.channel.send(permserrembed);
            return;
        };

        if (userban.includes(message.author.id) === true || !message.channel.id == "745155771033190410") return;

        let timesRan = 0;

        while (timesRan < 3) {

            var difP = pb["difPoint"][Math.floor(Math.random() * pb["difPoint"].length)] //Decides difficulty


            const pirateembed = new Discord.MessageEmbed()
                .setColor(pb.embColor[difP])
                .setTitle(`Pirate Raid`)
                .addField('Difficulty', pb.difS[difP])
                .addField("Objective", pb["randomObjective"][Math.floor(Math.random() * pb["randomObjective"].length)])
                .addField("Raid Worth", `${pb[pb.moneyType[difP]][Math.floor(Math.random() * pb[pb.moneyType[difP]].length)]} <a:CreditSpin:810884883265093672>`)
                .addField("Recommended Amount of Players:", pb.reqPlayers[difP])
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setImage('https://c.tenor.com/dQXT5bQ-G6gAAAAC/hondo-hondo-ohnaka.gif')
                .setTimestamp()
                .setFooter('The Galactic Republic', 'https://cdn.discordapp.com/attachments/698076494131625995/731641899349180426/Logo45fps.gif')

            message.channel.send(pirateembed)
            console.log('Generated +piratehunt for ' + message.author.tag);
            timesRan++
        }
        timesRan = timesRan - 3
    },
}