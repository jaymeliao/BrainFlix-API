const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
const videosRoute = require("./routes/videos");
app.use("/", videosRoute);
const PORT = process.env.PORT || 5051;
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${process.env.PORT}`);
});