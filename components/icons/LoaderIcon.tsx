import React from 'react';

export const LoaderIcon: React.FC = () => {
  return (
    <svg width="64" height="64" viewBox="0 0 100 100" xmlns="http://www.w.org/2000/svg">
      <defs>
        <linearGradient id="koloGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e7b100" />
          <stop offset="100%" stopColor="#c78c00" />
        </linearGradient>
        <filter id="koloShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="3" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#koloShadow)">
        <g>
          <animateTransform 
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="2s"
            repeatCount="indefinite" 
          />
          <circle cx="50" cy="50" r="40" fill="none" stroke="url(#koloGradient)" strokeWidth="8" />
          <g stroke="url(#koloGradient)" strokeWidth="8" strokeLinecap="round">
              <path d="M50 30 V 15" />
              <path d="M50 70 V 85" />
              <path d="M70 50 H 85" />
              <path d="M30 50 H 15" />
              <path d="M64.14 35.86 L 75.35 24.65" />
              <path d="M35.86 64.14 L 24.65 75.35" />
              <path d="M35.86 35.86 L 24.65 24.65" />
              <path d="M64.14 64.14 L 75.35 75.35" />
          </g>
          <circle cx="50" cy="50" r="20" fill="url(#koloGradient)" stroke="#8a5a44" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
};