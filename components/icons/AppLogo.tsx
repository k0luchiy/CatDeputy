import React from 'react';

export const AppLogoIcon: React.FC<{ className?: string }> = (props) => (
  <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Head and Body */}
      <path d="M45.6 19.3c-1-3.2-3.1-6-6-7.9-3.3-2.1-7.3-3-11.2-2.6-4 .1-7.9 1.3-11.2 3.5s-5.9 5.3-7.1 8.8c-1 3-1.3 6.3-.7 9 .6 3.1 2.2 5.8 4.6 8 2.9 2.5 6.7 3.9 10.6 4.3 4.4.3 8.9-1 12.4-3.4 3.2-2.2 5.6-5.3 6.6-8.9 1-3.6.6-7.5-.4-11.2z" fill="#fff"/>
      {/* Ears */}
      <path d="M19.1 13.2L16.2 9.4" />
      <path d="M37 13.2L39.8 9.4" />
      {/* Whiskers */}
      <path d="M17.4 24.3l-5.3.3" />
      <path d="M18.4 27.5l-5.2-.8" />
      <path d="M38.6 24.3l5.3.3" />
      <path d="M37.6 27.5l5.2-.8" />
      {/* Tie */}
      <path d="M28 31.1l-2.6 4.3h5.2z" fill="#2E438B"/>
      <path d="M28 35.4l-3.2 5.3h6.4z" fill="#2E438B"/>
      {/* Book */}
      <path d="M33.4 33.3l5.5 2.8 1.4 6.9-5.7-3.1z" fill="#B32428" />
      <circle cx="37.8" cy="37" r="1.5" fill="#fff" stroke="none" />
    </g>
    {/* Nose */}
    <circle cx="28" cy="22" r="1.2" fill="#000" />
  </svg>
);