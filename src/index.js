require('dotenv').config(); // Load token dari .env

const bot = require('./bot');

// Load handlers
require('./handlers/start')(bot);
require('./handlers/callback')(bot);
require('./handlers/message')(bot);
require('./handlers/location')(bot);

console.log('Taksi Telegram Bot is running...');
