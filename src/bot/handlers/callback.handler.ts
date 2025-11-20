import { Telegraf, Context } from 'telegraf';
import { fetchPosters, fetchProjects } from '../utils/data-fetcher';

// ✅ Улучшенная функция экранирования (только опасные символы)
// ✅ Улучшенная функция экранирования (только реально опасные символы)
function escapeMarkdownV1(text: string): string {
  return text
    .replace(/\*/g, '\\*') // ✅ Экранируем *
    .replace(/_/g, '\\_') // ✅ Экранируем _
    .replace(/\[/g, '\\[') // ✅ Экранируем [
    .replace(/\]/g, '\\]') // ✅ Экранируем ]
    .replace(/\(/g, '\\(') // ✅ Экранируем (
    .replace(/\)/g, '\\)') // ✅ Экранируем )
    .replace(/~/g, '\\~') // ✅ Экранируем ~
    .replace(/`/g, '\\`') // ✅ Экранируем `
    .replace(/>/g, '\\>') // ✅ Экранируем >
    .replace(/#/g, '\\#') // ✅ Экранируем #
    .replace(/\+/g, '\\+') // ✅ Экранируем +
    // .replace(/-/g, '\\-')  // ❗️Убрано
    .replace(/=/g, '\\=') // ✅ Экранируем =
    .replace(/\|/g, '\\|') // ✅ Экранируем |
    .replace(/\{/g, '\\{') // ✅ Экранируем {
    .replace(/\}/g, '\\}') // ✅ Экранируем }
    // .replace(/\./g, '\\.')  // ❗️Убрано
    // .replace(/!/g, '\\!'); // ❗️Убрано
    // .replace(/\?/g, '\\?'); // ❗️Убрано
}

export const setupCallback = (bot: Telegraf) => {
  bot.on('callback_query', async (ctx) => {
    const query = ctx.callbackQuery;

    if ('data' in query) {
      const data = query.data;

      if (data === 'poster') {
        const posters = await fetchPosters();
        if (posters.length > 0) {
          for (const p of posters) {
            // ✅ Используем полный URL для изображения
            const imageUrl = p.imageUrl ? `http://localhost:3000${p.imageUrl}` : '';
            // ✅ Отделяем заголовок от описания
            const escapedTitle = escapeMarkdownV1(p.title);
            const escapedDescription = escapeMarkdownV1(p.description);
            const fullCaption = `*${escapedTitle}*\n\n${escapedDescription}`; // ✅ Добавлены звёздочки и перенос строки
            // ✅ Сокращаем caption до 1024 символов
            const caption = fullCaption.length > 1024 ? fullCaption.substring(0, 1021) + '...' : fullCaption;
            const keyboard = {
              inline_keyboard: [
                [
                  { text: 'Забронировать', url: p.bookingUrl || 'https://example.com' }
                ]
              ]
            };

            if (imageUrl) {
              await ctx.replyWithPhoto(
                { url: imageUrl },
                { caption, parse_mode: 'Markdown', reply_markup: keyboard } // ✅ Указываем parse_mode
              );
            } else {
              await ctx.reply(caption, { parse_mode: 'Markdown', reply_markup: keyboard }); // ✅ Указываем parse_mode
            }
          }
        } else {
          await ctx.reply('Афиш пока нет.');
        }
      } else if (data === 'project') { // ✅ Обработка проектов
        const projects = await fetchProjects();
        if (projects.length > 0) {
          for (const p of projects) {
            // ✅ Используем полный URL для изображения
            const imageUrl = p.imageUrl ? `http://localhost:3000${p.imageUrl}` : '';
            // ✅ Отделяем заголовок от описания
            const escapedTitle = escapeMarkdownV1(p.title);
            const escapedDescription = escapeMarkdownV1(p.description);
            const fullCaption = `*${escapedTitle}*\n\n${escapedDescription}`; // ✅ Добавлены звёздочки и перенос строки
            // ✅ Сокращаем caption до 1024 символов
            const caption = fullCaption.length > 1024 ? fullCaption.substring(0, 1021) + '...' : fullCaption;
            const keyboard = {
              inline_keyboard: [
                [
                  { text: 'Забронировать', url: p.bookingUrl || 'https://example.com' }
                ]
              ]
            };

            if (imageUrl) {
              await ctx.replyWithPhoto(
                { url: imageUrl },
                { caption, parse_mode: 'Markdown', reply_markup: keyboard } // ✅ Указываем parse_mode
              );
            } else {
              await ctx.reply(caption, { parse_mode: 'Markdown', reply_markup: keyboard }); // ✅ Указываем parse_mode
            }
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