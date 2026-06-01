<div align="center">
<br/>
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00d4ff,100:8b5cf6&height=200&section=header&text=SpeakSync&fontSize=72&fontColor=ffffff&fontAlignY=38&desc=AI-Powered%20Speech-to-Text%20Web%20App&descAlignY=58&descSize=18&animation=fadeIn" width="100%"/>

<br/>

<a href="https://speak-sync-seven.vercel.app" target="_blank">
  <img src="https://img.shields.io/badge/🌐%20Live%20Demo-speak--sync.vercel.app-00d4ff?style=for-the-badge&labelColor=0d1117"/>
</a>
&nbsp;
<a href="https://speaksync.onrender.com" target="_blank">
  <img src="https://img.shields.io/badge/⚙️%20Backend-speaksync.onrender.com-00e5a0?style=for-the-badge&labelColor=0d1117"/>
</a>
&nbsp;
<a href="https://github.com/Deeksh870/SpeakSync" target="_blank">
  <img src="https://img.shields.io/badge/⭐%20Star%20on%20GitHub-SpeakSync-8b5cf6?style=for-the-badge&labelColor=0d1117"/>
</a>

<br/><br/>

<img src="https://img.shields.io/badge/Status-Live%20%26%20Deployed-00e5a0?style=flat-square&labelColor=0d1117"/>
<img src="https://img.shields.io/badge/Made%20with-React%20%2B%20Vite-61dafb?style=flat-square&labelColor=0d1117&logo=react"/>
<img src="https://img.shields.io/badge/AI-Faster--Whisper-f59e0b?style=flat-square&labelColor=0d1117"/>
<img src="https://img.shields.io/badge/Auth-Clerk-6c47ff?style=flat-square&labelColor=0d1117&logo=clerk"/>
<img src="https://img.shields.io/badge/License-Educational-ff6b6b?style=flat-square&labelColor=0d1117"/>

<br/><br/>

> *Turn your voice into text — live, recorded, or uploaded.*
> *Accurate, instant, and beautifully simple.*

<br/>

</div>

---

<div align="center">

## 🎯 What is SpeakSync?

</div>

**SpeakSync** is a full-stack AI-powered Speech-to-Text web application that lets you transcribe audio in three powerful ways — speak live into your browser, record and convert later, or upload any audio file. Built as a Final Year Engineering Project, it combines the **Browser Speech Recognition API** for real-time transcription and **Faster-Whisper** (a highly optimised Whisper implementation) for file-based AI transcription.

<br/>

---

<div align="center">

## ✨ Features

</div>

<br/>

<table>
<tr>
<td width="50%">

### 🔐 User Authentication
Secure Sign Up and Sign In powered by **Clerk Authentication**. Session management, protected routes, and a personalised dashboard experience.

</td>
<td width="50%">

### 🎤 Live Speech Recognition
Real-time speech-to-text using the **Browser Speech Recognition API**. Every word appears on screen instantly as you speak — zero delay.

</td>
</tr>
<tr>
<td width="50%">

### 🎙️ Record & Convert
Record your complete speech without interruption. Hit stop when you're done — the full transcript is generated and **auto-saved to history**.

</td>
<td width="50%">

### 📁 Audio File Upload
Upload **MP3, WAV, or M4A** files. The backend passes them through **Faster-Whisper** for accurate AI-powered transcription.

</td>
</tr>
<tr>
<td width="50%">

### 📜 Speech History
Every transcription is saved with its **type, filename, and timestamp**. Browse all past sessions and clear history with one click.

</td>
<td width="50%">

### 🎨 Modern Dashboard
Dark-themed interface with **stat cards, live waveform monitor, recent activity feed**, and quick-access feature cards.

</td>
</tr>
</table>

<br/>

---

<div align="center">

## 🏗️ System Architecture

</div>

<br/>

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SpeakSync Architecture                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌──────────┐    ┌──────────────────────────────┐                  │
│   │          │    │      React Frontend (Vite)   │                  │
│   │  User    │───▶│   Clerk Auth  │  Dashboard   │                  │
│   │ Browser  │    │   Live Speech │  History     │                  │
│   │          │    └───────────────┬──────────────┘                  │
│   └──────────┘                   │                                  │
│                        audio file│upload (Axios)                    │
│                                  ▼                                  │
│                    ┌─────────────────────────┐                      │
│                    │   Express.js Backend    │                      │
│                    │   Node.js  │  Multer    │                      │
│                    └────────────┬────────────┘                      │
│                                 │ spawns                            │
│                                 ▼                                   │
│                    ┌─────────────────────────┐                      │
│                    │     transcribe.py       │                      │
│                    │   Faster-Whisper Model  │                      │
│                    │   (HuggingFace)         │                      │
│                    └────────────┬────────────┘                      │
│                                 │                                   │
│                                 ▼                                   │
│                    ┌─────────────────────────┐                      │
│                    │  JSON { text: "..." }   │                      │
│                    │  ──▶ React Frontend     │                      │
│                    └─────────────────────────┘                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

<br/>

---

<div align="center">

## 🛠️ Tech Stack

</div>

<br/>

<div align="center">

| Layer | Technology | Purpose |
|:---:|:---:|:---|
| ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | **React.js + Vite** | Frontend SPA with fast HMR |
| ![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white) | **Clerk Auth** | Sign in, Sign up, Sessions |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) | **Axios** | HTTP client for API calls |
| ![Node](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) | **Node.js + Express** | REST API backend server |
| ![Multer](https://img.shields.io/badge/Multer-FF6600?style=flat-square&logoColor=white) | **Multer** | Audio file upload handler |
| ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) | **Python** | Whisper inference bridge |
| ![HuggingFace](https://img.shields.io/badge/HuggingFace-FFD21E?style=flat-square&logo=huggingface&logoColor=black) | **Faster-Whisper** | AI speech transcription |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) | **Vercel** | Frontend deployment |
| ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=black) | **Render** | Backend deployment |

</div>

<br/>

---

<div align="center">

## 📂 Project Structure

</div>

<br/>

```
SpeakSync/
│
├── 📁 client/                     # React + Vite frontend
│   ├── 📁 src/
│   │   ├── 📄 App.jsx             # Core app — all tab views & logic
│   │   ├── 📄 main.jsx            # Clerk provider + auth routing
│   │   └── 📄 index.css          # Global base styles
│   ├── 📁 public/
│   └── 📄 package.json
│
├── 📁 server/                     # Node.js + Express backend
│   ├── 📁 uploads/                # Temporary audio file storage
│   ├── 📄 server.js              # API routes + Multer config
│   ├── 📄 requirements.txt       # Python dependencies
│   └── 📄 package.json
│
├── 📄 transcribe.py               # Faster-Whisper inference script
└── 📄 README.md
```

<br/>

---

<div align="center">

## ⚙️ Installation & Setup

</div>

<br/>

### Step 1 — Clone the repository

```bash
git clone https://github.com/Deeksh870/SpeakSync.git
cd SpeakSync
```

<br/>

### Step 2 — Frontend setup

```bash
cd client
npm install
npm run dev
```

> 💡 Create a `.env` file inside `/client` and add your Clerk publishable key:
> ```env
> VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
> ```

<br/>

### Step 3 — Backend setup

```bash
cd server
npm install
node server.js
```

<br/>

### Step 4 — Python dependencies

```bash
pip install faster-whisper
```

> ✅ Frontend runs at `http://localhost:5173` · Backend at `http://localhost:8000`

<br/>

---

<div align="center">

## 📸 Application Modules

</div>

<br/>

<details>
<summary><b>🏠 Dashboard</b> — click to expand</summary>
<br/>

The central hub of SpeakSync. Features:
- **Stat cards** — total transcriptions, uploads, live sessions, accuracy rate
- **Live waveform monitor** — animated bars showing microphone status
- **Recent activity feed** — last 4 transcription entries with timestamps
- **Usage breakdown** — visual progress bars per transcription mode
- **Quick-access feature cards** — jump directly to any module

</details>

<details>
<summary><b>🎤 Live Speech</b> — click to expand</summary>
<br/>

Uses the **Browser Web Speech Recognition API** for real-time transcription.
- Start/Stop listening with animated recording indicator
- Live text appears word-by-word as you speak
- Clear button to reset the transcript
- Works entirely in the browser — no upload needed

</details>

<details>
<summary><b>🎙️ Record & Convert</b> — click to expand</summary>
<br/>

Record your complete speech first, then convert it all at once.
- Press **Start Recording** — speak freely
- Press **Stop Recording** — full transcript generated instantly
- Auto-saved to Speech History with timestamp
- Ideal for longer speeches, meetings, or lectures

</details>

<details>
<summary><b>📁 Upload Audio</b> — click to expand</summary>
<br/>

Upload pre-recorded audio files for AI-powered transcription.
- Supports **MP3, WAV, M4A** and other audio formats
- File sent to the Express backend via Axios
- Backend spawns **transcribe.py** → **Faster-Whisper** processes the file
- Returns full transcript as JSON → displayed in the UI
- Auto-saved to Speech History

</details>

<details>
<summary><b>📜 Speech History</b> — click to expand</summary>
<br/>

Persistent log of all past transcription sessions.
- Shows **type** (Live / Record / Upload), **filename**, **text**, and **date**
- Stored in `localStorage` — persists across sessions
- Clear all history with one click

</details>

<br/>

---

<div align="center">

## 🔍 Roadmap

</div>

<br/>

| Status | Feature | Description |
|:---:|:---|:---|
| ✅ | Live speech recognition | Browser Speech API, real-time |
| ✅ | Record & convert | Full session recording |
| ✅ | Audio file upload | Faster-Whisper AI transcription |
| ✅ | Speech history | Timestamps, localStorage |
| ✅ | Authentication | Clerk sign in / sign up |
| ✅ | Responsive dashboard | Dark theme, stat cards |
| 🔲 | Multi-language support | 90+ languages via Whisper |
| 🔲 | Translation | Translate transcripts to any language |
| 🔲 | PDF export | Download formatted transcriptions |
| 🔲 | Cloud database | Replace localStorage with DB |
| 🔲 | Speaker diarization | Identify and label speakers |
| 🔲 | AI summarization | Summarize long transcripts with GenAI |

<br/>

---

<div align="center">

## 👩‍💻 Developed By

<br/>

**Deekshitha S**


<br/>

![Typing SVG](https://readme-typing-svg.demolab.com?font=Space+Grotesk&size=16&pause=1000&color=00D4FF&center=true&vCenter=true&width=500&lines=Built+with+%E2%9D%A4%EF%B8%8F+using+React%2C+Node.js+%26+Faster-Whisper;AI-Powered+Speech-to-Text+Application;Final+Year+Engineering+Project+%F0%9F%8E%93)

<br/>

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:8b5cf6,100:00d4ff&height=120&section=footer" width="100%"/>

</div>
