import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TheBigPicture = ({ onSuggestionClick }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const suggestions = [
    'Hiểu các giai đoạn chính trong lộ trình học kỹ thuật phần mềm',
    'Kiến thức nền tảng',
  ];

  return (
    <div className="bg-gray-800/50 p-4 mb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <div className="text-xs text-gray-400">Câu hỏi gợi ý</div>
          <h3 className="text-md font-semibold text-white">Lộ trình học Kỹ thuật Phần mềm</h3>
        </div>
        {isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
      </div>
      {isExpanded && (
        <div className="mt-3">
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <button
                  onClick={() => onSuggestionClick(suggestion)}
                  className="w-full text-left p-3 bg-gray-900/70 rounded-md hover:bg-gray-900 text-gray-200 text-sm"
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TheBigPicture;
