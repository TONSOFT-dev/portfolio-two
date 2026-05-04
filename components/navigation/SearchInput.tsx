"use client";

import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: SearchInputProps) {
  const hasValue = value.length > 0;

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className={className}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-base pl-[12px] py-[8px] pr-[84px] lg:pr-[80px] xl:pr-[80px] bg-transparent text-pure placeholder:text-pure focus:outline-none transition-colors"
      />
      {/* Icons Container */}
      <div className="absolute top-[6px] right-[6px] bottom-[6px] flex items-center gap-1">
        {/* Clear Icon - Shows when input has text */}
        {hasValue && (
          <button
            onClick={handleClear}
            className="w-auto aspect-square bg-pure rounded-md flex items-center justify-center p-1 cursor-pointer hover:bg-pearl transition-colors"
            aria-label="Clear search"
          >
            <X className="w-full h-full text-noir" />
          </button>
        )}
        {/* Search Icon */}
        <div className="w-auto aspect-square bg-pure rounded-md flex items-center justify-center p-1">
          <Search className="w-full h-full text-noir" />
        </div>
      </div>
    </div>
  );
}
