const { userStates, orderData } = require('../utils/orderState');
const { STATE } = require('../utils/constants');
const { isGoogleMapsUrl } = require('../utils/maps');
const { sendNameRequest, sendPhoneRequest } = require('../utils/prompts.js');
const { sendOrderToAdmin } = require('../utils/sendAdmin');

module.exports = (bot) => {
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text && text.startsWith('/start')) return;
    if (msg.location) return;

    const state = userStates[chatId];
    if (!state || state === STATE.IDLE) return;

    switch (state) {
      case STATE.WAITING_ADDRESS:
        if (isGoogleMapsUrl(text)) {
          orderData[chatId].pickupMapsUrl = text;
          userStates[chatId] = 'waiting_address_text';

          bot.sendMessage(
            chatId,
            'URL Maps diterima! Masukan alamat lengkap atau klik lewati:',
            {
              reply_markup: {
                inline_keyboard: [
                  [{ text: 'Lewati', callback_data: 'skip_address_text' }],
                ],
              },
            }
          );
        } else {
          orderData[chatId].address = text;
          userStates[chatId] = STATE.WAITING_NAME;

          sendNameRequest(bot, chatId);
        }
        break;

      case STATE.WAITING_NAME:
        orderData[chatId].name = text;

        userStates[chatId] = STATE.WAITING_DESTINATION_TYPE;
        bot.sendMessage(chatId, 'Pilih tujuan:', {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Terminal Bandara', callback_data: 'dest_terminal' }],
              [{ text: 'Alamat Manual', callback_data: 'dest_manual' }],
            ],
          },
        });
        break;

      case STATE.WAITING_DESTINATION:
        if (isGoogleMapsUrl(text)) {
          orderData[chatId].destinationMapsUrl = text;

          userStates[chatId] = 'waiting_dest_text';

          bot.sendMessage(
            chatId,
            'URL Maps diterima! Masukan alamat lengkap atau klik lewati:',
            {
              reply_markup: {
                inline_keyboard: [
                  [{ text: 'Lewati', callback_data: 'skip_dest_text' }],
                ],
              },
            }
          );
        } else {
          orderData[chatId].destination = text;
          userStates[chatId] = STATE.WAITING_PHONE;

          sendPhoneRequest(bot, chatId);
        }
        break;

      case STATE.WAITING_PHONE:
        orderData[chatId].phone = text;

        bot.sendMessage(chatId, 'Terima kasih! Admin segera menghubungi Anda.');

        sendOrderToAdmin(bot, chatId, orderData[chatId]);

        userStates[chatId] = STATE.IDLE;
        delete orderData[chatId];
        break;

      case 'waiting_address_text':
        orderData[chatId].address = text;
        userStates[chatId] = STATE.WAITING_NAME;

        sendNameRequest(bot, chatId);
        break;

      case 'waiting_dest_text':
        orderData[chatId].destination = text;
        userStates[chatId] = STATE.WAITING_PHONE;

        sendPhoneRequest(bot, chatId);
        break;
    }
  });
};
