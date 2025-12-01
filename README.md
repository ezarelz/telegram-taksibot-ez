# ✅ **`.env.example`**

```env
# Telegram Bot Token
BOT_TOKEN=your_telegram_bot_token_here

# Chat ID admin penerima notifikasi order
ADMIN_CHAT_ID=your_admin_chat_id_here

# (Optional) Port jika nanti pakai webhook
PORT=3000
```

---

# ✅ **`README.md` (Siap Tempel di Repo GitHub)**

# 🚕 Telegram Taksibot EZ

Telegram bot untuk pemesanan transportasi (taksi / pick-up service) dengan fitur:

- Pilihan jemput dari Bandara (T1, T2, T3)
- Pilihan jemput dari lokasi lain (manual / share location / Google Maps)
- Pilihan tujuan ke terminal bandara atau alamat manual
- Detect Google Maps URL secara otomatis
- Share Location melalui Telegram
- State machine untuk menjaga alur input
- Notifikasi dikirim otomatis ke admin
- Arsitektur modular & scalable

---

## 📂 **Project Structure**

```md
taksi-telegram/
│
├── src/
│ ├── index.js # Entry point aplikasi
│ ├── bot.js # Inisialisasi bot Telegram
│ │
│ ├── handlers/
│ │ ├── start.js # Handler command /start
│ │ ├── callback.js # Handler tombol inline
│ │ ├── message.js # Handler pesan teks
│ │ ├── location.js # Handler share location
│ │
│ ├── utils/
│ │ ├── maps.js # Validasi Google Maps URL
│ │ ├── orderState.js # State user + data order
│ │ ├── sendAdmin.js # Kirim notifikasi ke admin
│ │ └── constants.js # ENUM state
│
├── .env.example
├── package.json
└── README.md
```

---

## 🛠 Installation

Clone repository:

```bash
git clone https://github.com/ezarelz/telegram-taksibot-ez.git
cd telegram-taksibot-ez
```

Install dependencies:

```bash
npm install
```

Copy `.env.example` → `.env`:

```bash
cp .env.example .env
```

Isi nilai:

```
BOT_TOKEN=xxxx
ADMIN_CHAT_ID=xxxx
```

---

## ▶️ Run the Bot

### Development

```bash
node src/index.js
```

### Production (recommended)

Gunakan PM2:

```bash
npm install -g pm2
pm2 start src/index.js --name taksibot
pm2 save
pm2 logs taksibot
```

---

## 🛰️ Deployment via cURL (1-file mode)

Jika mau deploy super cepat ke VPS:

```bash
curl -O https://raw.githubusercontent.com/ezarelz/telegram-taksibot-ez/main/taksi.js
npm install node-telegram-bot-api
node taksi.js
```

---

## 📬 Admin Notification Format

Admin akan menerima pesan seperti:

```
📋 Pesanan Baru
👤 Nama: John Doe
📞 No HP: 081234567
📍 Jemput: T-2 (Bandara)
🎯 Tujuan: Alamat Manual atau Terminal
🗺️ Maps: <link google maps>
```

---

## 📌 Features to Add (Roadmap)

- Payment integration (QRIS / Midtrans)
- Multi-driver dispatch system
- Auto-cancel timeout
- Order history logging (MongoDB / PostgreSQL)
- Web dashboard untuk admin

---

## 🤖 Tech Stack

- Node.js
- node-telegram-bot-api
- Modular Handler Architecture
- Google Maps URL parser

---

## 📄 License

MIT License.

---

## ✨ Author

**Ezar Manggala E. (@ezarelz)**
Crafting modern web experiences & providing practical IT solutions.
