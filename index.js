const fs = require("fs");
const Path = require("path");
const Discord = require("discord.js");

const client = global.client = new Discord.Client({
    intents: 0,
    allowedMentions: {
        parse: ["users"]
    }
});
client.commands = global.commands = new Discord.Collection();
const synchronizeSlashCommands = require('discord-sync-commands-v14');

const eventsRegister = () => {
    let eventsDir = Path.resolve(__dirname, './events');
    if (!fs.existsSync(eventsDir)) return console.log("No events dir");
    fs.readdirSync(eventsDir, { encoding: "utf-8" }).filter((cmd) => cmd.split(".").pop() === "js").forEach((event) => {
        let prop = require(`./events/${event}`);
        if (!prop) return console.log("No props.");
        console.log(`${event} was saved.`);
        client.on(event.split('.')[0], prop.bind(null, client));
        delete require.cache[require.resolve(`./events/${event}`)];
    });
};

const commandsRegister = () => {
    let commandsDir = Path.resolve(__dirname, './commands');
    if (!fs.existsSync(commandsDir)) return console.log("No events dir.");
    fs.readdirSync(commandsDir, { encoding: "utf-8" }).filter((cmd) => cmd.split(".").pop() === "js").forEach((command) => {
        let prop = require(`./commands/${command}`);
        if (!prop) return console.log("No props.");
        console.log(`${command} command saved`);
        client.commands.set(prop.options.name, prop);
        delete require.cache[require.resolve(`./commands/${command}`)];
    });
};



const slashCommandsRegister = () => {
    const commands = client.commands.filter((c) => c.options);
    const fetchOptions = { debug: true };
    synchronizeSlashCommands(client, commands.map((c) => c.options), fetchOptions);
};

eventsRegister();
commandsRegister();
slashCommandsRegister();





client.login('a')

process.on('unhandledRejection', error => {
    console.log(error);
});
