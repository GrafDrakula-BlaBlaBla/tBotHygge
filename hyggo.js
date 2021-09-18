require('dotenv').config()
const botApi = require(`node-telegram-bot-api`);
const {botActionsConf} = require('./botActionsConf');

const bot = new botApi(process.env.BOT_TOKEN, {polling: true});

// bot.on('message', (ctx, meta) => console.log("ctx", ctx, "meta", meta))

const template = /^(\/[a-z]+)\s{0,}?(.*)?$/gmis

const getBotEvent = botAction => {
    return botActionsConf[`${botAction}`].action
}

bot.onText(template, (ctx, match) => {
    const {chat:{id}, text} = ctx
    const botMessage = getBotEvent(match[0])
    bot.sendMessage(id, botMessage(), {
        reply_markup: {
            inline_keyboard:[
                [
                    {
                        text: 'Hygge расскажет про дизайн',
                        callback_data: '0'
                    }
                ],
                [
                    {
                        text: 'Hygge расскажет о Товарах',
                        callback_data: '1'
                    }
                ]
            ]
        }
    })
})

bot.on('callback_query', callbackQuery => {
    
    const {id, message} = callbackQuery;
    
    bot.answerCallbackQuery(id).then((meta) =>{
        if(meta) {
            bot.sendMessage(message.chat.id, 'Выбрать можно что то одно', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            dButton['0'],
                            dButton['1']
                        ]
                    ]
                }
            })
        }
    })
    
})


const dButton = {
    '0':{
            'text': 'Расскажи что такое дизайн',
            'url': 'https://habr.com/ru/post/8678/'
        },
    '1': {
            'text': 'Что такое PRO дизайн',
            'url': "https://zen.yandex.ru/media/id/5e7e1734e366851eb08d6f84/prodaiuscii-dizain-saita--chto-eto--5e7e195398b4c86819a5d10f"
        }
}



