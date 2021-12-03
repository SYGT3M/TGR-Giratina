const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const Canvas = require('canvas');
client.commands = new Discord.Collection();
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));
var maxpaint = 0;

var paintcol = ['#8b0000', '#ff0000', '#2ecc71', '#ff3c00', '#2b00ff', '#ff00ea', '#a200ff', '#ff0077', '#ddff00', '#ffff00', '#00ff00', '#00ff6e', '#d2a000'];

var banlist = db["bannedchannels-type1"];

//The embed that will be sent if a user has been barred from this command
const banneduserembed = new Discord.MessageEmbed()
    .setColor('ff0000')
    .setTitle("Error Occured")
    .setDescription('`You have been Barred from this Command/Module/The Entire Bot. Please contact a developer if you wish for this to be revoked.`')

module.exports = {
    name: 'art',
    aliases: ['painting', "pnt"],
    description: 'Creates a 1280x720p Canvas with 200 Randomised lines from the Center.',
    cooldown: 60,
    usage: '** **',
    async execute(message, args) {

        //checks if the bot is blocked in the channel
        if (banlist.includes(message.channel.id) === true) return;

        //checks if user is banned from the bot/command and returns an Error
        if (userban.includes(message.author.id) === true) return message.channel.send(banneduserembed);


        //Creates the  canvas and sends a "reassurance" message.
        message.channel.send('This might take a few seconds.')
        const canvas = Canvas.createCanvas(1280, 720);
        const ctx = canvas.getContext('2d');

        //Creates a loop for the 200 lines.
        while (maxpaint < 200) {

            try {

                //Sets the background , and the set
                const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/805731263931088906/813688597282160640/GiratinaCanvas.png');
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


                //Creates a subtle border
                ctx.strokeStyle = '#74037b';
                ctx.strokeRect(0, 0, canvas.width, canvas.height);

                //Sets the stroke Color and the line width
                ctx.strokeStyle = paintcol[Math.floor(Math.random() * 13)].toString();;
                ctx.lineWidth = Math.floor(Math.random() * 5) + 1;

                //Coords for where the circles and lines appear.
                const xcordart = Math.floor(Math.random() * 1281)
                const ycordart = Math.floor(Math.random() * 721)

                //Draws the lines and circles.
                ctx.beginPath();
                ctx.moveTo(640, 360);
                ctx.lineTo(xcordart, ycordart);
                ctx.arc(xcordart, ycordart, 5, 0, 2 * Math.PI);
                ctx.stroke();

                maxpaint++

                //Ends the loop at 200 and sends the final product
                if (maxpaint === 200) {
                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'art.png');
                    message.reply(attachment);
                    message.channel.send(`<@${message.author.id}>`)
                    maxpaint = maxpaint - 200;
                    console.log('Generated Art for ' + message.author.username)
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
