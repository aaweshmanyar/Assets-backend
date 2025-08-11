const db = require('../db');

exports.addAsset = async (req, res) => {
  try {
    const {
      assetName,
      assetType,
      serialNumber,
      purchaseDate,
      purchaseCost,
      vendor,
      department,
      assignedToId,
      assignedTo,
      mobileNumber,
      status,
      warrantyExpiry,
      description
    } = req.body;

    // Get image data as Buffer from memory
    const imageData = req.file ? req.file.buffer : null;

    await db.execute(
      "CALL add_asset(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        assetName,
        assetType,
        serialNumber,
        purchaseDate || null,
        purchaseCost || null,
        vendor,
        department,
        assignedToId || null,
        assignedTo,
        mobileNumber,
        status || 'Active',
        warrantyExpiry || null,
        description,
        imageData // send as LONGBLOB buffer
      ]
    );

    res.status(201).json({ success: true, message: 'Asset added successfully' });
  } catch (err) {
    console.error('Error adding asset:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.getAllAssets = async (req, res) => {
  try {
    const [rows] = await db.execute("CALL get_all_assets()");
    // rows is an array, since CALL returns result sets wrapped in arrays
    // rows[0] contains the actual data from the SELECT inside the procedure
    res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('Error fetching assets:', err);
    res.status(500).json({ success: false, error: err.message });
  }
}; 







exports.updateAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      assetName,
      assetType,
      serialNumber,
      purchaseDate,
      purchaseCost,
      vendor,
      department,
      assignedTo,
      mobileNumber,
      status,
      warrantyExpiry,
      description
    } = req.body;

    const imageData = req.file ? req.file.buffer : null;

    await db.execute(
      "CALL update_asset(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        id,
        assetName,
        assetType,
        serialNumber || null,
        purchaseDate || null,
        purchaseCost || null,
        vendor || null,
        department || null,
        assignedTo || null,
        mobileNumber || null,
        status || 'Active',
        warrantyExpiry || null,
        description || null,
        imageData
      ]
    );

    res.status(200).json({ success: true, message: 'Asset updated successfully' });
  } catch (err) {
    console.error('Error updating asset:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};


// controllers/assetController.js
exports.getAssetById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute(
      "SELECT id, asset_name, asset_type, serial_number, purchase_date, purchase_cost, vendor, department, assigned_to_id, assigned_to_name, mobile_number, status, warranty_expiry, description, IsDeleted FROM assets WHERE id=? LIMIT 1",
      [id]
    );
    if (rows && rows.length > 0) {
      res.json({ success: true, data: rows[0] });
    } else {
      res.status(404).json({ success: false, message: "Asset not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
