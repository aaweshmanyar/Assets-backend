const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const assetRoutes = require('./routes/assetRoutes');
const qrCodeRoutes = require('./routes/qrCodeRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json()); 

app.use('/api/assets', assetRoutes);
app.use('/api', qrCodeRoutes); // Routes like /api/assets/:id/generate-qrcode and /api/qrcodes/log
app.use('/api/auth', authRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
