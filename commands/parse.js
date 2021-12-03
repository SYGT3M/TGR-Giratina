const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));
var userban = db["bannedpeople"];

module.exports = {
  name: 'parse',
  aliases: 'giratina-view',
  description: 'Shows you what the API/A bot Sees in a message',
  usage: "[Structure/message you want to parse]",
  cooldown: 0,
  execute(message , args) {

    if(userban.includes(message.author.id) === true) return;

        console.log(`Parse command ran by ${message.author.tag}.`);

        const parseembed = new Discord.MessageEmbed() //Creates an embed with the color of the user and the data in code block.
            .setColor(message.member.displayHexColor)
            .setDescription(`\`${args.join(" ")}\``)

    message.channel.send(parseembed); //Sends the embed

  },
}