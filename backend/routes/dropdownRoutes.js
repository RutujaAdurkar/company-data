const express = require("express");
const router = express.Router();
const dropdownController = require("../controllers/dropdownController");

router.get("/statistic-groups", dropdownController.getStatisticGroups);
router.get("/masters", dropdownController.getMasters);
router.get("/product-focus", dropdownController.getProductFocus);
router.get("/substitute-items", dropdownController.getSubstituteItems);
router.get("/type-selections", dropdownController.getTypeSelections);

module.exports = router;


