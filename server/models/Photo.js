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

    views: {
      type: Number,
      default: 0,
    },

    hashTags: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

photoSchema.index({
  hashTags: "text",
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = { Photo };
