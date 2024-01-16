const express = require("express");
const fs = require("fs");
const router = express.Router();
const videoList = require("../data/videos.json");
const { v4: uuidv4 } = require("uuid");

router
  .route("/videos")
  .get((req, res) => {
    const allVideos = fs.readFileSync("./data/videos.json", "utf-8");
    res.json(JSON.parse(allVideos));
  })

  .post((req, res) => {
    const allVideos = fs.readFileSync("./data/videos.json", "utf-8");
    const jsonAllVideos = JSON.parse(allVideos);

    const newVideo = {
      id: uuidv4(),
      title: req.body.title,
      channel: "Default Channel",
      image: "./images/Upload-video-preview.jpg",
      description: req.body.description,
      views: 0,
      likes: 0,
      duration: 0,
      video: "https://project-2-api.herokuapp.com/stream",
      timestamp: new Date().getTime(),
      comments: [],
    };

    jsonAllVideos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(jsonAllVideos));
    res.status(201).json(jsonAllVideos);
  });

router.get("/videos/:videoId", (req, res) => {
  const allVideos = fs.readFileSync("./data/videos.json", "utf-8");
  const jsonAllVideos = JSON.parse(allVideos);

  const foundVideo = jsonAllVideos.find(
    (video) => video.id === req.params.videoId
  );

  foundVideo ? res.send(foundVideo) : res.status(404).send("Video not found");
});

module.exports = router;
