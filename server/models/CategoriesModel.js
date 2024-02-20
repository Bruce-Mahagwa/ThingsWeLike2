const mongoose = require("mongoose");

const Categories = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  spaces: [
    {
      spaceName: {
        type: String,
      },
      spaceId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
});

module.exports = mongoose.model("CategoriesModel", Categories);
