const express = require('express');
const ee = require('@google/earthengine');
const app = express();
const PORT = process.env.PORT || 3000;

// Step 1: Decode and parse service account from env variable
let serviceAccount;
try {
  console.log("Parsing service account JSON...");
  serviceAccount = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_JSON, 'base64').toString('utf-8')
  );
} catch (err) {
  console.error("❌ Failed to parse service account JSON:", err);
  process.exit(1);
}

// Step 2: Authenticate with Google Earth Engine
console.log("Authenticating with Google Earth Engine...");
ee.data.authenticateViaPrivateKey(serviceAccount, () => {
  console.log("✅ Authenticated successfully.");

  ee.initialize(null, null, () => {
    console.log("✅ Earth Engine initialized.");

    // Only now is it safe to handle map requests
    app.get('/api/gee-map-url', (req, res) => {
      const image = ee.Image('MODIS/006/MOD13A2/2017_01_01').select('NDVI');
      const visParams = { min: 0, max: 9000, palette: ['blue', 'white', 'green'] };

      image.getMap(visParams, (mapIdObj) => {
        console.log("🛰 GEE map response:", mapIdObj);  // <- log what you got

        if (mapIdObj.error) {
          console.error("❌ getMap error:", mapIdObj.error.message);
          res.status(500).json({ error: mapIdObj.error.message });
        } else {
          if (!mapIdObj.token) {
            console.warn("⚠️ Token is missing — likely unauthenticated.");
          }
          const tileUrl = `https://earthengine.googleapis.com/map/${mapIdObj.mapid}/{z}/{x}/{y}?token=${mapIdObj.token}`;
          res.json({ tileUrl });
        }
      });
    });

    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  }, (initErr) => {
    console.error("❌ Earth Engine initialization error:", initErr);
    process.exit(1);
  });
}, (authErr) => {
  console.error("❌ Earth Engine authentication error:", authErr);
  process.exit(1);
});


// Optional: catch any other unhandled errors
process.on('uncaughtException', (err) => {
  console.error("❌ Uncaught error:", err);
});
