import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export const mainMenu = (): InlineKeyboardMarkup => ({
  inline_keyboard: [
    [
      { text: 'Афиша', callback_data: 'poster' },
      { text: 'Проекты', callback_data: 'project' },
    ],
    [
      { text: 'Нужна помощь', callback_data: 'help' },
      { text: 'Хочу промокод', callback_data: 'promocode' },
    ],
    [
      { text: 'Позвать Марию', callback_data: 'maria_help' },
      { text: 'Ещё кое-что', callback_data: 'secret' },
    ],
  ],
});