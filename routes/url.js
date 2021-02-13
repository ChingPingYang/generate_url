const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const { nanoid } = require("nanoid");
const config = require("config");
const Url = require("../models/Url");

router.post("/", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("base_URL");
  // Checking if base Url is valid

  if (!validUrl.isUri(longUrl)) {
    return res.status(401).json({ msg: "invalid Url" });
  }

  try {
    // Checking if the Url has been created
    const existUrl = await Url.findOne({ longUrl });
    if (existUrl) {
      return res.status(200).json(existUrl);
    } else {
      // If not exist, create one
      const urlCode = nanoid();
      const shortUrl = `${baseUrl}/${urlCode}`;
      const newUrl = new Url({
        urlCode,
        longUrl,
        shortUrl,
      });
      await newUrl.save();
      return res.status(200).json(newUrl);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
