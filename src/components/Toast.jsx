import React, { useState, useEffect } from 'react';

const Toast = ({ message, isVisible, onHide }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-18 left-1/2 transform -translate-x-1/2 translate-y-5 bg-[#18120A] text-white px-4.5 py-2.25 rounded-full text-xs z-999 opacity-0 transition-all duration-250 whitespace-nowrap pointer-events-none show">
      {message}
    </div>
  );
};

export default Toast;
