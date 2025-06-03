'use client';
import React, { useEffect, useState } from 'react';

const Toast = ({ message, isVisible, onClose, type = 'success' }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!shouldRender) return null;

  return (
    <div className={`fixed top-6 right-6 z-50 transition-all duration-300 transform ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`
        min-w-[300px] max-w-[400px] p-4 rounded-lg shadow-lg backdrop-blur-sm
        ${type === 'success' 
          ? 'bg-[#e7e2d5] border border-[#5f493b]/20 text-[#2f1c11]' 
          : 'bg-red-50 border border-red-200 text-red-800'
        }
      `}>
        <div className="flex items-center gap-3">
          {type === 'success' && (
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#5f493b] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          <div className="flex-grow">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-4 h-4 text-[#5f493b] hover:text-[#2f1c11] transition-colors duration-200"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast; 