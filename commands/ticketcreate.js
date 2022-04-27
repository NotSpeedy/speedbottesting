const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require("discord.js");


module.exports = {
    name: 'ticket',
    description: "open a ticket",
    async execute(message, args, cmd, client, discord, config) {
        const per = config["permissions_config"].ticketmanagers
        if (message.member.roles.cache.some(s => per.includes(s.id))) {

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('ticketcreate')
                        .setEmoji('🎫')
                        .setLabel('Create A Ticket')
                        .setStyle('SECONDARY')
                )
            const ticketchannel = client.channels.cache.get(config['ticket_config'].ticketchannel)
            const ticketEmbed = new MessageEmbed()
                .setAuthor(config['main_config'].servername, config.ticket_config.ticketimage)
                .setDescription(args.join(" "))
                .setColor(config['main_config'].colorhex)
                .setThumbnail(config['ticket_config'].ticketimage)

            ticketchannel.send({ embeds: [ticketEmbed], components: [row] });
        }
    },
}