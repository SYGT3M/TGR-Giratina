const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));
var userban = db["bannedpeople"];
var banlist = db["bannedchannels-type1"];

module.exports = {
    name: 'emotelist',
    aliases: ['emojilist', 'ithinkitwouldbebetterifpinkdidsomemanuallaboursmh'],
    description: "Returns a txt file of all the emotes in the guild.\n**Custom Formats:**\ncf1: Custom Format for Mission with emotes line-seperated with clusters of 9.",
    cooldown: 1000,
    usage: " [customFormatNumber]",
    execute(message, args) {
        if (userban.includes(message.author.id) === true) return; //Checks if the author is banned from the bot or command.
        if (banlist.includes(message.channel.id)) return; //Checks if the command can be ran in the channel.

        const emojiArray = message.guild.emojis.cache.map((e) => { //Maps the list of emojis on the discord server , and returns the emote mention format for each emote in an array.
            return `${e}`;
        }).sort()

        let customFormat = message.content.toLowerCase().split(" ")[1] //token for any custom format.

        var finalEmojis = emojiArray.join("\n"); //Returns a list of emojis seperated by 1/line in case there are no custom formats.

        if (customFormat == "cf1") { //Custom format 1 for Mission Vao.
            var leNumber = 9 //Number of emojis/line
            while (leNumber < emojiArray.length) { //a loop for making an array 
                emojiArray.splice(leNumber, 1, "\n" + emojiArray[leNumber]) //Inserts a \n at every ninth Emoji
                leNumber = leNumber + 9
            }
            var finalEmojis = emojiArray.join(" ") //Joins the entire array together.
        }


        fs.writeFile('guildemojis.txt', finalEmojis, function (errem) {
            if (errem) throw errem;
        }); //Makes a new file called guildemojis.txt and writes the list of emojis to it.

        let emojiembed = new Discord.MessageEmbed() //an embed with the number of emojis in the guild.
            .setTitle("List of emojis for this guild.")
            .setDescription(`Number of Emojis for this guild = ${emojiArray.length}`)
            .setColor(message.member.displayHexColor);

        message.channel.send(emojiembed); //Sends the embed
        message.channel.send({ //Sends the file with the emoji list.
            files: ['./guildemojis.txt'],
        });
    }
}