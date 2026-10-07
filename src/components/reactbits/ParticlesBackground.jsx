import React from 'react';

export default function ParticlesBackground() {
  // Apple HIG uses clean, distraction-free blurred backdrop materials
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-20 transition-opacity duration-300"
      style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(10, 132, 255, 0.15), transparent 70%)',
      }}
      aria-hidden="true"
    />
  );
}
