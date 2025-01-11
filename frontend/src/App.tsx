import { useRef, useState } from 'react';
import sound from './assets/audio/sound.mp3'
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Home from './pages/Home.tsx';
import AppLogo from './components/AppLogo.tsx';


const App = () => {
    return (
        <>
        <div className="h-screen gradient-background">
        <Home/>
        </div>
        </>
    )
};

export default App;
