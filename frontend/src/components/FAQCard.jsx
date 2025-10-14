import React from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Map,
  Settings,
  TrendingUp,
  Brain,
  Layers,
  Database,
  Cloud,
  Smartphone,
  Link,
  CheckCircle,
  Zap
} from 'lucide-react';

const iconMap = {
  Code,
  Map,
  Settings,
  TrendingUp,
  Brain,
  Layers,
  Database,
  Cloud,
  Smartphone,
  Link,
  CheckCircle,
  Zap
};

// Category-specific gradient backgrounds
const categoryGradients = {
  'Programming Fundamentals': 'bg-gradient-to-br from-pink-400 via-pink-300 to-pink-200',
  'Learning Roadmap': 'bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200',
  'Software Engineering Tools': 'bg-gradient-to-br from-purple-400 via-purple-300 to-purple-200',
  'Career Path': 'bg-gradient-to-br from-green-400 via-green-300 to-green-200',
  'Data Structures & Algorithms': 'bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-200',
  'Modern Tech Stack': 'bg-gradient-to-br from-indigo-400 via-indigo-300 to-indigo-200',
  'Database Management': 'bg-gradient-to-br from-amber-400 via-amber-300 to-amber-200',
  'Cloud Computing': 'bg-gradient-to-br from-sky-400 via-sky-300 to-sky-200',
  'Mobile Development': 'bg-gradient-to-br from-rose-400 via-rose-300 to-rose-200',
  'API Development': 'bg-gradient-to-br from-emerald-400 via-emerald-300 to-emerald-200',
  'Testing & Quality': 'bg-gradient-to-br from-teal-400 via-teal-300 to-teal-200',
  'Performance Optimization': 'bg-gradient-to-br from-orange-400 via-orange-300 to-orange-200'
};

// Category-specific images for programming topics
const categoryImages = {
  'Programming Fundamentals': 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop&auto=format',
  'Learning Roadmap': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&auto=format',
  'Software Engineering Tools': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop&auto=format',
  'Career Path': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&auto=format',
  'Data Structures & Algorithms': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop&auto=format',
  'Modern Tech Stack': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop&auto=format',
  'Database Management': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=200&fit=crop&auto=format',
  'Cloud Computing': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop&auto=format',
  'Mobile Development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop&auto=format',
  'API Development': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop&auto=format',
  'Testing & Quality': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&auto=format',
  'Performance Optimization': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&auto=format'
};

const FAQCard = ({ faq, index, onClick }) => {
  const IconComponent = iconMap[faq.categoryIcon] || Code;
  const gradientClass = categoryGradients[faq.category] || categoryGradients['Programming Fundamentals'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.6 }}
      className={`${gradientClass} rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-600 hover:border-gray-500 transform hover:scale-[1.02]`}
      onClick={() => onClick(faq)}
    >
      <div className="p-8">
        {/* Image Section */}
        <div className="w-full h-48 mb-6 rounded-xl overflow-hidden">
          <img
            src={categoryImages[faq.category] || categoryImages['Programming Fundamentals']}
            alt={faq.category}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Category Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <IconComponent className="w-4 h-4 text-white" />
          </div>
          <span className="text-base font-semibold text-white">
            {faq.category}
          </span>
        </div>

        {/* Question */}
        <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight group-hover:text-gray-800 transition-colors duration-200">
          {faq.question}
        </h3>

        {/* Short Answer - Full visibility without truncation */}
        <p className="text-gray-700 text-base leading-relaxed">
          {faq.shortAnswer}
        </p>


      </div>
    </motion.div>
  );
};

export default FAQCard;
