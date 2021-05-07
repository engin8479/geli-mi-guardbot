const discord = require('discord.js');
const { Database } = require('nukleon');
const db = new Database("plasmic.json");
exports.run = async(client, message, args) => {
    if(message.author.id !== message.guild.owner.id && message.author.id !== db.fetch(`admin_${message.guild.id}.${message.author.id}`)) return message.channel.send('Sen sunucu sahibi ve ya perm 2 (Admin değilsin)')
let engin = message.mentions.users.first()
if(!engin) return message.channel.send('Lütfen bir kullanıcı etiketleyiniz.')
if(!args[1]) return message.channel.send('Lütfen bir seçenek belirtiniz (ekle/çıkar)')
if(args[1] == "ekle") {
let exay = args[2]
if(!exay) return message.channel.send('Lütfen perm seviyesini belirleyiniz! \n \n 1) Mod \n 2) Admin \n 3) Sunucu sahibi \n Sayı olarak yazınız.')
if(exay == "1") {
    const embed = new discord.MessageEmbed()
    .setTitle('HATA')
    .setURL('https://discord.gg/W2ZjTfQBBG')
    .setDescription('Kendiniz mod yapamazsınız!')
if(message.author.id == engin.id) return message.channel.send(embed)
db.set(`mod_${message.guild.id}.${engin.id}`, engin.id)
if(engin.id == db.fetch(`admin_${message.guild.id}.${engin.id}`)) {
}
const embedd = new discord.MessageEmbed()
.setTitle('Başarılı işlem')
.setURL('https://discord.gg/W2ZjTfQBBG')
.setDescription(`<@${engin.id}> adlı kişi artık mod!`)
return message.channel.send(embedd)
}
    if(exay == "2") {
            if(message.author.id == db.fetch(`admin_${message.guild.id}.${message.author.id}`)) return message.channel.send('Admin olan biri başkasını admin yapamaz!')
            const embed = new discord.MessageEmbed()
            .setTitle('HATA')
            .setURL('https://discord.gg/W2ZjTfQBBG')
            .setDescription('Kendinizi admin yapamazsınız!')
        if(message.author.id == engin.id) return message.channel.send(embed)
        db.set(`admin_${message.guild.id}.${engin.id}`, engin.id)
        const embedd = new discord.MessageEmbed()
        .setTitle('Başarılı işlem')
        .setURL('https://discord.gg/W2ZjTfQBBG')
        .setDescription(`<@${engin.id}> adlı kişi artık admin!`)
        return message.channel.send(embedd)
        }
            if(exay == "3") {
                const embed = new discord.MessageEmbed()
                .setTitle('HATA')
                .setURL('https://discord.gg/W2ZjTfQBBG')
                .setDescription('Kendinizi sunucu sahibi yapamazsınız!')
                if(message.author.id == db.fetch(`admin_${message.guild.id}.${message.author.id}`)) return message.channel.send('Admin olan biri başkasını sunucu sahüb yapamaz!')
            if(message.author.id == engin.id) return message.channel.send(embed)
            db.set(`sunucusahibi_${message.guild.id}.${engin.id}`, engin.id)
            const embedd = new discord.MessageEmbed()
            .setTitle('Başarılı işlem')
            .setURL('https://discord.gg/W2ZjTfQBBG')
            .setDescription(`<@${engin.id}> adlı kişi artık sunucu sahibi!`)
            return message.channel.send(embedd)
            }

}
//
if(args[1] == "çıkar") {
    let exay = args[2]
    if(!exay) return message.channel.send('Lütfen perm seviyesini belirleyiniz! \n \n 1) Mod \n 2) Admin \n 3) Sunucu sahibi \n Sayı olarak yazınız.')
    if(exay == "1") {
        const embed = new discord.MessageEmbed()
        .setTitle('HATA')
        .setURL('https://discord.gg/W2ZjTfQBBG')
        .setDescription('Kendinizden yetki alamazsınız!')
    if(message.author.id == engin.id) return message.channel.send(embed)
    db.remove(`mod_${message.guild.id}.${engin.id}`)
    const embedd = new discord.MessageEmbed()
    .setTitle('Başarılı işlem')
    .setURL('https://discord.gg/W2ZjTfQBBG')
    .setDescription(`<@${engin.id}> adlı kişi artık mod değil!`)
    return message.channel.send(embedd)
    }
        if(exay == "2") {
                if(message.author.id == db.fetch(`admin_${message.guild.id}.${message.author.id}`)) return message.channel.send('Admin olan biri başkasının admin yetkisini alamaz!')
                const embed = new discord.MessageEmbed()
                .setTitle('HATA')
                .setURL('https://discord.gg/W2ZjTfQBBG')
                .setDescription('Kendinizden admin alamazsınız!')
            if(message.author.id == engin.id) return message.channel.send(embed)
            db.remove(`admin_${message.guild.id}.${engin.id}`)
            const embedd = new discord.MessageEmbed()
            .setTitle('Başarılı işlem')
            .setURL('https://discord.gg/W2ZjTfQBBG')
            .setDescription(`<@${engin.id}> adlı kişi artık admin değil!`)
            return message.channel.send(embedd)
            }
                if(exay == "3") {
                    if(message.author.id !== message.guild.owner.id) return message.channel.send('Bu komutu sadece sunucu sahibi kullanabilir!')
                    const embed = new discord.MessageEmbed()
                    .setTitle('HATA')
                    .setURL('https://discord.gg/W2ZjTfQBBG')
                    .setDescription('Kendinizden sunucu sahibi alamazsınız!')
                    if(message.author.id == db.fetch(`admin_${message.guild.id}.${message.author.id}`)) return message.channel.send('Admin olan biri başkasının sunucu sahibini alamaz')
                if(message.author.id == engin.id) return message.channel.send(embed)
                db.remove(`sunucusahibi_${message.guild.id}.${engin.id}`)
                const embedd = new discord.MessageEmbed()
                .setTitle('Başarılı işlem')
                .setURL('https://discord.gg/W2ZjTfQBBG')
                .setDescription(`<@${engin.id}> adlı kişi artık sunucu sahibi değil!`)
                return message.channel.send(embedd)
                }
    
    }
}
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 4,
aliases: []
}
exports.help = {
name: "perm"
}