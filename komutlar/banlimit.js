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
const embedd = new discord.MessageEmbed()
.setTitle('Ban Limit Sistemi')
.setURL('https://discord.gg/W2ZjTfQBBG')
.setDescription(`Ban limit sistemi siz limit ayarlarsanız çalışmaya başlar. Eğer bir kişi ayarladığınız limiti geçerse ayarlanan jail rol kişiye verilir.`)
return message.channel.send(embedd)

}
if(args[0] == "ayarla") {
let engin = args[1]
if(!engin) return message.channel.send('Lütfen ban limiti belirtiniz.')
db.set(`banlimit_${message.guild.id}`, Number(engin))
const embedd = new discord.MessageEmbed()
.setTitle('Ban limit ayarlandı')
.setURL('https://discord.gg/W2ZjTfQBBG')
.setDescription(`ban limit başarı ile ${engin} olarak ayarlandı`)
return message.channel.send(embedd)
}
if(args[0] == "sıfırla") {
db.remove(`banlimit_${message.guild.id}`)
const embedd = new discord.MessageEmbed()
.setTitle('Ban limit sıfırlandı')
.setURL('https://discord.gg/W2ZjTfQBBG')
.setDescription('Başarı ile ban limiti sıfırladınız')
return message.channel.send(embedd)
}
}
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: ["banlimit"]
}
exports.help = {
name: "ban-limit"
}