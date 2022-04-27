const {
  MessageEmbed, Message
} = require("discord.js");
const config = require('../config.json')

module.exports = async (discord, client, message) => {
  const prefix = config['main_config'].prefix;
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

  try {
    command.execute(message, args, cmd, client, discord, config);
  } catch (err) {
    const errorE = new MessageEmbed()
      .setAuthor(`${config['main_config'].servername}`, `${message.author.displayAvatarURL()}`)
      .setDescription(`**ERROR ❌ That is not a valid command.**`)
      .setColor(`${config['main_config'].colorhex}`)
      .setFooter(`${config['main_config'].copyright} when you when`)
    message.reply({ embeds: [errorE] })
  }
}