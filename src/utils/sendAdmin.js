const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

function sendOrderToAdmin(bot, userChatId, order) {
  let pickupInfo = '';

  if (order.pickupType === 'bandara') {
    pickupInfo = `Jemput dari Bandara: ${order.pickupLocation}`;
  } else {
    pickupInfo = `Jemput dari Lokasi Lain: ${
      order.address || 'Share Location/Maps'
    }`;
    if (order.pickupMapsUrl)
      pickupInfo += `\n🗺️ [Maps](${order.pickupMapsUrl})`;
  }

  let destinationInfo = '';

  if (order.destinationType === 'terminal') {
    destinationInfo = `Tujuan: ${order.destinationTerminal}`;
  } else {
    destinationInfo = `Alamat Tujuan: ${order.destination}`;
    if (order.destinationMapsUrl)
      destinationInfo += `\n🗺️ [Maps](${order.destinationMapsUrl})`;
  }

  const message =
    `📋 *Pesanan Baru*\n\n` +
    `👤 *Nama:* ${order.name}\n` +
    `📞 *HP:* ${order.phone}\n\n` +
    `📍 *Jemput:*\n${pickupInfo}\n\n` +
    `🎯 *Tujuan:*\n${destinationInfo}\n\n` +
    `🆔 User Chat ID: ${userChatId}`;

  bot.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'Markdown' });
}

module.exports = { sendOrderToAdmin };
