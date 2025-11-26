import { Telegraf, Context } from 'telegraf';
import { fetchPosters, fetchProjects } from '../utils/data-fetcher';
import { welcomeText } from './start.handler';
import { mainMenu } from '../keyboards/main.menu';

// ✅ Функция экранирования символов для MarkdownV2 (используем ограниченный набор для совместимости)
function escapeMarkdownV1(text: string): string {
  if (!text) return '';
  return text
    .replace(/\*/g, '\\*')
    .replace(/_/g, '\\_')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/~/g, '\\~')
    .replace(/`/g, '\\`')
    .replace(/>/g, '\\>')
    .replace(/#/g, '\\#')
    .replace(/\+/g, '\\+')
    .replace(/=/g, '\\=')
    .replace(/\|/g, '\\|')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}');
}

export const setupCallback = (bot: Telegraf) => {
  bot.on('callback_query', async (ctx) => {
    // Явное приведение типа или проверка, так как в Telegraf типы callbackQuery могут отличаться
    const query = ctx.callbackQuery;

    if (query && 'data' in query) {
      const data = query.data;

      // === ЛОГИКА ВОЗВРАТА В МЕНЮ ===
      if (data === 'back_home') {
        await ctx.answerCbQuery('Возвращаемся в меню...');
        // Отправляем стартовое сообщение заново
        await ctx.replyWithPhoto(
          { source: './assets/mascot.png' },
          {
            caption: welcomeText,
            reply_markup: mainMenu()
          }
        );
        // Опционально: удаляем сообщение, на котором нажали кнопку, чтобы не засорять чат
        // await ctx.deleteMessage().catch(() => {});
        return;
      }

      // === АФИША ===
      if (data === 'poster') {
        const posters = await fetchPosters();
        if (posters.length > 0) {
          for (const p of posters) {
            const imageUrl = p.imageUrl ? `http://localhost:3000${p.imageUrl}` : '';
            const escapedTitle = escapeMarkdownV1(p.title);
            const escapedDescription = escapeMarkdownV1(p.description);
            const fullCaption = `*${escapedTitle}*\n\n${escapedDescription}`;
            
            // Обрезаем, если слишком длинное
            const caption = fullCaption.length > 1024 ? fullCaption.substring(0, 1021) + '...' : fullCaption;
            
            // ✅ Добавляем кнопку "В меню" в каждый пост
            const keyboard = {
              inline_keyboard: [
                [
                  { text: 'Забронировать', url: p.bookingUrl || 'https://example.com' }
                ],
                [
                  { text: '⬅️ В меню', callback_data: 'back_home' }
                ]
              ]
            };

            if (imageUrl) {
              await ctx.replyWithPhoto(
                { url: imageUrl },
                { caption, parse_mode: 'Markdown', reply_markup: keyboard }
              );
            } else {
              await ctx.reply(caption, { parse_mode: 'Markdown', reply_markup: keyboard });
            }
          }
        } else {
          await ctx.reply('Афиш пока нет.', {
              reply_markup: { inline_keyboard: [[{ text: '⬅️ В меню', callback_data: 'back_home' }]] }
          });
        }
        await ctx.answerCbQuery();
      } 
      
      // === ПРОЕКТЫ ===
      else if (data === 'project') {
        const projects = await fetchProjects();
        if (projects.length > 0) {
          for (const p of projects) {
            const imageUrl = p.imageUrl ? `http://localhost:3000${p.imageUrl}` : '';
            const escapedTitle = escapeMarkdownV1(p.title);
            const escapedDescription = escapeMarkdownV1(p.description);
            const fullCaption = `*${escapedTitle}*\n\n${escapedDescription}`;
            const caption = fullCaption.length > 1024 ? fullCaption.substring(0, 1021) + '...' : fullCaption;
            
            // ✅ Добавляем кнопку "В меню" в каждый проект
            const keyboard = {
              inline_keyboard: [
                [
                  { text: 'Забронировать', url: p.bookingUrl || 'https://example.com' }
                ],
                [
                  { text: '⬅️ В меню', callback_data: 'back_home' }
                ]
              ]
            };

            if (imageUrl) {
              await ctx.replyWithPhoto(
                { url: imageUrl },
                { caption, parse_mode: 'Markdown', reply_markup: keyboard }
              );
            } else {
              await ctx.reply(caption, { parse_mode: 'Markdown', reply_markup: keyboard });
            }
          }
        } else {
            await ctx.reply('Проектов пока нет.', {
                reply_markup: { inline_keyboard: [[{ text: '⬅️ В меню', callback_data: 'back_home' }]] }
            });
        }
        await ctx.answerCbQuery();
      } 
      
      // === ДРУГИЕ КНОПКИ ===
      else if (data === 'help') {
        await ctx.reply('Нужна помощь? Напиши нам!', {
            reply_markup: { inline_keyboard: [[{ text: '⬅️ В меню', callback_data: 'back_home' }]] }
        });
        await ctx.answerCbQuery();
      } else if (data === 'promocode') {
        await ctx.reply('Вот твой промокод: ABC123', {
            reply_markup: { inline_keyboard: [[{ text: '⬅️ В меню', callback_data: 'back_home' }]] }
        });
        await ctx.answerCbQuery();
      } else if (data === 'maria_help') {
        await ctx.reply('Мария уже спешит на помощь!', {
            reply_markup: { inline_keyboard: [[{ text: '⬅️ В меню', callback_data: 'back_home' }]] }
        });
        await ctx.answerCbQuery();
      } else if (data === 'secret') {
        await ctx.reply('Секретное сообщение 😎', {
            reply_markup: { inline_keyboard: [[{ text: '⬅️ В меню', callback_data: 'back_home' }]] }
        });
        await ctx.answerCbQuery();
      }
    }
  });
};