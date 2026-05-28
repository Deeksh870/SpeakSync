import { useEffect, useRef, useState } from "react";

function App() {

  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");

  const recognitionRef = useRef(null);


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

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {

        transcript +=
          event.results[i][0].transcript + " ";
      }

      setText(transcript);
    };

    recognitionRef.current = recognition;

  }, []);


  // Start Listening
  const startListening = () => {

    recognitionRef.current.start();

    setListening(true);
  };


  // Stop Listening
  const stopListening = () => {

    recognitionRef.current.stop();

    setListening(false);
  };


  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 gap-6">

      <h1 className="text-5xl text-white font-bold">
        Live Speech To Text
      </h1>


      {!listening ? (

        <button
          onClick={startListening}
          className="bg-green-500 px-6 py-3 rounded-lg font-bold"
        >
          Start Listening
        </button>

      ) : (

        <button
          onClick={stopListening}
          className="bg-red-500 px-6 py-3 rounded-lg font-bold"
        >
          Stop Listening
        </button>

      )}


      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-3xl min-h-[200px]">

        <h2 className="text-cyan-400 text-2xl font-bold mb-4">
          Transcribed Text
        </h2>

        <p className="text-white text-lg">
          {text || "Speak something..."}
        </p>

      </div>

    </div>
  );
}

export default App;