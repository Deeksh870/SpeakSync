const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const fs = require("fs");

dotenv.config();

const app = express();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());


// Multer Storage Setup
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },

});

const upload = multer({ storage });


// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});


// Upload + Whisper Transcription Route
app.post("/upload", upload.single("audio"), async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No File Uploaded",
      });
    }

    console.log("Audio Received");

    const transcription = await client.audio.transcriptions.create({

      file: fs.createReadStream(req.file.path),

      model: "whisper-1",

    });

    console.log(transcription.text);

    res.json({
      message: "Transcription Success",
      text: transcription.text,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Transcription Failed",
    });

  }

});


app.listen(8000, () => {
  console.log("Server running on port 8000");
});