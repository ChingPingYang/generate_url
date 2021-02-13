const express = require("express");
const server = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

// @ Connect Database
connectDB();

// @ Init middleware
server.use(express.json({ extended: false }));

// @ Routes
server.use("/", require("./routes/redirect"));
server.use("/api/url", require("./routes/url"));

server.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
