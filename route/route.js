const express = require("express");
const router  = express.Router();

const imageController   = require("../controllers/imageHandling.controllers");


router.get("/", (req, res) => { res.send("Image Handler" );});

router.post('/image/upload', imageController.uploadPicture);
router.get('/image/download/:id', imageController.downloadPicture);

module.exports = router;