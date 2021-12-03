const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8"));

var girdev = db["giratinafull"];
module.exports = {
  name: 'forceshutdown',
  aliases: ['forceshut-down', 'force-shutdown' ,'force-shut-down' ,'fsd','shutdown' , 'end'],
  description: 'Command is exclusive to people with full access to Giratina. Only to be used in emergencies.',
  usage: '** **',
  cooldown: 1,
  execute(message , args) {

  if(!girdev.includes(message.author.id) === true) return;
    message.channel.send(" <a:typing:798746740118388777> My battery is low and it's getting dark.");
    message.channel.send(" <:Giratina:814424013106708491> Shutdown Succesful");
    setTimeout(function(){
      process.exit();  
    }, 2000);
    
  },
}
