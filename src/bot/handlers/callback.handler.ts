import { Telegraf, Context } from 'telegraf';

export const setupCallback = (bot: Telegraf) => {
  bot.on('callback_query', async (ctx) => {
    const query = ctx.callbackQuery;

    if ('data' in query) {
      const data = query.data;

      if (data === 'poster') {
        await ctx.reply('Афиши: ...');
      } else if (data === 'project') {
        await ctx.reply('Проекты: ...');
      } else if (data === 'help') {
        await ctx.reply('Нужна помощь? Напиши нам!');
      } else if (data === 'promocode') {
        await ctx.reply('Вот твой промокод: ABC123');
      } else if (data === 'maria_help') {
        await ctx.reply('Мария уже спешит на помощь!');
      } else if (data === 'secret') {
        await ctx.reply('Секретное сообщение 😎');
      }
    }

    await ctx.answerCbQuery();
  });
};