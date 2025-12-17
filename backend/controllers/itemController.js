const itemModule = require("../modules/itemModule");

module.exports = {
  getItems: async (req, res) => {
    try {
      const data = await itemModule.getAllItems();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to load items" });
    }
  },

  addItem: async (req, res) => {
    try {
      await itemModule.insertItem(req.body);
      res.json({ message: "Item added successfully" });
    }catch (err) {
      console.error("❌ INSERT ERROR:", err);
      res.status(500).json({ error: err.message });
    }
  },

  updateItem: async (req, res) => {
    try {
      await itemModule.updateItem(req.params.id, req.body);
      res.json({ message: "Updated successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to update" });
    }
  },

  deleteItem: async (req, res) => {
    try {
      await itemModule.deleteItem(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete" });
    }
  }
};
