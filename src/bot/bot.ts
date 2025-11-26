import 'dotenv/config'; 
import { Telegraf } from 'telegraf';
import { startHandler } from './handlers/start.handler';
import { helpHandler } from './handlers/help.handler';
import { setupCallback } from './handlers/callback.handler';
import { fetchPosters, fetchProjects, fetchSubscribers, subscribeChat, unsubscribeChat } from './utils/data-fetcher';

const BOT_TOKEN = process.env.BOT_TOKEN!;
if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN is required');
}

const bot = new Telegraf(BOT_TOKEN);

bot.start(startHandler);
bot.help(helpHandler);

// commands for subscription management
bot.command('subscribe', async (ctx) => {
  const chatId = String(ctx.chat?.id || ctx.from?.id || '');
  if (!chatId) return ctx.reply('Не удалось определить chat id');
  try {
    await subscribeChat(chatId, true, true);
    await ctx.reply('Вы подписаны на уведомления о новых афишах и проектах');
  } catch (e) {
    console.error('subscribe error', e);
    await ctx.reply('Не удалось подписаться');
  }
});

bot.command('unsubscribe', async (ctx) => {
  const chatId = String(ctx.chat?.id || ctx.from?.id || '');
  if (!chatId) return ctx.reply('Не удалось определить chat id');
  try {
    await unsubscribeChat(chatId);
    await ctx.reply('Вы отписаны от уведомлений');
  } catch (e) {
    console.error('unsubscribe error', e);
    await ctx.reply('Не удалось отписаться');
  }
});

setupCallback(bot);

bot.launch({ dropPendingUpdates: true });

console.log('Bot is running...');
// start polling for new posters/projects and notify subscribers
;(async function startPolling() {
  let lastPosterId = 0;
  let lastProjectId = 0;

  // Try to initialize last seen ids with retry/backoff if API is down
  let initAttempts = 0;
  while (initAttempts < 10) {
    try {
      const posters = await fetchPosters();
      lastPosterId = posters.reduce((m, p) => Math.max(m, p.id), 0);
      const projects = await fetchProjects();
      lastProjectId = projects.reduce((m, p) => Math.max(m, p.id), 0);
      break;
    } catch (err) {
      initAttempts++;
      const waitMs = Math.min(1000 * Math.pow(2, initAttempts), 30000);
      console.warn(`Polling init: failed to reach API (attempt ${initAttempts}), retrying in ${waitMs}ms`);
      // wait
      // eslint-disable-next-line no-await-in-loop
      await new Promise((res) => setTimeout(res, waitMs));
    }
  }

  // If still zero and no API, we continue but will skip notification until data appears
  let consecutiveErrors = 0;

  setInterval(async () => {
    try {
      const [posters, projects, subscribers] = await Promise.all([
        fetchPosters(),
        fetchProjects(),
        fetchSubscribers(),
      ]);

      consecutiveErrors = 0;

      const newPosters = posters.filter((p) => p.id > lastPosterId);
      if (newPosters.length) {
        lastPosterId = Math.max(...newPosters.map((p) => p.id), lastPosterId);
        for (const s of subscribers.filter((x) => x.posters)) {
          for (const p of newPosters) {
            const text = `Новая афиша: ${p.title}\n${p.description || ''}`;
            try {
              if (p.imageUrl)
                await bot.telegram.sendPhoto(String(s.chatId), `http://localhost:3000${p.imageUrl}`, { caption: text });
              else await bot.telegram.sendMessage(String(s.chatId), text);
            } catch (e: unknown) {
              const msg = e instanceof Error ? e.message : String(e);
              console.error('notify poster error', s.chatId, msg);
            }
          }
        }
      }

      const newProjects = projects.filter((p) => p.id > lastProjectId);
      if (newProjects.length) {
        lastProjectId = Math.max(...newProjects.map((p) => p.id), lastProjectId);
        for (const s of subscribers.filter((x) => x.projects)) {
          for (const p of newProjects) {
            const text = `Новый проект: ${p.title}\n${p.description || ''}`;
            try {
              if (p.imageUrl)
                await bot.telegram.sendPhoto(String(s.chatId), `http://localhost:3000${p.imageUrl}`, { caption: text });
              else await bot.telegram.sendMessage(String(s.chatId), text);
            } catch (e: unknown) {
              const msg = e instanceof Error ? e.message : String(e);
              console.error('notify project error', s.chatId, msg);
            }
          }
        }
      }
    } catch (e) {
      consecutiveErrors++;
      // Log a single concise warning for repeated connection issues
      if (consecutiveErrors <= 3 || consecutiveErrors % 10 === 0) {
        console.warn('Polling: failed to fetch data from API (will retry):', (e as Error).message || e);
      }
    }
  }, 1000 * 60);
})();