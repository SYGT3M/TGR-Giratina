const Discord = require('discord.js');
const client = new Discord.Client();
const Canvas = require('canvas');
client.commands = new Discord.Collection();



module.exports = {
    name: 'high-ground',
    aliases: ['highground', 'hg', 'high-ground'],
    description: 'Manipulates an image to put a user\'s avatar onto Obi Wan Kenobi in the high ground scene.',
    cooldown: 15,
    usage: "** **",
    async execute(message, args) {

        try {

            //checks if user is banned from the bot/command and returns an Error
            if (userban.includes(message.author.id) === true) return message.channel.send(banneduserembed);

            //loads canvas and the background image for it
            const canvas = Canvas.createCanvas(1200, 600);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/805731263931088906/805731361465958401/HighGroundMani.png');
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            //Loads the author's Avatar and adjusts it onto the image.
            const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 530, 55, 175, 175);

            //converts canvas into an image and sends it.
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'high-ground.png');
            message.channel.send(attachment);
        }
        catch (err) {
            console.log(err.message);
        }


    },
};

