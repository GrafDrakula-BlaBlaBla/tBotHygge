const {onGreeting } = require(`./modes/modGreet`)

module.exports.botActionsConf = {
    '/start': {
        action: onGreeting,
    }
}