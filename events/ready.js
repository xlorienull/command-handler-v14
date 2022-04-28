module.exports = async (client) => {
    await client.user.setPresence({ activities: [{ name: client.user.username + ' heya!', type: 1 }], status: 'dnd', afk: false });

};
