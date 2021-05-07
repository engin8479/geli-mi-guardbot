const discord = require('discord.js');
const { Database } = require('nukleon');
const db = new Database("plasmic.json");
exports.run = async(client, message, args) => {
    if(message.author.id !== message.guild.owner.id && message.author.id !== db.fetch(`admin_${message.guild.id}.${message.author.id}`)) return message.channel.send('Bu komutunu sadece whitelist de sunucu sahibi olarak ayarlanmış kişi ve ya admin kullanabilir')
    const embed = new discord.MessageEmbed()
    .setTitle('Lütfen bir seçenek belirtiniz')
    .setURL('https://discord.gg/W2ZjTfQBBG')
    .setDescription("`ayarla` `sıfırla` `bilgi`")
    .setFooter(message.author.username)
    .setTimestamp()
if(!args[0]) return message.channel.send(embed)
if(args[0] == "bilgi") {
    const engin = new discord.MessageEmbed()
    .setTitle('Jail rol nedir?')
    .setURL('https://discord.gg/W2ZjTfQBBG')
    .setDescription(`Jail rol sistemlerimizde ayarladığınız şeylerde tehlikeli bir durum algılanırsa o kişiye verilecek roldür.`)
return message.channel.send(engin)
}
if(args[0] == "ayarla") {
let kontrol = db.fetch(`jailrol_${message.guild.id}`)
const embedd = new discord.MessageEmbed()
.setTitle('HATA')
.setURL('https://discord.gg/W2ZjTfQBBG')
.setDescription('Sistem zaten ayarlı!')
if(kontrol) return message.channel.send(embedd)
if(!kontrol) {
    let engin = message.mentions.roles.first()
    if(!engin) return message.channel.send('Lütfen jail rolünü etiketleyin')
db.set(`jailrol_${message.guild.id}`, engin.id)
const embeddd = new discord.MessageEmbed()
.setTitle('Başarılı işlem')
.setURL('https://discord.gg/W2ZjTfQBBG')
.setDescription('Jail rol ayarlandı')
return message.channel.send(embeddd)
}
}
if(args[0] == "sıfırla") {
    let kontrol = db.fetch(`jailrol_${message.guild.id}`)
    const embedd = new discord.MessageEmbed()
    .setTitle('HATA')
    .setURL('https://discord.gg/W2ZjTfQBBG')
    .setDescription('Sistem ayarlı değil!')
    if(!kontrol) return message.channel.send(embedd)
    if(kontrol) {
    db.remove(`jailrol_${message.guild.id}`)
    const embeddd = new discord.MessageEmbed()
    .setTitle('Başarılı işlem')
    .setURL('https://discord.gg/W2ZjTfQBBG')
    .setDescription('Jail rol sıfırlandı')
    return message.channel.send(embeddd)
    }
}
}
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: ["jailrol"]
}
exports.help = {
name: "jail-rol"
}