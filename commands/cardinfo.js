const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const Canvas = require('canvas');
client.commands = new Discord.Collection();
//Basic Requirements^

let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8")); //Loads main database

var userban = db["bannedpeople"]; //List of banned users
var banlist = db["bannedchannels-type1"]; //list of channels the command is disabled in.

let cardb = JSON.parse(fs.readFileSync("commands/card.json", "utf8"));//loads the Card Database

let errEmb = new Discord.MessageEmbed() //Error Embed Template.
    .setColor("#ff0000")
    .setTitle("Invalid Arguments.")

module.exports = {
    name: 'card-info',
    aliases: ['card', "cardinfo"],
    description: 'Gives basic information about the cards. Part of the TGR-TCG Group of commands. Complete Card Index is available [Here](https://discord.com/channels/698075892974354482/698076494131625995/869515230466682940)',
    usage: "<Card Token>",
    cooldown: 10,
    execute(message, args) {

        if (!db["developer"].includes(message.author.id)) {
            if (banlist.includes(message.channel.id)) {
                message.channel.send(errEmb.setTitle("You are not allowed to use this command here.").setDescription("The channel you are trying to use the command in has the command disabled."))
                return;
            }
        }
        if (userban.includes(message.author.id)) {
            message.channel.send(errEmb.setTitle("You are not allowed to use this command.").setDescription("You have been barred from this command."))
            return;
        } //Checks if the person is banned from the bot or if the command is disabled in the channel.



        let splitmes = message.content.split(" ")
        if (!splitmes[1]) {
            message.channel.send("Please Enter a cardToken for the command.")
        }//Checks if the cardToken is specified.

        let cardToken = splitmes[1].toUpperCase()//Fixes the case of the card , making it case insensitive.


        if (!cardb.card[cardToken]) {
            message.channel.send(errEmb.setDescription("The cardToken you have supplied is not attached to an existing card. Please enter a valid cardToken."))
            return
        }; //Checks if the card exists.

        let cardObject = cardb.card[cardToken] //For easing purposes.

        let cardEmbed = new Discord.MessageEmbed()
            .setColor(cardb.rarityColor[cardObject.rarityIndexNo])
            .setTitle(cardObject.cardname)
            .setDescription(cardObject.cardDesc + '\n [Click Here for the entire Card Index](https://temporal-thistle-975.notion.site/TGR-TCG-Card-Index-eee183a1b6ad455ea417c910475dad4b)')
            .addField("Rarity:", cardObject.rarity)
            .addField("Series:", cardObject.series, true)
            .addField("Class:", cardObject.cardClass, true)
            .setImage(cardObject.cardimage)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter('The Galactic Republic', 'https://cdn.discordapp.com/attachments/698076494131625995/731641899349180426/Logo45fps.gif', 'https://discord.com/channels/698075892974354482/698076494131625995/869515230466682940')


        message.channel.send(cardEmbed)//sends the embed.

    }
}
