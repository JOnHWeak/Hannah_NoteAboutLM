import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Upload, X, File } from 'lucide-react';
import FAQCard from './FAQCard';
import { getFAQs } from '../api/faqApi';
import ConversationHistorySidebar from './ConversationHistorySidebar';
import UserMenu from './UserMenu';
import LoginModal from './LoginModal';
import { useAuth } from '../context/AuthContext';
import BrandLogo from './BrandLogo';

const HomePage = ({
  onNavigateToMain,
  onStartBlankConversation,
  conversationsMeta,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onShowProfile,
}) => {
    const { isAuthenticated, user, isLoading: isAuthLoading } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [modalView, setModalView] = useState(null); // null, 'login', 'signup'
    const [searchQuery, setSearchQuery] = useState('');
    const [pendingAttachment, setPendingAttachment] = useState(null);
    const [faqs, setFaqs] = useState([]);
    const [isLoadingFAQs, setIsLoadingFAQs] = useState(true);
    const fileInputRef = useRef(null);

    // Helper function to check authentication before actions
    const requireAuth = (callback) => {
        if (!isAuthenticated) {
            setModalView('login'); // Mặc định mở form đăng nhập khi yêu cầu xác thực
            return false;
        }
        callback();
        return true;
    };

    const handleSearch = () => {
        requireAuth(() => {
            const query = searchQuery.trim() ? searchQuery : '';
            // Navigate to main app; include pendingAttachment if any
            onNavigateToMain(query, pendingAttachment, true); // Pass true to auto-send
            // Clear local attachment after navigating
            setPendingAttachment(null);
        });
    };

    const handleFileUpload = (event) => {
        requireAuth(() => {
            const file = event.target.files[0];
            if (file) {
                const attachment = { name: file.name, type: file.type || 'file', size: file.size };
                // Store attachment and auto-navigate with auto-send
                setPendingAttachment(attachment);
                // Auto-navigate to main with file attachment and auto-send
                setTimeout(() => {
                    onNavigateToMain('', attachment, true);
                    setPendingAttachment(null);
                }, 100);
            }
        });
    };

    // Load FAQ data on component mount
    useEffect(() => {
        const loadFAQs = async () => {
            try {
                setIsLoadingFAQs(true);
                const response = await getFAQs();
                if (response.success) {
                    setFaqs(response.data);
                }
            } catch (error) {
                console.error('Error loading FAQs:', error);
            } finally {
                setIsLoadingFAQs(false);
            }
        };

        loadFAQs();
    }, []);

    // Close sidebar if user logs out / not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            setIsSidebarOpen(false);
        }
    }, [isAuthenticated]);

    // Handle FAQ card click - navigate to main app with the question
    const handleFAQClick = (faq) => {
        requireAuth(() => {
            // Navigate to main app with the FAQ question and auto-send
            onNavigateToMain(faq.question, null, true);
        });
    };

    // Handle conversation selection from sidebar
    const handleSelectConversation = (conversationId) => {
        requireAuth(() => {
            onSelectConversation(conversationId);
            onNavigateToMain('', null); // Navigate to main with selected conversation
        });
    };

    // Handle starting new conversation from sidebar
    const handleStartNewConversation = () => {
        requireAuth(() => {
            onStartBlankConversation();
        });
    };




    return (
        <div className="min-h-screen scroll-smooth bg-hannah-dark">
            {/* Header */}
            <header className={`sticky top-0 z-50 flex items-center justify-between p-6 bg-hannah-dark transition-all duration-300 ${isSidebarOpen ? 'opacity-50' : 'opacity-100'}`}>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            if (!isAuthenticated) {
                                setModalView('login');
                            } else {
                                setIsSidebarOpen(!isSidebarOpen);
                            }
                        }}
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center">
                        <BrandLogo size="md" />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                  {isAuthLoading ? (
                    <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse"></div>
                  ) : isAuthenticated ? (
                    <UserMenu onShowProfile={onShowProfile} />
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModalView('login')}
                        className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                      >
                        Đăng nhập
                      </button>
                      <button
                        onClick={() => setModalView('signup')}
                        className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        Đăng ký
                      </button>
                    </div>
                  )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-6xl font-light text-white mb-8">
                        {isAuthenticated && user ? `Chào ${user.name}, bạn muốn tìm hiểu về điều gì?` : 'Bạn muốn tìm hiểu về điều gì?'}
                    </h1>

                    {/* Search Input */}
                    <div className="relative max-w-2xl mx-auto mb-8">
                        <div className="flex items-center bg-hannah-input-bg rounded-full px-6 py-4 border border-gray-600 hover:border-gray-500 transition-colors shadow-sm">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && (searchQuery.trim() || pendingAttachment)) {
                                        handleSearch();
                                        setSearchQuery(''); // Clear input after sending
                                    }
                                }}
                                placeholder="Hỏi Hannah Learn About"
                                className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                            />
                            {pendingAttachment && (
                                <div className="ml-3 flex items-center gap-2 bg-gray-700 rounded-full px-3 py-1.5 text-sm">
                                    <File className="w-4 h-4 text-gray-300" />
                                    <span className="text-white truncate max-w-xs">{pendingAttachment.name}</span>
                                    <button onClick={() => setPendingAttachment(null)} className="p-1 -mr-1 text-gray-400 hover:text-white rounded-full">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="ml-2 p-2 text-gray-400 hover:text-gray-200 transition-colors"
                                title="Tải lên tệp"
                            >
                                <Upload className="w-5 h-5" />
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.doc,.docx,.txt"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Quick start button */}
                    <div className="text-center">
                        <button
                            onClick={handleStartNewConversation}
                            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Bắt đầu cuộc trò chuyện
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQ Cards Section - Pinterest-Style Masonry Grid */}
            <section className="px-6 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        {/* <h2 className="text-4xl font-bold text-white mb-6">
                            Khám Phá
                        </h2> */}
                        {/* <p className="text-gray-300 text-xl leading-relaxed">
                            Nhận câu trả lời ngay lập tức về lộ trình học lập trình và công nghệ kỹ thuật phần mềm
                        </p> */}
                    </div>

                    {isLoadingFAQs ? (
                        /* Loading State - Masonry Grid Layout */
                        <div className="masonry-grid">
                            {[...Array(12)].map((_, index) => (
                                <div key={index} className="masonry-item">
                                    <div className="bg-gray-700 rounded-3xl shadow-sm animate-pulse overflow-hidden border border-gray-600">
                                        <div className="p-6">
                                            <div className="w-full h-32 bg-gray-600 rounded-xl mb-4"></div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-6 h-6 bg-gray-600 rounded-lg"></div>
                                                <div className="h-4 bg-gray-600 rounded w-32"></div>
                                            </div>
                                            <div className="h-5 bg-gray-600 rounded mb-2 w-full"></div>
                                            <div className="h-5 bg-gray-600 rounded mb-3 w-4/5"></div>
                                            <div className="h-4 bg-gray-600 rounded w-full"></div>
                                            <div className="h-4 bg-gray-600 rounded w-3/4 mt-1"></div>
                                            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-600">
                                                <div className="h-3 bg-gray-600 rounded w-16"></div>
                                                <div className="h-3 bg-gray-600 rounded w-12"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="masonry-grid">
                            {faqs.map((faq, index) => (
                                <div key={faq.id} className="masonry-item">
                                    <FAQCard
                                        faq={faq}
                                        index={index}
                                        onClick={handleFAQClick}
                                    />
                                </div>
                            ))}


                        </div>
                    )}
                </div>
            </section>

            {/* Overlay for Sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 top-[68px]"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Conversation History Sidebar */}
            {isAuthenticated && (
                <ConversationHistorySidebar
                    isOpen={isSidebarOpen}
                    conversations={conversationsMeta || []}
                    activeConversationId={activeConversationId}
                    onSelectConversation={handleSelectConversation}
                    onDeleteConversation={onDeleteConversation}
                    onStartNewConversation={handleStartNewConversation}
                />
            )}
            <LoginModal isOpen={!!modalView} initialView={modalView} onClose={() => setModalView(null)} />
        </div>
    );
};

export default HomePage;
