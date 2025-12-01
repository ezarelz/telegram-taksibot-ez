const { userStates, orderData } = require('../utils/orderState');

module.exports = (bot) => {
  bot.on('location', (msg) => {
    const chatId = msg.chat.id;
    const state = userStates[chatId];
    const loc = msg.location;

    if (!state) return;

    const mapsUrl = `https://www.google.com/maps?q=${loc.latitude},${loc.longitude}`;

    if (state === 'waiting_address' || state === 'waiting_address_text') {
      orderData[chatId].pickupLocationCoords = loc;
      orderData[chatId].pickupMapsUrl = mapsUrl;

      bot.sendMessage(
        chatId,
        'Lokasi diterima! Masukan alamat teks atau klik lewati:',
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Lewati', callback_data: 'skip_address_text' }],
            ],
          },
        }
      );
      userStates[chatId] = 'waiting_address_text';
    }

    if (state === 'waiting_destination' || state === 'waiting_dest_text') {
      orderData[chatId].destinationLocationCoords = loc;
      orderData[chatId].destinationMapsUrl = mapsUrl;

      bot.sendMessage(
        chatId,
        'Lokasi tujuan diterima! Masukan alamat teks atau klik lewati:',
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Lewati', callback_data: 'skip_dest_text' }],
            ],
          },
        }
      );
      userStates[chatId] = 'waiting_dest_text';
    }
  });
};
