const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'ping',
    description: "This gets the ping of the bot",
    async execute(message, args, cmd, client, discord, config) {
        const pingEmbed = new MessageEmbed()
        .setAuthor(config['main_config'].servername, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`🏓 ${client.ws.ping} ms`)
        .setTimestamp()
        .setFooter(`${config['main_config'].copyright} | Made By Spicey#0001`)
        .setColor(config['main_config'].colorhex)

        message.channel.send({ embeds: [pingEmbed] }).then((message) => {
            setTimeout(() => {
                message.delete().catch(e => {});
            }, 5000)})
        message.delete()
    }
}