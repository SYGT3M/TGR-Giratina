const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));
//Basic Requirements + main database.

let errorEmb = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle("Invalid Bracket")



module.exports = {
    name: 'random',
    aliases: ['randomize', 'randomise'],
    description: 'Gives a random number between a Minimum Number and a Maximum Number. (The Random number may be the Minimum and Maximum Number. i.e. it includes both numbers.) If no minimum number is supplied , it will default to 1.',
    usage: '[minimumNumber] <maximumNumber>',
    cooldown: 5,
    execute(message, args) {
        let banB = JSON.parse(fs.readFileSync("commands/banbase.json", "utf8"));//List of banned channels and users

        if (banB.commands["random"].includes(message.channel.id)) {
            message.channel.send(errorEmb.setTitle("You are not allowed to use this command here.").setDescription("The channel you are trying to use the command in has the command disabled."))
            return;
        }
        if (banB["user"].includes(message.author.id)) {
            message.channel.send(errorEmb.setTitle("You are not allowed to use this command.").setDescription("You have been barred from this command."))
            return;
        } //Checks if the person is banned from the bot or if the command is disabled in the channel.

        let finalEmb = new Discord.MessageEmbed() //This embed template is here because of the message.member.displayHexColor property , which requires the message construct 
            .setColor(message.member.displayHexColor)
            .setTitle("Random Number Generated.")


        let arguments = message.content.toLowerCase().split(" ")
        if (!arguments[1]) {
            message.channel.send(errorEmb.setDescription("\`No Bracket has been specified , please enter a Minimum Number and Maximum Number. +help random for more details.\`"))
            return;
        } //Checks if the bracket for the random function has been defined.

        if (!arguments[2]) { //If no miniumum number has been defined , defaults to 1
            var minBrac = 1
            var maxBrac = parseInt(arguments[1])
        } else { //Defines the minimum and maximum numbers in case the numbers have been defined.
            var minBrac = parseInt(arguments[1])
            var maxBrac = parseInt(arguments[2])

        }


        if (minBrac >= maxBrac) { //Returns an error if the minimum number is larger than the maximum number.
            message.channel.send(errorEmb.setDescription("\`The Minimum Number is greater to or equal to the Maximum Number\`"))
            return;
        }

        let ranNumber = Math.floor((Math.random() * (maxBrac - minBrac + 1)) + minBrac) //Actually does the randomization

        message.channel.send(finalEmb.setDescription(`Number Generated: ${ranNumber}`)) //Returns the final result.


    }
}