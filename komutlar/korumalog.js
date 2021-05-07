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
    .setTitle('Koruma log nedir?')
    .setURL('https://discord.gg/W2ZjTfQBBG')
    .setDescription(`Koruma log eğer sistemlerden birini aktif ettiyseniz ve koruma logu ayarladıysanız üyenin yaptığı hareketleri koruma log olarak ayarladığınız kanaldan takip edebilirsiniz.`)
return message.channel.send(engin)
}
if(args[0] == "ayarla") {
let kontrol = db.fetch(`korumalog_${message.guild.id}`)
const embedd = new discord.MessageEmbed()
.setTitle('HATA')
.setURL('https://discord.gg/W2ZjTfQBBG')
.setDescription('Sistem zaten ayarlı!')
if(kontrol) return message.channel.send(embedd)
if(!kontrol) {
    let engin = message.mentions.channels.first()
    if(!engin) return message.channel.send('Lütfen koruma log kanalını etiketleyin')
db.set(`korumalog_${message.guild.id}`, engin.id)
const embeddd = new discord.MessageEmbed()
.setTitle('Başarılı işlem')
.setURL('https://discord.gg/W2ZjTfQBBG')
.setDescription('Koruma log ayarlandı')
return message.channel.send(embeddd)
}
}
if(args[0] == "sıfırla") {
    let kontrol = db.fetch(`korumalog_${message.guild.id}`)
    const embedd = new discord.MessageEmbed()
    .setTitle('HATA')
    .setURL('https://discord.gg/W2ZjTfQBBG')
    .setDescription('Sistem ayarlı değil!')
    if(!kontrol) return message.channel.send(embedd)
    if(kontrol) {
    db.remove(`korumalog_${message.guild.id}`)
    const embeddd = new discord.MessageEmbed()
    .setTitle('Başarılı işlem')
    .setURL('https://discord.gg/W2ZjTfQBBG')
    .setDescription('Koruma log sıfırlandı')
    return message.channel.send(embeddd)
    }
}
}
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: ["korumalog"]
}
exports.help = {
name: "koruma-log"
}