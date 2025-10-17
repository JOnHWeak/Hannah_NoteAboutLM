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

// Category-specific pastel backgrounds
const categoryBackgrounds = {
  'Kiến thức cơ bản về lập trình': 'bg-pink-100',
  'Lộ trình học tập': 'bg-blue-100',
  'Công cụ kỹ thuật phần mềm': 'bg-purple-100',
  'Con đường sự nghiệp': 'bg-green-100',
  'Cấu trúc dữ liệu & Thuật toán': 'bg-yellow-100',
  'Ngăn xếp công nghệ hiện đại': 'bg-indigo-100',
  'Quản lý cơ sở dữ liệu': 'bg-amber-100',
  'Điện toán đám mây': 'bg-sky-100',
  'Phát triển di động': 'bg-rose-100',
  'Phát triển API': 'bg-emerald-100',
  'Kiểm thử & Chất lượng': 'bg-teal-100',
  'Tối ưu hóa hiệu suất': 'bg-orange-100'
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
  const backgroundClass = categoryBackgrounds[faq.category] || categoryBackgrounds['Kiến thức cơ bản về lập trình'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.6 }}
      className={`relative rounded-3xl cursor-pointer overflow-hidden transition-all duration-500 ${backgroundClass}`}
      onClick={() => onClick(faq)}
    >
      {/* Content Layer */}
      <div className="relative z-10 p-8">
        {/* Image Section */}
        <div className="w-full h-48 mb-6 rounded-xl overflow-hidden">
          <img
            src={categoryImages[faq.category] || categoryImages['Kiến thức cơ bản về lập trình']}
            alt={faq.category}
            className="w-full h-full object-cover transition-transform duration-300"
          />
        </div>

        {/* Category Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-black/5 rounded-lg flex items-center justify-center">
            <IconComponent className="w-4 h-4 text-black" />
          </div>
          <span className="text-base font-semibold text-black">
            {faq.category}
          </span>
        </div>

        {/* Question */}
        <h3 className="text-xl font-bold text-black mb-4 leading-tight">
          {faq.question}
        </h3>

        {/* Short Answer - Full visibility without truncation */}
        <p className="text-black/80 text-base leading-relaxed">
          {faq.shortAnswer}
        </p>
      </div>
    </motion.div>
  );
};

export default FAQCard;
