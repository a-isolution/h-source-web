import { Search } from "lucide-react";
import React from "react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={`relative w-full md:w-[250px] lg:w-[450px] ${className}`}>
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
        <Search className="h-4 w-4 text-gray-500 shrink-0" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10 pr-4 py-2 border border-stone-300 bg-white rounded-3xl text-sm w-full"
      />
    </div>
  );
};

export default SearchBar;
