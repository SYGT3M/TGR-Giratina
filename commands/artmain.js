const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const Canvas = require('canvas');
client.commands = new Discord.Collection();
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));

var maxpaint = 0;

var girdev = db["trustlist"];
var banlist = db["bannedchannels-type1"];

var paintcol = ['#303f82', '#122862', '#020204', '#f9fbfb', '#5484db', '#a7f3fa', '#294173', '#000022', '#3d5b8c', '#befffb', '#323e89', '#8fd08f', '#ffffff'];

//The embed that will be sent if a user has been barred from this command
const banneduserembed = new Discord.MessageEmbed()
    .setColor('ff0000')
    .setTitle("Error Occured")
    .setDescription('`You have been Barred from this Command/Module/The Entire Bot. Please contact a developer if you wish for this to be revoked.`')

module.exports = {
    name: 'art-uhd',
    aliases: ['painting-uhd', "pnt-uhd"],
    description: 'Creates a 3840x2160p Canvas with 1000 Randomised Lines from the Center. Limited to a few people. Contact SYGT3M/Crimson to get access to this command.',
    cooldown: 60,
    usage: "** **",
    async execute(message, args) {

        if (!girdev.includes(message.author.id) === true) return;
        if (banlist.includes(message.channel.id) === true) return;
        //checks if user is banned from the bot/command and returns an Error
        if (userban.includes(message.author.id) === true) return message.channel.send(banneduserembed);

        //Reassurance message and Console log for the command
        console.log('Uhd command used.')
        message.channel.send('This might take a few seconds.')

        //Makes the Canvas and context
        const canvas = Canvas.createCanvas(3840, 2160);
        const ctx = canvas.getContext('2d');

        //Sets loop for the 1000 lines
        while (maxpaint < 1000) {
            const xcordart = Math.floor(Math.random() * 3841);
            const ycordart = Math.floor(Math.random() * 2161);

            try {
                //Makes the background
                const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/805731263931088906/813688597282160640/GiratinaCanvas.png');
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                //makes a subtle rectangle around the borders
                ctx.strokeStyle = '#74037b';
                ctx.strokeRect(0, 0, canvas.width, canvas.height);

                //Sets the stroke color and width
                ctx.strokeStyle = paintcol[Math.floor(Math.random() * paintcol.length)].toString();
                ctx.lineWidth = Math.floor(Math.random() * 5) + 1;

                //Makes the lines
                ctx.beginPath();
                ctx.moveTo(1920, 1080);
                ctx.lineTo(xcordart, ycordart);
                ctx.arc(xcordart, ycordart, 5, 0, 2 * Math.PI);
                ctx.stroke();

                maxpaint++

                //Sends the final product when the loop is done.
                if (maxpaint === 1000) {
                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'art.png');
                    message.channel.send(attachment);
                    maxpaint = maxpaint - 1000;
                    message.channel.send(`<@${message.author.id}>`)
                    console.log('Generated Art')
                }
            }
            catch (err) {
                message.author.send("Giratina lacks perms or has encountered an error , please inform a developer of this!");
                console.log(err.message);
            }

            if (maxpaint === 0) {
                break;
            }

        }






    },
};
