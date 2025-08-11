const express = require('express');
const router = express.Router();
const qrCodeCtrl = require('../controllers/qrCodeController');

// Route to update QR code flag on asset
router.post('/assets/:id/generate-qrcode', qrCodeCtrl.generateQRCodeFlagUpdate);

// Route to log QR code generation info
router.post('/qrcodes/log', qrCodeCtrl.logQRCodeGeneration);

module.exports = router;
