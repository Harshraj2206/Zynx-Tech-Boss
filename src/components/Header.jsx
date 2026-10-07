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
      {/* Floating iOS Liquid Glass Top Navigation Bar */}
      <header className="sticky top-3 z-40 w-full max-w-[1200px] mx-auto px-3 sm:px-4">
        <div className="glass rounded-[28px] h-14 px-3 sm:px-4 flex items-center justify-between gap-3 shadow-sm">
          {/* Left: Big Boss Logo & House Identity */}
          <div className="flex items-center space-x-2.5 shrink-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-ios-blue text-white shadow-sm shrink-0">
              <Eye className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-[17px] tracking-tight text-ios-label">
                Big Boss
              </span>
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[13px] font-medium bg-ios-fill text-ios-secondary-label">
                Tech House
              </span>
            </div>
          </div>

          {/* Right: Status Pills, Clock, Controls & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 text-[13px] shrink-0">
            {/* Captain Pill */}
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-ios-orange/18 text-ios-orange font-medium text-[13px] max-w-[170px] truncate shrink-0">
              <Crown className="w-3.5 h-3.5 stroke-[2] fill-ios-orange/20 shrink-0" />
              <span className="text-[13px] opacity-80 shrink-0">Captain:</span>
              <span className="font-semibold text-[13px] truncate">
                {currentCaptain ? currentCaptain.name : 'Vacant'}
              </span>
            </div>

            {/* Live Status Indicator */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-ios-green/18 text-ios-green font-medium text-[13px] shrink-0">
              <span className="w-2 h-2 rounded-full bg-ios-green animate-pulse" />
              <span className="text-[13px]">Live In Session</span>
            </div>

            {/* iOS System Time (tabular-nums, SF font) */}
            <div className="hidden min-[900px]:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-ios-fill text-ios-label text-[13px] font-medium tabular-nums shrink-0">
              <Clock className="w-3.5 h-3.5 stroke-[1.75] text-ios-secondary-label" />
              <span>{time || '12:00:00 PM'}</span>
            </div>

            {/* Light / Dark Mode Toggle (44px round glass button) */}
            <button
              onClick={toggleTheme}
              aria-label={state.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full glass flex items-center justify-center text-ios-label hover:bg-ios-fill/50 ios-pressable transition shrink-0"
            >
              {state.theme === 'dark' ? (
                <Sun className="w-5 h-5 stroke-[1.75] text-ios-yellow" />
              ) : (
                <Moon className="w-5 h-5 stroke-[1.75] text-ios-blue" />
              )}
            </button>

            {/* Sound Toggle (44px round glass button) */}
            <button
              onClick={toggleAudio}
              aria-label={state.audioMuted ? 'Unmute Sound' : 'Mute Sound'}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full glass flex items-center justify-center text-ios-label hover:bg-ios-fill/50 ios-pressable transition shrink-0"
            >
              {state.audioMuted ? (
                <VolumeX className="w-5 h-5 stroke-[1.75] text-ios-red" />
              ) : (
                <Volume2 className="w-5 h-5 stroke-[1.75] text-ios-blue" />
              )}
            </button>

            {/* Reset House Trigger (44px round glass button) */}
            <button
              onClick={() => setShowResetActionSheet(true)}
              aria-label="Reset House"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full glass flex items-center justify-center text-ios-secondary-label hover:text-ios-red hover:bg-ios-fill/50 ios-pressable transition shrink-0"
            >
              <RotateCcw className="w-5 h-5 stroke-[1.75]" />
            </button>
          </div>
        </div>
      </header>

      {/* iOS Destructive Action Sheet for Reset Confirmation */}
      {showResetActionSheet && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm space-y-2">
            {/* Action Sheet Panel */}
            <div className="glass rounded-[28px] overflow-hidden text-center shadow-2xl">
              <div className="p-5 border-b border-ios-separator/60">
                <h4 className="font-semibold text-[17px] text-ios-label">
                  Reset Tech House?
                </h4>
                <p className="text-[13px] text-ios-secondary-label mt-1.5 leading-snug">
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
                className="w-full py-4 text-[17px] font-semibold text-ios-red hover:bg-ios-fill/50 ios-pressable transition"
              >
                Reset to Default Data
              </button>
            </div>

            {/* Separate Cancel Button */}
            <button
              type="button"
              onClick={() => setShowResetActionSheet(false)}
              className="w-full py-3.5 glass rounded-[28px] text-[17px] font-semibold text-ios-blue hover:bg-ios-fill/50 ios-pressable transition shadow-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
