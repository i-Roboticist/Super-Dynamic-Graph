import React, { useEffect } from 'react';
import './NodeSidebar.css';

const NodeSidebar = ({ isVisible, content, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="node-sidebar">
      <button className="sidebar-close" onClick={onClose}>×</button>
      <h2>{content?.name || 'Concept Details'}</h2>
      
      <div className="sidebar-section">
        <h3>Difficulty</h3>
        <span className="difficulty-badge">{content?.difficulty || 'Unknown'}</span>
      </div>

      <div className="sidebar-section">
        <h3>Prerequisites</h3>
        <ul className="prerequisites-list">
          {content?.prerequisites?.map((req, index) => (
            <li key={index}>{req}</li>
          )) || <li>No prerequisites</li>}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Video Lesson</h3>
        <div className="video-preview">
          {content?.videoId ? (
            <div className="video-placeholder" />
          ) : (
            <p>No video available</p>
          )}
        </div>
        <button className="enter-video-button">ENTER</button>
      </div>
    </div>
  );
};

export default NodeSidebar;