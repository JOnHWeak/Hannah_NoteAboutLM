import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Calendar, Plus, X, Loader2, MessageSquare } from 'lucide-react';

const ConversationHistorySidebar = ({
  isOpen,
  conversations = [],
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onStartNewConversation,
}) => {
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [isCreating, setIsCreating] = useState(false);

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
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed top-0 left-0 w-80 flex flex-col z-50 shadow-2xl h-full"
            style={{
              backgroundColor: '#1F1F1F'
            }}
          >
            {/* Top spacing to avoid overlapping with header logo/menu */}
            <div className="h-20"></div>

            <div className="p-4">
              <button
                onClick={handleStartNewConversation}
                disabled={isCreating}
                className="w-full flex items-center justify-center gap-2 hover:bg-gray-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors border border-gray-600"
                style={{ backgroundColor: '#2C303D' }}
              >
                {isCreating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                Tạo mới
              </button>
            </div>

            <div className="px-4 pb-2">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Lịch sử</h3>
            </div>

            <div className="flex-1 overflow-y-auto px-2">
              {conversations.map((conv, index) => (
                <motion.div
                  key={conv.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`mx-2 mb-2 p-3 rounded-lg cursor-pointer transition-colors group ${
                    activeConversationId === conv.id
                      ? 'bg-gray-700'
                      : 'hover:bg-gray-700'
                  }`}
                  onClick={() => onSelectConversation(conv.id)}
                >
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-gray-300 truncate leading-tight">
                        {conv.title || 'Cuộc trò chuyện'}
                      </h3>
                    </div>
                    <button
                      onClick={(e) => handleDeleteConversation(conv.id, e)}
                      disabled={deletingIds.has(conv.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-400 transition-all disabled:text-gray-500 disabled:cursor-not-allowed"
                      title="Xóa cuộc trò chuyện"
                    >
                      {deletingIds.has(conv.id) ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Trash2 className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConversationHistorySidebar;

