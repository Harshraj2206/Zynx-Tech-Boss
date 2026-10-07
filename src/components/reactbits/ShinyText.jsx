import React from 'react';

export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = ''
}) {
  return (
    <span
      className={`inline-block relative text-transparent bg-clip-text font-bold ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.4) 100%)',
        backgroundSize: '200% 100%',
        animation: disabled ? 'none' : `shine ${speed}s linear infinite`,
      }}
    >
      <style>{`
        @keyframes shine {
          0% { background-position: 100% }
          100% { background-position: -100% }
        }
      `}</style>
      {text}
    </span>
  );
}
