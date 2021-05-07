const discord = require('discord.js');
const { Database } = require('nukleon');
const db = new Database("plasmic.json");
exports.run = async(client, message, args) => {
    if(message.author.id !== message.guild.owner.id && message.author.id !== db.fetch(`admin_${message.guild.id}.${message.author.id}`)) return message.channel.send('Bu komutunu sadece whitelist de sunucu sahibi olarak ayarlanmış kişi ve ya admin kullanabilir')
    const embed = new discord.MessageEmbed()
    .setTitle('Lütfen bir seçenek belirtiniz')
    .setURL('https://discord.gg/W2ZjTfQBBG')
    .setDescription("`aç` `kapat` `bilgi`")
    .setFooter(message.author.username)
    .setTimestamp()
if(!args[0]) return message.channel.send(embed)
if(args[0] == "bilgi") {
    const engin = new discord.MessageEmbed()
    .setTitle('Yönetici koruma sistemi nedir?')
    .setURL('https://discord.gg/W2ZjTfQBBG')
    .setDescription(`Yönetici koruma sistemi bir kişiye yönetici izinli rolün verilmesini engellemektedir. Eğer bir kişi yönetici izinli rolü birine verirse ve kişi beyazlistede değilse bot tarafından jaillenir`)
return message.channel.send(engin)
}
if(args[0] == "aç") {
let kontrol = db.fetch(`yöneticikoruma_${message.guild.id}`)
const embedd = new discord.MessageEmbed()
.setTitle('HATA')
.setURL('https://discord.gg/W2ZjTfQBBG')
.setDescription('Sistem zaten açık!')
if(kontrol) return message.channel.send(embedd)
if(!kontrol) {
db.set(`yöneticikoruma_${message.guild.id}`, message.author.id)
const embeddd = new discord.MessageEmbed()
.setTitle('Başarılı işlem')
.setURL('https://discord.gg/W2ZjTfQBBG')
.setDescription('Yönetici koruma sistemi başarı ile açıldı')
return message.channel.send(embeddd)
}
}
if(args[0] == "kapat") {
let kontrol = db.fetch(`yöneticikoruma_${message.guild.id}`)
const embedd = new discord.MessageEmbed()
.setTitle('HATA')
.setURL('https://discord.gg/W2ZjTfQBBG')
.setDescription(`Sistem kapalı zaten!`)
if(!kontrol) return message.channel.send(embedd)
db.remove(`yöneticikoruma_${message.guild.id}`)
return message.channel.send('Sistem sıfırlandı!')
}
}
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: ["yöneticikoruma"]
}
exports.help = {
name: "yönetici-koruma"
}