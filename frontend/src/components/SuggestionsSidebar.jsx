import React, { useState } from 'react';
import { ChevronRightIcon, LightBulbIcon, BookOpenIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const SuggestionsSidebar = ({ isOpen, onToggle, onSuggestionClick }) => {
  const [activeCategory, setActiveCategory] = useState('general');

  const suggestions = {
    general: [
      "Explain quantum computing in simple terms",
      "What are the latest trends in AI?",
      "How does machine learning work?",
      "Best practices for web development",
      "Introduction to data science"
    ],
    learning: [
      "Create a study plan for Python",
      "Explain neural networks step by step",
      "What is the difference between AI and ML?",
      "How to get started with React?",
      "Database design fundamentals"
    ],
    career: [
      "Career paths in technology",
      "How to prepare for coding interviews?",
      "Skills needed for data analyst role",
      "Transitioning to tech career",
      "Building a programming portfolio"
    ]
  };

  const categories = [
    { id: 'general', name: 'General', icon: LightBulbIcon },
    { id: 'learning', name: 'Learning', icon: BookOpenIcon },
    { id: 'career', name: 'Career', icon: AcademicCapIcon }
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
      isOpen ? 'w-80' : 'w-0'
    } overflow-hidden`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Suggestions</h2>
          <button
            onClick={onToggle}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Categories */}
        <div className="flex border-b border-gray-200">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-1" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Suggestions List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {suggestions[activeCategory]?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick?.(suggestion)}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm text-gray-700 group-hover:text-blue-700 leading-relaxed">
                    {suggestion}
                  </span>
                  <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-500 mt-0.5 ml-2 flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="mt-6 p-3 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">💡 Quick Tips</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Click any suggestion to start a conversation</li>
              <li>• Use specific questions for better answers</li>
              <li>• Try different categories for varied topics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsSidebar;
