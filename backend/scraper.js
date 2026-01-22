// backend/scraper.js
const axios = require('axios');

// This function mimics collecting data
const scrapeData = async () => {
  try {
    console.log("🕷️ Starting data collection...");
    
    // Example: Fetching Bitcoin price
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    
    const data = {
      source: 'CoinGecko',
      item: 'Bitcoin',
      price: response.data.bitcoin.usd,
      timestamp: new Date()
    };

    console.log("✅ Data collected:", data);
    return data;
  } catch (error) {
    console.error("❌ Scraping failed:", error.message);
    return null;
  }
};

module.exports = { scrapeData };