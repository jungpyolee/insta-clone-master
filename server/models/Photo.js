const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    description: {
      type: String,
    },

    location: {
      type: String,
    },
    privacy: {
      type: Number,
    },

    images: {
      type: Array,
      default: [],
    },

    filePath: {
      type: String,
    },
  },
  { timestamps: true }
);

const Photo = mongoose.model("Photo", photoSchema);

module.exports = { Photo };
