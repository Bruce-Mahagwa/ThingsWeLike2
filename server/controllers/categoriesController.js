// files
const CategoriesModel = require("../models/CategoriesModel");

const getCategories = async (req, res) => {
  try {
    const categories = await CategoriesModel.find({}).select("-spaces");
    return res.status(200).json({ categories });
  } catch (e) {
    console.log(e);
    res.status(404).send("we could not fetch categories");
  }
};

const getCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const category = await CategoriesModel.findOne({ category: categoryName });
    return res.status(200).json({ category });
  } catch (e) {
    console.log(e);
    res.status(500).send("Could not retrieve category details");
  }
};
module.exports = { getCategories, getCategory };
