import React, { useState } from 'react';
import { getLearningPath } from '../api/learningPathApi';
import InteractiveList from './InteractiveList';
import RelatedContent from './RelatedContent';
import ImageGallery from './ImageGallery';
import DefinitionsList from './DefinitionsList';
import FAQList from './FAQList';
import './LearningPath.css';

const LearningPath = ({ topic, onClose }) => {
  const [activeMode, setActiveMode] = useState('simplify');
  const learningData = getLearningPath(topic);

  if (!learningData) {
    return (
      <div className="learning-path-container">
        <div className="learning-path-header">
          <h2>Lộ trình học</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <p>Không tìm thấy lộ trình học cho chủ đề: {topic}</p>
      </div>
    );
  }

  const currentData = learningData[activeMode];

  return (
    <div className="learning-path-container">
      <div className="learning-path-header">
        <h2>Lộ trình học: {topic}</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          className={`action-btn ${activeMode === 'simplify' ? 'active' : ''}`}
          onClick={() => setActiveMode('simplify')}
        >
          <span className="btn-icon">📚</span>
          Simplify
        </button>
        <button 
          className={`action-btn ${activeMode === 'goDeeper' ? 'active' : ''}`}
          onClick={() => setActiveMode('goDeeper')}
        >
          <span className="btn-icon">🔍</span>
          Go deeper
        </button>
        <button 
          className={`action-btn ${activeMode === 'getImages' ? 'active' : ''}`}
          onClick={() => setActiveMode('getImages')}
        >
          <span className="btn-icon">🖼️</span>
          Get images
        </button>
      </div>

      {/* Content Area */}
      <div className="learning-content">
        {activeMode === 'simplify' && (
          <>
            <InteractiveList 
              title="Tài liệu cơ bản" 
              items={currentData.interactiveList} 
            />
            <RelatedContent 
              title="Nội dung liên quan" 
              content={currentData.relatedContent} 
            />
          </>
        )}

        {activeMode === 'goDeeper' && (
          <>
            <InteractiveList 
              title="Tài liệu chuyên sâu" 
              items={currentData.interactiveList} 
            />
            <DefinitionsList 
              title="Định nghĩa quan trọng" 
              definitions={currentData.definitions} 
            />
            <FAQList 
              title="Câu hỏi thường gặp" 
              faqs={currentData.faqs} 
            />
            <RelatedContent 
              title="Nguồn tham khảo nâng cao" 
              content={currentData.relatedContent} 
            />
          </>
        )}

        {activeMode === 'getImages' && (
          <ImageGallery 
            title="Hình ảnh minh họa" 
            images={currentData.images} 
          />
        )}
      </div>
    </div>
  );
};

export default LearningPath;
