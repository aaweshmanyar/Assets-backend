const express = require('express');
const router = express.Router();
const { sendNotification } = require('../controllers/notifController');

router.post('/', sendNotification);

module.exports = router;
