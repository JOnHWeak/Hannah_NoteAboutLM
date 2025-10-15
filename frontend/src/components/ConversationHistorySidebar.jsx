import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Calendar, Plus, X, Loader2 } from 'lucide-react';


const ConversationHistorySidebar = ({
  isOpen,
  onClose,
  conversations = [],
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onStartNewConversation,
}) => {
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [isCreating, setIsCreating] = useState(false);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hôm nay';
    if (diffDays === 2) return 'Hôm qua';
    if (diffDays <= 7) return `${diffDays - 1} ngày trước`;

    return date.toLocaleDateString('vi-VN');
  };

  const handleDeleteConversation = async (conversationId, e) => {
    e.stopPropagation();
    setDeletingIds(prev => new Set(prev).add(conversationId));

    try {
      await onDeleteConversation(conversationId);
    } catch (error) {
      console.error('Error deleting conversation:', error);
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(conversationId);
        return newSet;
      });
    }
  };

  const handleStartNewConversation = async () => {
    setIsCreating(true);
    try {
      await onStartNewConversation();
    } catch (error) {
      console.error('Error creating conversation:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-80 h-full bg-gray-800 border-r border-gray-700 flex flex-col z-50"
          >
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Lịch sử trò chuyện</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <button
                onClick={handleStartNewConversation}
                disabled={isCreating}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
              >
                {isCreating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                Cuộc trò chuyện mới
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {conversations.map((conv, index) => (
                <motion.div
                  key={conv.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    activeConversationId === conv.id
                      ? 'bg-blue-600/20'
                      : 'hover:bg-gray-700'
                  }`}
                  onClick={() => onSelectConversation(conv.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-medium truncate ${
                        activeConversationId === conv.id ? 'text-blue-300' : 'text-white'
                      }`}>
                        {conv.title || 'Cuộc trò chuyện'}
                      </h3>
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(conv.createdAt)}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDeleteConversation(conv.id, e)}
                      disabled={deletingIds.has(conv.id)}
                      className="ml-2 p-1 text-gray-400 hover:text-red-400 transition-colors disabled:text-gray-500 disabled:cursor-not-allowed"
                      title="Xóa cuộc trò chuyện"
                    >
                      {deletingIds.has(conv.id) ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConversationHistorySidebar;

