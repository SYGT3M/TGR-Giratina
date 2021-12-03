const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));

const permserrembed = new Discord.MessageEmbed()
    .setColor('ff0000')
    .setTitle("Error Occured")



module.exports = {
    name: 'secret-santa',
    aliases: ['secretsanta', 'ss', 'secretfactsandlogic'],
    description: 'A command that registers you for the TGR Server-Wide Secret Santa.',
    cooldown: 86400,
	usage:"** **",
    execute(message, args) {
        if (message.member.roles.cache.has("708485647165292666") || message.member.roles.cache.has("754797537830895686") || message.member.roles.cache.has("698221969182556181")) {
            let sb = JSON.parse(fs.readFileSync("commands/santabase.json", "utf8"));
            //if (ssRegistry.includes(message.author.id)) {
            //let santaItem = args.join(" ")

            let userID = message.author.id
            if (sb.users[userID]) {
                message.channel.send(permserrembed.setDescription("You have already registered."))
                return;
            } else {
                if (!sb.users[userID]) sb.users[userID] = {
                    gifts: []
                }

                sb.ssRegistry.push(message.author.id)
                sb.ssShuffler.push(message.author.id)
                //sb.users[userID].gifts.push(santaItem)

                fs.writeFile("commands/santabase.json", JSON.stringify(sb), (x) => {
                    if (x) console.error(x)
                });

                let endEmbed = new Discord.MessageEmbed()
                    .setColor("#cc231e")
                    .setTitle("Thanks for registering for Secret Santa!")
                    .setImage("https://media.discordapp.net/attachments/783944232309096479/913805237737910373/Indeed_MerryChristmas.gif")
                    .setDescription("Thank you for registering for the first server-wide secret santa!\nWe hope you're enjoying your stay here!\nYou'll recieve the name of the person you'll be gifting on the 10th of December!\n\n**Merry Christmas and a Happy New Year!**")
                    .addField("\u200b", "\u200b", true)
                    .addField("Regards,", "The Staff Team", true)


                message.author.send(endEmbed)
                //}
            }
        } else { message.channel.send(permserrembed.setDescription("You require <@&754797537830895686> or <@&708487077536202814> to run this command. :(")) }
    }
}