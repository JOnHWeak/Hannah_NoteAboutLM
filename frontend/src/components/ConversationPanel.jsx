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

    Settings,
    X,
    Search,
    Sparkles,
    Menu,
    File,
    FileText,
    HelpCircle,
    Clock,
    List,
    PlayCircle,

    ThumbsUp,
    ThumbsDown,
    Share2,
    MoreHorizontal,
    Minus,
    Check,
    CheckSquare
} from 'lucide-react';
import { searchFAQs } from '../api/faqApi';
import { updateConversation } from '../api/conversationApi';
import TheBigPicture from './TheBigPicture';
import BotMessageToolbar from './BotMessageToolbar';




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
    onAutoCreateNewChat = null,
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
    const [playingVideo, setPlayingVideo] = useState(null);

    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
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
                    // Auto-create conversation if needed, then send message
                    if (!currentConversation && onAutoCreateNewChat) {
                        onAutoCreateNewChat(composedMessage, hasAttachment ? pendingAttachment.name : '').then(() => {
                            setTimeout(() => {
                                handleSendAttachmentAware(composedMessage, pendingAttachment);
                                if (onConsumeAttachment) onConsumeAttachment();
                            }, 200);
                        });
                    } else {
                        handleSendAttachmentAware(composedMessage, pendingAttachment);
                        if (onConsumeAttachment) onConsumeAttachment();
                    }
                }, 100);
            }

            if (hasQuery && onSearchChange) {
                onSearchChange('');
            }
        }
    }, [searchQuery, pendingAttachment, onSearchChange, autoSend, hasAutoSent, currentConversation, onAutoCreateNewChat]);
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

        // Auto-create new chat if no current conversation exists
        if (!currentConversation && onAutoCreateNewChat) {
            const title = attachment ? attachment.name : inputMessage.trim();
            await onAutoCreateNewChat(title);
            // Wait a bit for the conversation to be created
            setTimeout(() => {
                handleSendAttachmentAware(inputMessage, attachment);
                setAttachment(null);
            }, 100);
        } else {
            handleSendAttachmentAware(inputMessage, attachment);
            setAttachment(null); // Xóa tệp đính kèm sau khi gửi
        }
    };

    const handleSendMessageWithContent = async (messageContent) => {
        if (!messageContent || !messageContent.trim()) {
            console.log('Message content is empty, not sending');
            return;
        }

        // Auto-create new chat if no current conversation exists
        if (!currentConversation && onAutoCreateNewChat) {
            console.log('No current conversation, auto-creating new chat...');
            const title = messageContent.trim().substring(0, 50); // Limit title length
            const newConversation = await onAutoCreateNewChat(title);
            if (!newConversation) {
                console.error('Failed to auto-create conversation');
                return;
            }
            // Wait for the conversation to be properly set before continuing
            setTimeout(() => {
                handleSendMessageWithContent(messageContent);
            }, 200);
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
                    title: messageContent.trim().substring(0, 50)
                });

                if (updateResult.success && onUpdateConversationTitle) {
                    onUpdateConversationTitle(currentConversation.id, messageContent.trim().substring(0, 50));
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

    // Unified response generator with vertical Vietnamese structure
    const generateUnifiedResponse = (content, responseType = 'general', sourceData = null, actionType = null) => {
        const topicName = content.topicName || sourceData?.category || 'Kỹ thuật phần mềm';

        const baseResponse = {
            id: Date.now() + 1,
            type: 'ai',
            content: '',
            timestamp: new Date().toISOString(),
            isUnifiedResponse: true,
            responseType: responseType,
            actionType: actionType,
            richContent: {}
        };

        // Handle different action types
        if (actionType === 'simplify') {
            // Case 1: Simplify button clicked
            baseResponse.richContent = {
                // Introduction section for Simplify
                introduction: `Hãy đơn giản hóa ${topicName}. ${content.answer || content.mainContent || `${topicName} là một lĩnh vực quan trọng trong công nghệ thông tin. Chúng ta sẽ tìm hiểu những điều cơ bản và quan trọng nhất để bạn có thể bắt đầu học một cách dễ dàng.`}`,

                // Interactive Timeline with slightly more detailed data
                interactiveTimeline: {
                    title: `Lộ trình học ${topicName} đơn giản`,
                    stages: [
                        {
                            id: 1,
                            title: 'Bước 1: Hiểu khái niệm cơ bản',
                            description: 'Tìm hiểu các thuật ngữ và khái niệm cơ bản nhất. Đây là nền tảng để bạn có thể tiếp tục học các chủ đề phức tạp hơn.',
                            image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop',
                            duration: '2-3 tuần',
                            keyPoints: ['Thuật ngữ cơ bản', 'Nguyên lý hoạt động', 'Ví dụ thực tế']
                        },
                        {
                            id: 2,
                            title: 'Bước 2: Thực hành đơn giản',
                            description: 'Bắt đầu với các bài tập và dự án nhỏ để áp dụng kiến thức đã học. Tập trung vào việc hiểu rõ từng bước.',
                            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop',
                            duration: '3-4 tuần',
                            keyPoints: ['Bài tập cơ bản', 'Dự án nhỏ', 'Thực hành hàng ngày']
                        },
                        {
                            id: 3,
                            title: 'Bước 3: Xây dựng dự án đầu tiên',
                            description: 'Tạo ra sản phẩm đầu tiên của bạn. Đây là cách tốt nhất để củng cố kiến thức và tạo động lực học tập.',
                            image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop',
                            duration: '4-6 tuần',
                            keyPoints: ['Dự án cá nhân', 'Áp dụng kiến thức', 'Tạo portfolio']
                        }
                    ]
                },

                // Related Videos component (replaces interactiveList)
                relatedVideos: {
                    title: `Video học ${topicName} cơ bản`,
                    videos: [
                        {
                            id: 1,
                            title: `${topicName} cho người mới bắt đầu`,
                            thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop',
                            duration: '15:30',
                            channel: 'Học Lập Trình',
                            url: 'https://youtube.com/watch?v=example1',
                            description: 'Video giới thiệu cơ bản về lĩnh vực này'
                        },
                        {
                            id: 2,
                            title: `Hướng dẫn thực hành ${topicName}`,
                            thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop',
                            duration: '22:45',
                            channel: 'Code Dạo',
                            url: 'https://youtube.com/watch?v=example2',
                            description: 'Thực hành từng bước một cách chi tiết'
                        },
                        {
                            id: 3,
                            title: `Dự án đầu tiên với ${topicName}`,
                            thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop',
                            duration: '35:20',
                            channel: 'Lập Trình Việt',
                            url: 'https://youtube.com/watch?v=example3',
                            description: 'Xây dựng dự án thực tế từ A đến Z'
                        }
                    ]
                }
            };
        } else if (actionType === 'goDeeper') {
            // Case 2: Learn More button clicked
            baseResponse.richContent = {
                // Introduction section for Learn More
                introduction: `Hãy tìm hiểu sâu hơn về ${topicName}. ${content.answer || content.mainContent || `${topicName} có nhiều khía cạnh phức tạp và thú vị. Chúng ta sẽ khám phá các khái niệm nâng cao và ứng dụng thực tế trong ngành công nghiệp.`}`,

                // Terminology Table (replaces interactive timeline)
                terminologyTable: {
                    title: `Thuật ngữ chuyên môn trong ${topicName}`,
                    terms: [
                        {
                            term: 'Waterfall',
                            characteristics: 'Sequential phases (requirements, design, implementation, testing, deployment), each completed before the next begins.',
                            focus: 'Structured, linear process.'
                        },
                        {
                            term: 'Agile',
                            characteristics: 'Iterative and incremental development, with a focus on flexibility, collaboration, and customer feedback.',
                            focus: 'Adaptability, speed, customer satisfaction.'
                        },
                        {
                            term: 'DevOps',
                            characteristics: 'Combines software development (Dev) and IT operations (Ops) to shorten the systems development life cycle and provide continuous delivery with high software quality.',
                            focus: 'Collaboration, automation, continuous delivery.'
                        },
                        {
                            term: 'Microservices',
                            characteristics: 'Architectural approach that structures an application as a collection of loosely coupled services.',
                            focus: 'Scalability, maintainability, technology diversity.'
                        },
                        {
                            term: 'API',
                            characteristics: 'Application Programming Interface - set of protocols and tools for building software applications.',
                            focus: 'Integration, modularity, reusability.'
                        }
                    ]
                },

                // Related Videos component (replaces interactiveList)
                relatedVideos: {
                    title: `Video chuyên sâu về ${topicName}`,
                    videos: [
                        {
                            id: 1,
                            title: `Kiến trúc ${topicName} nâng cao`,
                            thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop',
                            duration: '45:30',
                            channel: 'Tech Expert',
                            url: 'https://youtube.com/watch?v=advanced1',
                            description: 'Phân tích kiến trúc và design patterns'
                        },
                        {
                            id: 2,
                            title: `Best Practices trong ${topicName}`,
                            thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop',
                            duration: '38:15',
                            channel: 'Pro Developer',
                            url: 'https://youtube.com/watch?v=advanced2',
                            description: 'Các phương pháp tốt nhất từ chuyên gia'
                        },
                        {
                            id: 3,
                            title: `Case Study: ${topicName} trong doanh nghiệp`,
                            thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop',
                            duration: '52:40',
                            channel: 'Enterprise Tech',
                            url: 'https://youtube.com/watch?v=advanced3',
                            description: 'Ứng dụng thực tế trong các công ty lớn'
                        }
                    ]
                }
            };
        } else {
            // Default behavior - existing format but remove Related Videos, replace with different component
            baseResponse.richContent = {
                // 1. Phần Mở đầu (Introduction Section)
                introduction: content.answer || content.mainContent || `${topicName} là một lĩnh vực quan trọng trong công nghệ thông tin, đòi hỏi sự kết hợp giữa kiến thức lý thuyết vững chắc và kỹ năng thực hành. Việc hiểu rõ về chủ đề này sẽ giúp bạn xây dựng nền tảng vững chắc cho sự nghiệp trong lĩnh vực công nghệ.`,

                // 2. Interactive Timeline Module
                interactiveTimeline: {
                    title: `Lộ trình học ${topicName} tiêu biểu`,
                    stages: [
                        {
                            id: 1,
                            title: 'Giai đoạn 1: Kiến thức nền tảng',
                            description: 'Nắm vững các khái niệm cơ bản và ngôn ngữ lập trình đầu tiên',
                            image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop'
                        },
                        {
                            id: 2,
                            title: 'Giai đoạn 2: Phát triển kỹ năng cốt lõi',
                            description: 'Học cấu trúc dữ liệu, thuật toán và các nguyên lý thiết kế',
                            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop'
                        },
                        {
                            id: 3,
                            title: 'Giai đoạn 3: Chuyên môn hóa',
                            description: 'Tập trung vào các lĩnh vực cụ thể như web, mobile, hoặc data science',
                            image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop'
                        },
                        {
                            id: 4,
                            title: 'Giai đoạn 4: Dự án thực tế và kinh nghiệm',
                            description: 'Áp dụng kiến thức vào các dự án thực tế và xây dựng portfolio',
                            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop'
                        }
                    ]
                },

                // 3. Learning Resources Module (replaces interactiveList, different from Related Videos)
                learningResources: {
                    title: `Tài nguyên học tập ${topicName}`,
                    resources: [
                        {
                            id: 1,
                            type: 'course',
                            title: 'Khóa học trực tuyến',
                            description: 'Các khóa học có cấu trúc từ cơ bản đến nâng cao',
                            icon: '🎓',
                            items: ['Coursera', 'edX', 'Udemy', 'FreeCodeCamp']
                        },
                        {
                            id: 2,
                            type: 'book',
                            title: 'Sách chuyên môn',
                            description: 'Tài liệu tham khảo và sách giáo khoa',
                            icon: '📚',
                            items: ['Clean Code', 'Design Patterns', 'System Design', 'Algorithms']
                        },
                        {
                            id: 3,
                            type: 'practice',
                            title: 'Nền tảng thực hành',
                            description: 'Các trang web để luyện tập coding',
                            icon: '💻',
                            items: ['LeetCode', 'HackerRank', 'CodeWars', 'GitHub']
                        },
                        {
                            id: 4,
                            type: 'community',
                            title: 'Cộng đồng học tập',
                            description: 'Tham gia cộng đồng để học hỏi và chia sẻ',
                            icon: '👥',
                            items: ['Stack Overflow', 'Reddit', 'Discord', 'Viblo']
                        }
                    ]
                }
            };
        }

        // Add common components for all response types
        baseResponse.richContent.exploration = {
            title: 'Khám phá nội dung liên quan',
            sources: [
                {
                    title: `${topicName}: Những điều bạn cần biết`,
                    description: 'Hiểu rõ vai trò và yêu cầu của một kỹ sư phần mềm',
                    source: 'TopDev',
                    url: 'https://topdev.vn',
                    vietnamese_title: `Kỹ sư phần mềm là gì? Những điều cần biết về ${topicName.toLowerCase()}`
                },
                {
                    title: `Đặc điểm của nghề ${topicName}`,
                    description: 'Tìm hiểu về đặc điểm và nhiệm vụ hàng ngày của kỹ sư phần mềm',
                    source: 'Viblo',
                    url: 'https://viblo.asia',
                    vietnamese_title: `${topicName} là gì? Đặc điểm của nghề`
                },
                {
                    title: `Ngành ${topicName} và cơ hội nghề nghiệp`,
                    description: 'Khám phá các chủ đề chuyên sâu về kỹ thuật phần mềm',
                    source: 'FUNiX',
                    url: 'https://funix.edu.vn',
                    vietnamese_title: `Ngành ${topicName} học gì? Cơ hội việc làm ra sao?`
                }
            ]
        };

        baseResponse.richContent.suggestedQuestions = content.suggestedQuestions || [
            `Loại công việc nào có thể làm với bằng ${topicName.toLowerCase()}?`,
            `Kể cho tôi thêm về các ngôn ngữ lập trình cụ thể được sử dụng trong ${topicName.toLowerCase()}`,
            `Một số thách thức phổ biến trong ${topicName.toLowerCase()} là gì?`
        ];

        // Add specific data based on response type
        if (responseType === 'faq' && sourceData) {
            baseResponse.faqData = sourceData;
            baseResponse.richContent.introduction = sourceData.detailedAnswer || sourceData.answer || baseResponse.richContent.introduction;
        }

        return baseResponse;
    };

    const generateRichResponse = async (question, source) => {
        // Check for Learning Path trigger
        if (question.toLowerCase().includes('lộ trình học')) {
            return generateLearningPathResponse(question);
        }

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
            // Generate unified response for FAQ questions
            return generateUnifiedResponse({
                question: question,
                answer: faqMatch.detailedAnswer || faqMatch.answer,
                mainContent: `Đây là câu trả lời toàn diện về ${faqMatch.category?.toLowerCase() || 'chủ đề này'}. ${faqMatch.detailedAnswer || faqMatch.answer}`,
                whyItMatters: `Hiểu rõ về ${faqMatch.category?.toLowerCase() || 'chủ đề này'} là rất quan trọng cho hành trình lập trình của bạn vì nó tạo nền tảng để xây dựng các ứng dụng mạnh mẽ, có thể mở rộng và thúc đẩy sự nghiệp phát triển phần mềm của bạn.`,
                suggestedQuestions: faqMatch.relatedQuestions || [
                    'Bạn có thể cung cấp ví dụ cụ thể hơn không?',
                    'Các phương pháp tốt nhất cho điều này là gì?',
                    'Thường mất bao lâu để học điều này?',
                    'Bạn có đề xuất tài nguyên nào để học thêm không?'
                ]
            }, 'faq', faqMatch);
        }

        // Default unified response for all other questions
        return generateUnifiedResponse({
            question: question,
            answer: source ?
                `Dựa trên nội dung từ "${source.title}", đây là câu trả lời chi tiết cho câu hỏi của bạn về "${question}".` :
                `Đây là câu trả lời chi tiết cho câu hỏi của bạn về "${question}".`,
            mainContent: `Trong chủ đề này, chúng ta có thể thấy rằng có nhiều khía cạnh quan trọng cần được phân tích. Đây là một chủ đề phức tạp với nhiều yếu tố tương tác với nhau.`,
            whyItMatters: `Điều này quan trọng vì nó ảnh hưởng trực tiếp đến cách chúng ta hiểu và áp dụng kiến thức trong thực tế. Hiểu rõ khái niệm này giúp chúng ta đưa ra quyết định tốt hơn.`,
            suggestedQuestions: [
                'Có thể giải thích thêm về phần nào đó không?',
                'Có ví dụ cụ thể nào khác không?',
                'Làm thế nào để áp dụng điều này trong thực tế?',
                'Có tài liệu tham khảo nào khác không?'
            ]
        }, 'general');
    };

    const generateLearningPathResponse = () => {
        return {
            id: Date.now() + 1,
            type: 'ai',
            content: '',
            timestamp: new Date().toISOString(),
            isLearningPathResponse: true,
            richContent: {
                answer: "Bạn muốn mình trả lời về lộ trình học về mảng nào? Ví dụ: lộ trình học của môn Kỹ thuật phần mềm",
                mainContent: "Kỹ thuật phần mềm là ngành học tập trung vào việc áp dụng các nguyên lý kỹ thuật để phát triển phần mềm chất lượng cao. Lộ trình học bao gồm kiến thức nền tảng về lập trình, cấu trúc dữ liệu, thuật toán, và các phương pháp phát triển phần mềm hiện đại.",

                // Video component
                video: {
                    title: 'Lộ trình học Kỹ thuật phần mềm từ cơ bản đến nâng cao',
                    url: 'https://www.youtube.com/watch?v=psHYcRSo2Tg',
                    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
                    duration: '15:30',
                    description: 'Video hướng dẫn chi tiết về lộ trình học Kỹ thuật phần mềm'
                },

                // Web sources
                webSources: [
                    { title: 'TopDev - Lộ trình học Kỹ thuật phần mềm', url: 'https://topdev.vn/blog/lo-trinh-hoc-ky-thuat-phan-mem', description: 'Hướng dẫn chi tiết từ cơ bản đến nâng cao' },
                    { title: 'Viblo - Software Engineering Roadmap', url: 'https://viblo.asia/p/roadmap-ky-thuat-phan-mem', description: 'Lộ trình học từ cộng đồng lập trình viên Việt Nam' },
                    { title: 'FUNiX - Chương trình đào tạo KTPM', url: 'https://funix.edu.vn/chuong-trinh-dao-tao/ky-thuat-phan-mem', description: 'Chương trình học có cấu trúc từ trường đại học' }
                ],

                // Why it matters section
                whyItMatters: "Hiểu rõ lộ trình học Kỹ thuật phần mềm là rất quan trọng vì nó giúp bạn có cái nhìn tổng quan về ngành, lập kế hoạch học tập hiệu quả và phát triển sự nghiệp bền vững trong lĩnh vực công nghệ thông tin.",

                // Interactive checklist
                interactiveList: [
                    { id: 1, text: 'Nắm vững kiến thức nền tảng về lập trình', completed: true },
                    { id: 2, text: 'Học cấu trúc dữ liệu và giải thuật', completed: false },
                    { id: 3, text: 'Thực hành với các dự án thực tế', completed: false },
                    { id: 4, text: 'Tham gia cộng đồng lập trình viên', completed: false }
                ],

                learningPathActions: {
                    simplify: {
                        title: "Đơn giản",
                        description: "Tài liệu cơ bản và nguồn học thiết yếu",
                        color: "green"
                    },
                    goDeeper: {
                        title: "Tìm hiểu sâu hơn",
                        description: "Tài liệu chuyên sâu và FAQ chi tiết",
                        color: "blue"
                    },
                    getImages: {
                        title: "Lấy hình ảnh",
                        description: "Hình ảnh và infographic minh họa",
                        color: "purple"
                    }
                },

                suggestedQuestions: [
                    'Lộ trình học Frontend Development',
                    'Lộ trình học Backend Development',
                    'Lộ trình học Data Science',
                    'Lộ trình học Mobile Development'
                ]
            }
        };
    };

    const generateMockToolbarResponse = (action) => {
        const mockResponses = {
            simplify: {
                id: Date.now() + 1,
                type: 'ai',
                content: '',
                timestamp: new Date().toISOString(),
                isToolbarResponse: true,
                actionType: action,
                richContent: {
                    answer: "Đây là phiên bản đơn giản của nội dung:",
                    mainContent: "Tôi đã đơn giản hóa thông tin để dễ hiểu hơn. Nội dung này tập trung vào những điểm cốt lõi và quan trọng nhất, loại bỏ các chi tiết phức tạp.",
                    keyPoints: [
                        "Khái niệm cơ bản được giải thích một cách dễ hiểu",
                        "Các bước thực hiện được chia nhỏ và rõ ràng",
                        "Ví dụ thực tế giúp minh họa ý tưởng"
                    ]
                }
            },
            goDeeper: {
                id: Date.now() + 1,
                type: 'ai',
                content: '',
                timestamp: new Date().toISOString(),
                isToolbarResponse: true,
                actionType: action,
                richContent: {
                    answer: "Đây là phân tích chuyên sâu về chủ đề:",
                    mainContent: "Tôi sẽ đi sâu vào các khía cạnh kỹ thuật và lý thuyết nâng cao. Nội dung này bao gồm các chi tiết quan trọng, phân tích so sánh và các trường hợp sử dụng phức tạp.",
                    advancedTopics: [
                        "Phân tích kiến trúc hệ thống chi tiết",
                        "Các mẫu thiết kế nâng cao và best practices",
                        "Tối ưu hóa hiệu suất và scalability",
                        "Xử lý các trường hợp edge cases"
                    ]
                }
            },
            getImages: {
                id: Date.now() + 1,
                type: 'ai',
                content: '',
                timestamp: new Date().toISOString(),
                isToolbarResponse: true,
                actionType: action,
                richContent: {
                    answer: "Đây là các hình ảnh minh họa cho chủ đề:",
                    mainContent: "Tôi đã tạo ra một bộ sưu tập hình ảnh và sơ đồ để giúp bạn hiểu rõ hơn về chủ đề này.",
                    images: [
                        {
                            src: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
                            caption: 'Sơ đồ tổng quan về kiến trúc hệ thống'
                        },
                        {
                            src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
                            caption: 'Quy trình phát triển phần mềm'
                        },
                        {
                            src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
                            caption: 'Mô hình cơ sở dữ liệu'
                        },
                        {
                            src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
                            caption: 'Giao diện người dùng mẫu'
                        }
                    ]
                }
            }
        };

        return mockResponses[action] || mockResponses.simplify;
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

    const handleLearningPathAction = (action) => {
        const actionMessage = {
            id: Date.now(),
            type: 'user',
            content: `Tôi muốn xem ${action === 'simplify' ? 'tài liệu cơ bản' : action === 'goDeeper' ? 'tài liệu chuyên sâu' : 'hình ảnh minh họa'}`,
            timestamp: new Date().toISOString()
        };

        const newConversations = [...conversations, actionMessage];
        onUpdateConversations(newConversations);
        setIsLoading(true);

        // Mock API call simulation
        setTimeout(() => {
            const response = generateMockToolbarResponse(action);
            const finalConversations = [...newConversations, response];
            onUpdateConversations(finalConversations);
            setIsLoading(false);
        }, 1500);
    };



    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const newAttachment = { name: file.name, type: file.type, size: file.size };
            setAttachment(newAttachment);

            // Auto-create new chat if no current conversation exists when uploading file
            if (!currentConversation && onAutoCreateNewChat) {
                console.log('No current conversation, auto-creating new chat for file upload...');
                const title = file.name;
                await onAutoCreateNewChat(title);
            }
        }
    };



    // Empty state - show when no conversation exists or no messages
    if ((!currentConversation && conversations.length === 0) || (!source && conversations.length === 0)) {
        return (
            <div className="flex-1 flex flex-col bg-gray-900">
                {/* Header */}
                <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">
                            {currentConversation ? currentConversation.title : 'Bắt đầu cuộc trò chuyện mới'}
                        </h2>
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
                            Hãy cùng khám phá và bắt đầu đặt câu hỏi! Cuộc trò chuyện sẽ được tự động tạo khi bạn gửi tin nhắn.
                        </p>
                    </div>
                </div>

                {/* Input Area - Auto-create chat on send */}
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
                                placeholder="Nhập câu hỏi của bạn để bắt đầu cuộc trò chuyện mới..."
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
                                title="Gửi tin nhắn và tạo cuộc trò chuyện mới"
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
            {/* Two-column Layout */}
            <div className="flex flex-1 overflow-hidden h-full">
                {/* Left Column: Suggestions - Fixed position */}
                <div className="w-3/10 flex flex-col h-full overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-4">
                        <TheBigPicture
                            onSuggestionClick={(question) => {
                                setInputMessage(question);
                                handleSendMessageWithContent(question);
                            }}
                        />
                    </div>
                </div>

                {/* Right Column: Chat Stream */}
                <div className="w-7/10 flex flex-col h-full overflow-hidden">
                    <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">



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
                                        {/* Unified Rich Content Response - Vertical Vietnamese Structure */}
                                        {message.type === 'ai' && (message.isLearningPathResponse || message.isUnifiedResponse) && message.richContent && (
                                            <div className="space-y-8">
                                                {/* FAQ Header (if applicable) */}
                                                {message.responseType === 'faq' && message.faqData && (
                                                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                                            <span className="text-blue-300 text-sm font-medium">
                                                                FAQ Answer • {message.faqData.category}
                                                            </span>
                                                            <span className="text-blue-400 text-xs px-2 py-1 bg-blue-900/30 rounded-full">
                                                                {message.faqData.difficulty}
                                                            </span>
                                                        </div>
                                                        <h4 className="text-blue-100 font-medium text-lg">
                                                            {message.faqData.question}
                                                        </h4>
                                                    </div>
                                                )}

                                                {/* 1. Phần Mở đầu (Introduction Section) */}
                                                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                                                    <p className="text-gray-300 leading-relaxed text-lg">
                                                        {message.richContent?.introduction || message.richContent?.answer}
                                                    </p>
                                                </div>

                                                {/* Vertical Content Structure */}
                                                <div className="space-y-8">
                                                    {/* 2. Interactive Timeline Module */}
                                                    {message.richContent?.interactiveTimeline && (
                                                        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                                                            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                                                                <Clock className="w-6 h-6 mr-3 text-blue-400" />
                                                                {message.richContent.interactiveTimeline.title}
                                                            </h3>
                                                            <div className="space-y-6">
                                                                {message.richContent.interactiveTimeline.stages.map((stage) => (
                                                                    <div key={stage.id} className="flex space-x-4 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                                                                        <img
                                                                            src={stage.image}
                                                                            alt={stage.title}
                                                                            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                                                                        />
                                                                        <div className="flex-1">
                                                                            <h4 className="text-lg font-semibold text-white mb-2">{stage.title}</h4>
                                                                            <p className="text-gray-300 leading-relaxed">{stage.description}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                              )}


                                                    {/* 3. Interactive List Module */}
                                                    {message.richContent?.interactiveList && (
                                                        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                                                            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                                                                <List className="w-6 h-6 mr-3 text-green-400" />
                                                                {message.richContent.interactiveList.title}
                                                            </h3>
                                                            <div className="space-y-4">
                                                                {message.richContent.interactiveList.areas && message.richContent.interactiveList.areas.map((area) => (
                                                                    <React.Fragment key={area.id}>
                                                                        <div className="flex space-x-4 p-4 bg-gray-900/50 rounded-lg border border-gray-600 hover:border-green-500 transition-colors cursor-pointer">
                                                                            <img
                                                                                src={area.image}
                                                                                alt={area.title}
                                                                                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                                                            />
                                                                            <div className="flex-1">
                                                                                <h4 className="text-lg font-semibold text-white mb-1">{area.title}</h4>
                                                                                <p className="text-gray-300 text-sm">{area.description}</p>
                                                                            </div>
                                                                        </div>
                                                                        {area.title === 'Cấu trúc dữ liệu & Thuật toán' && message.richContent?.video && (
                                                                            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 my-4">
                                                                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                                                                    <PlayCircle className="w-6 h-6 mr-3 text-red-400" />
                                                                                    {message.richContent.video.title}
                                                                                </h3>
                                                                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                                                                    {playingVideo === message.id ? (
                                                                                        <iframe
                                                                                            src={`https://www.youtube.com/embed/${message.richContent.video.videoId}?autoplay=1`}
                                                                                            title={message.richContent.video.title}
                                                                                            frameBorder="0"
                                                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                                            allowFullScreen
                                                                                            className="w-full h-full"
                                                                                        ></iframe>
                                                                                    ) : (
                                                                                        <div className="cursor-pointer group" onClick={() => setPlayingVideo(message.id)}>
                                                                                            <img
                                                                                                src={message.richContent.video.thumbnail}
                                                                                                alt={message.richContent.video.title}
                                                                                                className="w-full h-full object-cover"
                                                                                            />
                                                                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                                                                <Play className="w-16 h-16 text-white/80 group-hover:text-white group-hover:scale-110 transition-transform" />
                                                                                            </div>
                                                                                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                                                                                {message.richContent.video.duration}
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                                <div className="mt-3 text-sm text-gray-400">
                                                                                    Kênh: <span className="font-medium text-gray-300">{message.richContent.video.channel}</span>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </React.Fragment>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}



                                                    {/* 5. Phần Khám phá (Exploration Section) */}
                                                    {message.richContent?.exploration && (
                                                        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                                                            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                                                                <ExternalLink className="w-6 h-6 mr-3 text-purple-400" />
                                                                {message.richContent.exploration.title}
                                                            </h3>
                                                            <div className="space-y-4">
                                                                {message.richContent.exploration.sources.map((source, index) => (
                                                                    <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-600 hover:border-purple-500 transition-colors cursor-pointer">
                                                                        <h4 className="text-lg font-semibold text-white mb-2">{source.title}</h4>
                                                                        <p className="text-gray-300 text-sm mb-3">{source.description}</p>
                                                                        <div className="flex items-center justify-between">
                                                                            <p className="text-gray-400 text-xs">{source.vietnamese_title}</p>
                                                                            <div className="flex items-center text-purple-400 text-sm">
                                                                                <span className="mr-2">{source.source}</span>
                                                                                <ExternalLink className="w-4 h-4" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>








                                                {/* Bot Message Toolbar */}
                                                <BotMessageToolbar onAction={handleLearningPathAction} />
                                            </div>
                                        )}

                                        {/* Learning Path Action Response */}
                                        {message.type === 'ai' && message.isLearningPathActionResponse && message.richContent && (
                                            <div className="space-y-6">
                                                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                                                    <h4 className="text-xl font-semibold text-white mb-4">
                                                        {message.richContent.answer}
                                                    </h4>

                                                    {/* PDF Resources */}
                                                    {message.richContent.actionData.resources && (
                                                        <div className="mb-6">
                                                            <h5 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                                                <FileText className="w-5 h-5 text-blue-400" />
                                                                Tài liệu PDF
                                                            </h5>
                                                            <div className="space-y-3">
                                                                {message.richContent.actionData.resources.map((resource, index) => (
                                                                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors cursor-pointer group">
                                                                        <div className="w-12 h-12 bg-red-900/30 rounded-lg flex items-center justify-center">
                                                                            <FileText className="w-6 h-6 text-red-400" />
                                                                        </div>
                                                                        <div className="flex-1">
                                                                            <h6 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                                                                                {resource.title}
                                                                            </h6>
                                                                            <p className="text-sm text-gray-400">{resource.description}</p>
                                                                        </div>
                                                                        <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Website Resources */}
                                                    {message.richContent.actionData.websites && (
                                                        <div className="mb-6">
                                                            <h5 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                                                <ExternalLink className="w-5 h-5 text-green-400" />
                                                                Tài nguyên web liên quan
                                                            </h5>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                {message.richContent.actionData.websites.map((site, index) => (
                                                                    <div key={index} className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30 hover:shadow-md transition-shadow cursor-pointer group">
                                                                        <div className="flex items-start gap-3">
                                                                            <ExternalLink className="w-5 h-5 text-green-400 mt-1 group-hover:scale-110 transition-transform" />
                                                                            <div>
                                                                                <h6 className="font-medium text-white group-hover:text-green-400 transition-colors">
                                                                                    {site.title}
                                                                                </h6>
                                                                                <p className="text-sm text-gray-400 mt-1">{site.description}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Definitions */}
                                                    {message.richContent.actionData.definitions && (
                                                        <div className="mb-6">
                                                            <h5 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                                                <BookOpen className="w-5 h-5 text-purple-400" />
                                                                Định nghĩa chủ đề
                                                            </h5>
                                                            <div className="space-y-4">
                                                                {message.richContent.actionData.definitions.map((def, index) => (
                                                                    <div key={index} className="p-4 bg-purple-900/20 rounded-lg border-l-4 border-purple-400">
                                                                        <h6 className="font-semibold text-purple-300 mb-2">{def.term}</h6>
                                                                        <p className="text-gray-300">{def.definition}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* FAQs */}
                                                    {message.richContent.actionData.faqs && (
                                                        <div className="mb-6">
                                                            <h5 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                                                <HelpCircle className="w-5 h-5 text-orange-400" />
                                                                Câu hỏi thường gặp
                                                            </h5>
                                                            <div className="space-y-4">
                                                                {message.richContent.actionData.faqs.map((faq, index) => (
                                                                    <div key={index} className="p-4 bg-orange-900/20 rounded-lg border border-orange-500/30">
                                                                        <h6 className="font-semibold text-orange-300 mb-2">{faq.question}</h6>
                                                                        <p className="text-gray-300">{faq.answer}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Images */}
                                                    {message.richContent.actionData.images && (
                                                        <div className="mb-6">
                                                            <h5 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                                                <ImageIcon className="w-5 h-5 text-indigo-400" />
                                                                Hình ảnh minh họa
                                                            </h5>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                {message.richContent.actionData.images.map((image, index) => (
                                                                    <div key={index} className="bg-gray-800/50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-700">
                                                                        <img
                                                                            src={image.src}
                                                                            alt={image.caption}
                                                                            className="w-full h-48 object-cover"
                                                                        />
                                                                        <div className="p-4">
                                                                            <p className="text-sm text-gray-300">{image.caption}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Bot Message Toolbar */}
                                                    <BotMessageToolbar onAction={handleLearningPathAction} />
                                                </div>
                                            </div>
                                        )}

                                        {/* Toolbar Response Messages */}
                                        {message.type === 'ai' && message.isToolbarResponse && message.richContent && (
                                            <div className="space-y-6">
                                                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                                                    <h4 className="text-xl font-semibold text-white mb-4">
                                                        {message.richContent.answer}
                                                    </h4>
                                                    <p className="text-gray-300 leading-relaxed mb-4">
                                                        {message.richContent.mainContent}
                                                    </p>

                                                    {/* Key Points for Simplify */}
                                                    {message.actionType === 'simplify' && message.richContent.keyPoints && (
                                                        <div className="space-y-2">
                                                            <h5 className="text-lg font-semibold text-white mb-3">Điểm chính:</h5>
                                                            <ul className="space-y-2">
                                                                {message.richContent.keyPoints.map((point, index) => (
                                                                    <li key={index} className="flex items-start gap-3">
                                                                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                                                        <span className="text-gray-300">{point}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/* Advanced Topics for Go Deeper */}
                                                    {message.actionType === 'goDeeper' && message.richContent.advancedTopics && (
                                                        <div className="space-y-2">
                                                            <h5 className="text-lg font-semibold text-white mb-3">Chủ đề nâng cao:</h5>
                                                            <ul className="space-y-2">
                                                                {message.richContent.advancedTopics.map((topic, index) => (
                                                                    <li key={index} className="flex items-start gap-3">
                                                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                                                        <span className="text-gray-300">{topic}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/* Images for Get Images */}
                                                    {message.actionType === 'getImages' && message.richContent.images && (
                                                        <div className="space-y-4">
                                                            <h5 className="text-lg font-semibold text-white mb-3">Hình ảnh minh họa:</h5>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                {message.richContent.images.map((image, index) => (
                                                                    <div key={index} className="bg-gray-800/50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-700">
                                                                        <img
                                                                            src={image.src}
                                                                            alt={image.caption}
                                                                            className="w-full h-48 object-cover"
                                                                        />
                                                                        <div className="p-4">
                                                                            <p className="text-sm text-gray-300">{image.caption}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Bot Message Toolbar */}
                                                <BotMessageToolbar onAction={handleLearningPathAction} />
                                            </div>
                                        )}

                                        {/* Rich Content for AI messages - Hannah Learn Style */}
                                        {message.type === 'ai' && message.richContent && !message.isLearningPathResponse && !message.isLearningPathActionResponse && (
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
            </div></div></div>

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