const express = require('express');

const router = express.Router();
const { dataUri } = require('../services/dataUri');
const { cloudinaryUpload } = require('../services/cloudinary');
const Cloudinary = require('../models/cloudinary-image');

const { onlyAuthUser } = require('../controllers/users');
const upload = require('../services/multer');
const singleUpload = upload.single('image');

const singleUploadCtrl = (req, res, next) => {
  singleUpload(req, res, error => {
    if (error) {
      return res.sendApiError({
        title: 'Upload Error',
        detail: error.message,
      });
    }

    next();
  });
};

router.post('', onlyAuthUser, singleUploadCtrl, async (req, res) => {
  try {
    if (!req.file) {
      console.log('here 2');
      throw new Error('Image is not present!');
    }

    const file64 = dataUri(req.file);
    const result = await cloudinaryUpload(file64.content);
    const cimage = new Cloudinary({
      url: result.secure_url,
      cloudinaryId: result.public_id,
    });

    const savedImage = await cimage.save();

    return res.json(savedImage);
  } catch (error) {
    res.sendApiError({
      title: 'Upload Error.',
      detail:
        error.message ||
        'Something went wrong with image upload. Please try again.',
    });
  }
});

module.exports = router;

// 1.) Configure multer w/ storage and cb

/// 2.) Choose fn to use in mid-ware

// 3.) Will get error back in cb --> if good req will have file on it
