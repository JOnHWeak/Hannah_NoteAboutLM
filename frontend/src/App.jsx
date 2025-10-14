import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  FileText,
  Send,
  Bot,
  Sparkles,
  CheckSquare,
  List,
  Save,
  Upload,
  Lock,
  Settings,
  Grid3X3,
  User,
  ChevronDown,
  Filter,
  Edit3,
  Brain,
  Video,
  Map,
  FileText as Report,
  Star,
  HelpCircle,
  Sparkles as SparkleIcon,
  Menu
} from 'lucide-react';
import SourcesPanel from './components/SourcesPanel';
import ConversationPanel from './components/ConversationPanel';
import StudioPanel from './components/StudioPanel';
import ResourceHubPanel from './components/ResourceHubPanel';
import CareerPathExplorer from './components/CareerPathExplorer';
import MindmapPanel from './components/MindmapPanel';
import ProgressDashboard from './components/ProgressDashboard';
import AIArtifactPanel from './components/AIArtifactPanel';
import APIStatus from './components/APIStatus';
import SetupGuide from './components/SetupGuide';
import HomePage from './components/HomePage';
import ConversationHistorySidebar from './components/ConversationHistorySidebar';
import { getConversations, createConversation, deleteConversation, updateConversation } from './api/conversationApi';
// LearningPathPage removed

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sources, setSources] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [conversationsMeta, setConversationsMeta] = useState([]); // {id, title, createdAt}
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [activeSourceId, setActiveSourceId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingAttachment, setPendingAttachment] = useState(null);
  const [isSourcesOpen, setIsSourcesOpen] = useState(true);
  const [isStudioOpen, setIsStudioOpen] = useState(true);
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState('studio'); // studio | resources | career | mindmap | artifacts | progress
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'main'

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

  // Save sources to localStorage whenever sources change
  useEffect(() => {
    if (sources.length > 0) {
      localStorage.setItem('notebook-sources', JSON.stringify(sources));
    }
  }, [sources]);

  const addSource = (source) => {
    const newSource = {
      id: Date.now().toString(),
      title: source.title || 'Untitled Source',
      content: source.content || '',
      type: source.type || 'text',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSources(prev => [newSource, ...prev]);
    setActiveSourceId(newSource.id);

    // Clear conversations when adding new source
    setConversations([]);
  };

  const updateSource = (id, updates) => {
    setSources(prev => prev.map(source =>
      source.id === id
        ? { ...source, ...updates, updatedAt: new Date().toISOString() }
        : source
    ));
  };

  const deleteSource = (id) => {
    setSources(prev => prev.filter(source => source.id !== id));
    if (activeSourceId === id) {
      const remainingSources = sources.filter(source => source.id !== id);
      setActiveSourceId(remainingSources.length > 0 ? remainingSources[0].id : null);
    }
  };

  const filteredSources = sources.filter(source =>
    source.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeSource = sources.find(source => source.id === activeSourceId);

  const handleNavigateToMain = async (searchQuery = '', attachment = null) => {
    setCurrentPage('main');
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
        setCurrentPage('main');
      } else {
        console.error('Failed to create conversation:', response.message);
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {currentPage === 'home' ? (
        <HomePage
          onNavigateToMain={handleNavigateToMain}
          onStartBlankConversation={handleStartBlankConversation}
          conversationsMeta={conversationsMeta}
          activeConversationId={activeConversationId}
          onSelectConversation={setActiveConversationId}
          onDeleteConversation={handleDeleteConversation}
        />
      ) : (
        <>
          {/* Header - Unified Design */}
          <div className="sticky top-0 z-50 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 px-6 py-4">
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
                <APIStatus />
                <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm">Chia sẻ</span>
                </button>
                <button
                  onClick={() => setShowSetupGuide(true)}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Cài đặt</span>
                </button>
                <button className="text-gray-300 hover:text-white transition-colors">
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex relative">
            {/* Conversation History Sidebar */}
            <ConversationHistorySidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              conversations={conversationsMeta}
              activeConversationId={activeConversationId}
              onSelectConversation={setActiveConversationId}
              onDeleteConversation={handleDeleteConversation}
              onStartNewConversation={handleStartBlankConversation}
            />

            {/* Center Panel - Conversation */}
            <div className="flex-1 flex flex-col bg-gray-900">
                  <div className="flex-1 flex flex-col">
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
                    />
                  </div>
                </div>

                {/* Right Panel - Studio */}
                <AnimatePresence>
                  {isStudioOpen ? (
                    <motion.div
                      initial={{ x: 400 }}
                      animate={{ x: 0 }}
                      exit={{ x: 400 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col"
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
                      className="w-16 bg-gray-800 border-l border-gray-700 flex flex-col items-center py-3 gap-4"
                    >
                      <button
                        onClick={() => setIsStudioOpen(true)}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white"
                        title="Mở Studio"
                      >
                        <ChevronDown className="w-4 h-4 -rotate-90" />
                      </button>
                      <button
                        onClick={() => setIsStudioOpen(true)}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Tổng quan âm thanh"
                      >
                        <Brain className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => setIsStudioOpen(true)}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Tổng quan video"
                      >
                        <Video className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => setIsStudioOpen(true)}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Bản đồ tư duy"
                      >
                        <Map className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => setIsStudioOpen(true)}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Báo cáo"
                      >
                        <Report className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => setIsStudioOpen(true)}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Thẻ ghi nhớ"
                      >
                        <Star className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => setIsStudioOpen(true)}
                        className="w-10 h-10 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
                        title="Bài kiểm tra"
                      >
                        <HelpCircle className="w-4 h-4 text-white" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

          </div>

          {/* Footer */}
          <div className="bg-gray-800 border-t border-gray-700 px-6 py-2">
            <p className="text-xs text-gray-400">
              NotebookLM có thể đưa ra thông tin không chính xác; hãy kiểm tra kỹ câu trả lời mà bạn nhận được.
            </p>
          </div>

          {/* Setup Guide Modal */}
          <SetupGuide
            isOpen={showSetupGuide}
            onClose={() => setShowSetupGuide(false)}
          />
        </>
      )}
    </div>
  );
}

export default App;
