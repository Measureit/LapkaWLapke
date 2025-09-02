import React from 'react';

interface PawLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

const PawLogo: React.FC<PawLogoProps> = ({ size = 40, className = '', animated = false }) => {
  const uniqueId = `logo-${size}-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 120 120" 
      width={size} 
      height={size}
      className={className}
    >
      <defs>
        <radialGradient id={`mainGradient-${uniqueId}`} cx="50%" cy="30%" r="70%">
          <stop offset="0%" style={{stopColor:'#e8d8f5', stopOpacity:1}} />
          <stop offset="30%" style={{stopColor:'#bb8fce', stopOpacity:1}} />
          <stop offset="70%" style={{stopColor:'#8e44ad', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#6b2c91', stopOpacity:1}} />
        </radialGradient>
        
        <linearGradient id={`pawGradient-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#ffffff', stopOpacity:0.9}} />
          <stop offset="50%" style={{stopColor:'#8e44ad', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#6b2c91', stopOpacity:1}} />
        </linearGradient>
        
        <linearGradient id={`heartGradient-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#ff6b9d', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#e74c3c', stopOpacity:1}} />
        </linearGradient>
        
        <filter id={`glowEffect-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id={`shadowEffect-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#6b2c91" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      {/* Background with glow */}
      <circle cx="60" cy="60" r="55" fill={`url(#mainGradient-${uniqueId})`} filter={`url(#shadowEffect-${uniqueId})`} opacity="0.1"/>
      <circle cx="60" cy="60" r="52" fill={`url(#mainGradient-${uniqueId})`} filter={`url(#glowEffect-${uniqueId})`}/>
      
      {/* Enhanced Left Paw */}
      <g transform="translate(30, 40)" filter={`url(#shadowEffect-${uniqueId})`}>
        <ellipse cx="12" cy="18" rx="10" ry="8" fill={`url(#pawGradient-${uniqueId})`} opacity="0.95"/>
        <ellipse cx="12" cy="16" rx="8" ry="6" fill="#ffffff" opacity="0.3"/>
        
        <ellipse cx="6" cy="6" rx="3.5" ry="5" fill={`url(#pawGradient-${uniqueId})`} opacity="0.95"/>
        <ellipse cx="6" cy="5" rx="2.5" ry="3.5" fill="#ffffff" opacity="0.3"/>
        
        <ellipse cx="12" cy="3" rx="3.5" ry="5" fill={`url(#pawGradient-${uniqueId})`} opacity="0.95"/>
        <ellipse cx="12" cy="2" rx="2.5" ry="3.5" fill="#ffffff" opacity="0.3"/>
        
        <ellipse cx="18" cy="6" rx="3.5" ry="5" fill={`url(#pawGradient-${uniqueId})`} opacity="0.95"/>
        <ellipse cx="18" cy="5" rx="2.5" ry="3.5" fill="#ffffff" opacity="0.3"/>
        
        <ellipse cx="22" cy="12" rx="3" ry="4" fill={`url(#pawGradient-${uniqueId})`} opacity="0.95"/>
        <ellipse cx="22" cy="11" rx="2" ry="3" fill="#ffffff" opacity="0.3"/>
      </g>
      
      {/* Enhanced Right Paw */}
      <g transform="translate(65, 50)" filter={`url(#shadowEffect-${uniqueId})`}>
        <ellipse cx="12" cy="18" rx="10" ry="8" fill={`url(#pawGradient-${uniqueId})`} opacity="0.95"/>
        <ellipse cx="12" cy="16" rx="8" ry="6" fill="#ffffff" opacity="0.3"/>
        
        <ellipse cx="6" cy="6" rx="3.5" ry="5" fill={`url(#pawGradient-${uniqueId})`} opacity="0.95"/>
        <ellipse cx="6" cy="5" rx="2.5" ry="3.5" fill="#ffffff" opacity="0.3"/>
        
        <ellipse cx="12" cy="3" rx="3.5" ry="5" fill={`url(#pawGradient-${uniqueId})`} opacity="0.95"/>
        <ellipse cx="12" cy="2" rx="2.5" ry="3.5" fill="#ffffff" opacity="0.3"/>
        
        <ellipse cx="18" cy="6" rx="3.5" ry="5" fill={`url(#pawGradient-${uniqueId})`} opacity="0.95"/>
        <ellipse cx="18" cy="5" rx="2.5" ry="3.5" fill="#ffffff" opacity="0.3"/>
        
        <ellipse cx="22" cy="12" rx="3" ry="4" fill={`url(#pawGradient-${uniqueId})`} opacity="0.95"/>
        <ellipse cx="22" cy="11" rx="2" ry="3" fill="#ffffff" opacity="0.3"/>
      </g>
      
      {/* Enhanced Heart */}
      <g transform="translate(60, 35)" filter={`url(#glowEffect-${uniqueId})`}>
        <path 
          d="M0 8 c-4-12 -20-12 -16 0 c4-12 20-12 16 0 c0 6 -8 14 -8 14 s-8-8 -8-14z" 
          fill={`url(#heartGradient-${uniqueId})`} 
          opacity="0.9"
        >
          {animated && (
            <animateTransform 
              attributeName="transform" 
              type="scale" 
              values="1;1.1;1" 
              dur="2s" 
              repeatCount="indefinite"
            />
          )}
        </path>
        <path 
          d="M0 8 c-2-6 -10-6 -8 0 c2-6 10-6 8 0 c0 3 -4 7 -4 7 s-4-4 -4-7z" 
          fill="#ffffff" 
          opacity="0.6"
        />
      </g>
      
      {/* Connection lines between paws */}
      <path 
        d="M42 55 Q60 45 77 65" 
        stroke={`url(#pawGradient-${uniqueId})`} 
        strokeWidth="2" 
        fill="none" 
        opacity="0.4" 
        strokeDasharray="5,3"
      >
        {animated && (
          <animate 
            attributeName="stroke-dashoffset" 
            values="0;-16" 
            dur="3s" 
            repeatCount="indefinite"
          />
        )}
      </path>
      
      {/* Decorative sparkles */}
      {animated && (
        <>
          <circle cx="25" cy="25" r="2" fill="#ffffff" opacity="0.7">
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="95" cy="30" r="1.5" fill="#ffffff" opacity="0.6">
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="95" r="1.5" fill="#ffffff" opacity="0.5">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="100" cy="90" r="2" fill="#ffffff" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite"/>
          </circle>
        </>
      )}
    </svg>
  );
};

export default PawLogo;
