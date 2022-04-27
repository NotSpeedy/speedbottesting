const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ticketuserremove',
    description: "open a ticket",
    aliases: ['removeuser', 'ticketremove', 'remove'],
    async execute(message, args, cmd, client, discord, config) {
        const per = config["permissions_config"].ticketmanagers
        if (message.member.roles.cache.some(s => per.includes(s.id))) {
            let pingeduser = (message.mentions.users.first())
            if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You Need To Be In A Ticket Channel To Run This Command.`).then(msg => msg.delete({ timeout: 10000 })).catch();
            message.channel.permissionOverwrites.edit(pingeduser, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false
            });
            const addEmebed = new MessageEmbed()
                .setAuthor(`${pingeduser.username} Has Been Removed From The Ticket`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${pingeduser} Has Been Removed From the ticket`)
                .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
                .setColor(config['main_config'].colorhex)
            message.channel.send({ embeds: [addEmebed] })
        }
    }
}