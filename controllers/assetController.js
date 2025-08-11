// Simulated in-memory asset list to start
let assets = [];
let currentId = 1;

const getAssets = (req, res) => {
  res.json(assets);
};

const getAssetById = (req, res) => {
  const id = parseInt(req.params.id);
  const asset = assets.find(a => a.id === id);
  if (!asset) return res.status(404).json({ message: "Asset not found" });
  res.json(asset);
};

const createAsset = (req, res) => {
  const asset = {
    id: currentId++,
    ...req.body,
  };
  assets.push(asset);
  res.status(201).json(asset);
};

const updateAsset = (req, res) => {
  const id = parseInt(req.params.id);
  const index = assets.findIndex(a => a.id === id);
  if (index === -1) return res.status(404).json({ message: "Asset not found" });
  assets[index] = { id, ...req.body };
  res.json(assets[index]);
};

const deleteAsset = (req, res) => {
  const id = parseInt(req.params.id);
  const index = assets.findIndex(a => a.id === id);
  if (index === -1) return res.status(404).json({ message: "Asset not found" });
  assets.splice(index, 1);
  res.json({ message: "Asset deleted successfully" });
};

module.exports = {
  getAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
};
