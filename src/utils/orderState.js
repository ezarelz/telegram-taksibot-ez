const { STATE } = require('./constants');

const userStates = {};
const orderData = {};

function initUser(chatId) {
  userStates[chatId] = STATE.IDLE;
  orderData[chatId] = {
    pickupType: null,
    pickupLocation: null,
    address: null,
    pickupMapsUrl: null,
    pickupLocationCoords: null,
    name: null,
    destinationType: null,
    destinationTerminal: null,
    destination: null,
    destinationMapsUrl: null,
    destinationLocationCoords: null,
    phone: null,
  };
}

module.exports = {
  userStates,
  orderData,
  initUser,
};
