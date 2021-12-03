const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));
let cardb = JSON.parse(fs.readFileSync("commands/card.json", "utf8"));
var cardinvb = JSON.parse(fs.readFileSync("commands/cardinv.json", "utf8"));

module.exports = {
    name: 'card-inv-t',
    aliases: ["cardinvt"],
    description: 'adds a card',
    usage: "[Card Token]",
    cooldown: 0,
    execute(message, args) {
        if (db["developer"].includes(message.author.id)) {
            fs.watch('commands/cardinv.json', (eventType, filename) => {
                console.log("the file " + filename + " was changed by type ", eventType)
                var cardinvb = JSON.parse(fs.readFileSync("commands/cardinv.json", "utf8"));
            });


            fs.watchFile('commands/cardinv.json', (curr, prev) => {
                console.log(`the current mtime is: ${curr.mtime}`);
                console.log(`the previous mtime was: ${prev.mtime}`);
                var cardinvb = JSON.parse(fs.readFileSync("commands/cardinv.json", "utf8"));
            });

            if (!cardinvb.user[message.author.id]) cardinvb.user[message.author.id] = {
                inventory: [],
                inventoryName: []
            }
            if (!cardinvb.user[message.author.id].inventory) return;

            if (cardinvb.user[message.author.id].inventory.length > 1) {
                var invItems = cardinvb.user[message.author.id].inventory.join(" \n ")
                var invNames = cardinvb.user[message.author.id].inventoryName.join(" \n ")
            }

            if (cardinvb.user[message.author.id].inventory.length <= 1) {
                var invItems = cardinvb.user[message.author.id].inventory
                var invNames = cardinvb.user[message.author.id].inventoryName
            }

            if (invItems < 1) {
                var invItems = "Your Inventory is Empty";
                var invNames = "b"
            }

            let invEmbed = new Discord.MessageEmbed()
                .setColor(message.member.displayHexColor)
                .setDescription("This is your Card Deck:")
                .addField("Card Tokens:", invItems, true)
                .addField("Card Names:", invNames, true)
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter('The Galactic Republic', 'https://cdn.discordapp.com/attachments/698076494131625995/731641899349180426/Logo45fps.gif', 'https://discord.gg/thegalacticrepublic')

            message.channel.send(invEmbed)
        }
    }
}