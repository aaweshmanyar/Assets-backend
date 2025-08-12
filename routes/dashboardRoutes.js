const express = require('express');
const router = express.Router();

const dashboardCtrl = require('../controllers/dashboardController');


// GET Dashboard statistics
router.get('/dashboard/stats',  dashboardCtrl.getDashboardStats);

module.exports = router;
