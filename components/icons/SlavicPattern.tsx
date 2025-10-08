import React from 'react';

export const CarvedPattern: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      width="250" 
      height="30" 
      viewBox="0 0 250 30" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="woodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e7b100" />
          <stop offset="50%" stopColor="#c78c00" />
          <stop offset="100%" stopColor="#a76c00" />
        </linearGradient>
        <filter id="carving" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur"/>
          <feOffset in="blur" dx="2" dy="2" result="offsetBlur"/>
          <feSpecularLighting in="blur" surfaceScale="5" specularConstant=".75" specularExponent="20" lightingColor="#e7b100" result="specOut">
            <fePointLight x="-5000" y="-10000" z="20000"/>
          </feSpecularLighting>
          <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint"/>
          <feMerge>
            <feMergeNode in="offsetBlur"/>
            <feMergeNode in="litPaint"/>
          </feMerge>
        </filter>
      </defs>
      
      <g stroke="url(#woodGradient)" strokeWidth="2" fill="none" filter="url(#carving)">
        {/* Main line */}
        <line x1="10" y1="15" x2="240" y2="15" strokeOpacity="0.7" />
        
        {/* Center element */}
        <path d="M125,5 C135,15 135,15 125,25 C115,15 115,15 125,5 Z" />
        
        {/* Side swirls */}
        <path d="M80,15 C90,5 100,5 110,15" />
        <path d="M170,15 C160,5 150,5 140,15" />
        <path d="M50,15 C60,25 70,25 80,15" />
        <path d="M200,15 C190,25 180,25 170,15" />

        {/* End caps */}
        <circle cx="20" cy="15" r="3" />
        <circle cx="230" cy="15" r="3" />
      </g>
    </svg>
  );
};
