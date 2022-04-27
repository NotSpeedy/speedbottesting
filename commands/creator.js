const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'creator',
    description: "Creator Command",
    async execute(message, args, cmd, client, discord, config) {
        const creatorEmbed = new MessageEmbed()
        .setColor(config['main_config'].colorhex)
        .setAuthor(config['main_config'].servername, message.author.displayAvatarURL({ dynamic: true}))
        .setFooter(`${config['main_config'].copyright} | thanks`)

        message.channel.send({ embeds: [creatorEmbed] }).then((message) => {
            setTimeout(() => {
                message.delete().catch(e => {});
            }, 5000)})
        message.delete()
    }
}