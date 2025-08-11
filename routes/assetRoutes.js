const express = require('express');
const router = express.Router();

const {
  getAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
} = require('../controllers/assetController');

// GET all assets
router.get('/', getAssets);

// GET an asset by ID
router.get('/:id', getAssetById);

// POST create a new asset
router.post('/', createAsset);

// PUT update an existing asset
router.put('/:id', updateAsset);

// DELETE an asset
router.delete('/:id', deleteAsset);

module.exports = router;
