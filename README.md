# 🎙️ SpeakSync

SpeakSync is an AI-powered Speech-to-Text web application that enables users to convert spoken audio into text using multiple transcription methods. The application provides real-time speech recognition, audio recording, audio file upload, transcription history management, and secure user authentication.

---

## 🚀 Live Demo

### Frontend
https://speak-sync-seven.vercel.app

### Backend
https://speaksync.onrender.com

### GitHub Repository
https://github.com/Deeksh870/SpeakSync

---

## ✨ Features

### 🔐 User Authentication
- Secure Sign Up and Sign In
- User session management using Clerk Authentication
- Protected application access

### 🎤 Live Speech Recognition
- Real-time speech-to-text conversion
- Instant transcription display
- Browser-based speech recognition

### 🎙️ Record & Convert
- Record audio directly from the microphone
- Convert recorded speech into text
- Save transcription results automatically

### 📁 Audio File Upload
- Upload audio files
- AI-powered transcription using Faster-Whisper
- Supports speech-to-text conversion from recorded files

### 📜 Speech History
- Stores transcription records
- Displays timestamps for each entry
- View previous transcriptions
- Clear history functionality

### 🎨 Modern User Interface
- Responsive design
- Dark-themed dashboard
- Sidebar navigation
- User-friendly workflow

---

## 🏗️ System Architecture

```text
User
  │
  ▼
React Frontend (Vite)
  │
  ▼
Express.js Backend
  │
  ▼
Faster-Whisper Model
  │
  ▼
Transcribed Text
```

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- CSS
- Axios
- Clerk Authentication

### Backend
- Node.js
- Express.js
- Multer
- Python

### AI & Speech Processing
- Faster-Whisper
- Hugging Face Models
- Browser Speech Recognition API

### Deployment
- Vercel (Frontend)
- Render (Backend)
- GitHub (Version Control)

---

## 📂 Project Structure

```text
SpeakSync
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── uploads
│   ├── server.js
│   ├── requirements.txt
│   └── package.json
│
├── transcribe.py
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Deeksh870/SpeakSync.git
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
node server.js
```

### Python Dependencies

```bash
pip install faster-whisper
```

---

## 📸 Application Modules

### Dashboard
Central hub providing access to all speech-to-text functionalities.

### Live Speech
Converts live spoken words into text instantly.

### Record & Convert
Records microphone input and converts speech into text.

### Upload Audio
Uploads audio files and generates transcriptions using Faster-Whisper.

### History
Displays all previous transcription records with timestamps.

---

## 🔍 Future Enhancements

- Multi-language transcription
- Translation support
- Download transcription as PDF
- Cloud database integration
- Speaker identification
- Audio summarization using Generative AI

---

## 👩‍💻 Developed By

**Deekshitha S**

Final Year Engineering Project

---

## 📄 License

This project is developed for educational and learning purposes.
