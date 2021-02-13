const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlSchema = new Schema(
  {
    urlCode: String,
    longUrl: String,
    shortUrl: String,
  },
  { timestamps: true }
);

const Url = mongoose.model("urls", UrlSchema);

module.exports = Url;
