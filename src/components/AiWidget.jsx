import React, { useEffect, useState, useRef } from 'react';

const AiWidget = () => {
  const baseUrl = 'https://2human.ai';
  const aiName = 'penny';
  const templateName = 'timdplr-gmail-com';
  const isLeft = true;

  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const containerStyle = {
    position: 'fixed',
    zIndex: '1000',
    transition: 'left 0.3s, right 0.3s, top 0.3s',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)', // Added drop shadow
  };

  const buttonStyle = {
    position: 'fixed',
    left: isLeft ? '20px' : 'auto',
    right: isLeft ? 'auto' : '20px',
    bottom: '20px',
    zIndex: '1000',
    border: 'none',
    background: 'none',
    outline: 'none',
    transform: hover ? 'scale(1.2)' : 'scale(1)',
    transition: 'transform 0.3s',
  };

  const imgStyle = {
    width: '60%',
    height: 'auto',
    transition: 'transform 0.3s',
    border: '1px solid #ddd', // Light border
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)', // Light drop shadow
    padding: '5px', // Add some space around the image for the border and shadow
    borderRadius: '5px', // Optional: round corners for the border and shadow
  };

  const buttonRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const updateContainerPosition = () => {
      if (visible) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        let left, right, top;
  
        if (isLeft) {
          left = Math.min(window.innerWidth - containerRect.width, buttonRect.left);
          right = 'auto';
        } else {
          left = 'auto';
          right = Math.min(window.innerWidth - containerRect.width, window.innerWidth - buttonRect.right);
        }
  
        top = Math.max(0, buttonRect.top - containerRect.height);
  
        containerRef.current.style.left = `${left}px`;
        containerRef.current.style.right = `${right}px`;
        containerRef.current.style.top = `${top}px`;
      }
    };
    if (isLeft) {
      updateContainerPosition();
      window.addEventListener('resize', updateContainerPosition);
    }
    return () => {
      window.removeEventListener('resize', updateContainerPosition);
    };
  }, [visible, isLeft]);

  const iframe_src = `${baseUrl}/ai/${aiName}/${templateName}`;

  return (
    <>
      { visible && (
        <div style={containerStyle} ref={containerRef}>
          <iframe id='your-app-iframe' 
            style={{ 
              width: '600px', 
              height: `${window.innerHeight * 0.5}px`, 
              border: 'none' 
            }}
            src={iframe_src}
            title="AI Widget"
            allow="microphone"
          /> 
        </div>
      )}
      <button 
        style={buttonStyle} 
        onClick={toggleVisibility}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        ref={buttonRef}
      >
        <img
          style={imgStyle}
          src={ visible ?`${baseUrl}/images/icon-animation/icon-1.png` : `${baseUrl}/images/icon-animation/icon-2.png`}
          alt="Open AI"
        />
      </button>
    </>
  );
};

export default AiWidget;
