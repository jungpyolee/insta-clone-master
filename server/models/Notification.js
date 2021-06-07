const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    postId: {
      type: Schema.Types.ObjectId,
      ref: "Photo",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },

    myId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    followId: {
      type: Schema.Types.ObjectId,
      ref: "Follow",
    },
    notificationType: {
      type: String,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = { Notification };
