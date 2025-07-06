// [Library imports]
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Input } from "./ui/input";

// [Globals]
interface ChipInputProps {
  setStateFunction: Dispatch<SetStateAction<object>>;
  field: string;
  initialList: Array<string>;
}

// [Exports]
export default function ChipInput({ setStateFunction, initialList, field }: ChipInputProps) {
  const [text, setText] = useState('');
  const [list, setList] = useState<Array<string>>(initialList);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = e.target.value;
    if (newValue.endsWith('\n') || newValue.endsWith(',')) {
      const value = text.trim().replace(/,$/, '');
      if (value && !list.includes(value)) {
        const newList = [...list, value];
        setList(newList);
        setStateFunction((prev) => ({
          ...prev,
          [field]: newList
        }));
      }
      setText('');
      return;
    }
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Remove last chip if Backspace is pressed and input is empty
    if (e.key === "Backspace" && text === "" && list.length > 0) {
      handleRemove(list[list.length - 1]);
    }
  };

  const handleRemove = (chip: string) => {
    const newList = list.filter(item => item !== chip);
    setList(newList);
    setStateFunction((prev) => ({
      ...prev,
      [field]: newList
    }));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border rounded px-2 py-1 min-h-[40px] bg-white">
      
      {list.map((chip) => (
        <span key={chip} className="flex items-center bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm font-medium mr-2 mb-1">
          {chip}
          <button
            type="button"
            className="ml-2 text-blue-600 hover:text-blue-900 focus:outline-none"
            onClick={() => handleRemove(chip)}
          >
            ×
          </button>
        </span>
      ))}
      <textarea
        className="flex-1 min-w-[100px] outline-none border-none bg-transparent resize-none"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={1}
      />
    </div>
  )
}