const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
//Basic Requirements and such are above.

let db = JSON.parse(fs.readFileSync("commands/maindatabase.json", "utf8")); //Main Database , where most of the userIDs for the developers , admins , and special permissions are.

var banlist = db["bannedchannels-type1"]; //List of channels in which the command is disabled.

let cardinvb = JSON.parse(fs.readFileSync("commands/cardinv.json", "utf8")); //Loads the Card Inventory Database. 
let cardb = JSON.parse(fs.readFileSync("commands/card.json", "utf8")); //Loads the Card Storage Database
//Note , Databases are split to ease load in the program so that a lot of data doesnt have to be brought in at once , and theres barely any cases of data coinciding in both.

var rarityIndex = ["0", "1", "2", "3", "4", "1", "2", "3", "4", "1", "2", "3", "4", "2", "3", "4", "2", "3", "4", "3", "4", "3", "4", "3", "4", "3", "4", "3", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4", "4"]
var rarityKey = ["legArray", "epicArray", "rareArray", "unCArray", "commonArray"]
var rarityColor = ["#ffd700", "#9a00ab", "#005dc8", "#19bb03", "#797979"]
var rarityName = ["Legendary", "Epic", "Rare", "Uncommon", "Common"]
//The Rarity index , so the people can see the chances for rarities , also , easier to have them on hand rather than import from a JSON database.

let errEmb = new Discord.MessageEmbed() //Error Embed Template.
    .setColor("#ff0000")
    .setTitle("Invalid Arguments.")


module.exports = {
    name: 'sell-card',
    aliases: ['add-card', 'addcard', 'sellcard', 'sc', 'ac'],
    description: 'Sells a card to a user , and adds it to their inventory. \`+help card-inv\` on how to see your inventory. Part of the TGR-TCG Group of commands. Only Certain users can sell cards , they are:  <@573959214922334266> ,   <@416051030917251072> ,   <@429897255747715092> ,   <@289119054130839552> ,   <@195358269965860864> ,   <@542727562783096833> ,   <@398921316570234891> ,   <@379215232737738753> ,   <@253640039009878016> ,   <@287264009508618241>',
    usage: "<User>",
    cooldown: 0,
    execute(message, args) {
        if (banlist.includes(message.channel.id)) {
            message.channel.send(errEmb.setTitle("You are not allowed to use this command here.").setDescription("The channel you are trying to use the command in has the command disabled."))
            return;
        }

        if (!db["buyallow"].includes(message.author.id)) {
            message.channel.send(errEmb.setTitle("You are not allowed to use this command.").setDescription("You have been barred from this command."))
            return;
        }
        //checks if the user is allowed to run the command , and if they are allowed to run a command in the particular channel.

        let rarity = rarityKey[rarityIndex[Math.floor(Math.random() * rarityIndex.length)]] //Decides the rarity for the random card.
        let rarArray = cardb[rarity] //Loads an array of cards with the afformentioned rarity.
        let randCardToken = rarArray[Math.floor(Math.random() * rarArray.length)] //Decides the card to be added/sold to the user.
        if (!message.mentions.users.first()) return; //checks if the person recieving card is a valid user.
        let userID = message.mentions.users.first().id; //The id of the user who is getting the card/is the customer.



        if (!cardinvb.user[userID]) cardinvb.user[userID] = { //checks if the user already has an inventory database , and if they do not , creates one for them.
            inventory: [],
            inventoryName: []
        }


        cardinvb.user[userID].inventory.push(randCardToken); //adds the card to their inventory , more specifically the token of the card
        cardinvb.user[userID].inventoryName.push(cardb.card[randCardToken].cardname); //adds the card to their inventory , more specifically the name of the card


        console.log(randCardToken + "(" + cardb.card[randCardToken].cardname + ") was given to " + message.mentions.users.first().tag + " by " + message.author.tag) //Logs the details of the transfer for record purposes.

        let endEmbed = new Discord.MessageEmbed()
            .setColor(rarityColor[cardb.card[randCardToken].rarityIndexNo]) //Sets the color to the name color of the user.
            .setTitle("Card Added!") //literally the title lmfao
            .setDescription("Congratulations , you just won " + cardb.card[randCardToken].cardname + "\'s Card!") //Here just because i wanted to fill the description box up.
            .addField("Name", cardb.card[randCardToken].cardname, true) //The Name of the Cord
            .addField("Rarity", rarityName[cardb.card[randCardToken].rarityIndexNo], true) //rarity of the card
            .addField("\u200b", "\u200b") //Empty field for a e s t h e t i c
            .addField("Token", randCardToken, true) //card Token
            .addField("Class:", cardb.card[randCardToken].cardClass, true) //The Class of the card.
            .setImage(cardb.card[randCardToken].cardimage) //Loads the card itself from the database.
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true })) // Sets the topmost BMP to the author.
            .setTimestamp() //pretty self explanatory
            .setFooter('The Galactic Republic', 'https://cdn.discordapp.com/attachments/698076494131625995/731641899349180426/Logo45fps.gif', 'https://discord.gg/thegalacticrepublic') //Just to show that TGR Made this or smth iunno

        message.channel.send(endEmbed)


        fs.writeFile("commands/cardinv.json", JSON.stringify(cardinvb), (x) => { //edits the database with the new card added to the inventory.
            if (x) console.error(x)
        });


    }
}
