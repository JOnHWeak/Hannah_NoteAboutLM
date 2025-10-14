import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Upload, X } from 'lucide-react';
import FAQCard from './FAQCard';
import { getFAQs } from '../api/faqApi';

const HomePage = ({ onNavigateToMain, onStartBlankConversation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [pendingAttachment, setPendingAttachment] = useState(null);
    const [faqs, setFaqs] = useState([]);
    const [isLoadingFAQs, setIsLoadingFAQs] = useState(true);
    const fileInputRef = useRef(null);

    const handleSearch = () => {
        const query = searchQuery.trim() ? searchQuery : '';
        // Navigate to main app; include pendingAttachment if any
        onNavigateToMain(query, pendingAttachment);
        // Clear local attachment after navigating
        setPendingAttachment(null);
    };



    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const attachment = { name: file.name, type: file.type || 'file', size: file.size };
            // Only store attachment; allow user to continue typing before sending
            setPendingAttachment(attachment);
        }
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

    // Handle FAQ card click - navigate to main app with the question
    const handleFAQClick = (faq) => {
        // Navigate to main app with the FAQ question
        onNavigateToMain(faq.question, null);
    };




    return (
        <div className="min-h-screen bg-gray-900 scroll-smooth">
            {/* Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between p-6 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700">
                <div className="flex items-center gap-4">
                    <button className="text-gray-300 hover:text-white transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 bg-clip-text text-transparent">
                            Hannah
                        </span>
                        <span className="text-xl text-gray-300">Learn About</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-gray-200 text-sm">U</span>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-16 px-6 bg-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-6xl font-light text-white mb-8">
                        What would you like to learn about?
                    </h1>

                    {/* Search Input */}
                    <div className="relative max-w-2xl mx-auto mb-8">
                        <div className="flex items-center bg-gray-800 rounded-full px-6 py-4 border border-gray-600 hover:border-gray-500 transition-colors shadow-sm">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Ask Hannah Learn About"
                                className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                            />
                            {pendingAttachment && (
                                <div className="ml-3 flex items-center gap-2 bg-gray-700 rounded-full px-3 py-1 max-w-[50%]">
                                    <div className="w-5 h-5 rounded bg-red-500 text-white text-[10px] flex items-center justify-center">PDF</div>
                                    <span className="text-xs text-gray-200 truncate">{pendingAttachment.name}</span>
                                    <button onClick={() => setPendingAttachment(null)} className="p-1 text-gray-400 hover:text-gray-200" title="Remove file">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="ml-2 p-2 text-gray-400 hover:text-gray-200 transition-colors"
                                title="Upload file"
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
                            onClick={onStartBlankConversation}
                            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Start conversation
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQ Cards Section - Pinterest-Style Masonry Grid */}
            <section className="px-6 py-16 bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-300 text-xl leading-relaxed">
                            Get instant answers about programming learning roadmaps and software engineering technologies
                        </p>
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


        </div>
    );
};

export default HomePage;
