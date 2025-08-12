const db = require('../db');

// Controller to get dashboard statistics with a single query
exports.getDashboardStats = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM assets) AS totalAssets,
        (SELECT COUNT(*) FROM assets WHERE Qrcode = 1) AS qrCodesGenerated,
        (SELECT COUNT(*) FROM users) AS totalUsers,
        (SELECT COUNT(*) FROM assets WHERE status = 'Active') AS activeAssets
    `);

    // rows is an array with a single result object containing all counts
    const stats = {
      totalAssets: rows[0].totalAssets,
      qrCodesGenerated: rows[0].qrCodesGenerated,
      totalUsers: rows[0].totalUsers,
      activeAssets: rows[0].activeAssets
    };

    res.json({ success: true, data: stats });

  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
