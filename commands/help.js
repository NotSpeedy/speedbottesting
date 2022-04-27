const { MessageEmbed, MessageActionRow, MessageButton, Message } = require('discord.js')


module.exports = {
    name: 'help',
    description: "Help Command",
    async execute(message, args, cmd, client, discord, config) {

        const page = new MessageEmbed()
        .setDescription(`**Bot Name:** ${client.user.tag}
        **Bot Prefix:** ${config['main_config'].prefix}
        **Commands:** 6`)
        .setColor(config['main_config'].colorhex)
        .setThumbnail(message.author.displayAvatarURL())

        const page5 = new MessageEmbed()
        .setTitle('Ticket Commands')
        .setDescription('`add` adds specefied user to ticket ex. add <userID> \n `remove` removes specified user from ticket ex. remove <userID or user@> \n All Of The rest of the ticket commands are done through buttons.')
        .setColor(config['main_config'].colorhex)
        
        const row1 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Home Page')
            .setCustomId('home')
            .setEmoji('🏠')
            .setStyle('PRIMARY'),

            new MessageButton()
            .setLabel('Ticket Commands')
            .setCustomId('ticket')
            .setEmoji('🎫')
            .setStyle('PRIMARY'),
        )
        const filter = ( interaction ) => interaction.member.id === message.author.id
        const collector = message.channel.createMessageComponentCollector(filter, { time : 120000})
        const MESSAGE = await message.channel.send({ embeds: [page], components: [row1] });

        collector.on('collect', async (interaction) => {
            if(interaction.customId == 'home') {
                await interaction.deferUpdate();
                MESSAGE.edit({ embeds: [page], components: [row1] });
            }
            if(interaction.customId == 'ticket') {
                await interaction.deferUpdate();
                MESSAGE.edit({ embeds: [page5], components: [row1] });
            }
        })

        collector.on('end', (i) => {
            MESSAGE.edit(`Ths Menu has expired please retype ${config['main_config'].prefix}help to access it again`)
        message.delete();
        })

        message.delete();
    }
}