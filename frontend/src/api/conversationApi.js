// Mock API for conversation management
// This simulates a real API with localStorage as the data store

const STORAGE_KEY = 'notebook-conversations';

// Helper function to get conversations from localStorage
const getStoredConversations = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading conversations from storage:', error);
    return [];
  }
};

// Helper function to save conversations to localStorage
const saveConversations = (conversations) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    return true;
  } catch (error) {
    console.error('Error saving conversations to storage:', error);
    return false;
  }
};

// Simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Get all conversations
export const getConversations = async () => {
  await delay();
  
  try {
    const conversations = getStoredConversations();
    return {
      success: true,
      data: conversations,
      message: 'Conversations retrieved successfully'
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: 'Failed to retrieve conversations',
      error: error.message
    };
  }
};

// Get a specific conversation by ID
export const getConversationById = async (id) => {
  await delay();
  
  try {
    const conversations = getStoredConversations();
    const conversation = conversations.find(conv => conv.id === id);
    
    if (conversation) {
      return {
        success: true,
        data: conversation,
        message: 'Conversation found'
      };
    } else {
      return {
        success: false,
        data: null,
        message: 'Conversation not found'
      };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: 'Failed to retrieve conversation',
      error: error.message
    };
  }
};

// Create a new conversation
export const createConversation = async (conversationData) => {
  await delay();
  
  try {
    const conversations = getStoredConversations();
    const newConversation = {
      id: Date.now().toString(),
      title: conversationData.title || 'Cuộc trò chuyện mới',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: conversationData.messages || [],
      ...conversationData
    };
    
    const updatedConversations = [newConversation, ...conversations];
    
    if (saveConversations(updatedConversations)) {
      return {
        success: true,
        data: newConversation,
        message: 'Conversation created successfully'
      };
    } else {
      throw new Error('Failed to save conversation');
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: 'Failed to create conversation',
      error: error.message
    };
  }
};

// Update an existing conversation
export const updateConversation = async (id, updates) => {
  await delay();
  
  try {
    const conversations = getStoredConversations();
    const conversationIndex = conversations.findIndex(conv => conv.id === id);
    
    if (conversationIndex === -1) {
      return {
        success: false,
        data: null,
        message: 'Conversation not found'
      };
    }
    
    const updatedConversation = {
      ...conversations[conversationIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    conversations[conversationIndex] = updatedConversation;
    
    if (saveConversations(conversations)) {
      return {
        success: true,
        data: updatedConversation,
        message: 'Conversation updated successfully'
      };
    } else {
      throw new Error('Failed to save updated conversation');
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: 'Failed to update conversation',
      error: error.message
    };
  }
};

// Delete a conversation
export const deleteConversation = async (id) => {
  await delay();
  
  try {
    const conversations = getStoredConversations();
    const filteredConversations = conversations.filter(conv => conv.id !== id);
    
    if (filteredConversations.length === conversations.length) {
      return {
        success: false,
        data: null,
        message: 'Conversation not found'
      };
    }
    
    if (saveConversations(filteredConversations)) {
      return {
        success: true,
        data: { id },
        message: 'Conversation deleted successfully'
      };
    } else {
      throw new Error('Failed to save after deletion');
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: 'Failed to delete conversation',
      error: error.message
    };
  }
};

// Search conversations by title or content
export const searchConversations = async (query) => {
  await delay();
  
  try {
    const conversations = getStoredConversations();
    const searchQuery = query.toLowerCase();
    
    const filteredConversations = conversations.filter(conv => 
      conv.title.toLowerCase().includes(searchQuery) ||
      (conv.messages && conv.messages.some(msg => 
        msg.content && msg.content.toLowerCase().includes(searchQuery)
      ))
    );
    
    return {
      success: true,
      data: filteredConversations,
      message: `Found ${filteredConversations.length} conversations`
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: 'Failed to search conversations',
      error: error.message
    };
  }
};

// Bulk delete conversations
export const deleteMultipleConversations = async (ids) => {
  await delay();
  
  try {
    const conversations = getStoredConversations();
    const filteredConversations = conversations.filter(conv => !ids.includes(conv.id));
    
    const deletedCount = conversations.length - filteredConversations.length;
    
    if (saveConversations(filteredConversations)) {
      return {
        success: true,
        data: { deletedCount, deletedIds: ids },
        message: `Successfully deleted ${deletedCount} conversations`
      };
    } else {
      throw new Error('Failed to save after bulk deletion');
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: 'Failed to delete conversations',
      error: error.message
    };
  }
};
