import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "./ui/input";
import { X } from "lucide-react";

interface ChipInputProps {
  setStateFunction: Dispatch<SetStateAction<object>>;
  field: string;
  initialList: string[];
}

export default function ChipInput({
  setStateFunction,
  initialList,
  field,
}: ChipInputProps) {
  const [text, setText] = useState("");
  const [list, setList] = useState<string[]>(initialList);

  const handleAddChip = () => {
    const value = text.trim().replace(/,$/, "");
    if (value && !list.includes(value)) {
      const newList = [...list, value];
      setList(newList);
      setStateFunction((prev) => ({
        ...prev,
        [field]: newList,
      }));
    }
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
      e.preventDefault();
      handleAddChip();
    }
    if (e.key === "Backspace" && text === "" && list.length > 0) {
      // Remove last chip if Backspace is pressed and input is empty
      handleRemove(list[list.length - 1]);
    }
  };

  const handleRemove = (chip: string) => {
    const newList = list.filter((item) => item !== chip);
    setList(newList);
    setStateFunction((prev) => ({
      ...prev,
      [field]: newList,
    }));
  };

  return (
    <div
      className={`
        flex flex-wrap items-center gap-2 rounded border
        px-3 py-2 min-h-[44px]
        focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]
        transition
      `}
    >
      {/* Render existing chips */}
      {list.map((chip) => (
        <span
          key={chip}
          className="flex items-center gap-1 bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-sm"
        >
          {chip}
          <button
            type="button"
            className="hover:text-red-500 focus:outline-none"
            onClick={() => handleRemove(chip)}
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      ))}

      {/* Input field */}
      <Input
        type="text"
        placeholder="Add..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="appearance-none border-none shadow-none ring-0 outline-none focus-within:outline-none focus-within:ring-0 bg-transparent p-0 flex-1"
      />
    </div>
  );
}
