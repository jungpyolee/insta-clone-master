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

router.get("/photos", auth, (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Photo.find({ writer: req.user._id })
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

module.exports = router;
