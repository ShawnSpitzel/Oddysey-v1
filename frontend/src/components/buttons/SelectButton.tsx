import React from 'react';

type SelectComponentProps = {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  label?: string;
};

const SelectButton: React.FC<SelectComponentProps> = ({ value, onChange, options, label }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="">
      <select
        value={value}
        onChange={handleChange}
        className="bg-[#F6F4F2] text-xs border rounded-2xl py-2 px-3 text-buttonText "
      >
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectButton;
