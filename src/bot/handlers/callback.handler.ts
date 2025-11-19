import { Telegraf, Context } from 'telegraf';
import { fetchPosters, fetchProjects } from '../utils/data-fetcher';
import { escapeMarkdownV2 } from '../utils/escape-markdown';

export const setupCallback = (bot: Telegraf) => {
  bot.on('callback_query', async (ctx) => {
    const query = ctx.callbackQuery;

    if ('data' in query) {
      const data = query.data;

      if (data === 'poster') {
        const posters = await fetchPosters();
        if (posters.length > 0) {
          for (const p of posters) {
            // ❗️Экранируем title и description
            const message = `*${escapeMarkdownV2(p.title)}*\n${escapeMarkdownV2(p.description)}`;
            // ❗️Отправляем кнопку "Забронировать" отдельно
            const keyboard = {
              inline_keyboard: [
                [
                  { text: 'Забронировать', url: p.bookingUrl || 'https://example.com' }
                ]
              ]
            };
            // ❗️Используем MarkdownV2
            await ctx.reply(message, { parse_mode: 'MarkdownV2', reply_markup: keyboard });
          }
        } else {
          await ctx.reply('Афиш пока нет.');
        }
      } else if (data === 'project') {
        const projects = await fetchProjects();
        if (projects.length > 0) {
          for (const p of projects) {
            // ❗️Экранируем title и description
            const message = `*${escapeMarkdownV2(p.title)}*\n${escapeMarkdownV2(p.description)}`;
            // ❗️Отправляем кнопку "Забронировать" отдельно
            const keyboard = {
              inline_keyboard: [
                [
                  { text: 'Забронировать', url: p.bookingUrl || 'https://example.com' }
                ]
              ]
            };
            // ❗️Используем MarkdownV2
            await ctx.reply(message, { parse_mode: 'MarkdownV2', reply_markup: keyboard });
          }
        } else {
          await ctx.reply('Проектов пока нет.');
        }
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