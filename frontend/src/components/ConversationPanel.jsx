import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send,
    Paperclip,
    Download,
    Play,
    Image as ImageIcon,
    BookOpen,
    Lightbulb,
    ChevronRight,
    ExternalLink,
    CheckCircle,
    AlertCircle,
    Info,
    Bot,
    User,
    Settings,
    X,
    Search,
    Sparkles,
    Menu,
    File
} from 'lucide-react';
import { searchFAQs } from '../api/faqApi';
import { updateConversation } from '../api/conversationApi';
import ConversationHistorySidebar from './ConversationHistorySidebar';

const ConversationPanel = ({
    source,
    conversations,
    onUpdateConversations,
    searchQuery,
    onSearchChange,
    autoSend = false,
    pendingAttachment = null,
    onConsumeAttachment,
    currentConversation = null,
    onUpdateConversationTitle = null,
}) => {
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showExplore, setShowExplore] = useState(false);
    const [exploreQuery, setExploreQuery] = useState('');
    const [sourceType, setSourceType] = useState('web');
    const [chatStyle, setChatStyle] = useState('default');
    const [answerLength, setAnswerLength] = useState('default');
    const [hasAutoSent, setHasAutoSent] = useState(false);
    const [attachment, setAttachment] = useState(null);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversations]);

    // Set input message / auto-send when navigating from HomePage
    useEffect(() => {
        const hasQuery = searchQuery && searchQuery.trim();
        const hasAttachment = !!pendingAttachment;
        if ((hasQuery || hasAttachment) && !hasAutoSent) {
            const composedMessage = hasQuery ? searchQuery : pendingAttachment?.name;
            setInputMessage(composedMessage || '');

            if (autoSend) {
                setHasAutoSent(true);
                setTimeout(() => {
                    handleSendAttachmentAware(composedMessage, pendingAttachment);
                    if (onConsumeAttachment) onConsumeAttachment();
                }, 100);
            }

            if (hasQuery && onSearchChange) {
                onSearchChange('');
            }
        }
    }, [searchQuery, pendingAttachment, onSearchChange, autoSend, hasAutoSent]);
    // Sync pendingAttachment from props to local state
    useEffect(() => {
        if (pendingAttachment) {
            setAttachment(pendingAttachment);
        }
    }, [pendingAttachment]);


    const handleSendMessage = async () => {
        if (!inputMessage.trim() && !attachment) {
            return;
        }
        handleSendAttachmentAware(inputMessage, attachment);
        setAttachment(null); // Xóa tệp đính kèm sau khi gửi
    };

    const handleSendMessageWithContent = async (messageContent) => {
        if (!messageContent || !messageContent.trim()) {
            console.log('Message content is empty, not sending');
            return;
        }

        console.log('Sending message with content:', messageContent);
        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: messageContent,
            timestamp: new Date().toISOString()
        };

        const newConversations = [...conversations, userMessage];
        onUpdateConversations(newConversations);
        setInputMessage('');
        setIsLoading(true);

        // Tự động cập nhật tiêu đề nếu đây là tin nhắn đầu tiên trong cuộc trò chuyện mới
        if (currentConversation && currentConversation.title === 'Cuộc trò chuyện mới' && conversations.length === 0) {
            try {
                const updateResult = await updateConversation(currentConversation.id, {
                    title: messageContent.trim()
                });

                if (updateResult.success && onUpdateConversationTitle) {
                    onUpdateConversationTitle(currentConversation.id, messageContent.trim());
                }
            } catch (error) {
                console.error('Failed to update conversation title:', error);
            }
        }

        // Simulate AI response with rich content
        setTimeout(async () => {
            const aiResponse = await generateRichResponse(messageContent, source);
            const finalConversations = [...newConversations, aiResponse];
            onUpdateConversations(finalConversations);
            setIsLoading(false);
            console.log('AI response sent');
        }, 2000);
    };

    // Send message that may include an attachment metadata
    const handleSendAttachmentAware = async (messageContent, attachment) => {
        // Auto-update title with filename on first message with attachment in a new convo
        if (attachment && currentConversation && currentConversation.title === 'Cuộc trò chuyện mới' && conversations.length === 0) {
            try {
                const updateResult = await updateConversation(currentConversation.id, { title: attachment.name });
                if (updateResult.success && onUpdateConversationTitle) {
                    onUpdateConversationTitle(currentConversation.id, attachment.name);
                }
            } catch (error) {
                console.error('Failed to auto-update conversation title with attachment name:', error);
            }
        }

        const parts = [];
        if (attachment?.name) {
            parts.push(`[Tệp đính kèm] ${attachment.name}`);
        }
        if (messageContent && messageContent.trim()) {
            parts.push(messageContent.trim());
        }
        const composed = parts.join('\n');
        handleSendMessageWithContent(composed);
    };

    const generateRichResponse = async (question, source) => {
        // Check if this is an FAQ question by searching our FAQ database
        let faqMatch = null;
        try {
            const searchResults = await searchFAQs(question);
            if (searchResults.success && searchResults.data.length > 0) {
                // Find the best match (exact or very close match)
                faqMatch = searchResults.data.find(faq =>
                    faq.question.toLowerCase() === question.toLowerCase() ||
                    question.toLowerCase().includes(faq.question.toLowerCase()) ||
                    faq.question.toLowerCase().includes(question.toLowerCase())
                ) || searchResults.data[0];
            }
        } catch (error) {
            console.error('Error searching FAQs:', error);
        }

        if (faqMatch) {
            // Generate enhanced response for FAQ questions
            return generateFAQResponse(faqMatch, question);
        }

        // Default response for non-FAQ questions
        return {
            id: Date.now() + 1,
            type: 'ai',
            content: '',
            timestamp: new Date().toISOString(),
            richContent: {
                answer: source ?
                    `Dựa trên nội dung từ "${source.title}", đây là câu trả lời chi tiết cho câu hỏi của bạn về "${question}".` :
                    `Đây là câu trả lời chi tiết cho câu hỏi của bạn về "${question}".`,

                mainContent: `Trong chủ đề này, chúng ta có thể thấy rằng có nhiều khía cạnh quan trọng cần được phân tích. Đây là một chủ đề phức tạp với nhiều yếu tố tương tác với nhau.`,

                image: {
                    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
                    alt: 'Minh họa nội dung',
                    caption: 'Hình ảnh minh họa cho khái niệm được thảo luận'
                },

                whyItMatters: `Điều này quan trọng vì nó ảnh hưởng trực tiếp đến cách chúng ta hiểu và áp dụng kiến thức trong thực tế. Hiểu rõ khái niệm này giúp chúng ta đưa ra quyết định tốt hơn.`,

                video: {
                    title: 'Video giải thích chi tiết',
                    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=200&fit=crop',
                    duration: '5:30'
                },

                interactiveList: [
                    { id: 1, text: 'Khái niệm cơ bản và định nghĩa', completed: true },
                    { id: 2, text: 'Các ví dụ thực tế và ứng dụng', completed: true },
                    { id: 3, text: 'Phân tích chi tiết và case studies', completed: false },
                    { id: 4, text: 'Bài tập và thực hành', completed: false }
                ],

                options: {
                    simply: 'Giải thích đơn giản hơn',
                    goDeeper: 'Đi sâu vào chi tiết',
                    getImages: 'Thêm hình ảnh minh họa'
                },

                suggestedQuestions: [
                    'Có thể giải thích thêm về phần nào đó không?',
                    'Có ví dụ cụ thể nào khác không?',
                    'Làm thế nào để áp dụng điều này trong thực tế?',
                    'Có tài liệu tham khảo nào khác không?'
                ]
            }
        };
    };

    const generateFAQResponse = (faq) => {
        const programmingImages = {
            'Programming Fundamentals': 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=300&fit=crop',
            'Learning Roadmap': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop',
            'Software Engineering Tools': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop',
            'Career Path': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop',
            'Data Structures & Algorithms': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop',
            'Modern Tech Stack': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop'
        };

        return {
            id: Date.now() + 1,
            type: 'ai',
            content: '',
            timestamp: new Date().toISOString(),
            isFAQResponse: true,
            faqData: faq,
            richContent: {
                answer: faq.detailedAnswer,
                mainContent: `This is a comprehensive answer about ${faq.category.toLowerCase()}. ${faq.detailedAnswer}`,

                image: {
                    url: programmingImages[faq.category] || programmingImages['Programming Fundamentals'],
                    alt: `Illustration for ${faq.category}`,
                    caption: `Visual representation of ${faq.category} concepts`
                },

                whyItMatters: `Understanding ${faq.category.toLowerCase()} is crucial for your programming journey because it forms the foundation for building robust, scalable applications and advancing your career in software development.`,

                interactiveList: faq.category === 'Learning Roadmap' ? [
                    { id: 1, text: 'Master the fundamentals', completed: true },
                    { id: 2, text: 'Choose your specialization', completed: false },
                    { id: 3, text: 'Build practical projects', completed: false },
                    { id: 4, text: 'Join the developer community', completed: false }
                ] : [
                    { id: 1, text: 'Understand core concepts', completed: true },
                    { id: 2, text: 'Practice with examples', completed: false },
                    { id: 3, text: 'Apply in real projects', completed: false },
                    { id: 4, text: 'Share knowledge with others', completed: false }
                ],

                options: {
                    simply: 'Explain in simpler terms',
                    goDeeper: 'Provide more technical details',
                    getImages: 'Show more examples and diagrams'
                },

                suggestedQuestions: faq.relatedQuestions || [
                    'Can you provide more specific examples?',
                    'What are the best practices for this?',
                    'How long does it typically take to learn this?',
                    'What resources do you recommend for learning more?'
                ]
            }
        };
    };

    const handleOptionClick = (option) => {
        const optionMessage = {
            id: Date.now(),
            type: 'user',
            content: `Tôi muốn ${option}`,
            timestamp: new Date().toISOString()
        };

        const newConversations = [...conversations, optionMessage];
        onUpdateConversations(newConversations);
        setIsLoading(true);

        setTimeout(() => {
            const response = {
                id: Date.now() + 1,
                type: 'ai',
                content: `Đây là ${option} cho câu hỏi trước đó:`,
                timestamp: new Date().toISOString(),
                richContent: {
                    answer: `Nội dung ${option} được tùy chỉnh theo yêu cầu của bạn.`,
                    mainContent: `Đây là phiên bản ${option} của câu trả lời trước đó.`
                }
            };

            const finalConversations = [...newConversations, response];
            onUpdateConversations(finalConversations);
            setIsLoading(false);
        }, 1500);
    };

    const handleSuggestedQuestion = (question) => {
        setInputMessage(question);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newAttachment = { name: file.name, type: file.type, size: file.size };
            setAttachment(newAttachment);
        }
    };



    if (!source && conversations.length === 0) {
        return (
            <div className="flex-1 flex flex-col bg-gray-900">
                {/* Header */}
                <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">{currentConversation ? currentConversation.title : 'Cuộc trò chuyện'}</h2>
                        <button
                            onClick={() => setShowSettings(true)}
                            className="text-gray-400 hover:text-white"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Empty State */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-xl font-medium text-white mb-2">Chào mừng đến với Hannah</h3>
                        <p className="text-gray-400 mb-4">
                            Hãy cùng khám phá và bắt đầu đặt câu hỏi!
                        </p>

                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-700">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-2">
                        {attachment && (
                            <div className="mb-2">
                                <div className="inline-flex items-center gap-2 bg-gray-700 rounded-lg px-3 py-2">
                                    <File className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-white">{attachment.name}</span>
                                    <button onClick={() => setAttachment(null)} className="p-1 text-gray-400 hover:text-white">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder={"Nhập câu hỏi của bạn..."}
                                className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                                title="Tải file lên"
                            >
                                <Paperclip className="w-4 h-4" />
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.doc,.docx,.txt"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={(!inputMessage.trim() && !attachment) || isLoading}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-gray-900">
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-white">{currentConversation ? currentConversation.title : 'Cuộc trò chuyện'}</h2>
                        {source && (
                            <p className="text-sm text-gray-400 mt-1">
                                Đang sử dụng: {source.title}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowSettings(true)}
                            className="text-gray-400 hover:text-white"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversations.length === 0 ? (
                    <div className="text-center py-8">
                        <Bot className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <h3 className="text-lg font-medium text-white mb-2">Bắt đầu cuộc trò chuyện với Hannah</h3>

                    </div>
                ) : (
                    conversations.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-center'}`}
                        >
                            {message.type === 'user' ? (
                                <div className="max-w-md p-4 rounded-lg bg-blue-600 text-white">
                                    <div className="flex items-start gap-2">
                                        <User className="w-4 h-4 mt-0.5 text-blue-200 flex-shrink-0" />
                                        <div className="text-sm whitespace-pre-wrap">
                                            {message.content}
                                        </div>
                                    </div>
                                    <div className="text-xs text-blue-100 mt-2">
                                        {new Date(message.timestamp).toLocaleString('vi-VN')}
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full max-w-5xl">
                                    <div className="space-y-6">
                                        {/* Main Answer - Hannah Learn Style */}
                                        {message.type === 'ai' && message.richContent && (
                                            <div className={`backdrop-blur-sm border rounded-xl p-6 ${
                                                message.isFAQResponse
                                                    ? 'bg-blue-900/20 border-blue-500/30'
                                                    : 'bg-gray-800/50 border-gray-700'
                                            }`}>
                                                {message.isFAQResponse && message.faqData && (
                                                    <div className="mb-4 pb-4 border-b border-blue-500/20">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                                            <span className="text-blue-300 text-sm font-medium">
                                                                FAQ Answer • {message.faqData.category}
                                                            </span>
                                                            <span className="text-blue-400 text-xs px-2 py-1 bg-blue-900/30 rounded-full">
                                                                {message.faqData.difficulty}
                                                            </span>
                                                        </div>
                                                        <h4 className="text-blue-100 font-medium text-base">
                                                            {message.faqData.question}
                                                        </h4>
                                                    </div>
                                                )}
                                                <div className="text-lg leading-relaxed text-white">
                                                    {message.richContent.answer}
                                                </div>
                                                <div className="text-base text-gray-300 mt-3">
                                                    {message.richContent.mainContent}
                                                </div>
                                            </div>
                                        )}

                                        {/* Rich Content for AI messages - Hannah Learn Style */}
                                        {message.type === 'ai' && message.richContent && (
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                {/* Left Column - Main Content */}
                                                <div className="space-y-4">
                                                    {/* Why It Matters */}
                                                    {message.richContent.whyItMatters && (
                                                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-5">
                                                            <h4 className="font-semibold text-blue-200 mb-3 flex items-center gap-2">
                                                                <Lightbulb className="w-5 h-5" />
                                                                Tại sao điều này quan trọng?
                                                            </h4>
                                                            <p className="text-blue-100 leading-relaxed">{message.richContent.whyItMatters}</p>
                                                        </div>
                                                    )}

                                                    {/* Interactive List */}
                                                    {message.richContent.interactiveList && (
                                                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                                                            <h4 className="font-semibold text-white mb-4">Danh sách tương tác</h4>
                                                            <div className="space-y-3">
                                                                {message.richContent.interactiveList.map((item) => (
                                                                    <div key={item.id} className="flex items-center gap-3">
                                                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.completed ? 'bg-green-500' : 'bg-gray-500'
                                                                            }`}>
                                                                            {item.completed && <CheckCircle className="w-4 h-4 text-white" />}
                                                                        </div>
                                                                        <span className={`text-sm ${item.completed ? 'text-gray-300 line-through' : 'text-white'
                                                                            }`}>
                                                                            {item.text}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Right Column - Media & Actions */}
                                                <div className="space-y-4">
                                                    {/* Image */}
                                                    {message.richContent.image && (
                                                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                                                            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                                                <ImageIcon className="w-5 h-5" />
                                                                Hình ảnh minh họa
                                                            </h4>
                                                            <img
                                                                src={message.richContent.image.url}
                                                                alt={message.richContent.image.alt}
                                                                className="w-full h-48 object-cover rounded-lg mb-3"
                                                            />
                                                            <p className="text-sm text-gray-400">{message.richContent.image.caption}</p>
                                                        </div>
                                                    )}

                                                    {/* Video */}
                                                    {message.richContent.video && (
                                                        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                                                            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                                                <Play className="w-5 h-5" />
                                                                Video liên quan
                                                            </h4>
                                                            <div className="relative">
                                                                <img
                                                                    src={message.richContent.video.thumbnail}
                                                                    alt={message.richContent.video.title}
                                                                    className="w-full h-40 object-cover rounded-lg"
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <div className="bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
                                                                        <Play className="w-4 h-4" />
                                                                        {message.richContent.video.duration}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <h5 className="text-white font-medium mt-3">{message.richContent.video.title}</h5>
                                                            <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 mt-2">
                                                                <ExternalLink className="w-3 h-3" />
                                                                Xem video
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Bottom Section - Options & Suggestions */}
                                        {message.type === 'ai' && message.richContent && (
                                            <div className="space-y-4">
                                                {/* Options */}
                                                {message.richContent.options && (
                                                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                                                        <h4 className="font-semibold text-white mb-4">Tùy chọn</h4>
                                                        <div className="flex flex-wrap gap-3">
                                                            <button
                                                                onClick={() => handleOptionClick(message.richContent.options.simply)}
                                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors font-medium"
                                                            >
                                                                Đơn giản
                                                            </button>
                                                            <button
                                                                onClick={() => handleOptionClick(message.richContent.options.goDeeper)}
                                                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors font-medium"
                                                            >
                                                                Tìm hiểu sâu hơn
                                                            </button>
                                                            <button
                                                                onClick={() => handleOptionClick(message.richContent.options.getImages)}
                                                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors font-medium"
                                                            >
                                                                Lấy hình ảnh
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Suggested Questions */}
                                                {message.richContent.suggestedQuestions && (
                                                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                                                        <h4 className="font-semibold text-white mb-4">Câu hỏi gợi ý</h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                            {message.richContent.suggestedQuestions.map((question, index) => (
                                                                <button
                                                                    key={index}
                                                                    onClick={() => handleSuggestedQuestion(question)}
                                                                    className="text-left p-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-sm text-gray-200 hover:text-white transition-colors flex items-center gap-2 border border-gray-600 hover:border-gray-500"
                                                                >
                                                                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                                                                    <span>{question}</span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="text-xs text-gray-400 mt-4">
                                            {new Date(message.timestamp).toLocaleString('vi-VN')}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))
                )}

                {/* Loading indicator */}
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center"
                    >
                        <div className="w-full max-w-4xl">
                            <div className="bg-gray-800 text-white p-6 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Bot className="w-4 h-4 text-blue-400" />
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span className="text-sm">AI đang suy nghĩ...</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-2">
                    {attachment && (
                        <div className="mb-2">
                            <div className="inline-flex items-center gap-2 bg-gray-700 rounded-lg px-3 py-2">
                                <File className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-white">{attachment.name}</span>
                                <button onClick={() => setAttachment(null)} className="p-1 text-gray-400 hover:text-white">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder={"Nhập câu hỏi của bạn..."}
                            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                            title="Tải file lên"
                        >
                            <Paperclip className="w-4 h-4" />
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={(!inputMessage.trim() && !attachment) || isLoading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Settings Modal */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowSettings(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-white">Định cấu hình cuộc trò chuyện</h2>
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Description */}
                            <p className="text-gray-300 text-sm mb-6">
                                Bạn có thể tuỳ chỉnh để sổ ghi chú hoạt động như một trợ lý nghiên cứu ảo, gia sư riêng, cơ sở kiến thức/trung tâm trợ giúp dùng chung và nhiều vai trò khác.
                            </p>

                            {/* Chat Style Section */}
                            <div className="mb-6">
                                <h3 className="text-white font-medium mb-3">Xác định phong cách trò chuyện</h3>
                                <div className="space-y-2">
                                    {[
                                        { id: 'default', label: 'Mặc định', description: 'Phù hợp nhất với công việc nghiên cứu vì mục đích chung và công việc lên ý tưởng.' },
                                        { id: 'learning', label: 'Hướng dẫn học tập', description: 'Tối ưu cho việc học tập và giảng dạy với cách tiếp cận từng bước.' },
                                        { id: 'custom', label: 'Tuỳ chỉnh', description: 'Cho phép bạn định nghĩa phong cách trò chuyện riêng.' }
                                    ].map((style) => (
                                        <button
                                            key={style.id}
                                            onClick={() => setChatStyle(style.id)}
                                            className={`w-full text-left p-3 rounded-lg border transition-colors ${chatStyle === style.id
                                                ? 'bg-blue-600 border-blue-500 text-white'
                                                : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {chatStyle === style.id && <CheckCircle className="w-4 h-4" />}
                                                <span className="font-medium">{style.label}</span>
                                            </div>
                                            {chatStyle === style.id && (
                                                <p className="text-sm text-blue-100 mt-1">{style.description}</p>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Answer Length Section */}
                            <div className="mb-6">
                                <h3 className="text-white font-medium mb-3">Chọn độ dài cho câu trả lời</h3>
                                <div className="space-y-2">
                                    {[
                                        { id: 'default', label: 'Mặc định', description: 'Độ dài cân bằng phù hợp cho hầu hết các tình huống.' },
                                        { id: 'longer', label: 'Dài hơn', description: 'Câu trả lời chi tiết và toàn diện hơn.' },
                                        { id: 'shorter', label: 'Ngắn hơn', description: 'Câu trả lời ngắn gọn và súc tích.' }
                                    ].map((length) => (
                                        <button
                                            key={length.id}
                                            onClick={() => setAnswerLength(length.id)}
                                            className={`w-full text-left p-3 rounded-lg border transition-colors ${answerLength === length.id
                                                ? 'bg-blue-600 border-blue-500 text-white'
                                                : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {answerLength === length.id && <CheckCircle className="w-4 h-4" />}
                                                <span className="font-medium">{length.label}</span>
                                            </div>
                                            {answerLength === length.id && (
                                                <p className="text-sm text-blue-100 mt-1">{length.description}</p>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                >
                                    Lưu cấu hình
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Explore Sources Modal */}
            <AnimatePresence>
                {showExplore && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowExplore(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-gray-800 rounded-xl p-6 w-full max-w-lg mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-white">Khám phá các nguồn</h2>
                                <button
                                    onClick={() => setShowExplore(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Main Icon */}
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 mx-auto mb-4 bg-blue-600/20 rounded-full flex items-center justify-center">
                                    <Search className="w-8 h-8 text-blue-400" />
                                    <Sparkles className="w-4 h-4 text-yellow-400 -ml-2 -mt-2" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    Bạn quan tâm đến những chủ đề nào?
                                </h3>
                            </div>

                            {/* Text Area */}
                            <div className="mb-6">
                                <textarea
                                    value={exploreQuery}
                                    onChange={(e) => setExploreQuery(e.target.value)}
                                    placeholder="Mô tả nội dung bạn muốn tìm hiểu hoặc nhấp vào 'Thử khám phá' để khám phá một chủ đề mới."
                                    className="w-full h-32 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                            </div>

                            {/* Source Type Selection */}
                            <div className="mb-6">
                                <h4 className="text-white font-medium mb-3">Tìm các nguồn từ:</h4>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="sourceType"
                                            value="web"
                                            checked={sourceType === 'web'}
                                            onChange={(e) => setSourceType(e.target.value)}
                                            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                                        />
                                        <span className="text-gray-300">Web</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="sourceType"
                                            value="google-drive"
                                            checked={sourceType === 'google-drive'}
                                            onChange={(e) => setSourceType(e.target.value)}
                                            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                                        />
                                        <span className="text-gray-300">Hannah Drive</span>
                                    </label>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        // Random exploration functionality
                                        const randomTopics = [
                                            "Công nghệ AI và Machine Learning",
                                            "Lịch sử thế giới cổ đại",
                                            "Khoa học vũ trụ và thiên văn học",
                                            "Nghệ thuật và văn hóa",
                                            "Y học và sức khỏe",
                                            "Kinh tế và tài chính"
                                        ];
                                        const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
                                        setExploreQuery(randomTopic);
                                    }}
                                    className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <Search className="w-4 h-4" />
                                    <Sparkles className="w-4 h-4" />
                                    <span>Xem thông tin thú vị ngẫu nhiên</span>
                                </button>
                                <button
                                    onClick={() => {
                                        if (exploreQuery.trim()) {
                                            // Handle explore submission
                                            console.log('Exploring:', exploreQuery, 'from:', sourceType);
                                            setShowExplore(false);
                                        }
                                    }}
                                    disabled={!exploreQuery.trim()}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                                >
                                    Gửi
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


        </div>
    );
};

export default ConversationPanel;