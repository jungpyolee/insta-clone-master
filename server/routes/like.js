const express = require("express");
const router = express.Router();

const { Like } = require("../models/Like");
const { Notification } = require("../models/Notification");

//=================================
//             Like
//=================================

router.post("/getLikes", (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId };
  } else {
    variable = { commentId: req.body.commentId };
  }

  Like.find(variable)
    .populate("userId")
    .exec((err, likes) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, likes });
    });
});

router.post("/uplike", (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  // Like COllection에 클릭 정보 넣기

  const like = new Like(variable);
  like.save((err, likeResult) => {
    if (err) return res.status(400).json({ success: false, err });

    Like.find({ _id: likeResult._id })
      .populate("userId")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, result: result });
      });
  });
});

router.post("/unlike", (req, res) => {
  let variable = {};

  if (req.body.postId) {
    variable = { postId: req.body.postId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  // Like COllection에 클릭 정보 지우기

  Like.findOneAndDelete(variable)
    .populate("userId")
    .exec((err, unlikeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      return res
        .status(200)
        .json({ success: true, unlikeResult: unlikeResult });
    });
});
module.exports = router;
