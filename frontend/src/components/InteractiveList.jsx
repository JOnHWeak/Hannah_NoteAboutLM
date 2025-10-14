import React from 'react';
import './InteractiveList.css';

const InteractiveList = ({ title, items }) => {
  const handleItemClick = (link) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      // Handle PDF or local file download/view
      console.log('Opening local file:', link);
    }
  };

  return (
    <div className="interactive-list">
      <div className="list-header">
        <span className="list-icon">📋</span>
        <h3>{title}</h3>
      </div>
      
      <div className="list-items">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="list-item"
            onClick={() => handleItemClick(item.link)}
          >
            <div className="item-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="item-content">
              <h4 className="item-title">{item.title}</h4>
              <p className="item-description">{item.description}</p>
            </div>
            <div className="item-arrow">
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveList;
