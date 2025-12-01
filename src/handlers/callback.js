const { userStates, orderData } = require('../utils/orderState');
const { STATE } = require('../utils/constants');
const {
  sendPhoneRequest,
  sendAddressRequest,
  sendNameRequest,
} = require('../utils/prompts.js');

module.exports = (bot) => {
  bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    bot.answerCallbackQuery(query.id);

    // Bandara pickup
    if (data === 'pickup_bandara') {
      bot.sendMessage(chatId, '✈️ Pilih terminal bandara:', {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'T-1', callback_data: 'terminal_1' }],
            [{ text: 'T-2', callback_data: 'terminal_2' }],
            [{ text: 'T-3', callback_data: 'terminal_3' }],
          ],
        },
      });
      return;
    }

    // Terminal dipilih
    if (data.startsWith('terminal_')) {
      const terminal = data.replace('terminal_', 'T-');
      orderData[chatId].pickupType = 'bandara';
      orderData[chatId].pickupLocation = terminal;

      userStates[chatId] = STATE.WAITING_NAME;
      sendNameRequest(bot, chatId);
      return;
    }

    // Lokasi lain
    if (data === 'pickup_lain') {
      orderData[chatId].pickupType = 'lokasi_lain';
      userStates[chatId] = STATE.WAITING_ADDRESS;

      sendAddressRequest(bot, chatId, 'jemput');
      return;
    }

    // Tujuan: Terminal
    if (data === 'dest_terminal') {
      bot.sendMessage(chatId, '✈️ Pilih terminal tujuan:', {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'T-1', callback_data: 'dest_terminal_1' }],
            [{ text: 'T-2', callback_data: 'dest_terminal_2' }],
            [{ text: 'T-3', callback_data: 'dest_terminal_3' }],
          ],
        },
      });
      return;
    }

    // Terminal tujuan dipilih
    if (data.startsWith('dest_terminal_')) {
      const terminal = data.replace('dest_terminal_', 'T-');

      orderData[chatId].destinationType = 'terminal';
      orderData[chatId].destinationTerminal = terminal;
      orderData[chatId].destination = terminal;

      userStates[chatId] = STATE.WAITING_PHONE;
      sendPhoneRequest(bot, chatId);
      return;
    }

    // Manual tujuan
    if (data === 'dest_manual') {
      orderData[chatId].destinationType = 'manual';
      userStates[chatId] = STATE.WAITING_DESTINATION;

      sendAddressRequest(bot, chatId, 'tujuan');
      return;
    }

    // Skip Google Maps → input alamat manual
    if (data === 'skip_maps') {
      const current = userStates[chatId];

      if (current === STATE.WAITING_ADDRESS) {
        bot.sendMessage(chatId, 'Masukan alamat jemput anda:');
      } else if (current === STATE.WAITING_DESTINATION) {
        bot.sendMessage(chatId, 'Masukan alamat tujuan anda:');
      }
      return;
    }

    // Skip address text
    if (data === 'skip_address_text') {
      userStates[chatId] = STATE.WAITING_NAME;
      sendNameRequest(bot, chatId);
    }

    if (data === 'skip_dest_text') {
      userStates[chatId] = STATE.WAITING_PHONE;
      sendPhoneRequest(bot, chatId);
    }
  });
};
