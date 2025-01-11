import { useRef, useState } from "react";
import sound from "../assets/audio/sound.mp3";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Header from "../components/Header";
import PromptButton from "../components/buttons/PromptButton";
import AiChat from "../components/AiChat";
import UserChat from "../components/UserChat";
import AppLogo from "../components/AppLogo";
import React from "react";

const Home = () => {
  const [language, setLanguage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [userInput, setUserInput] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [communicationStyle, setCommunicationStyle] = useState("Formal");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState("Speak");
  const [error, setError] = React.useState("");
  const [showAlert, setShowAlert] = useState(false);
  const {
    transcript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser doesn't support speech recognition</span>;
  }
  const playAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(sound);
    } else {
      audioRef.current.pause();
      audioRef.current.src = sound;
    }

    audioRef.current.muted = isMuted;
    audioRef.current
      .play()
      .catch((err) => console.error("Error playing audio:", err));
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  const handleLanguageSelect = async () => {
    if (!language) {
        setError("Please select a language.");
        setShowAlert(true);
        return;
    }else {
        setShowAlert(false);
    }
    setError("");
    const res = await fetch("http://localhost:5000/start_conversation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: language,
        difficulty: difficulty,
        communicationStyle: communicationStyle,
      }),
    });
    const data = await res.json();
    setPrompt(data.prompt);
    playAudio();
  };

  const handleUserResponse = async () => {
    const res = await fetch("http://localhost:5000/receive_response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_input: userInput,
        language: language,
        difficulty: difficulty,
        communicationStyle: communicationStyle,
      }),
    });
    const data = await res.json();
    setPrompt(data.ai_response);
    playAudio();
  };

  const renderPrompt = (promptText: string) => {
    return promptText.split("\n").map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ));
  };
  const handleSpeech = () => {
    if (isSpeaking == "Speak") {
      setIsSpeaking("Stop");
      SpeechRecognition.startListening();
    } else if (isSpeaking == "Stop") {
      setIsSpeaking("Speak");
      SpeechRecognition.stopListening();
      setUserInput(transcript);
    }
  };

  return (
    <div className="">
    <AppLogo/>
    
    <div className="w-[55%] flex-col items-start m-auto flex gap-4">
        <Header />
        <PromptButton handleLanguageSelect={handleLanguageSelect} />

      <AiChat 
        difficulty={difficulty} 
        setDifficulty={setDifficulty} 
        communicationStyle={communicationStyle} 
        setCommunicationStyle={setCommunicationStyle} 
        renderPrompt={renderPrompt}
        prompt={prompt}
        toggleMute={toggleMute}
        isMuted={isMuted}
      />
      <UserChat
      language={language}
      setLanguage={setLanguage}
      userInput={userInput}
      setUserInput={setUserInput}
      handleUserResponse={handleUserResponse}
      handleSpeech={handleSpeech}
      isSpeaking={isSpeaking}
      
      />
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto items-center justify-center flex flex-col gap-4">
            <p className="">{error}</p>
            <button
              onClick={() => setShowAlert(false)}
              className=" bg-buttonBg font-semibold text-xs text-white py-2 px-6 rounded-md inline-block"
            >
              Close
            </button>
          </div>
        </div>
      )}

{/* 
      <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button> */}

      {/* <p>Microphone: {listening ? "on" : "off"} </p> */}

      {/* <p>{response}</p> */}

      {/* <button onClick={handleUserResponse}>!</button> */}

    </div>
    </div>
  );
};

export default Home;
