// dependencies
const express = require("express");
// variables
const router = express.Router();
const {
  getCategories,
  getCategory,
} = require("../controllers/categoriesController");
const { searchSpaces } = require("../controllers/spaceController");

router.get("/", getCategories);
router.get("/searchcategories", searchSpaces);
router.get("/:categoryName", getCategory);

module.exports = router;
