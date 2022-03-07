const VkBot = require('node-vk-bot-api');

const bot = new VkBot('process.env.TOKEN');

bot.command('/start', (ctx) => {
  ctx.reply('Hello!');
});

bot.startPolling();