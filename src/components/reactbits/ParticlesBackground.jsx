import React from 'react';
import { useHouse } from '../../context/HouseContext';

export default function ParticlesBackground() {
  const { state } = useHouse();
  const isDark = state.theme === 'dark';

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      style={{
        backgroundColor: isDark ? '#000000' : '#F2F2F7',
      }}
      aria-hidden="true"
    >
      {isDark ? (
        /* Dark Mode Wallpaper Blobs */
        <div className="absolute inset-0 w-full h-full">
          {/* Top-Left Blue Blob */}
          <div
            className="absolute -top-[10%] -left-[10%] w-[65vw] h-[65vw] max-w-[750px] max-h-[750px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(10, 132, 255, 0.35) 0%, rgba(10, 132, 255, 0) 70%)',
              filter: 'blur(80px)',
            }}
          />
          {/* Bottom-Right Purple Blob */}
          <div
            className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(191, 90, 242, 0.28) 0%, rgba(191, 90, 242, 0) 70%)',
              filter: 'blur(80px)',
            }}
          />
          {/* Bottom-Left Teal Blob */}
          <div
            className="absolute bottom-[10%] -left-[10%] w-[55vw] h-[55vw] max-w-[600px] max-h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(100, 210, 255, 0.18) 0%, rgba(100, 210, 255, 0) 70%)',
              filter: 'blur(80px)',
            }}
          />
        </div>
      ) : (
        /* Light Mode Wallpaper Blobs */
        <div className="absolute inset-0 w-full h-full">
          {/* Blue Soft Blob */}
          <div
            className="absolute -top-[10%] -left-[10%] w-[65vw] h-[65vw] max-w-[750px] max-h-[750px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0, 122, 255, 0.25) 0%, rgba(0, 122, 255, 0) 70%)',
              filter: 'blur(80px)',
            }}
          />
          {/* Pink Soft Blob */}
          <div
            className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 45, 85, 0.15) 0%, rgba(255, 45, 85, 0) 70%)',
              filter: 'blur(80px)',
            }}
          />
          {/* Teal Soft Blob */}
          <div
            className="absolute bottom-[15%] -left-[5%] w-[55vw] h-[55vw] max-w-[600px] max-h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(90, 200, 250, 0.20) 0%, rgba(90, 200, 250, 0) 70%)',
              filter: 'blur(80px)',
            }}
          />
        </div>
      )}
    </div>
  );
}
