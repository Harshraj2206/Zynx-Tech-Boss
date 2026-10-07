import React, { useState, useEffect } from 'react';
import { Eye, Crown, Clock, Volume2, VolumeX, RotateCcw, Sun, Moon } from 'lucide-react';
import { useHouse } from '../context/HouseContext';

export default function Header() {
  const {
    currentCaptain,
    state,
    toggleAudio,
    toggleTheme,
    resetHouse,
  } = useHouse();

  const [time, setTime] = useState('');
  const [showResetActionSheet, setShowResetActionSheet] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: true,
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* iOS Translucent Glass Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-ios-separator/60 ios-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          {/* Left: Big Boss Logo & House Identity */}
          <div className="flex items-center space-x-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-ios-blue text-white shadow-sm">
              <Eye className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-[17px] tracking-tight text-ios-label">
                Big Boss
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium bg-ios-fill text-ios-secondary-label">
                Tech House
              </span>
            </div>
          </div>

          {/* Right: Status Pills, Clock, Controls & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 text-[13px] shrink-0">
            {/* Captain Pill */}
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-ios-orange/15 text-ios-orange font-medium max-w-[150px] truncate shrink-0">
              <Crown className="w-3.5 h-3.5 stroke-[2] fill-ios-orange/20 shrink-0" />
              <span className="text-[12px] opacity-80 shrink-0">Captain:</span>
              <span className="font-semibold text-[12px] truncate">
                {currentCaptain ? currentCaptain.name : 'Vacant'}
              </span>
            </div>

            {/* Live Status Indicator */}
            <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-ios-green/15 text-ios-green font-medium text-[12px] shrink-0">
              <span className="w-2 h-2 rounded-full bg-ios-green animate-pulse" />
              <span>Live In Session</span>
            </div>

            {/* iOS System Time (Hidden below 900px, sans tabular-nums) */}
            <div className="hidden min-[900px]:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-ios-fill text-ios-label text-[12px] font-medium tabular-nums shrink-0">
              <Clock className="w-3.5 h-3.5 stroke-[1.75] text-ios-secondary-label" />
              <span>{time || '12:00:00 PM'}</span>
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              title={state.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-ios-fill text-ios-label hover:bg-ios-secondary-fill ios-pressable transition shrink-0"
            >
              {state.theme === 'dark' ? (
                <Sun className="w-4 h-4 stroke-[1.75] text-ios-yellow" />
              ) : (
                <Moon className="w-4 h-4 stroke-[1.75] text-ios-blue" />
              )}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleAudio}
              title={state.audioMuted ? 'Unmute Sound' : 'Mute Sound'}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-ios-fill text-ios-label hover:bg-ios-secondary-fill ios-pressable transition shrink-0"
            >
              {state.audioMuted ? (
                <VolumeX className="w-4 h-4 stroke-[1.75] text-ios-red" />
              ) : (
                <Volume2 className="w-4 h-4 stroke-[1.75] text-ios-blue" />
              )}
            </button>

            {/* Reset House Trigger */}
            <button
              onClick={() => setShowResetActionSheet(true)}
              title="Reset House"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-ios-fill text-ios-secondary-label hover:text-ios-red ios-pressable transition shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[1.75]" />
            </button>
          </div>
        </div>
      </header>

      {/* iOS Destructive Action Sheet for Reset Confirmation */}
      {showResetActionSheet && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm space-y-2">
            {/* Action Sheet Panel */}
            <div className="bg-ios-sheet-bg/95 backdrop-blur-xl rounded-[20px] overflow-hidden border border-ios-separator/40 text-center shadow-ios-modal">
              <div className="p-4 border-b border-ios-separator/60">
                <h4 className="font-semibold text-[17px] text-ios-label">
                  Reset Tech House?
                </h4>
                <p className="text-[13px] text-ios-secondary-label mt-1">
                  This will restore default contestants, starting points, and clear current nominations. This action cannot be undone.
                </p>
              </div>

              {/* Destructive Option */}
              <button
                type="button"
                onClick={() => {
                  resetHouse();
                  setShowResetActionSheet(false);
                }}
                className="w-full py-3.5 text-[17px] font-semibold text-ios-red border-b border-ios-separator/60 hover:bg-ios-fill/50 ios-pressable transition"
              >
                Reset to Default Data
              </button>
            </div>

            {/* Separate Cancel Button */}
            <button
              type="button"
              onClick={() => setShowResetActionSheet(false)}
              className="w-full py-3.5 bg-ios-sheet-bg/95 backdrop-blur-xl rounded-[20px] text-[17px] font-semibold text-ios-blue border border-ios-separator/40 hover:bg-ios-fill/50 ios-pressable transition shadow-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
