//Code to connect to a host

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Shawtys like a melody in my head that i cant keep out got me singing like nananana everyday like my ipod stuck on replay'));

app.listen(port, () => console.log(`Giratina listening at http://localhost:${port}`));

// ================= Initialization Code ===================
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require("fs");
const Canvas = require('canvas');
client.commands = new Discord.Collection();
const { prefix, token } = require('./config.json');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const mySecret = process.env['token']



for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

let db = JSON.parse(fs.readFileSync("./commands/maindatabase.json", "utf8"));
const cooldowns = new Discord.Collection();


//=====================Startup Code Poggers=================
client.on('ready', () => {                
  client.user.setStatus('idle');         client.user.setActivity({name:'CIS best faction ngl',    type: 'PLAYING',
  })      

    console.log(client.user)  //sets status
    console.log("Giratina is fully operational."); //only when this message shows is the Giratina ready for action
});

//==================Bot Code Starts Here====================

var userban = db["bannedpeople"];
var developer = db["developer"];
const errorembd = new Discord.MessageEmbed()
  .setColor('ff0000')
  .setTitle("Error Occured")
  .setDescription('`An error occured while trying to run the command`')

const permembed = new Discord.MessageEmbed()
  .setColor('ff0000')
  .setTitle('Error Occured')
  .setDescription('`You do not have the necessary Permissions for this command.`')
  
const dmembed = new Discord.MessageEmbed()
  .setColor('ff0000')
  .setTitle('Error Occured')
  .setDescription('`This command cannot be ran in DMs`')


  

client.on('message', message => {


	
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.channel.send(dmembed)
      .then(message => {
    message.delete({ timeout: 10000 });
     });
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply(permembed)
           .then(message => {
    message.delete({ timeout: 10000 });
     });  
		}
	}

	if (command.args && !args.length) {
		const argsembed = new Discord.MessageEmbed()
  .setColor('ff0000')
  .setTitle('Error Occured')
  .setDescription('`Too less Arguments detected.`'`\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``)

		return message.channel.reply(argsembed)
         .then(message => {
    message.delete({ timeout: 10000 });
     });
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id) && !developer.includes(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;

    const coolembed = new Discord.MessageEmbed()
     .setColor('ff0000')
      .setTitle('Error Occured')
      .setDescription( `\nPlease wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)

			//return message.reply(coolembed);
      return console.log(message.author.username + " got swagged on lmaoooo")
		}
	}
if(!developer.includes(message.author.id)) {
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
}
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
    //message.channel.send(error);
    //message.channel.send('<@542727562783096833>');
		message.reply(errorembd)
     .then(message => {
    message.delete({ timeout: 10000 });
     });
  }
});
















































client.login(mySecret);
