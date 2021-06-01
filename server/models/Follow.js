const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followSchema = mongoose.Schema(
  {
    followTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    followFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Follow = mongoose.model("Follow", followSchema);

module.exports = { Follow };
