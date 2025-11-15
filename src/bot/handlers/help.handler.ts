import { Context } from 'telegraf';

export const helpHandler = async (ctx: Context) => {
  await ctx.reply('Доступные команды:\n/start — начать\n/help — помощь');
};