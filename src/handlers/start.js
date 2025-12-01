const { initUser } = require('../utils/orderState');

module.exports = (bot) => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    initUser(chatId);

    bot.sendMessage(
      chatId,
      '🚕 *Selamat datang di Taksi Bot!*\n\nMau dijemput dari mana?',
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: '✈️ Bandara', callback_data: 'pickup_bandara' }],
            [{ text: '📍 Lokasi Lain', callback_data: 'pickup_lain' }],
          ],
        },
      }
    );
  });
};
