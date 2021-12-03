const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
//Basic Requirements^

let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8")); //Loads the maindatabase with banned channels , users and stuff


var userban = db["bannedpeople"]; //List of people banned from the bot
var banlist = db["bannedchannels-type1"]; //List of channels this command is disabled in

let errEmb = new Discord.MessageEmbed() //Error Embed Template
    .setColor("#ff0000")
    .setTitle("Invalid Arguments.")

module.exports = {
    name: 'card-inv',
    aliases: ['card-inventory', "ci", "cardinv"],
    description: 'Shows the Card inventory of a user. Part of the TGR-TCG Group of Commands',
    usage: "<Page> [User]",
    cooldown: 15,
    execute(message, args) {


        if (banlist.includes(message.channel.id)) {
            message.channel.send(errEmb.setTitle("You are not allowed to use this command here.").setDescription("The channel you are trying to use the command in has the command disabled."))
            return;
        }
        if (userban.includes(message.author.id)) {
            message.channel.send(errEmb.setTitle("You are not allowed to use this command.").setDescription("You have been barred from this command."))
            return;
        } //Both statements above check if a user is banned from this command , or if the command is disabled in the channel.


        let cardinvb = JSON.parse(fs.readFileSync("commands/cardinv.json", "utf8")); //Loads in the inventory database every time the command is ran to keep it up to date

        if (message.mentions.users.first().id) {
            var invAuthID = message.mentions.users.first().id
        } else {
            var invAuthID = message.author.id
        } //Checks if the inventory to be loaded is of the author of the message , or a person who has been pinged.


        if (!cardinvb.user[invAuthID]) cardinvb.user[invAuthID] = {
            inventory: [],
            inventoryName: []
        }//Checks if the person whose inventory is to be loaded has an inventory or not , if not , it makes one for them.


        if (cardinvb.user[invAuthID].inventory.length > 1) { //Checks if there is more than one card in a person's inventory.
            var invItems = cardinvb.user[invAuthID].inventory.join(" \n ")
            var invNames = cardinvb.user[invAuthID].inventoryName.join(" \n ") //Both statements join the tokens and names for the embed.

            let splitmes = message.content.split(" ")
            if (!splitmes[1] == 1 || 2 || 3) {
                message.channel.send(errEmb.setDescription("Invalid Page Number."))
                return;
            } //Checks for the page number to be displayed.


            if (invNames > 1024) {
                var inv2Items, inv2Names = invItems, invNames //Makes several pages if there are more than 1024 characters.




                if (invItems.split(" ").length > 66) { //makes a third page if the user has more than 66 cards.
                    var inv3Items, inv3Names = invItems, invNames

                    inv3Items.split("\n").splice(66, (invItems.length)).join("\n")
                    inv3Names.split("\n").splice(66, (invNames.length)).join("\n")
                    inv2Items.split("\n").splice(33, 66).join("\n")
                    inv2Names.split("\n").splice(33, 66).join("\n")
                } else {
                    inv2Items.split("\n").splice(33, (invItems.length)).join("\n") //Splits the card evenly into pages of 33cards each.
                    inv2Names.split("\n").splice(33, (invNames.length)).join("\n")
                }
                invItems.split("\n").splice(0, 33).join("\n")
                invNames.split("\n").splice(0, 33).join("\n")
            }
        }

        if (cardinvb.user[invAuthID].inventory.length <= 1) { //If the person has only one card , it does not attach any other cards and just lets it remain as a pseudo-array
            var invItems = cardinvb.user[invAuthID].inventory
            var invNames = cardinvb.user[invAuthID].inventoryName
        }

        if (invItems.length < 1) {
            var invItems = "Your Inventory is Empty";
            var invNames = "\u200b"
        } //Displays an empty message if a user has no cards.



        let invEmbed = new Discord.MessageEmbed() //inventory embed template
            .setColor(message.member.displayHexColor)
            .setDescription("This is your Card Deck:")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter('The Galactic Republic', 'https://cdn.discordapp.com/attachments/698076494131625995/731641899349180426/Logo45fps.gif', 'https://discord.gg/thegalacticrepublic')


        if (splitmes[1] == 1) { //attaches the cards of the first page since the first page is specified
            message.channel.send(invEmbed.addField("Card Tokens:", invItems, true).addField("Card Names:", invNames, true))
        } else if (splitmes[1] == 2) { //attaches cards of the second page since second page has been specified
            message.channel.send(invEmbed.addField("Card Tokens:", inv2Items, true).addField("Card Names:", inv2Names, true))
        } else if (splitmes[1] == 3) { //attaches cards of the third page since the third page is specified.
            message.channel.send(invEmbed.addField("Card Tokens:", inv3Items, true).addField("Card Names:", inv3Names, true))
        }

    }
}