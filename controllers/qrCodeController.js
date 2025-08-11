const db = require('../db');

exports.generateQRCodeFlagUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    // Update Qrcode flag to 1 for asset with given id
    await db.execute("UPDATE assets SET Qrcode = 1 WHERE id = ?", [id]);

    res.status(200).json({ success: true, message: "QR code flag updated" });
  } catch (err) {
    console.error('Error updating QR code flag:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.logQRCodeGeneration = async (req, res) => {
  try {
    const { assetId, assetName } = req.body;

    await db.execute(
      "INSERT INTO qr_code_generation (asset_id, asset_name) VALUES (?, ?)",
      [assetId, assetName]
    );

    res.status(201).json({ success: true, message: "QR code generation logged" });
  } catch (err) {
    console.error('Error logging QR code generation:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};
