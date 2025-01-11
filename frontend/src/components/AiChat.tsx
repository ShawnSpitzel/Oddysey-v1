import { IconMic } from "../assets/icons/IconMic";
import { IconMicMuted } from "../assets/icons/IconMicMuted";
import SelectButton from "./buttons/SelectButton"
const difficultyOptions = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
    { value: "Expert", label: "Expert" },
    { value: "Native", label: "Native" },
  ];
  const communicationStyleOptions = [
    { value: "Formal", label: "Formal" },
    { value: "Textbook", label: "Textbook" },
    { value: "Storytelling", label: "Storytelling" },
    { value: "Humorous", label: "Humorous" },
  ];
  type AiChatProps = {
    difficulty: string;
    setDifficulty: React.Dispatch<React.SetStateAction<string>>;
    communicationStyle: string;
    setCommunicationStyle: React.Dispatch<React.SetStateAction<string>>;
    renderPrompt: (promptText: string) => JSX.Element[];
    prompt: string
    toggleMute: () => void;
    isMuted: boolean;
  };
  const AiChat: React.FC<AiChatProps> = ({difficulty, setDifficulty, communicationStyle, setCommunicationStyle, renderPrompt, prompt, toggleMute, isMuted
  }) => {
    return(
        <>
        <div className="relative w-full m-auto flex flex-col h-48 bg-white p-4 mb-0 rounded-xl shadow-3xl justify-between">
            <div className="flex justify-end">
            <SelectButton
          label="Select Difficulty"
          value={difficulty}
          onChange={setDifficulty}
          options={difficultyOptions}
        />
            <SelectButton
          label="Select Communication Style"
          value={communicationStyle}
          onChange={setCommunicationStyle}
          options={communicationStyleOptions}
        />
            </div>
            <div className="w-full flex flex-grow items-start">
            <div>{renderPrompt(prompt)}</div>
            </div>
            <div className ="bottom-0 left-0 w-full flex justify-between">
            <div className ="">
            </div>
            <div className="flex items-center">
            <button className="bg-[#9a9a9a] items-center flex justify-center h-9 w-9 rounded-lg text-white"
                onClick={toggleMute}>{isMuted ? <IconMicMuted className="w-5 h-5" /> : <IconMic className="w-5 h-5" />}</button>
            </div>
            </div>
            </div>
        </>
        
    )
}
export default AiChat


        