const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));
let fb = JSON.parse(fs.readFileSync("commands/floppabase.json", "utf8"));
var floppa = fb["floppa"];
var userban = db["bannedpeople"];

//The embed that will be sent if a user has been barred from this command
const banneduserembed = new Discord.MessageEmbed()
    .setColor('ff0000')
    .setTitle("Error Occured")
    .setDescription('`You have been Barred from this Command/Module/The Entire Bot. Please contact a developer if you wish for this to be revoked.`')

module.exports = {
    name: 'floppa',
    aliases: ['caracal', 'flop', 'bigfloppa'],
    description: "A command that selects random floppa media out of 72 Total Media",
    cooldown: 5,
    usage: "** **",
    execute(message, args) {
        //checks if user is banned from the bot/command and returns an Error
        if (userban.includes(message.author.id) === true) return message.channel.send(banneduserembed);

        //Takes a random link from the database of media  and sends it
        message.channel.send(floppa[Math.floor(Math.random() * floppa.length)])

    }
}