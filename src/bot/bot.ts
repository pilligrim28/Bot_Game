import { Telegraf } from 'telegraf';
import { startHandler } from './handlers/start.handler';
import { helpHandler } from './handlers/help.handler';
import { setupCallback } from './handlers/callback.handler';

const BOT_TOKEN = process.env.BOT_TOKEN!;
if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN is required');
}

const bot = new Telegraf(BOT_TOKEN);

bot.start(startHandler);
bot.help(helpHandler);

setupCallback(bot);

bot.launch({ dropPendingUpdates: true });

console.log('Bot is running...');