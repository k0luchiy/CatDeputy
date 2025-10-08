import React from 'react';

export const LdprLogo: React.FC<{ className?: string }> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="100" height="100" fill="#005BBB" />
        <polygon points="50,15 85,85 15,85" fill="#FFD500" />
        <text x="50" y="65" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="bold" textAnchor="middle" fill="#005BBB">ЛДПР</text>
    </svg>
);

export const KprfLogo: React.FC<{ className?: string }> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="100" height="100" fill="#DA291C" />
        <path d="M50 15 L60 40 L85 40 L65 60 L75 85 L50 70 L25 85 L35 60 L15 40 L40 40 Z" fill="#FFD700"/>
        <path d="M40 50 Q50 30 60 50 L60 65 L40 65 Z" fill="#FFD700"/>
        <path d="M43 65 L57 65 L50 80 Z" fill="#FFD700"/>
    </svg>
);

export const NewPeopleLogo: React.FC<{ className?: string }> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="100" height="100" fill="#00B0B9" />
        <circle cx="50" cy="50" r="35" fill="white" />
        <path d="M50,25 L50,75 M25,50 L75,50" stroke="#00B0B9" strokeWidth="12" strokeLinecap="round"/>
    </svg>
);