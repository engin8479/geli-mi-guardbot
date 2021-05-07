const discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {
    let prefix = ayarlar.prefix
const embed = new discord.MessageEmbed()
.setTitle(':open_file_folder:  Yardım menüsü  :open_file_folder: ')
.setURL('https://discord.gg/W2ZjTfQBBG')
.setDescription(`:pushpin:  ${prefix}botkoruma log = Bot koruma log ayarlarsınız. \n \n:pushpin:  ${prefix}botkoruma aç = Bot koruma sistemini açarsınız. \n \n:pushpin:  ${prefix}botkoruma kapat = Bot koruma sistemini kapatırsınız. \n \n:pushpin:  ${prefix}botkoruma yardım = Bot koruma yardım menüsünü görürsünüz. \n \n:pushpin:  ${prefix}botkoruma izin-ver = Bota giriş izni verirsiniz. \n \n:pushpin:  ${prefix}botkoruma giriş-izni-kaldır = Botun giriş iznini kaldırırsınız. \n \n:pushpin:  ${prefix}ban-limit bilgi/ayarla/sıfırla = Ban limit komutları \n \n:pushpin:  ${prefix}kick-limit ayarla/bilgi/sıfırla = Kick limit komutları \n \n:pushpin:  ${prefix}kanal-silme-limit ayarla/bilgi/sıfırla = Kanal silme limit komutları \n \n:pushpin:  ${prefix}rol-silme-limit ayarla/bilgi/sıfırla = Rol silme limit komutları \n \n:pushpin:  ${prefix}mute-rol ayarla/bilgi/sıfırla = Mute rol komutları \n \n:pushpin:  ${prefix}jail-rol ayarla/bilgi/sıfırla = Jail rol komutları \n \n:pushpin:  ${prefix}koruma-log ayarla/bilgi/sıfırla = Koruma log komutları \n \n:pushpin:  ${prefix}perm ekle/çıkar = Whitelist komutları \n \n:pushpin:  ${prefix}yönetici-koruma aç/bilgi/kapat = Yönetici koruma komutları`)
.setImage('https://imgrosetta.mynet.com.tr/file/11369144/11369144-728xauto.png')
.setFooter(`${message.author.username}`)
.setTimestamp()
return message.channel.send(embed)
}
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: []
}
exports.help = {
name: "yardım"
}