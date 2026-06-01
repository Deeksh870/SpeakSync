<div align="center">

<br/>

# 🎙️ SpeakSync

### AI-Powered Speech-to-Text Web Application

*Turn your voice into text — live, recorded, or uploaded.*

<br/>

[![Live Demo](https://img.shields.io/badge/Live%20Demo-speak--sync--seven.vercel.app-00d4ff?style=for-the-badge&logo=vercel&logoColor=white)](https://speak-sync-seven.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-speaksync.onrender.com-00e5a0?style=for-the-badge&logo=render&logoColor=white)](https://speaksync.onrender.com)
[![GitHub](https://img.shields.io/badge/Source-Deeksh870%2FSpeakSync-8b5cf6?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Deeksh870/SpeakSync)

<br/>

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

<br/>

</div>

---

## ✨ Features

| Module | Description |
|--------|-------------|
| 🔐 **User Authentication** | Secure Sign Up / Sign In via Clerk. Protected access and session management. |
| 🎤 **Live Speech Recognition** | Real-time transcription using the Browser Speech Recognition API. |
| 🎙️ **Record & Convert** | Record your full speech, then generate a clean final transcript. |
| 📁 **Audio File Upload** | Upload MP3 / WAV / M4A — transcribed via Faster-Whisper AI. |
| 📜 **Speech History** | All past transcriptions stored with timestamps. Clear anytime. |
| 🎨 **Modern Dashboard** | Dark-themed UI with sidebar navigation, stat cards, and live activity feed. |

---

## 🚀 Live Demo

> **Frontend** → [speak-sync-seven.vercel.app](https://speak-sync-seven.vercel.app)
>
> **Backend API** → [speaksync.onrender.com](https://speaksync.onrender.com)

---

## 🏗️ Architecture

```
User (Browser)
     │
     ▼
React Frontend  ──────────────────────────────────────────
(Vite + Clerk)       Browser Speech Recognition API
     │                       ▲
     │ audio file             │ live text
     ▼                       │
Express Backend  ◄────────────
(Node.js + Multer)
     │
     ▼
Python Script
(transcribe.py)
     │
     ▼
Faster-Whisper Model
(HuggingFace)
     │
     ▼
Transcribed Text  ──► JSON Response ──► React Frontend
```

---

## 🛠️ Tech Stack

### Frontend
- **React.js** + **Vite** — fast, modern SPA
- **Axios** — HTTP requests to the backend
- **Clerk** — authentication and user management

### Backend
- **Node.js** + **Express.js** — REST API server
- **Multer** — audio file upload handling
- **Python** — bridges Node to the Whisper model

### AI & Speech
- **Faster-Whisper** — highly optimised Whisper model for transcription
- **HuggingFace Models** — model hosting and inference
- **Web Speech Recognition API** — browser-native live transcription

### Deployment
- **Vercel** — frontend hosting
- **Render** — backend hosting
- **GitHub** — version control

---

## 📂 Project Structure

```
SpeakSync/
│
├── client/                  # React frontend
│   ├── src/
│   │   ├── App.jsx          # Main app + all tab views
│   │   ├── main.jsx         # Clerk auth + routing
│   │   └── index.css
│   ├── public/
│   └── package.json
│
├── server/                  # Express backend
│   ├── uploads/             # Temp audio file storage
│   ├── server.js            # API routes + Multer config
│   ├── requirements.txt     # Python dependencies
│   └── package.json
│
├── transcribe.py            # Faster-Whisper inference script
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Deeksh870/SpeakSync.git
cd SpeakSync
```

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

> Add your Clerk publishable key to `.env`:
> ```
> VITE_CLERK_PUBLISHABLE_KEY=your_key_here
> ```

### 3. Backend

```bash
cd server
npm install
node server.js
```

### 4. Python dependencies

```bash
pip install faster-whisper
```

---

## 📸 Application Modules

### 🏠 Dashboard
Central hub with stat cards, live monitor, recent activity feed, and quick-access feature cards.

### 🎤 Live Speech
Converts spoken words into text in real time using the browser's built-in Speech Recognition API. Every word appears instantly as you speak.

### 🎙️ Record & Convert
Records microphone input continuously. When you stop recording, the full transcript is generated and saved to history automatically.

### 📁 Upload Audio
Accepts audio file uploads and sends them to the Express backend, which runs `transcribe.py` using Faster-Whisper to return a full transcript.

### 📜 History
Displays all transcription records (type, filename, text, timestamp) stored in `localStorage`. Supports full history clear.

---

## 🔍 Future Enhancements

- [ ] 🌐 Multi-language transcription (90+ languages via Whisper)
- [ ] 🔄 Real-time translation support
- [ ] 📄 Export transcription as PDF
- [ ] 🗄️ Cloud database integration (replace localStorage)
- [ ] 👤 Speaker diarization / identification
- [ ] 🤖 AI summarization of long transcripts

---

## 👩‍💻 Developed By

**Deekshitha S** — Final Year Engineering Project

---

## 📄 License

This project is developed for educational and learning purposes.
