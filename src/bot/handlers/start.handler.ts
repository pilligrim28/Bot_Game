import { Context } from 'telegraf';
import { getPostersWithButtons, getProjectsWithButtons } from '../utils/button.helpers';

// ✅ Правильная функция меню
export const mainMenu = () => ({
  inline_keyboard: [
    [
      { text: 'Афиша', callback_data: 'poster' }, // ✅
      { text: 'Проекты', callback_data: 'project' }, // ✅
    ],
    [
      { text: 'Нужна помощь', callback_data: 'help' }, // ✅ Исправлена опечатка (было callback_)
      { text: 'Хочу промокод', callback_data: 'promocode' }, // ✅ Исправлена опечатка (было callback_)
    ],
    [
      { text: 'Позвать Марию', callback_data: 'maria_help' }, // ✅ Исправлена опечатка (было callback_)
      { text: 'Ещё кое-что', callback_data: 'secret' }, // ✅
    ],
  ],
});

export const startHandler = async (ctx: Context) => {
  // ❗️Замени на путь к твоему локальному изображению
  const imagePath = './assets/mascot.png';

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

  // ✅ Используем объект { source: ... } для отправки локального файла.
  // Класс InputFile не экспортируется напрямую для использования через new.
  await ctx.replyWithPhoto(
    { source: imagePath },
    {
      caption: 'Привет! Я Тигробот Мэддик, житель Madkids. \nMadkids - это зоны для безудержного веселья и прекрасного времяпрепровождения.',
      reply_markup: keyboard,
    }
  );
};