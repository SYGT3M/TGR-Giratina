const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));
//Basic requirements + main database

var userban = db["bannedpeople"]; //List of banned users
var banlist = db["bannedchannels-type1"]; //List of channels the command is disabled in.

module.exports = {
    name: 'fibonacci',
    aliases: ['fibonacci-sequence'],
    description: 'Gives an array of the fibonacci sequence until the number provided.',
    usage: '[Maximum Number(This is the number that the final number of the fibonacci sequence should not go past.)]',
    cooldown: 5,
    execute(message, args) {
        if (banlist.includes(message.channel.id)) {
            message.channel.send(errEmb.setTitle("You are not allowed to use this command here.").setDescription("The channel you are trying to use the command in has the command disabled."))
            return;
        }
        if (userban.includes(message.author.id)) {
            message.channel.send(errEmb.setTitle("You are not allowed to use this command.").setDescription("You have been barred from this command."))
            return;
        } //Checks if the person is banned from the bot or if the command is disabled in the channel.


        let splitmes = message.content.toLowerCase().split(" ")
        let nthTerm = parseInt(splitmes[1]) //Defines the number that the last term in the sequence should not go past.

        let ftTerm = 0 //The starting numbers of the fibonacci series
        let flTerm = 1

        var finalArr = ["0"] //Quick decleration of the array , so i dont have to use strings , strings stinky


        while (ftTerm < nthTerm) {
            let tempPusher = flTerm  //Just a third variable so i can switch both the others without issues.
            let flTerm = ftTerm + flTerm //Adds the numbers to give the second numbe
            let ftTerm = tempPusher //Pushes the previously second number to the first position
            finalArr.push(ftTerm) //Puts the new first term into the array
        }//Still confused? , heres a quick explanation , 0 + 1 = 1 , the first 1 will go to zero's position , whereas the second 1 will come to the first ones position: 1+1 = 2; 1+2 = 3; 2+3 = 5

        let finalDesc = finalArr.join(" , ") //Makes the array into a stinky string

        let finalEmb = new Discord.MessageEmbed()
            .setColor(message.member.displayHexColor)
            .setTitle("Final Fibonacci Sequence has been made!")
            .setDescription(finalDesc)
        message.channel.send(finalEmb)
    }
}