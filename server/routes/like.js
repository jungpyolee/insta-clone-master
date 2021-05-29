const express = require("express");
const router = express.Router();

const { Like } = require("../models/Like");

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

  Like.find(variable).exec((err, likes) => {
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
    return res.status(200).json({ success: true, likeResult });
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

  Like.findOneAndDelete(variable).exec((err, unlikeResult) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, unlikeResult });
  });
});
module.exports = router;
