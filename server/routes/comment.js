const express = require("express");
const router = express.Router();

const { Comment } = require("../models/Comment");
const { Notification } = require("../models/Notification");

//=================================
//             Comment
//=================================

router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        res.json({ success: true, result });
      });
  });
});

router.post("/saveCommentNotify", (req, res) => {
  const notification = new Notification(req.body);

  notification.save((err, notify) => {
    if (err) return res.json({ success: false, err });
    res.json({ success: true });
  });
});
router.post("/getComments", (req, res) => {
  Comment.find({ postId: req.body.postId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

module.exports = router;
