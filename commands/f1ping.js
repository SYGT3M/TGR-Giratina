const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));
//Basic requirements + loading the main database^

let channelembed = new Discord.MessageEmbed() //Error Embed Template
    .setColor('#ff0000')
    .setTitle('Error Occurred')


module.exports = {
    name: 'f1-ping',
    aliases: ['f1'],
    execute(message, args) {
        let authmes = message //Lets me use the original message without having to fetch it again.
        message.guild.channels.cache.get('807686177423097896').messages.fetch('807689178146013214').then(message => { //Fetches the message with the list of members on it.
            const memberlist = message.mentions.members.map((e) => {
                return `${e}`;
            }).sort() //Returns an array of the list of members sorted by user id.
            var finalMemberList = memberlist.join(" "); //Makes the array into a single string seperated by single spaces.
            var memberArray = finalMemberList.replace(/<@!/g, "").replace(/>/g, "").split(" ");//Makes another array for easier checking of author ids
            if (memberArray.includes(authmes.author.id) || db["developer"].includes(authmes.author.id)) { authmes.channel.send(finalMemberList) } else { return; } //Checks if the author is a member of the channel , and if they are , it sends the ping , otherwise it returns.

        })
    }

}


