const express = require('express');
const mineflayer = require('mineflayer');
const app = express();

// Web sunucusu
app.get('/', (req, res) => {
  res.send('Minecraft botu aktif!');
});

// Web sunucusu başlatılıyor
app.listen(3000, () => {
  console.log('🌐 Web sunucusu çalışıyor');
});

// Bot oluşturuluyor
function startBot() {
  const bot = mineflayer.createBot({
    host: 'Kings_here.aternos.me', // ← Aternos sunucu adını buraya yaz
    port: 25565, // Aternos varsayılan portu
    username: 'AFKBot123', // Botun kullanıcı adı
  });

  bot.on('spawn', () => {
    console.log('✅ Bot sunucuya bağlandı!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000);
  });

  bot.on('end', () => {
    console.log('❌ Bot sunucudan düştü, tekrar bağlanacak...');
    setTimeout(startBot, 5000); // Yeniden bağlan
  });

  bot.on('error', (err) => {
    console.log('⚠️ Hata:', err);
  });
}

startBot();
