const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const Canvas = require('canvas');
client.commands = new Discord.Collection();
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));
let bb = JSON.parse(fs.readFileSync("commands/bountydatabase.json", "utf8"));

var permissionbracket = db["bountyperms"]
var userban = db["bannedpeople"]
var girdev = db["developer"]



const permserrembed = new Discord.MessageEmbed()
    .setColor('ff0000')
    .setTitle("Error Occured")
    .setDescription("You do not have the <@&715754932204077206> Role.")


module.exports = {
    name: 'bounty',
    aliases: ['bounty-hunt', 'bh-rp'],
    description: 'Bounty Command for <@&715754932204077206>. Gives a randomised mission with a payout of 10,000 to 250,000.',
    cooldown: 86400,
    usage: "** **",
    async execute(message, args) {
        try {

            if (!girdev.includes(message.author.id) && !message.member.roles.cache.has("750806405749014549") && !message.member.roles.cache.has("715754932204077206")) {
                message.channel.send(permserrembed);
                return;
            } //Makes sure only bounty hunters can run this. 

            if (userban.includes(message.author.id) === true || !message.channel.id == "745155771033190410") return;

            let timesRan = 0;

            while (timesRan < 3) {

                var difP = bb["difPoint"][Math.floor(Math.random() * bb["difPoint"].length)] //Decides difficulty


                const bountyembed = new Discord.MessageEmbed()
                    .setColor(bb.embColor[difP])
                    .setTitle('Bounty Hunt')
                    .setDescription(bb["randomFirstName"][Math.floor(Math.random() * bb["randomFirstName"].length)] + bb["randomLastName"][Math.floor(Math.random() * bb["randomLastName"].length)])
                    .addField('Difficulty', bb.difS[difP])
                    .addField("Objective", bb["randomObjective"][Math.floor(Math.random() * bb["randomObjective"].length)])
                    .addField("Where To Find", bb["whereToFindPerson"][Math.floor(Math.random() * bb["whereToFindPerson"].length)])
                    .addField("Bounty Worth", `${bb[bb.moneyType[difP]][Math.floor(Math.random() * bb[bb.moneyType[difP]].length)]} <a:CreditSpin:810884883265093672>`)
                    .addField("Recommended Amount of Players:", bb.reqPlayers[difP])
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setImage('https://c.tenor.com/3gGmYplpnysAAAAC/yeet.gif')
                    .setTimestamp()
                    .setFooter('The Galactic Republic', 'https://cdn.discordapp.com/attachments/698076494131625995/731641899349180426/Logo45fps.gif')

                message.channel.send(bountyembed);
                console.log(`Generated +bounty for ${message.author.tag}`);
                timesRan++
            }
            timesRan = timesRan - 3
        } catch (err) {
            message.author.send("Giratina lacks perms or has encountered an error , please inform a developer of this!");
            console.log(err);
        }
    },
}