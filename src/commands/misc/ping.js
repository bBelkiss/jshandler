module.exports = {
    name: 'ping',
    description: 'Says pong',
    //devOnly: boolean,
    //testOnly: Boolean,
    //options: Object[]
    //deleted: true,

    callback: (client, interaction) => {
        interaction.reply('Pong!!');
    },
};