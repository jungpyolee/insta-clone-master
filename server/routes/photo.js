const express = require("express");
const router = express.Router();
const multer = require("multer");

const { Photo } = require("../models/Photo");

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");

//=================================
//             Photo
//=================================

router.post("/", (req, res) => {
  const photo = new Photo(req.body);

  photo.save((err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({ success: true });
  });
});

router.post("/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return req.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/detail", (req, res) => {
  Photo.find({ _id: req.body.postId })
    .populate("writer")
    .exec((err, photoInfo) => {
      if (err) {
        return req.json({ success: false, err });
      }
      return res.json({
        success: true,
        photoinfo: photoInfo,
      });
    });
});

router.get("/photos", (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 20;
  let skip = req.query.skip ? parseInt(req.query.skip) : 0;

  Photo.find({ writer: req.query.id })
    .populate("writer")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec((err, photoInfo) => {
      console.log(photoInfo);
      if (err) return res.status(400).json({ success: false, err });
      return res
        .status(200)
        .json({ success: true, photoInfo, postSize: photoInfo.length });
    });
});

router.post("/postLength", (req, res) => {
  Photo.find({ writer: req.body.id }).exec((err, postLength) => {
    if (err) return res.status(400).json({ success: false, err });
    return res
      .status(200)
      .json({ success: true, postLength: postLength.length });
  });
});

module.exports = router;
