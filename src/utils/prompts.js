function sendNameRequest(bot, chatId) {
  bot.sendMessage(chatId, '👤 Masukkan nama Anda:');
}

function sendPhoneRequest(bot, chatId) {
  bot.sendMessage(chatId, '📞 Masukkan nomor HP Anda:');
}

function sendAddressRequest(bot, chatId, type) {
  const label = type === 'jemput' ? 'jemput' : 'tujuan';

  const msg =
    `📍 Masukkan alamat ${label} Anda:\n\n` +
    `Cara termudah:\n` +
    `📱 Kirim *Share Location* langsung via Telegram\n` +
    `🔗 Atau paste URL Google Maps\n` +
    `✍️ Atau ketik alamat lengkap`;

  bot.sendMessage(chatId, msg, { parse_mode: 'Markdown' });
}

module.exports = {
  sendNameRequest,
  sendPhoneRequest,
  sendAddressRequest,
};
