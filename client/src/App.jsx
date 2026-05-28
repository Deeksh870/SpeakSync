import {
  Mic,
  Upload,
  History,
  LayoutDashboard,
} from "lucide-react";

import {
  UserButton,
  useUser,
  SignOutButton,
} from "@clerk/clerk-react";

import { useEffect, useRef, useState } from "react";

function App() {

  const { user } = useUser();

  const [activeTab, setActiveTab] = useState("dashboard");

  const [listening, setListening] = useState(false);

  const [text, setText] = useState("");

  const [uploadedFile, setUploadedFile] = useState(null);

  const recognitionRef = useRef(null);


  // SPEECH RECOGNITION
  useEffect(() => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang = "en-US";

    recognition.onresult = (event) => {

      let transcript = "";

      for (let i = 0; i < event.results.length; i++) {

        transcript +=
          event.results[i][0].transcript + " ";
      }

      setText(transcript);
    };

    recognitionRef.current = recognition;

  }, []);


  // START LISTENING
  const startListening = () => {

    recognitionRef.current.start();

    setListening(true);
  };


  // STOP LISTENING
  const stopListening = () => {

    recognitionRef.current.stop();

    setListening(false);
  };


  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* SIDEBAR */}
      <div className="w-[260px] bg-gray-950 border-r border-gray-800 p-6 flex flex-col justify-between">

        <div>

          <h1 className="text-4xl font-bold text-cyan-400 mb-12">
            SpeakSync
          </h1>


          <div className="space-y-8 text-lg">


            {/* DASHBOARD */}
            <div
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-3 cursor-pointer hover:text-cyan-400 ${
                activeTab === "dashboard" && "text-cyan-400"
              }`}
            >
              <LayoutDashboard />
              <span>Dashboard</span>
            </div>


            {/* HISTORY */}
            <div
              onClick={() => setActiveTab("history")}
              className={`flex items-center gap-3 cursor-pointer hover:text-cyan-400 ${
                activeTab === "history" && "text-cyan-400"
              }`}
            >
              <History />
              <span>History</span>
            </div>


            {/* LOGOUT */}
            <SignOutButton>
              <div className="flex items-center gap-3 cursor-pointer hover:text-red-400">

                <span>Logout</span>

              </div>
            </SignOutButton>

          </div>

        </div>


        {/* USER INFO */}
        <div className="flex items-center gap-3">

          <UserButton />

          <div className="max-w-[150px]">

            <p className="font-bold">
              {user?.firstName}
            </p>

            <p className="text-xs text-gray-400 break-all">
              {user?.primaryEmailAddress?.emailAddress}
            </p>

          </div>

        </div>

      </div>


      {/* MAIN CONTENT */}
      <div className="flex-1 p-10 overflow-y-auto">


        {/* DASHBOARD */}
        {activeTab === "dashboard" && (

          <div>

            <h1 className="text-5xl font-bold mb-4">
              Welcome back, {user?.firstName}
            </h1>

            <p className="text-gray-400 mb-12">
              Choose a speech processing feature.
            </p>


            <div className="grid grid-cols-3 gap-8">


              {/* LIVE SPEECH */}
              <div
                onClick={() => setActiveTab("speech")}
                className="bg-gray-900 rounded-2xl p-8 cursor-pointer hover:border hover:border-cyan-400 transition"
              >

                <Mic
                  size={50}
                  className="text-cyan-400 mb-5"
                />

                <h2 className="text-2xl font-bold mb-3">
                  Live Speech
                </h2>

                <p className="text-gray-400">
                  Convert speech into text live while speaking.
                </p>

              </div>


              {/* RECORD & CONVERT */}
              <div
                onClick={() => setActiveTab("record")}
                className="bg-gray-900 rounded-2xl p-8 cursor-pointer hover:border hover:border-cyan-400 transition"
              >

                <Mic
                  size={50}
                  className="text-cyan-400 mb-5"
                />

                <h2 className="text-2xl font-bold mb-3">
                  Record & Convert
                </h2>

                <p className="text-gray-400">
                  Speak completely and generate final transcript later.
                </p>

              </div>


              {/* UPLOAD AUDIO */}
              <div
                onClick={() => setActiveTab("upload")}
                className="bg-gray-900 rounded-2xl p-8 cursor-pointer hover:border hover:border-cyan-400 transition"
              >

                <Upload
                  size={50}
                  className="text-cyan-400 mb-5"
                />

                <h2 className="text-2xl font-bold mb-3">
                  Upload Audio
                </h2>

                <p className="text-gray-400">
                  Upload recorded audio files for transcription.
                </p>

              </div>

            </div>

          </div>
        )}


        {/* LIVE SPEECH */}
        {activeTab === "speech" && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Live Speech Recognition
            </h1>


            <div className="bg-gray-900 rounded-2xl p-8">

              <div className="min-h-[300px] bg-gray-800 rounded-xl p-6 text-lg leading-9">

                {text || "Start speaking to see live transcription..."}

              </div>


              <div className="flex gap-4 mt-8">

                {!listening ? (

                  <button
                    onClick={startListening}
                    className="bg-green-500 px-6 py-3 rounded-xl font-bold"
                  >
                    Start Listening
                  </button>

                ) : (

                  <button
                    onClick={stopListening}
                    className="bg-red-500 px-6 py-3 rounded-xl font-bold"
                  >
                    Stop Listening
                  </button>

                )}


                <button
                  onClick={() => setText("")}
                  className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold"
                >
                  Clear Text
                </button>

              </div>

            </div>

          </div>
        )}


        {/* RECORD & CONVERT */}
        {activeTab === "record" && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Record & Convert
            </h1>


            <div className="bg-gray-900 rounded-2xl p-8">

              <div className="min-h-[300px] bg-gray-800 rounded-xl p-6 text-lg leading-9">

                {text || "Record complete speech and generate final transcript after stopping..."}

              </div>


              <div className="flex gap-4 mt-8">

                {!listening ? (

                  <button
                    onClick={startListening}
                    className="bg-green-500 px-6 py-3 rounded-xl font-bold"
                  >
                    Start Recording
                  </button>

                ) : (

                  <button
                    onClick={stopListening}
                    className="bg-red-500 px-6 py-3 rounded-xl font-bold"
                  >
                    Stop Recording
                  </button>

                )}


                <button
                  onClick={() => setText("")}
                  className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold"
                >
                  Clear Text
                </button>

              </div>

            </div>

          </div>
        )}


        {/* UPLOAD AUDIO */}
        {activeTab === "upload" && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Upload Audio File
            </h1>


            <div className="bg-gray-900 rounded-2xl p-8">

              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setUploadedFile(e.target.files[0])}
                className="mb-6"
              />


              {uploadedFile && (

                <div className="bg-gray-800 p-5 rounded-xl mb-6">

                  <p className="text-cyan-400 mb-2">
                    Selected File
                  </p>

                  <p>
                    {uploadedFile.name}
                  </p>

                </div>

              )}


              <button className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold">

                Upload & Transcribe

              </button>


              <div className="bg-gray-800 rounded-xl p-6 mt-8 min-h-[200px]">

                <p className="text-gray-400">
                  Uploaded audio transcription will appear here tomorrow.
                </p>

              </div>

            </div>

          </div>
        )}


        {/* HISTORY */}
        {activeTab === "history" && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Speech History
            </h1>


            <div className="bg-gray-900 p-8 rounded-2xl">

              <p className="text-gray-400">
                Saved transcriptions will appear here tomorrow.
              </p>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;