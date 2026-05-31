const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const { exec } = require("child_process");

dotenv.config();

const app = express();

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


// Upload + Faster Whisper Route
app.post("/upload", upload.single("audio"), async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        message: "No File Uploaded",
      });

    }

    console.log("Audio Received");
    console.log(req.file.path);

    exec(
      `source ../whisper-env/bin/activate && python ../transcribe.py "${req.file.path}"`,
      { shell: "/bin/zsh" },
      (error, stdout, stderr) => {

        if (error) {

          console.log(error);

          return res.status(500).json({
            message: "Transcription Failed",
            error: error.message,
          });

        }

        if (stderr) {
          console.log(stderr);
        }

        console.log("Transcript:");
        console.log(stdout);

        res.json({
          message: "Transcription Success",
          text: stdout.trim(),
        });

      }
    );

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