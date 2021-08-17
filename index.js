const Discord = require('discord.js');

const prefix = "v!";

const Client = new Discord.Client();

// Token du Bot
Client.login(process.env.TOKEN);

Client.on("messageReactionAdd", (reaction, user) => {
    console.log("reaction ajouté");
});

Client.on("messageReactionRemove", (reaction, user) => {
    console.log("reaction retiré");
}),

// toute les Commandes du Bot
Client.on('message', function (message) {

    // Commande v!help
    if (message.content === prefix + "help") {
        
        var embed = new Discord.MessageEmbed()
            .setColor('#ff4956')
            .setAuthor('Valorant - FR', 'https://i.imgur.com/2dhK5EL.jpg', 'https://discord.gg/FvAyZ3F3yv')
            .setThumbnail('https://i.imgur.com/bw4jzwC.png')
            .setTitle("Voici toutes les commandes que vous pouvez faire :")
            .addFields(
                { name: "v!news", value: "Avoir toutes les nouvelles de valorant", inline: true },
                { name: "v!...", value: "Le bot est encore en developpement, d'autres commandes sont à venir", inline: true },
                // { name: "v!...", value: "Description", inline: true },
                // { name: "v!...", value: "Description", inline: true },
            )
            .setFooter('by Hank Anderson', 'https://i.imgur.com/agzGGPF.png')
        message.reply('**Toutes les commandes vous ont été envoyé en Message Privé !**');
        message.author.send(embed);
    }

    // Commande v!news
    if (message.content === prefix + 'news') {
        message.reply('**Voilà Pour toi les Nouveautés de Valorant :**\n**https://playvalorant.com/fr-fr/news/game-updates/valorant-patch-notes-2-08/, https://www.youtube.com/watch?v=JJHseNjeRyc**')
    }

    if (message.content === prefix + 'qui joue ?') {
        message.channel.send("**Réagissez avec ❓ pour demander si quelqu'un veux jouer**")
    }

    if(message.channel.type == "dm") return;
    if(message.author.id == "835180819986907167") {
        if(message.content == "**Réagissez avec ❓ pour demander si quelqu'un veux jouer**") {

        message.react("❓");
        }
    }
})

// Activité du Bot
Client.on('ready', () => {

    Client.guilds.cache.fing(guild=> guild.id === "830889061056774214").channel.cache.fing(channel => channel.id === "860557281438728202").message.fetch("860561169177378836").then(message => {
        console.log("message ajouté à la mémoire : " + message.content);
    }).catch(err =>{
        console.log("impossible d'ajouter le message en mémoire : " + err);
    });

    const statuses = [
        () => `v!help`,
        () => `v!news`,
        () => `${Client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`
    ]
    let i = 0
    setInterval(() => {
        Client.user.setActivity(statuses[i](), {type: 'PLAYING'})
        i = ++i % statuses.length
    }, 1e4)
})