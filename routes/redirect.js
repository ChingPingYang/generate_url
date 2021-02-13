const express = require("express");
const router = express.Router();
const Url = require("../models/Url");

router.get("/:code", async (req, res) => {
  const urlCode = req.params.code;
  try {
    const url = await Url.findOne({ urlCode });
    if (!url) return res.status(401).json({ msg: "No url found" });
    return res.redirect(url.longUrl);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
