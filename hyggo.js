require('dotenv').config()
const botApi = require(`node-telegram-bot-api`);
const {botActionsConf} = require('./botActionsConf');

const bot = new botApi(process.env.BOT_TOKEN, {polling: true});


const template = /^(\/[a-z]+)\s{0,}?(.*)?$/gmis

const getBotEvent = botAction => {
    return botActionsConf[`${botAction}`].action
}

bot.on('message', (ctx, meta) => console.log("ctx", ctx, "meta", meta))


