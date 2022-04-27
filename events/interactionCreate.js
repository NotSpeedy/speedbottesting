const { MessageButton, MessageActionRow, Message, MessageEmbed } = require('discord.js')
const { lchmod } = require('fs')
const config = require('../config.json')
module.exports = async (discord, client, interaction) => {

    if (interaction.customId === 'ticketcreate') {
        const channel = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
            type: 'text',
            parent: config['ticket_config'].ticketcategory,
            permissionOverwrites: [
                {
                    id: interaction.member.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                },
                {
                    id: interaction.guild.id,
                    deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                },
                {
                    id: interaction.guild.roles.cache.get(config['permissions_config'].ticketmanagers),
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                }
            ]
        });
        channel.setTopic(`Support Ticket for ${interaction.user.username}`)
        interaction.reply({ content: `Ticket Created in <#${channel.id}>`, ephemeral: true })

        const row1 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ticketdelete')
                    .setLabel('Ticket Delete')
                    .setStyle('DANGER')
                    .setEmoji('⚠'),

                new MessageButton()
                    .setCustomId('ticketclaim')
                    .setLabel('Ticket Claim')
                    .setStyle('PRIMARY')
                    .setEmoji('🛄'),

            )

        const row2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ticketarchive')
                    .setLabel('Ticket Archive')
                    .setStyle('SECONDARY')
                    .setEmoji('📃'),

                new MessageButton()
                    .setCustomId('ticketintro')
                    .setLabel('Ticket Intro')
                    .setStyle('SUCCESS')
                    .setEmoji('👋'),
            )


        const deleteEmbed = new discord.MessageEmbed()
            .setAuthor(config['main_config'].servername, config['ticket_config'].ticketimage)
            .setColor(config['main_config'].colorhex)
            .setThumbnail(config['ticket_config'].ticketimage)
            .setDescription(`${config['ticket_config'].newticketmessage}`)

        channel.send({ embeds: [deleteEmbed], components: [row1, row2] });
    }

    if (interaction.customId === 'ticketdelete') {
        if(!interaction.member.roles.cache.find(r => r.id === config['permissions_config'].ticketmanagers)) return interaction.reply('You Do Not Have Permission To Delete This Ticket')
        const delEmbed = new MessageEmbed()
            .setDescription(`<@${interaction.user.id}> This Ticket Will Be Deleted In 5 Seconds`)
            .setColor(config['main_config'].colorhex)
            .setFooter(`${config['main_config'].copyright} I uhhh`)
        interaction.reply({ embeds: [delEmbed] })
        setTimeout(() => interaction.channel.delete(), 5000);
    }

    if (interaction.customId === 'ticketclaim') {
        if(!interaction.member.roles.cache.find(r => r.id === config['permissions_config'].ticketmanagers)) return interaction.reply('You Do Not Have Permission To Claim This Ticket')
        const claimD = new discord.MessageEmbed()
            .setTitle(config['main_config'].servername)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`<@${interaction.member.id}> Has Claimed The Ticket`)
            .setTimestamp()
            .setFooter(`${config['main_config'].copyright} End my suffering`)
            .setColor(config['main_config'].colorhex)
        interaction.channel.setTopic(`Ticket Claimed By ${interaction.user.tag}`)
        interaction.reply({ embeds: [claimD] })
    }



    if (interaction.customId === 'ticketintro') {
        if(!interaction.member.roles.cache.find(r => r.id === config['permissions_config'].ticketmanagers)) return interaction.reply('You Do Not Have Permission To Use this')
        const introC = new discord.MessageEmbed()
            .setTitle(config['main_config'].servername)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hello my name is <@${interaction.member.id}> and I am with ${config['main_config'].servername}'s Staff Team, I will be Taking care of your ticket for today.`)
            .setTimestamp()
            .setFooter(`${config['main_config'].copyright} forgor`)
            .setColor(config['main_config'].colorhex)
        interaction.reply({ embeds: [introC] })
    }

    if (interaction.customId === 'ticketarchive') {
        if(!interaction.member.roles.cache.find(r => r.id === config['permissions_config'].ticketmanagers)) return interaction.reply('You Do Not Have Permission To Archive This Ticket')
        interaction.reply('This Ticket Will Now Be Archived In Your Ticket Archive Category', true)
        const archive = client.channels.cache.get(config['ticket_config'].ticketarchivecategory)
        interaction.channel.setParent(archive, {
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                },
                {
                    id: interaction.guild.roles.cache.get(config['permissions_config'].ticketmanagers),
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                }
            ]
        });

    }
}