import { Context } from 'telegraf';
import { getPostersWithButtons, getProjectsWithButtons } from '../utils/button.helpers';

// Функция, которая возвращает основное меню (из предыдущих уроков)
const mainMenu = () => ({
  inline_keyboard: [
    [
      { text: 'Афиша', callback_data: 'poster' }, // ✅ Было: callback_
      { text: 'Проекты', callback_data: 'project' }, // ✅
    ],
    [
      { text: 'Нужна помощь', callback_data: 'help' },
      { text: 'Хочу промокод', callback_data: 'promocode' }, // ✅
    ],
    [
      { text: 'Позвать Марию', callback_data: 'maria_help' }, // ✅
      { text: 'Ещё кое-что', callback_data: 'secret' }, // ✅
    ],
  ],
});

export const startHandler = async (ctx: Context) => {
  // URL картинки (можешь заменить на свою)
  const imageUrl = 'https://cs13.pikabu.ru/post_img/2023/08/30/5/og_og_1693377898277428934.jpg';

  // Получаем кнопки из БД
  const posterButtons = await getPostersWithButtons();
  const projectButtons = await getProjectsWithButtons();

  // Объединяем кнопки: сначала основное меню, потом динамические
  const keyboard = {
    inline_keyboard: [
      ...mainMenu().inline_keyboard,
      ...posterButtons,
      ...projectButtons,
    ],
  };

  await ctx.replyWithPhoto(
    { url: imageUrl },
    {
      caption: 'Привет! Я Тигробот Мэддик, житель Madkids. \nMadkids - это зоны для безудержного веселья и прекрасного времяпрепровождения.',
      reply_markup: keyboard, // ✅ Теперь типы должны совпадать
    }
  );
};