const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const { Client, Util } = require("discord.js");
require("./util/eventLoader.js")(client);
const fs = require("fs");
const logs = require('discord-logs');
logs(client);
const { Database } = require('nukleon');
const db = new Database("plasmic.json");
const ms = require("ms")
var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 7;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);
client.on("guildMemberAdd", member => {
  const Database = require("plasma-db");
  const db = new Database("./anti-raid.json");
  if (member.user.bot !== true) {

  } else {

    let engin = db.fetch(`botkorumalog_${member.guild.id}`)
    if(!engin) return;
    let izinli = db.fetch(`girişizni_${member.guild.id}.${member.id}`)
  if (izinli === `${member.id}`) {
    const embed = new Discord.MessageEmbed()
    .setTitle('Bir bot sunucuya girdi!')
    .setDescription(`<@${member.id}> adlı bot sunucuya girdi ve giriş izni olduğu için girmesine izin verdim!`)
    .setColor('RANDOM')
    client.channels.cache.get(engin).send(embed)
    return;
  }
  member.ban(member);
  const embed = new Discord.MessageEmbed()
  .setTitle('Sunucuya bir bot girmeye çalıştı!')
  .setDescription(`<@${member.id}> Adlı bot sunucuya girmeye çalıştı ama ben anti raid sistemi açık olduğundan engelledim! \n \n Bota giriş izni vermek için: !botkoruma izin-ver ${member.id}`)
.setColor('RANDOM')
  client.channels.cache.get(engin).send(embed)
};

});

client.on("channelDelete", async function(channel) {
  const bt = require('best-tools')
  let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first())
  let user = client.users.cache.get(entry.executor.id)
  let engin = db.fetch(`kanalsilmelimit_${channel.guild.id}`)
  if(!engin) return
  if(engin) {
  
  db.add(`kanalsilmelimitkişi_${channel.guild.id}.${user.id}`, 1)
 let enginar = db.fetch(`kanalsilmelimitkişi_${channel.guild.id}.${user.id}`)
 if(enginar == enginar) {var enginn = enginar}
 if(enginar == undefined) {var enginn = "0"}
 //
 if(enginn == enginn) {var enginnn = bt.hesapla(enginn + 1)}
 if(enginar == undefined) {var enginn = "1"}
 let log = db.fetch(`korumalog_${channel.guild.id}`)
 if(!log) return
 if(enginn == engin) {
  let enginarr = db.fetch(`jailrol_${channel.guild.id}`)
  if(!enginarr) return
  channel.guild.members.cache.get(user.id).roles.add(enginarr)
  const embed = new Discord.MessageEmbed()
  .setTitle('Bir kişi sınıra ulaştı!')
  .setURL('https://discord.gg/W2ZjTfQBBG')
  .setDescription(`<@${user.id}> adlı kişi bir kanal sildi! \n \n Silinen kanal: ${channel.name} \n \n Kanal koruma limit: ${engin} \n \n Kişinin ulaştığı limit: ${enginn} \n \n Lİmite ulaştığı için jaillendi!`)
  client.channels.cache.get(log).send(embed)
 }
 const embed = new Discord.MessageEmbed()
 .setTitle('Bir kanal silindi!')
 .setURL('https://discord.gg/W2ZjTfQBBG')
 .setDescription(`<@${user.id}> adlı kişi bir kanal sildi! \n \n Silinen kanal: ${channel.name} \n \n Kanal koruma limit: ${engin} \n \n Kişinin ulaştığı limit: ${enginn}`)
 client.channels.cache.get(log).send(embed)
  }
})
client.on("roleDelete", async function(role) {
  const bt = require('best-tools')
  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first())
  let user = client.users.cache.get(entry.executor.id)
  let engin = db.fetch(`rolsilmelimit_${role.guild.id}`)
  if(!engin) return
  if(engin) {
  
  db.add(`rolsilmelimitkişi_${role.guild.id}.${user.id}`, 1)
 let enginar = db.fetch(`rolsilmelimitkişi_${role.guild.id}.${user.id}`)
 if(enginar == enginar) {var enginn = enginar}
 if(enginar == undefined) {var enginn = "0"}
 //
 if(enginn == enginn) {var enginnn = bt.hesapla(enginn + 1)}
 if(enginar == undefined) {var enginn = "1"}
 let log = db.fetch(`korumalog_${role.guild.id}`)
 if(!log) return
 if(enginn == engin) {
  let enginarr = db.fetch(`jailrol_${role.guild.id}`)
  if(!enginarr) return
  role.guild.members.cache.get(user.id).roles.add(enginarr)
  const embed = new Discord.MessageEmbed()
  .setTitle('Bir kişi sınıra ulaştı!')
  .setURL('https://discord.gg/W2ZjTfQBBG')
  .setDescription(`<@${user.id}> adlı kişi bir rol sildi! \n \n Silinen rol: ${role.name} \n \n Rol koruma limit: ${engin} \n \n Kişinin ulaştığı limit: ${enginn} \n \n Lİmite ulaştığı için jaillendi!`)
  client.channels.cache.get(log).send(embed)
 }
 const embed = new Discord.MessageEmbed()
 .setTitle('Bir rol silindi!')
 .setURL('https://discord.gg/W2ZjTfQBBG')
 .setDescription(`<@${user.id}> adlı kişi bir rol sildi! \n \n Silinen rol: ${role.name} \n \n Rol koruma limit: ${engin} \n \n Kişinin ulaştığı limit: ${enginn}`)
 client.channels.cache.get(log).send(embed)
  }
})
client.on('guildBanAdd', async (guild, user) => {
  const bt = require('best-tools')
  const fetchedLogs = await guild.fetchAuditLogs({
      limit: 1,
      type: 'MEMBER_BAN_ADD',
  });
  const banLog = fetchedLogs.entries.first();
  if (!banLog) return console.log(`error`);
  const { executor, target } = banLog;
  let engin = db.fetch(`banlimit_${guild.id}`)
  if(!engin) return
  if(engin) {
db.add(`banlimitkişi_${guild.id}.${executor.id}`, 1)
let enginar = db.fetch(`banlimitkişi_${guild.id}.${executor.id}`)
if(enginar == enginar) {var enginn = enginar}
if(enginar == undefined) {var enginn = "0"}
//
if(enginn == enginn) {var enginnn = bt.hesapla(enginn + 1)}
if(enginar == undefined) {var enginn = "1"}
let log = db.fetch(`korumalog_${guild.id}`)
if(!log) return
if(enginn == engin) {
let enginarr = db.fetch(`jailrol_${guild.id}`)
if(!enginarr) return
guild.members.cache.get(executor.id).roles.add(enginarr)
const embed = new Discord.MessageEmbed()
.setTitle('Bir kişi sınıra ulaştı!')
.setURL('https://discord.gg/W2ZjTfQBBG')
.setDescription(`<@${executor.id}> adlı kişi bir ban attı! \n \n Ban limit: ${engin} \n \n Kişinin ulaştığı limit: ${enginn} \n \n Lİmite ulaştığı için jaillendi!`)
client.channels.cache.get(log).send(embed)
}
const embed = new Discord.MessageEmbed()
.setTitle('Bir ban atıldı!')
.setURL('https://discord.gg/W2ZjTfQBBG')
.setDescription(`<@${executor.id}> adlı kişi bir ban attı! \n \n Ban limit: ${engin} \n \n Kişinin ulaştığı limit: ${enginn}`)
client.channels.cache.get(log).send(embed)
  }
})
client.on('guildMemberRemove', async member => {
  const fetchedLogs = await member.guild.fetchAuditLogs({
      limit: 1,
      type: 'MEMBER_KICK',
  });
  const kickLog = fetchedLogs.entries.first();
  if (!kickLog) return console.log(`error`);
  const { executor, target } = kickLog;
  const bt = require('best-tools')
  let engin = db.fetch(`kicklimit_${member.guild.id}`)
  if(!engin) return
  if(engin) {
db.add(`kicklimitkişi_${member.guild.id}.${executor.id}`, 1)
let enginar = db.fetch(`kicklimitkişi_${member.guild.id}.${executor.id}`)
if(enginar == enginar) {var enginn = enginar}
if(enginar == undefined) {var enginn = "0"}
//
if(enginn == enginn) {var enginnn = bt.hesapla(enginn - 1)}
if(enginn == undefined) {var enginnn = "1"}
let log = db.fetch(`korumalog_${member.guild.id}`)
if(!log) return
if(enginnn == engin) {
let enginarr = db.fetch(`jailrol_${member.guild.id}`)
if(!enginarr) return
member.guild.members.cache.get(executor.id).roles.add(enginarr)
const embed = new Discord.MessageEmbed()
.setTitle('Bir kişi sınıra ulaştı!')
.setURL('https://discord.gg/W2ZjTfQBBG')
.setDescription(`<@${executor.id}> adlı kişi bir kick attı! \n \n Kick limit: ${engin} \n \n Kişinin ulaştığı limit: ${enginnn} \n \n Lİmite ulaştığı için jaillendi!`)
client.channels.cache.get(log).send(embed)
}
const embed = new Discord.MessageEmbed()
.setTitle('Bir kick atıldı!')
.setURL('https://discord.gg/W2ZjTfQBBG')
.setDescription(`<@${executor.id}> adlı kişi bir kick attı! \n \n Kick limit: ${engin} \n \n Kişinin ulaştığı limit: ${enginnn}`)
client.channels.cache.get(log).send(embed)
  }
})