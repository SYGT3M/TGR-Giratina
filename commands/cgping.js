const Discord = require('discord.js');
const client = new Discord.Client();


let channelembed = new Discord.MessageEmbed() //Error Embed Template
    .setColor('#ff0000')
    .setTitle('Error Occurred')


module.exports = {
    name: 'cg-ping',
    aliases: ['jm', 'cg-jm-ping', 'robbed', 'authorities', 'rob-report', 'ap', 'cg', 'ahhh-fuck-im-getting-robbed-help-ahhhh-cg-and-jm-please-save-me-theyre-going-to-take-all-my-moneyyyy'],
    cooldown: 21600,
    description: 'Pings <@&699419353065586691> , <@&850126010962804746> and <@&706640892785852427> . Shitposting using this command will get you kicked off giratina for an entire week as well as get you arrested.',
    usage: '** **',
    execute(message, args) {

        if (!message.channel.id === "716788313519816744") {
            message.channel.send(channelembed.setDescription('This command can only be ran in <#716788313519816744>'))
            return;
        }
        if (db["bannedpeople"].includes(message.author.id)) {
            message.channel.send(channelembed.setDescription('You are not allowed to use this command.'))
            return;
        }//The two statements above check if a user is banned from the command/bot and if the channel they are running the command in is #bot-spam

        message.channel.send(message.author.tag + " Needs Help. <@&849336483068641321>, Build the Rescue Helicopter! \n https://tenor.com/view/coruscant-guard-commander-fox-gif-21206353") //Sends the Message and the ping

    }
}
