import cron from 'node-cron';
import fetch from 'node-fetch';

// ⏰ Runs every 1 minutes
cron.schedule('*/1 * * * *', async () => {
  console.log('🔁 Checking weather...');

  const lat = 23.03;
  const lon = 72.58;

  try {
    const res = await fetch(`http://localhost:3000/api/send-whatsapp?lat=${lat}&lon=${lon}`);
    const data = await res.json();

    if (data.alertSent) {
      console.log('✅ WhatsApp alert sent for:', data.city);
    } else {
      console.log('ℹ️ No alert needed:', data.reason);
    }
  } catch (err) {
    console.error('❌ Cron failed:', err.message);
  }
});
