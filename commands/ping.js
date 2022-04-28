const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Bot'un gecikmesini gösterir.");
module.exports.execute = async (client, interaction) => {

    return interaction.reply({ content: `${Math.floor(client.ws.ping)}`, ephemeral: true });


};
module.exports.options = {
    ...data.toJSON()
};


module.exports.config = {
    enabled: true,
};
