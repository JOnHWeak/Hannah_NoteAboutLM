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
  'Kiến thức cơ bản về lập trình': 'bg-gradient-to-br from-pink-400 via-pink-300 to-pink-200',
  'Lộ trình học tập': 'bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200',
  'Công cụ kỹ thuật phần mềm': 'bg-gradient-to-br from-purple-400 via-purple-300 to-purple-200',
  'Con đường sự nghiệp': 'bg-gradient-to-br from-green-400 via-green-300 to-green-200',
  'Cấu trúc dữ liệu & Thuật toán': 'bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-200',
  'Ngăn xếp công nghệ hiện đại': 'bg-gradient-to-br from-indigo-400 via-indigo-300 to-indigo-200',
  'Quản lý cơ sở dữ liệu': 'bg-gradient-to-br from-amber-400 via-amber-300 to-amber-200',
  'Điện toán đám mây': 'bg-gradient-to-br from-sky-400 via-sky-300 to-sky-200',
  'Phát triển di động': 'bg-gradient-to-br from-rose-400 via-rose-300 to-rose-200',
  'Phát triển API': 'bg-gradient-to-br from-emerald-400 via-emerald-300 to-emerald-200',
  'Kiểm thử & Chất lượng': 'bg-gradient-to-br from-teal-400 via-teal-300 to-teal-200',
  'Tối ưu hóa hiệu suất': 'bg-gradient-to-br from-orange-400 via-orange-300 to-orange-200'
};

// Category-specific images for programming topics
const categoryImages = {
  'Kiến thức cơ bản về lập trình': 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop&auto=format',
  'Lộ trình học tập': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&auto=format',
  'Công cụ kỹ thuật phần mềm': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop&auto=format',
  'Con đường sự nghiệp': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&auto=format',
  'Cấu trúc dữ liệu & Thuật toán': 'https://www.appacademy.io/wp-content/uploads/2024/03/65788300e4727694b6898722_top-algorithms-and-data-structures-you-really-need-to-know-blog-hero-image.webp',
  'Ngăn xếp công nghệ hiện đại': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop&auto=format',
  'Quản lý cơ sở dữ liệu': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=200&fit=crop&auto=format',
  'Điện toán đám mây': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop&auto=format',
  'Phát triển di động': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop&auto=format',
  'Phát triển API': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop&auto=format',
  'Kiểm thử & Chất lượng': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop&auto=format',
  'Tối ưu hóa hiệu suất': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&auto=format'
};

const FAQCard = ({ faq, index, onClick }) => {
  const IconComponent = iconMap[faq.categoryIcon] || Code;
  const gradientClass = categoryGradients[faq.category] || categoryGradients['Programming Fundamentals'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.6 }}
      className={`relative rounded-3xl cursor-pointer group overflow-hidden transform hover:scale-[1.02] transition-all duration-500`}
      onClick={() => onClick(faq)}
    >
      {/* Liquid Glass Background */}
      <div className={`absolute inset-0 ${gradientClass} opacity-80`}></div>
      <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-3xl shadow-2xl hover:shadow-3xl hover:bg-opacity-15 transition-all duration-500"></div>

      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl"></div>

      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
      {/* Content Layer */}
      <div className="relative z-10 p-8">
        {/* Image Section */}
        <div className="w-full h-48 mb-6 rounded-xl overflow-hidden backdrop-blur-sm bg-white/10 border border-white/20">
          <img
            src={categoryImages[faq.category] || categoryImages['Programming Fundamentals']}
            alt={faq.category}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 mix-blend-overlay"
          />
        </div>

        {/* Category Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-white bg-opacity-30 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 shadow-lg">
            <IconComponent className="w-4 h-4 text-white drop-shadow-sm" />
          </div>
          <span className="text-base font-semibold text-white drop-shadow-md">
            {faq.category}
          </span>
        </div>

        {/* Question */}
        <h3 className="text-xl font-semibold text-white mb-4 leading-tight group-hover:text-gray-100 transition-colors duration-200 drop-shadow-md">
          {faq.question}
        </h3>

        {/* Short Answer - Full visibility without truncation */}
        <p className="text-white/90 text-base leading-relaxed drop-shadow-sm">
          {faq.shortAnswer}
        </p>
      </div>
    </motion.div>
  );
};

export default FAQCard;
