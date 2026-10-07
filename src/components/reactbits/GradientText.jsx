import React from 'react';

export default function GradientText({
  children,
  className = '',
  colors = ['#38bdf8', '#818cf8', '#c084fc', '#38bdf8'],
  animationSpeed = 6,
  showBorder = false,
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    backgroundSize: '300% 100%',
    animation: `gradientMove ${animationSpeed}s ease infinite`,
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${showBorder ? 'p-[1px] rounded-full' : ''} ${className}`}>
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
      {showBorder && (
        <div
          className="absolute inset-0 rounded-full blur-[2px] opacity-70"
          style={gradientStyle}
        />
      )}
      <span
        className="relative z-10 bg-clip-text text-transparent font-bold"
        style={gradientStyle}
      >
        {children}
      </span>
    </div>
  );
}
