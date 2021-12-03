const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
let sb = JSON.parse(fs.readFileSync("commands/shipinfoBase.json", "utf8"));

let permserrembed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle("An Error Occured.")

module.exports = {
    name: 'ship-info',
    aliases: ['shipinfo', 'ship'],
    description: 'A command for giving information about a ship\'s Description , Armaments , Complement , Length , Cost and Design. List of ships:\n\`venator,tc-venator,acclamator-i,acclamator-ii,victory-i,legacy,arquintens,mandator-i,mandator-ii,valor,hammerhead,thranta,recusant,munificent,providence,lucrehulk,subjugator,kanjiklub,raxus,alorir,shadow-i,resurrect,ban\'ro\`',
    cooldown: 5,
    usage: "<shipName>",
    execute(message, args) {

        let shipArg = args[0].toLowerCase() //The ship the user wants to see the information for.

        if (sb.ships[shipArg]) { //Checks if the ship exists , and gives an error if it doesnt.

            let shipObj = sb.ships[shipArg] //Imports the object of the ship into a local variable.

            const shipEmbed = new Discord.MessageEmbed() //Makes the embed with the required information.
                .setColor(message.member.displayHexColor)
                .setTitle(shipObj.shipName)
                .setDescription(shipObj.shipDesc)
                .setImage(shipObj.shipImage)
                .addField("Armament", shipObj.shipArma)
                .addField("Complement", shipObj.shipComp)
                .addField("Length", shipObj.shipLength)
                .addField("Shipyard Cost", shipObj.shipCost)

            message.channel.send(shipEmbed) //Sends the embed

        } else {
            message.channel.send(permserrembed.setDescription("This Ship does not exist in the archives.")) //Error message for ship not
            return;
        }

    }
}