import React from 'react';
import './styles.css';

const FloatingButton = ({ onClick }) => {
  return (
    <button className="floating-button" onClick={onClick}>
      Upvote All
    </button>
  );
};

export default FloatingButton;
