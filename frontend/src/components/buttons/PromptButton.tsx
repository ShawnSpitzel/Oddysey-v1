import React from 'react';

type PromptButtonProps = {
  handleLanguageSelect: () => void;
};

const PromptButton: React.FC<PromptButtonProps> = ({ handleLanguageSelect }) => {
  return (
    <button className=" bg-buttonBg font-semibold text-xs text-white py-2 px-6 rounded-md inline-block "
    onClick={handleLanguageSelect}>Start Lesson!</button>
  );
};

export default PromptButton;
