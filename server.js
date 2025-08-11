const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const assetRoutes = require('./routes/assetRoutes');
const notifRoutes = require('./routes/notifRoutes');


// Now you can access environment variables using process.env
const appId = process.env.ONESIGNAL_APP_ID;
const restApiKey = process.env.ONESIGNAL_REST_API_KEY;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all origins -- adjust for production
app.use(bodyParser.json()); // Parse incoming JSON payloads

// Mount asset routes under /api/assets
app.use('/api/assets', assetRoutes);
app.use('/api/notify', notifRoutes);


app.get('/', (req, res) => {
  res.send('Assets Management Backend API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
