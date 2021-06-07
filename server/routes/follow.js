const express = require("express");
const router = express.Router();

const { Follow } = require("../models/Follow");
const { Notification } = require("../models/Notification");

//=================================
//           Follow
//=================================

router.post("/getFollower", (req, res) => {
  Follow.find({ followTo: req.body.getFollower }) //페이지주인이 누구한테 팔로잉받는지
    .populate("followFrom")
    .exec((err, follower) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, follower: follower });
    }); //여기의 followFrom을 맵하면 누가 페이지주인을 팔로우하는지 목록이나옴
});

router.post("/getFollowing", (req, res) => {
  Follow.find({ followFrom: req.body.getFollowing }) //페이지주인이 누구를 팔로우하는지
    .populate("followTo")
    .exec((err, following) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, following: following });
    }); //여기의 followFrom을 맵하면 페이지주인이 누구를 팔로우하는지 목록이나옴
});
router.post("/follow", (req, res) => {
  const follow = new Follow(req.body);
  follow.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/doIfollowyou", (req, res) => {
  Follow.find({ followTo: req.body.pageId, followFrom: req.body.userId }).exec(
    (err, yesorno) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, yesorno: yesorno.length });
    }
  );
});

router.post("/doyoufollowme", (req, res) => {
  Follow.find({ followTo: req.body.userId, followFrom: req.body.pageId }).exec(
    (err, yesorno) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, yesorno: yesorno.length });
    }
  );
});

router.delete("/unfollow", (req, res) => {
  Follow.findOneAndDelete(req.body).exec((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
