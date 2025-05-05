const mineflayer = require('mineflayer');

// Botu başlatan fonksiyon
function startBot() {
  const bot = mineflayer.createBot({
    host: 'Kings_here.aternos.me',  // Aternos sunucusunun adı
    port: 60824,                   // Aternos portu
    username: 'AFKBot123'          // Botun kullanıcı adı
  });

  // Bot başarıyla bağlandığında bu mesajı yazdırır
  bot.on('spawn', () => {
    console.log('Bot sunucuya başarıyla bağlandı!');

    // Bot her 2 saniyede bir yukarı ve aşağı hareket edecek
    setInterval(() => {
      // Yukarı hareket
      bot.setControlState('jump', true); // Botu yukarıya zıplat
      setTimeout(() => {
        bot.setControlState('jump', false); // Zıplama işlemi bittiğinde durdur
      }, 100); // 100 milisaniye boyunca zıpla

      // Aşağı hareket için botu biraz süreyle 'sneak' modunda bırakabiliriz
      bot.setControlState('sneak', true); // Aşağı inme gibi bir etki yapabiliriz
      setTimeout(() => {
        bot.setControlState('sneak', false); // Sneak işlemi bittiğinde durdur
      }, 100); // 100 milisaniye
    }, 5000); // Her 5 saniyede bir yukarı-aşağı hareket et
  });

  // Eğer bot hata alırsa bu mesajı yazdırır
  bot.on('error', (err) => {
    console.log('Bot hata verdi:', err);
  });

  // Bot bağlantısı kesilirse, yeniden bağlanmak için 5 saniye bekler
  bot.on('end', () => {
    console.log('Bot sunucudan atıldı, yeniden bağlanılıyor...');
    setTimeout(startBot, 5000);  // 5 saniye sonra yeniden başlat
  });
}

// Botu başlat
startBot();
