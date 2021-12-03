const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));
var banlist = db["bannedchannels-type1"];
var userban = db["bannedpeople"];
module.exports = {
    name: 'rp-guide',
    aliases: ['rp', 'rpguide'],
    description: 'Enemy Guide for the pirate-hunt and +bounty system. This system DOES NOT apply for main rp and should not be taken as a reference for comparison in any way. All +rp is Non Canon.',
    cooldown: 1,
    usage: "** **",
    execute(message, args) {
        if (banlist.includes(message.channel.id) === true) return;
        if (userban.includes(message.author.id) === true) return;
        const enemyembed = new Discord.MessageEmbed()
            .setTitle('Enemy Guide')
            .setColor(message.member.displayHexColor)
            .setDescription('The Enemy Guide for the +rp system. Enemies may be decided by the DM. Only numbers are provided. All missions with a difficulty larger than V will have a leader.The moving objective means that the base will be a ship/a vehicle , constantly moving , the stationary objective means that it is a building and you will not have to chase after it.')
            .addFields(
                { name: 'Difficulty I:', value: '5 Enemies , Stationary Objective.', inline: true },
                { name: 'Difficulty II:', value: '10 Enemies , Stationary Objective', inline: true },
                { name: 'Difficulty III:', value: '15 Enemies , Stationary Objective', inline: true },
                //{ name: '\u200B', value: '\u200B' },
            )
            .addFields(
                { name: 'Difficulty IV:', value: '15 Enemies , Moving Objective', inline: true },
                { name: 'Difficulty V:', value: '20 Enemies , Moving Objective', inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                //{ name: '\u200B', value: '\u200B' },
            )
            .addFields(
                { name: 'Difficulty VI:', value: '25 Enemies , Moving Objective', inline: true },
                { name: 'Difficulty VII:', value: '30 Enemies , Moving Objective', inline: true },
                { name: 'Difficulty VIII:', value: '35 Enemies , Moving Objective', inline: true },
                //{ name: '\u200B', value: '\u200B' },
            )
            .addFields(
                { name: 'Difficulty X:', value: '50 Enemies , Moving Objective' },
            )
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter('The Galactic Republic', 'https://cdn.discordapp.com/attachments/698076494131625995/731641899349180426/Logo45fps.gif', 'https://discord.gg/thegalacticrepublic')
        message.channel.send(enemyembed);
    },
}

