import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Brain,
  Video,
  Map,
  FileText as Report,
  Star,
  HelpCircle,
  Sparkles,
  Edit3,
  CheckCircle
} from 'lucide-react';

const StudioPanel = ({ source, onTogglePanel }) => {
  const [studioOutputs, setStudioOutputs] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const studioTools = [
    {
      id: 'audio-overview',
      title: 'Tổng quan bằng âm thanh',
      icon: Brain,
      description: 'Tạo tóm tắt âm thanh từ nguồn'
    },
    {
      id: 'video-overview',
      title: 'Tổng quan bằng video',
      icon: Video,
      description: 'Tạo video tóm tắt nội dung'
    },
    {
      id: 'mind-map',
      title: 'Bản đồ tư duy',
      icon: Map,
      description: 'Tạo sơ đồ tư duy từ nguồn'
    },
    {
      id: 'report',
      title: 'Báo cáo',
      icon: Report,
      description: 'Tạo báo cáo chi tiết'
    },
    {
      id: 'flashcards',
      title: 'Thẻ ghi nhớ',
      icon: Star,
      description: 'Tạo thẻ học tập'
    },
    {
      id: 'quiz',
      title: 'Bài kiểm tra',
      icon: HelpCircle,
      description: 'Tạo câu hỏi kiểm tra'
    }
  ];

  const generateStudioOutput = async (toolId) => {
    if (!source) {
      alert('Vui lòng chọn một nguồn trước khi sử dụng Studio');
      return;
    }

    setIsGenerating(true);
    const tool = studioTools.find(t => t.id === toolId);

    let prompt = '';

    switch (toolId) {
      case 'audio-overview':
        prompt = `Tạo một bản tóm tắt âm thanh chi tiết như script podcast ngắn gọn, dễ hiểu:\n\nTiêu đề: ${source.title}\nNội dung: ${source.content}`;
        break;
      case 'video-overview':
        prompt = `Tạo kịch bản video tóm tắt (mở đầu, nội dung chính, kết luận):\n\nTiêu đề: ${source.title}\nNội dung: ${source.content}`;
        break;
      case 'mind-map':
        prompt = `Tạo sơ đồ tư duy dạng text theo phân cấp (nhánh chính/phụ):\n\nTiêu đề: ${source.title}\nNội dung: ${source.content}`;
        break;
      case 'report':
        prompt = `Tạo báo cáo chi tiết, bao gồm tóm tắt, phân tích, kết luận:\n\nTiêu đề: ${source.title}\nNội dung: ${source.content}`;
        break;
      case 'flashcards':
        prompt = `Tạo bộ flashcards, mỗi thẻ gồm câu hỏi và đáp án ngắn:\n\nTiêu đề: ${source.title}\nNội dung: ${source.content}`;
        break;
      case 'quiz':
        prompt = `Tạo bài kiểm tra trắc nghiệm (5-10 câu, 4 đáp án/câu):\n\nTiêu đề: ${source.title}\nNội dung: ${source.content}`;
        break;
      default:
        prompt = `Tạo ${tool.title.toLowerCase()} cho nguồn sau:\n\nTiêu đề: ${source.title}\nNội dung: ${source.content}`;
    }

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate output');
      }

      const data = await response.json();

      const newOutput = {
        id: Date.now(),
        type: toolId,
        title: tool.title,
        content: data.text,
        createdAt: new Date().toISOString()
      };

      setStudioOutputs(prev => [newOutput, ...prev]);
    } catch (error) {
      console.error('Studio Error:', error);
      alert('Có lỗi xảy ra khi tạo nội dung. Vui lòng đảm bảo API key đã được cấu hình và server đang chạy.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Công cụ</h2>
          </div>
          <button
            onClick={onTogglePanel}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Studio Tools Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-6">
          {studioTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => generateStudioOutput(tool.id)}
              className="studio-card group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <tool.icon className="w-5 h-5 text-blue-400" />
                  <div>
                    <h3 className="text-sm font-medium text-white">{tool.title}</h3>
                  </div>
                </div>
                <Edit3 className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-sm text-gray-300 mb-4">
            Đầu ra của Studio sẽ được lưu ở đây.
          </p>
        </div>
      </div>

      {/* Studio Outputs */}
      <div className="flex-1 overflow-y-auto p-4">
        {studioOutputs.length === 0 ? (
          <div className="text-center py-8">
            <Sparkles className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-gray-300">Chưa có đầu ra Studio nào</p>
            <p className="text-sm text-gray-400 mt-1">
              Sử dụng các công cụ ở trên để tạo nội dung
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {studioOutputs.map((output) => (
              <motion.div
                key={output.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-700 p-4 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <h3 className="font-medium text-white">{output.title}</h3>
                </div>
                <p className="text-sm text-gray-300 whitespace-pre-wrap">
                  {output.content}
                </p>
                <div className="text-xs text-gray-400 mt-2">
                  {new Date(output.createdAt).toLocaleString('vi-VN')}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-700 p-4 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              <span className="text-sm text-gray-300">Đang tạo nội dung Studio...</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudioPanel;
