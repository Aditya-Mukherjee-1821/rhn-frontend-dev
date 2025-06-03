import React, { useEffect, useState } from 'react'

const FadingTexts = ({messages}) => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, 20000); // Change message every 2 seconds
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div
        style={{
          padding: "1%",
          fontSize: "80%",
          fontWeight: "200",
          textAlign: "center",
          animation: "fade-text 2s infinite alternate",
          color: "rgb(162, 162, 162)"
        }}
      >
        {messages[currentMessageIndex]}
        <style>
          {`@keyframes fade-text {
            0% { opacity: 0.3; }
            100% { opacity: 1; }
          }`}
        </style>
      </div>
    );
  };

export default FadingTexts