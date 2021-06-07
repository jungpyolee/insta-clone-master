const express = require("express");
const router = express.Router();

const { Notification } = require("../models/Notification");

//=================================
//             Notification
//=================================

router.post("/getNotify", (req, res) => {
  Notification.find({ myId: req.body.myId, notificationType: "comment" })
    .populate("userId")
    .exec((err, commentNotify) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res
        .status(200)
        .json({ success: true, commentNotify: commentNotify });
    });
});

module.exports = router;
