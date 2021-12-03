const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));

var girdev = db["developer"]

const permserrembed = new Discord.MessageEmbed()
    .setColor('ff0000')
    .setTitle("Error Occured")


module.exports = {
    name: 'sspartner',
    aliases: ['sspa'],
    description: 'A command that only a Giratina Admin can run. It shuffles the people who have registered for secret santa and tells them their random partner!',
    cooldown: 5,
	usage:"** **",
    execute(message, args) {
        if (girdev.includes(message.author.id)) {
            let sb = JSON.parse(fs.readFileSync("commands/santabase.json", "utf8"));

            function shuffle(array) {
                let currentIndex = array.length, randomIndex;

                // While there remain elements to shuffle...
                while (currentIndex != 0) {

                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;

                    // And swap it with the current element.
                    [array[currentIndex], array[randomIndex]] = [
                        array[randomIndex], array[currentIndex]];
                }

                return array;
            }
            shuffle(sb.ssShuffler);



            let a = 0;
            while (a < sb.ssRegistry.length) {
                let partnerObj = client.users.cache.find(u => u.id === sb.ssShuffler[a])

                let partnerEmbed = new Discord.MessageEmbed()
                    .setColor("#0f8a5f")
                    .setTitle("Partner Announcement!")
                    .setImage("https://media.discordapp.net/attachments/783944232309096479/913805237737910373/Indeed_MerryChristmas.gif")
                    .setDescription(`Thanks for registering for the first server-wide secret santa!\nYour Partner is <@${sb.ssShuffler[a]}>!\n\nMerry Christmas again!`)
                    .addField("\u200b", "\u200b", true)
                    .addField("Regards,", "The Staff Team", true)




                message.guild.members.cache.get(sb.ssRegistry[a]).send(partnerEmbed);
                a++
            }
        }
    }
}