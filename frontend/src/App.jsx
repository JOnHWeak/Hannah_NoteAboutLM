import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Lock,
  Menu,
  ChevronDown,
  
  Video,
  Map,
  FileText as Report,
  Star,
  HelpCircle
} from 'lucide-react';
import UserMenu from './components/UserMenu';
import LoginModal from './components/LoginModal';
import ProfilePage from './components/ProfilePage';
import { useAuth } from './context/AuthContext';

import ConversationPanel from './components/ConversationPanel';
import StudioPanel from './components/StudioPanel';
import ResourceHubPanel from './components/ResourceHubPanel';
import CareerPathExplorer from './components/CareerPathExplorer';
import MindmapPanel from './components/MindmapPanel';
import ProgressDashboard from './components/ProgressDashboard';
import AIArtifactPanel from './components/AIArtifactPanel';


import SetupGuide from './components/SetupGuide';
import HomePage from './components/HomePage';
import ConversationHistorySidebar from './components/ConversationHistorySidebar';
import TheBigPicture from './components/TheBigPicture';


import { getConversations, getConversationById, createConversation, updateConversation, deleteConversation, autoCreateConversation } from './api/conversationApi';
// LearningPathPage removed

function App() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [modalView, setModalView] = useState(null); // null, 'login', 'signup'
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [sources, setSources] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [conversationsMeta, setConversationsMeta] = useState([]); // {id, title, createdAt}
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [activeSourceId, setActiveSourceId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingAttachment, setPendingAttachment] = useState(null);
  const [isStudioOpen, setIsStudioOpen] = useState(true);
  const [activeRightTab, setActiveRightTab] = useState('studio'); // studio | resources | career | mindmap | artifacts | progress


  const [showSetupGuide, setShowSetupGuide] = useState(false);

  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'main'

  // Effect to handle logout redirection
  const prevIsAuthenticated = useRef(isAuthenticated);
  useEffect(() => {
    if (prevIsAuthenticated.current && !isAuthenticated) {
      setCurrentPage('home');
    }
    prevIsAuthenticated.current = isAuthenticated;
  }, [isAuthenticated]);

  // Load sources from localStorage on mount
  useEffect(() => {
    const savedSources = localStorage.getItem('notebook-sources');
    if (savedSources) {
      const parsedSources = JSON.parse(savedSources);
      setSources(parsedSources);
      if (parsedSources.length > 0 && !activeSourceId) {
        setActiveSourceId(parsedSources[0].id);
      }
    }
  }, []);

  // Load conversations metadata on mount using API
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const response = await getConversations();
        if (response.success) {
          setConversationsMeta(response.data);
          if (response.data.length > 0 && !activeConversationId) {
            setActiveConversationId(response.data[0].id);
          }
        } else {
          console.warn('Failed to load conversations:', response.message);
        }
      } catch (error) {
        console.error('Error loading conversations:', error);
      }
    };

    loadConversations();
  }, []);

  // Load messages when activeConversationId changes
  useEffect(() => {
    const loadConversationMessages = async () => {
      if (!activeConversationId) {
        setConversations([]);
        return;
      }

      try {
        const response = await getConversationById(activeConversationId);
        if (response.success && response.data.messages) {
          setConversations(response.data.messages);
        } else {
          setConversations([]);
        }
      } catch (error) {
        console.error('Error loading conversation messages:', error);
        setConversations([]);
      }
    };

    loadConversationMessages();
  }, [activeConversationId]);

  // Save sources to localStorage whenever sources change
  useEffect(() => {
    if (sources.length > 0) {
      localStorage.setItem('notebook-sources', JSON.stringify(sources));
    }
  }, [sources]);









  const activeSource = sources.find(source => source.id === activeSourceId);

  const handleNavigateToMain = async (searchQuery = '', attachment = null, autoSend = false) => {
    setCurrentPage('main');

    // If we have a search query or attachment and autoSend is true, create new conversation
    if ((searchQuery || attachment) && autoSend) {
      try {
        const response = await autoCreateConversation(searchQuery, attachment?.name || '');

        if (response.success) {
          setConversationsMeta((prev) => [response.data, ...prev]);
          setActiveConversationId(response.data.id);
          setConversations([]);

          if (searchQuery) {
            setSearchQuery(searchQuery);
          }
          if (attachment) {
            setPendingAttachment(attachment);
          }
        } else {
          console.error('Failed to create conversation:', response.message);
        }
      } catch (error) {
        console.error('Error creating conversation:', error);
      }
    } else {
      // Original behavior for non-auto-send cases
      if (searchQuery) {
        setSearchQuery(searchQuery);
      }
      if (attachment) {
        setPendingAttachment(attachment);
        // Create a new conversation thread named after the file using API
        try {
          const response = await createConversation({
            title: attachment.name
          });

          if (response.success) {
            setConversationsMeta((prev) => [response.data, ...prev]);
            setActiveConversationId(response.data.id);
            // Start with an empty message list; ConversationPanel will auto-send
            setConversations([]);
          } else {
            console.error('Failed to create conversation for attachment:', response.message);
          }
        } catch (error) {
          console.error('Error creating conversation for attachment:', error);
        }
      }
    }
  };


  // Learning Path flow removed

  // Persist conversations when meta changes
  useEffect(() => {
    localStorage.setItem('notebook-conversations', JSON.stringify(conversationsMeta));
  }, [conversationsMeta]);

  const handleDeleteConversation = async (conversationId) => {
    try {
      const response = await deleteConversation(conversationId);
      if (response.success) {
        setConversationsMeta((prev) => {
          const next = prev.filter((c) => c.id !== conversationId);
          // If deleting the active conversation, switch to the next available or clear
          setActiveConversationId((currentActive) => {
            if (currentActive !== conversationId) return currentActive;
            return next.length > 0 ? next[0].id : null;
          });
          // If the deleted conversation was active, clear current message list
          setConversations((msgs) => {
            return activeConversationId === conversationId ? [] : msgs;
          });
          return next;
        });
      } else {
        console.error('Failed to delete conversation:', response.message);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const handleStartBlankConversation = async () => {
    try {
      const response = await createConversation({
        title: 'Cuộc trò chuyện mới'
      });

      if (response.success) {
        setConversationsMeta((prev) => [response.data, ...prev]);
        setActiveConversationId(response.data.id);
        setConversations([]);
        setActiveSourceId(null); // Xóa ngữ cảnh tài liệu
        setCurrentPage('main');
      } else {
        console.error('Failed to create conversation:', response.message);
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  // Auto-create new chat function for ConversationPanel
  const handleAutoCreateNewChat = async (messageContent = '', attachmentName = '') => {
    try {
      const response = await autoCreateConversation(messageContent, attachmentName);

      if (response.success) {
        setConversationsMeta((prev) => [response.data, ...prev]);
        setActiveConversationId(response.data.id);
        setConversations([]);
        setActiveSourceId(null); // Clear document context
        return response.data;
      } else {
        console.error('Failed to auto-create conversation:', response.message);
        return null;
      }
    } catch (error) {
      console.error('Error auto-creating conversation:', error);
      return null;
    }
  };
  const handleUpdateConversationTitle = (conversationId, newTitle) => {
    setConversationsMeta(prev =>
      prev.map(conv =>
        conv.id === conversationId ? { ...conv, title: newTitle } : conv
      )
    );
  };


  if (showProfilePage) {
    return <ProfilePage onBack={() => setShowProfilePage(false)} />;
  }

  return (
    <div className="h-screen bg-hannah-dark flex flex-col">
      {currentPage === 'home' ? (
        <HomePage
          onNavigateToMain={handleNavigateToMain}
          onStartBlankConversation={handleStartBlankConversation}
          conversationsMeta={conversationsMeta}
          activeConversationId={activeConversationId}
          onSelectConversation={setActiveConversationId}
          onDeleteConversation={handleDeleteConversation}
          onShowProfile={() => setShowProfilePage(true)}
        />
      ) : (
        <>
          {/* Header - Unified Design */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-hannah-dark border-b border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Hamburger Menu for Conversation Sidebar */}
                                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  title="Toggle conversation history"
                >
                  <Menu className="w-5 h-5" />
                </button>




                <button
                  onClick={() => setCurrentPage('home')}
                  className="flex items-center gap-2 group"
                  title="Về trang chủ"
                >
                  <h1 className="text-xl font-semibold text-white flex items-center gap-2 cursor-pointer">
                    <span className="font-bold bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 bg-clip-text text-transparent group-hover:brightness-110">Hannah</span>
                    <span className="text-gray-300 group-hover:text-white">Learn About</span>
                  </h1>
                </button>
              </div>

              <div className="flex items-center gap-4">
                {/* <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm">Chia sẻ</span>
                </button> */}
                {isAuthLoading ? (
                  <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse"></div>
                ) : isAuthenticated ? (
                  <UserMenu onShowProfile={() => setShowProfilePage(true)} />
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
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex relative pt-16">


            {/* Conversation History Sidebar - Overlay */}
            <ConversationHistorySidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              conversations={conversationsMeta}
              activeConversationId={activeConversationId}
              onSelectConversation={setActiveConversationId}
              onDeleteConversation={handleDeleteConversation}
              onStartNewConversation={handleStartBlankConversation}
            />

            {/* Main Content Wrapper */}
            <main className="flex-1 flex overflow-hidden">
              <div className="flex-1 flex overflow-hidden" style={{ marginRight: isStudioOpen ? '384px' : '64px' }}>

                {/* Center Panel - Conversation - It will handle its own scrolling */}
                <div className="flex-1 flex flex-col bg-hannah-dark h-full">
                  <ConversationPanel
                    source={activeSource}
                    conversations={conversations}
                    onUpdateConversations={setConversations}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    autoSend={true}
                    pendingAttachment={pendingAttachment}
                    onConsumeAttachment={() => setPendingAttachment(null)}
                    conversationsMeta={conversationsMeta}
                    activeConversationId={activeConversationId}
                    onSelectConversation={setActiveConversationId}
                    onDeleteConversation={handleDeleteConversation}
                    onStartBlankConversation={handleStartBlankConversation}
                    currentConversation={conversationsMeta.find(c => c.id === activeConversationId)}
                    onUpdateConversationTitle={handleUpdateConversationTitle}
                    onAutoCreateNewChat={handleAutoCreateNewChat}
                    isStudioOpen={isStudioOpen}

                  />
                </div>
                {/* Right Panel - Studio - Fixed position */}
                <AnimatePresence>
                  {isStudioOpen ? (
                    <motion.div
                      initial={{ x: 400 }}
                      animate={{ x: 0 }}
                      exit={{ x: 400 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col h-screen fixed right-0 z-30"
                      style={{ top: '64px' }}
                    >
                      {activeRightTab === 'studio' && (
                        <StudioPanel
                          source={activeSource}
                          onTogglePanel={() => setIsStudioOpen(false)}
                        />
                      )}
                      {activeRightTab === 'resources' && (
                        <ResourceHubPanel topic={activeSource?.title || 'Software Engineering'} />
                      )}
                      {activeRightTab === 'career' && (
                        <CareerPathExplorer />
                      )}
                      {activeRightTab === 'mindmap' && (
                        <MindmapPanel />
                      )}
                      {activeRightTab === 'artifacts' && (
                        <AIArtifactPanel />
                      )}
                      {activeRightTab === 'progress' && (
                        <ProgressDashboard />
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ x: 80, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 80, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="w-16 bg-gray-800 border-l border-gray-700 flex flex-col items-center py-3 gap-4 fixed right-0 h-screen z-30"
                      style={{ top: '64px' }}
                    >
                      <button
                        onClick={() => setIsStudioOpen(true)}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white"
                        title="Mở Studio"
                      >
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                      </button>

                      <button
                        onClick={() => { setIsStudioOpen(true); setActiveRightTab('studio'); }}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Tổng quan video"
                      >
                        <Video className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => { setIsStudioOpen(true); setActiveRightTab('mindmap'); }}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Bản đồ tư duy"
                      >
                        <Map className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => { setIsStudioOpen(true); setActiveRightTab('artifacts'); }}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Tổng hợp nội dung"
                      >
                        <Report className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => { setIsStudioOpen(true); setActiveRightTab('progress'); }}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Thẻ ghi nhớ"
                      >
                        <Star className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => { setIsStudioOpen(true); setActiveRightTab('progress'); }}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Bài kiểm tra"
                      >
                        <HelpCircle className="w-4 h-4 text-white" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </main>



          </div>

          {/* Footer */}
          <div className="bg-gray-800 border-t border-gray-700 px-6 py-2">
            <p className="text-xs text-gray-400">
              Hannah Learn About có thể đưa ra thông tin không chính xác; hãy kiểm tra kỹ câu trả lời mà bạn nhận được.
            </p>
          </div>

          {/* Setup Guide Modal */}
          <SetupGuide
            isOpen={showSetupGuide}
            onClose={() => setShowSetupGuide(false)}
          />
        </>
      )}
      <LoginModal isOpen={!!modalView} initialView={modalView} onClose={() => setModalView(null)} />
    </div>
  );
}

export default App;
