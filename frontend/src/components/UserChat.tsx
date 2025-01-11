import { IconArrowRight } from "../assets/icons/IconArrowRight";
import SelectButton from "./buttons/SelectButton"
const languageOptions = [
    { value: "Spanish", label: "Spanish" },
    { value: "German", label: "German" },
    { value: "French", label: "French" },
    { value: "Chinese", label: "Chinese" },
    { value: "Japanese", label: "Japanese" },
    { value: "Korean", label: "Korean" },
  ];
  type AiChatProps = {
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
    userInput: string;
    setUserInput: React.Dispatch<React.SetStateAction<string>>;
    handleUserResponse: () => Promise<void>;
    handleSpeech: () => void;
    isSpeaking: string;
  };
  const User: React.FC<AiChatProps> = ({language, setLanguage, userInput, setUserInput, handleUserResponse, handleSpeech, isSpeaking
  }) => {
    return(
        <>
        <div className="relative w-full m-auto flex flex-col h-48 bg-white p-4 mb-0 rounded-xl shadow-3xl justify-between">
            <div className="flex justify-end">
            <SelectButton
              label="Select a language"
              value={language}
              onChange={setLanguage}
              options={languageOptions}
            />
            </div>
            <div className="w-full flex flex-grow items-start">
                <textarea className="ml-4 h-full w-full align-top text-left resize-none"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your response!"
                />
            </div>
            <div className ="bottom-0 left-0 w-full flex justify-between items-center">
            <div className ="">
            <button className="bg-black py-1 px-4 rounded-xl text-white"
                onClick={handleSpeech}>{isSpeaking}</button>
            </div>
            <div className="flex items-center gap-4 ">
            <h1 className="text-[#A9A8A8] font-medium">0/250</h1>
            <button className="bg-buttonBg items-center flex justify-center h-9 w-9 rounded-lg text-white"
                onClick={handleUserResponse}><IconArrowRight className="w-5 h-5" /></button>
            </div>
            </div>
            </div>
        </>
    )
}
export default User