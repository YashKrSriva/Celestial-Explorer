import React from 'react';

interface ISSIconProps {
  className?: string;
}

export function ISSIcon({ className = "" }: ISSIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2 12h20M12 2v20M17 3l-5 5-5-5M17 21l-5-5-5 5M3 17l5-5-5-5M21 17l-5-5-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}