const dropdownModule = require("../modules/dropdownModule");

module.exports = {
  getStatisticGroups: async (req, res) => {
    const data = await dropdownModule.getStatisticGroups();
    res.json(data);
  },
  
  getMasters: async (req, res) => {
    const data = await dropdownModule.getMasters();
    res.json(data);
  },

  getProductFocus: async (req, res) => {
    const data = await dropdownModule.getProductInFocus();
    res.json(data);
  },

  getSubstituteItems: async (req, res) => {
    const data = await dropdownModule.getSubstituteItems();
    res.json(data);
  },
  getTypeSelections: async (req, res) => {
  const data = await dropdownModule.getTypeSelections();
  res.json(data);
}
};
