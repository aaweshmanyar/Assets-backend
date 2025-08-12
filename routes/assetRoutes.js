const express = require('express');
const router = express.Router();
const assetCtrl = require('../controllers/assetController');
const multer = require('multer');

// In-memory storage for images
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET all assets
router.get('/', assetCtrl.getAllAssets);

// Search & paginate assets
router.get('/search', assetCtrl.searchAssets);

// POST create asset
router.post('/', upload.single('image'), assetCtrl.addAsset);

// PUT update asset
router.put('/:id', upload.single('image'), assetCtrl.updateAsset);

//Get data by id
router.get('/:id', assetCtrl.getAssetById);


module.exports = router;
