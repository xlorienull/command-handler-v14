const Discord = require("discord.js");

module.exports = async (client, interaction) => {
    if (interaction.isCommand()) {
        if (!interaction.guildId) return;
        const cmd = client.commands.get(interaction.commandName || null);
            cmd.execute(client, interaction);
    };



};
