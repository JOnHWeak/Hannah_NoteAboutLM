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
  CheckCircle,
  Upload
} from 'lucide-react';

const StudioPanel = ({ source, onTogglePanel }) => {
  const [studioOutputs, setStudioOutputs] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [showMindMapOptions, setShowMindMapOptions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showReportOptions, setShowReportOptions] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('');
  const [showFlashcardOptions, setShowFlashcardOptions] = useState(false);
  const [showQuizOptions, setShowQuizOptions] = useState(false);
  const [showVideoOverviewOptions, setShowVideoOverviewOptions] = useState(false);
  const [promptTitle, setPromptTitle] = useState('');
  const [promptDescription, setPromptDescription] = useState('');
  const [selectedMindMapCategories, setSelectedMindMapCategories] = useState([]);
  const [selectedReportTypes, setSelectedReportTypes] = useState([]);
  const [selectedFlashcardCategories, setSelectedFlashcardCategories] = useState([]);
  const [selectedQuizCategories, setSelectedQuizCategories] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Software Engineering categories
  const mindMapCategories = [
    { id: 'architecture', name: 'Kiến trúc phần mềm', icon: '🏗️' },
    { id: 'design-patterns', name: 'Design Patterns', icon: '🎨' },
    { id: 'algorithms', name: 'Thuật toán', icon: '⚡' },
    { id: 'data-structures', name: 'Cấu trúc dữ liệu', icon: '📊' },
    { id: 'testing', name: 'Kiểm thử phần mềm', icon: '🧪' },
    { id: 'devops', name: 'DevOps & CI/CD', icon: '🔄' },
    { id: 'databases', name: 'Cơ sở dữ liệu', icon: '�' },
    { id: 'security', name: 'Bảo mật phần mềm', icon: '🔒' },
    { id: 'frameworks', name: 'Frameworks & Libraries', icon: '�' },
    { id: 'api-design', name: 'Thiết kế API', icon: '�' }
  ];

  // Software Engineering report types
  const reportTypes = [
    { id: 'technical-spec', name: 'Tài liệu kỹ thuật', icon: '📋' },
    { id: 'code-review', name: 'Báo cáo Code Review', icon: '🔍' },
    { id: 'architecture-doc', name: 'Tài liệu kiến trúc', icon: '🏗️' },
    { id: 'testing-report', name: 'Báo cáo kiểm thử', icon: '🧪' },
    { id: 'deployment-guide', name: 'Hướng dẫn triển khai', icon: '�' },
    { id: 'api-documentation', name: 'Tài liệu API', icon: '🔌' },
    { id: 'performance-analysis', name: 'Phân tích hiệu năng', icon: '⚡' }
  ];

  const studioTools = [
    {
      id: 'video-overview',
      title: 'Tổng quan bằng video',
      icon: Video,
      description: 'Tạo tóm tắt video từ nguồn'
    },
    {
      id: 'mind-map',
      title: 'Bản đồ tư duy',
      icon: Map,
      description: 'Tạo sơ đồ tư duy từ nguồn'
    },
    {
      id: 'report',
      title: 'Tổng hợp nội dung',
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

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
    if (tool.id === 'mind-map') {
      setShowMindMapOptions(true);
    } else if (tool.id === 'report') {
      setShowReportOptions(true);
    } else if (tool.id === 'flashcards') {
      setShowFlashcardOptions(true);
    } else if (tool.id === 'quiz') {
      setShowQuizOptions(true);
    } else if (tool.id === 'video-overview') {
      setShowVideoOverviewOptions(true);
    } else {
      setShowPopup(true);
    }
  };

  // Checkbox handlers
  const handleMindMapCategoryChange = (categoryId) => {
    setSelectedMindMapCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleReportTypeChange = (typeId) => {
    setSelectedReportTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleFlashcardCategoryChange = (categoryId) => {
    setSelectedFlashcardCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleQuizCategoryChange = (categoryId) => {
    setSelectedQuizCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFiles([file]);
      alert(`Đã chọn file: ${file.name}`);
    }
  };

  const handleGenerateMindMaps = () => {
    if (selectedMindMapCategories.length === 0) {
      alert('Vui lòng chọn ít nhất một chủ đề.');
      return;
    }
    selectedMindMapCategories.forEach(category => {
      generateMindMapWithCategory(category);
    });
    setShowMindMapOptions(false);
    setSelectedMindMapCategories([]);
  };

  const generateMindMapWithCategory = async (category) => {
    setIsGenerating(true);

    const tool = studioTools.find(t => t.id === 'mind-map');
    const categoryInfo = mindMapCategories.find(c => c.id === category);

    const customTitle = promptTitle || categoryInfo.name;
    const customDescription = promptDescription ? ` (${promptDescription})` : '';

    try {
      const newOutput = {
        id: Date.now(),
        type: 'mind-map',
        title: `${tool.title} - ${customTitle}${customDescription}`,
        content: `Đang tạo bản đồ tư duy cho chủ đề: ${customTitle} ${categoryInfo.icon}`,
        timestamp: new Date().toLocaleString('vi-VN'),
        source: source?.title || 'Không xác định'
      };

      setStudioOutputs(prev => [newOutput, ...prev]);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update with generated content
      setStudioOutputs(prev =>
        prev.map(output =>
          output.id === newOutput.id
            ? { ...output, content: `Bản đồ tư duy đã được tạo thành công cho chủ đề "${customTitle}". Nội dung được phân tích từ: ${source?.title}` }
            : output
        )
      );
    } catch (error) {
      console.error('Lỗi khi tạo bản đồ tư duy:', error);
    } finally {
      setIsGenerating(false);
      setPromptTitle('');
      setPromptDescription('');
    }
  };

  const handleReportTypeSelect = (reportType) => {
    generateReportWithType(reportType);
  };

  const handleGenerateReports = () => {
    if (selectedReportTypes.length === 0) {
      alert('Vui lòng chọn ít nhất một loại báo cáo.');
      return;
    }
    selectedReportTypes.forEach(reportType => {
      generateReportWithType(reportType);
    });
    setShowReportOptions(false);
    setSelectedReportTypes([]);
  };

  const generateReportWithType = async (reportType) => {
    setIsGenerating(true);

    const tool = studioTools.find(t => t.id === 'report');
    const typeInfo = reportTypes.find(t => t.id === reportType);

    const customTitle = promptTitle || typeInfo.name;
    const customDescription = promptDescription ? ` (${promptDescription})` : '';

    try {
      const newOutput = {
        id: Date.now(),
        type: 'report',
        title: `${tool.title} - ${customTitle}${customDescription}`,
        content: `Đang tạo báo cáo loại: ${customTitle} ${typeInfo.icon}`,
        timestamp: new Date().toLocaleString('vi-VN'),
        source: source?.title || 'Không xác định'
      };

      setStudioOutputs(prev => [newOutput, ...prev]);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update with generated content
      setStudioOutputs(prev =>
        prev.map(output =>
          output.id === newOutput.id
            ? { ...output, content: `Báo cáo "${customTitle}" đã được tạo thành công. Nội dung được phân tích từ: ${source?.title}` }
            : output
        )
      );
    } catch (error) {
      console.error('Lỗi khi tạo báo cáo:', error);
    } finally {
      setIsGenerating(false);
      setPromptTitle('');
      setPromptDescription('');
    }
  };

  const handleGenerateFlashcards = () => {
    if (selectedFlashcardCategories.length === 0) {
      alert('Vui lòng chọn ít nhất một chủ đề.');
      return;
    }
    selectedFlashcardCategories.forEach(category => {
      generateFlashcardsWithCategory(category);
    });
    setShowFlashcardOptions(false);
    setSelectedFlashcardCategories([]);
  };

  const generateFlashcardsWithCategory = async (category) => {
    setIsGenerating(true);

    const tool = studioTools.find(t => t.id === 'flashcards');
    const categoryInfo = mindMapCategories.find(c => c.id === category);

    const customTitle = promptTitle || categoryInfo.name;
    const customDescription = promptDescription ? ` (${promptDescription})` : '';

    try {
      const newOutput = {
        id: Date.now(),
        type: 'flashcards',
        title: `${tool.title} - ${customTitle}${customDescription}`,
        content: `Đang tạo thẻ ghi nhớ cho chủ đề: ${customTitle} ${categoryInfo.icon}`,
        timestamp: new Date().toLocaleString('vi-VN'),
        source: source?.title || 'Không xác định'
      };

      setStudioOutputs(prev => [newOutput, ...prev]);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update with generated content
      setStudioOutputs(prev =>
        prev.map(output =>
          output.id === newOutput.id
            ? { ...output, content: `Thẻ ghi nhớ "${customTitle}" đã được tạo thành công. Nội dung được phân tích từ: ${source?.title}` }
            : output
        )
      );
    } catch (error) {
      console.error('Lỗi khi tạo thẻ ghi nhớ:', error);
    } finally {
      setIsGenerating(false);
      setPromptTitle('');
      setPromptDescription('');
    }
  };

  const handleGenerateQuizzes = () => {
    if (selectedQuizCategories.length === 0) {
      alert('Vui lòng chọn ít nhất một chủ đề.');
      return;
    }
    selectedQuizCategories.forEach(category => {
      generateQuizWithCategory(category);
    });
    setShowQuizOptions(false);
    setSelectedQuizCategories([]);
  };

  const generateQuizWithCategory = async (category) => {
    setIsGenerating(true);

    const tool = studioTools.find(t => t.id === 'quiz');
    const categoryInfo = mindMapCategories.find(c => c.id === category);

    const customTitle = promptTitle || categoryInfo.name;
    const customDescription = promptDescription ? ` (${promptDescription})` : '';

    try {
      const newOutput = {
        id: Date.now(),
        type: 'quiz',
        title: `${tool.title} - ${customTitle}${customDescription}`,
        content: `Đang tạo bài kiểm tra cho chủ đề: ${customTitle} ${categoryInfo.icon}`,
        timestamp: new Date().toLocaleString('vi-VN'),
        source: source?.title || 'Không xác định'
      };

      setStudioOutputs(prev => [newOutput, ...prev]);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update with generated content
      setStudioOutputs(prev =>
        prev.map(output =>
          output.id === newOutput.id
            ? { ...output, content: `Bài kiểm tra "${customTitle}" đã được tạo thành công. Nội dung được phân tích từ: ${source?.title}` }
            : output
        )
      );
    } catch (error) {
      console.error('Lỗi khi tạo bài kiểm tra:', error);
    } finally {
      setIsGenerating(false);
      setPromptTitle('');
      setPromptDescription('');
    }
  };


  const generateStudioOutput = async (toolId) => {
    if (!source) {
      alert('Vui lòng chọn một nguồn trước khi sử dụng Studio');
      return;
    }

    setShowPopup(false);
    setIsGenerating(true);
    const tool = studioTools.find(t => t.id === toolId);

    let prompt = '';

    switch (toolId) {
      case 'video-overview':
        prompt = `Tạo một bản tóm tắt video chi tiết như script video ngắn gọn, dễ hiểu:\n\nTiêu đề: ${source.title}\nNội dung: ${source.content}`;
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
              onClick={() => handleToolClick(tool)}
              className="studio-card group"
            >
              <div className="flex items-center gap-3">
                <tool.icon className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-sm font-medium text-white">{tool.title}</h3>
                </div>
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
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-4">
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

      {/* Popup Modal */}
      {showPopup && selectedTool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <selectedTool.icon className="w-6 h-6 text-blue-400" />


              <h3 className="text-lg font-semibold text-white">{selectedTool.title}</h3>
            </div>
            <p className="text-gray-300 mb-6">{selectedTool.description}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => generateStudioOutput(selectedTool.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Tạo nội dung
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Mind Map Options Popup */}
      {showMindMapOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Tạo Bản đồ Tư duy</h3>
            </div>

            <div className="border-b border-gray-700 pb-4 mb-4">
              <p className="text-gray-300 mb-3">Tùy chỉnh Prompt:</p>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Thêm tiêu đề (tùy chọn)"
                  value={promptTitle}
                  onChange={(e) => setPromptTitle(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Thêm mô tả (tùy chọn)"
                  value={promptDescription}
                  onChange={(e) => setPromptDescription(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
              </div>
            </div>

            <p className="text-gray-300 mb-4">Chọn chủ đề để tạo bản đồ tư duy:</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {mindMapCategories.map((category) => (
                <label key={category.id} className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedMindMapCategories.includes(category.id)}
                    onChange={() => handleMindMapCategoryChange(category.id)}
                    className="h-5 w-5 rounded bg-gray-900 border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xl">{category.icon}</span>
                  <span className="text-white text-sm">{category.name}</span>
                </label>
              ))}
            </div>

            <div className="border-t border-gray-600 pt-4 mb-4">
              <p className="text-gray-300 mb-3">Hoặc tải lên file của bạn:</p>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.md"
                  className="hidden"
                  id="mindmap-file-upload"
                />
                <label
                  htmlFor="mindmap-file-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Chọn file
                </label>
                <span className="text-gray-400 text-sm">PDF, DOC, TXT, MD</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowMindMapOptions(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleGenerateMindMaps}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Tạo
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Report Options Popup */}
      {showReportOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <Report className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Chọn loại báo cáo</h3>
            </div>


            <div className="border-t border-gray-600 pt-4 mb-4">
              <p className="text-gray-300 mb-3">Hoặc tải lên file của bạn:</p>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.md"
                  className="hidden"
                  id="report-file-upload"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="report-file-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Chọn file
                </label>
                <span className="text-gray-400 text-sm">PDF, DOC, TXT, MD</span>
              </div>
            </div>
            <div className="border-b border-gray-700 pb-4 mb-4">
              <p className="text-gray-300 mb-3">Tùy chỉnh Prompt:</p>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Thêm tiêu đề (tùy chọn)"
                  value={promptTitle}
                  onChange={(e) => setPromptTitle(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Thêm mô tả (tùy chọn)"
                  value={promptDescription}
                  onChange={(e) => setPromptDescription(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-6">
              {reportTypes.map((type) => (
                <label key={type.id} className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedReportTypes.includes(type.id)}
                    onChange={() => handleReportTypeChange(type.id)}
                    className="h-5 w-5 rounded bg-gray-900 border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xl">{type.icon}</span>
                  <span className="text-white text-sm">{type.name}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowReportOptions(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleGenerateReports}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Tạo
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Flashcard Options Popup */}
      {showFlashcardOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Tạo Thẻ ghi nhớ</h3>
            </div>

            <div className="border-b border-gray-700 pb-4 mb-4">
              <p className="text-gray-300 mb-3">Tùy chỉnh Prompt:</p>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Thêm tiêu đề (tùy chọn)"
                  value={promptTitle}
                  onChange={(e) => setPromptTitle(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Thêm mô tả (tùy chọn)"
                  value={promptDescription}
                  onChange={(e) => setPromptDescription(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
              </div>
            </div>

            <p className="text-gray-300 mb-4">Chọn chủ đề để tạo thẻ ghi nhớ:</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {mindMapCategories.map((category) => (
                <label key={category.id} className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFlashcardCategories.includes(category.id)}
                    onChange={() => handleFlashcardCategoryChange(category.id)}
                    className="h-5 w-5 rounded bg-gray-900 border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xl">{category.icon}</span>
                  <span className="text-white text-sm">{category.name}</span>
                </label>
              ))}
            </div>

            <div className="border-t border-gray-600 pt-4 mb-4">
              <p className="text-gray-300 mb-3">Hoặc tải lên file của bạn:</p>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.md"
                  className="hidden"
                  id="flashcard-file-upload"
                />
                <label
                  htmlFor="flashcard-file-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Chọn file
                </label>
                <span className="text-gray-400 text-sm">PDF, DOC, TXT, MD</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowFlashcardOptions(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleGenerateFlashcards}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Tạo
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Quiz Options Popup */}
      {showQuizOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Tạo Bài kiểm tra</h3>
            </div>

            <div className="border-b border-gray-700 pb-4 mb-4">
              <p className="text-gray-300 mb-3">Tùy chỉnh Prompt:</p>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Thêm tiêu đề (tùy chọn)"
                  value={promptTitle}
                  onChange={(e) => setPromptTitle(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Thêm mô tả (tùy chọn)"
                  value={promptDescription}
                  onChange={(e) => setPromptDescription(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
              </div>
            </div>

            <p className="text-gray-300 mb-4">Chọn chủ đề để tạo bài kiểm tra:</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {mindMapCategories.map((category) => (
                <label key={category.id} className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedQuizCategories.includes(category.id)}
                    onChange={() => handleQuizCategoryChange(category.id)}
                    className="h-5 w-5 rounded bg-gray-900 border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xl">{category.icon}</span>
                  <span className="text-white text-sm">{category.name}</span>
                </label>
              ))}
            </div>

            <div className="border-t border-gray-600 pt-4 mb-4">
              <p className="text-gray-300 mb-3">Hoặc tải lên file của bạn:</p>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.md"
                  className="hidden"
                  id="quiz-file-upload"
                />
                <label
                  htmlFor="quiz-file-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Chọn file
                </label>
                <span className="text-gray-400 text-sm">PDF, DOC, TXT, MD</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowQuizOptions(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleGenerateQuizzes}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Tạo
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Video Overview Options Popup */}
      {showVideoOverviewOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <Video className="w-6 h-6 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Tổng quan bằng video</h3>
            </div>

            <div className="border-b border-gray-700 pb-4 mb-4">
              <p className="text-gray-300 mb-3">Tùy chỉnh Prompt:</p>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Thêm tiêu đề (tùy chọn)"
                  value={promptTitle}
                  onChange={(e) => setPromptTitle(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Thêm mô tả (tùy chọn)"
                  value={promptDescription}
                  onChange={(e) => setPromptDescription(e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
              </div>
            </div>

            <div className="border-t border-gray-600 pt-4 mb-4">
              <p className="text-gray-300 mb-3">Tải lên file của bạn:</p>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.md,.mp4,.mov,.avi"
                  className="hidden"
                  id="video-file-upload"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="video-file-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Chọn file
                </label>
                <span className="text-gray-400 text-sm">Video, PDF, DOC...</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowVideoOverviewOptions(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  generateStudioOutput('video-overview');
                  setShowVideoOverviewOptions(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Tạo
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StudioPanel;
