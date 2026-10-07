import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';
import { useHouse } from '../context/HouseContext';

export default function TaskTimer({ className = '' }) {
  const { addToast, state } = useHouse();

  const [totalSeconds, setTotalSeconds] = useState(300); // 5 minutes default
  const [secondsRemaining, setSecondsRemaining] = useState(300);
  const [isRunning, setIsRunning] = useState(false);

  const [inputMinutes, setInputMinutes] = useState('05');
  const [inputSeconds, setInputSeconds] = useState('00');

  // Drift-free timestamp refs
  const endTimeRef = useRef(null);
  const pausedRemainingRef = useRef(300);
  const requestFrameRef = useRef(null);
  const prevTickSecondRef = useRef(null);

  useEffect(() => {
    return () => {
      if (requestFrameRef.current) cancelAnimationFrame(requestFrameRef.current);
    };
  }, []);

  const tick = () => {
    if (!endTimeRef.current) return;

    const now = Date.now();
    const remainingMs = Math.max(0, endTimeRef.current - now);
    const remainingSec = Math.ceil(remainingMs / 1000);

    setSecondsRemaining(remainingSec);

    // Audio tick in last 10 seconds
    if (remainingSec <= 10 && remainingSec > 0 && prevTickSecondRef.current !== remainingSec) {
      prevTickSecondRef.current = remainingSec;
      sounds.playTick(state.audioMuted);
    }

    if (remainingMs <= 0) {
      setIsRunning(false);
      endTimeRef.current = null;
      pausedRemainingRef.current = 0;
      sounds.playAlert(state.audioMuted);
      sounds.speakAnnouncement('Attention Tech House! Task time has expired!', state.audioMuted);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      addToast('⏰ Time is up! Task submission window closed.', 'warning');
      return;
    }

    requestFrameRef.current = requestAnimationFrame(tick);
  };

  const handleStart = () => {
    if (secondsRemaining <= 0) {
      setSecondsRemaining(totalSeconds);
      pausedRemainingRef.current = totalSeconds;
    }

    const durationMs = (pausedRemainingRef.current || secondsRemaining) * 1000;
    endTimeRef.current = Date.now() + durationMs;
    setIsRunning(true);
    requestFrameRef.current = requestAnimationFrame(tick);
  };

  const handlePause = () => {
    if (!isRunning) return;
    setIsRunning(false);
    if (requestFrameRef.current) cancelAnimationFrame(requestFrameRef.current);
    if (endTimeRef.current) {
      const remainingMs = Math.max(0, endTimeRef.current - Date.now());
      pausedRemainingRef.current = Math.ceil(remainingMs / 1000);
      setSecondsRemaining(pausedRemainingRef.current);
      endTimeRef.current = null;
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    if (requestFrameRef.current) cancelAnimationFrame(requestFrameRef.current);
    endTimeRef.current = null;
    pausedRemainingRef.current = totalSeconds;
    setSecondsRemaining(totalSeconds);
    addToast('Task timer reset.', 'info');
  };

  const handleSetDuration = (e) => {
    e.preventDefault();
    const rawMins = parseInt(inputMinutes, 10);
    const rawSecs = parseInt(inputSeconds, 10);
    const mins = Math.max(0, Math.min(99, isNaN(rawMins) ? 0 : rawMins));
    const secs = Math.max(0, Math.min(59, isNaN(rawSecs) ? 0 : rawSecs));
    const total = mins * 60 + secs;

    if (total > 0) {
      setIsRunning(false);
      if (requestFrameRef.current) cancelAnimationFrame(requestFrameRef.current);
      endTimeRef.current = null;
      setTotalSeconds(total);
      setSecondsRemaining(total);
      pausedRemainingRef.current = total;
      setInputMinutes(String(mins).padStart(2, '0'));
      setInputSeconds(String(secs).padStart(2, '0'));
      addToast(`Timer configured to ${mins}m ${secs}s`, 'info');
    }
  };

  const setPreset = (mins) => {
    const total = mins * 60;
    setIsRunning(false);
    if (requestFrameRef.current) cancelAnimationFrame(requestFrameRef.current);
    endTimeRef.current = null;
    setTotalSeconds(total);
    setSecondsRemaining(total);
    pausedRemainingRef.current = total;
    setInputMinutes(String(mins).padStart(2, '0'));
    setInputSeconds('00');
  };

  const displayMinutes = String(Math.floor(secondsRemaining / 60)).padStart(2, '0');
  const displaySeconds = String(secondsRemaining % 60).padStart(2, '0');

  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = totalSeconds > 0 ? secondsRemaining / totalSeconds : 0;
  const strokeDashoffset = circumference - progressRatio * circumference;

  const isCritical = secondsRemaining <= 10 && secondsRemaining > 0;
  const isFinished = secondsRemaining === 0;
  const ringColor = isCritical ? '#FF453A' : '#0A84FF';

  const statusText = isFinished ? "Time's up" : isRunning ? 'Running' : 'Paused';

  return (
    <div
      className={`rounded-[24px] bg-ios-secondary-bg border border-ios-separator/50 p-6 shadow-ios-card overflow-hidden min-w-0 max-w-full flex flex-col justify-between ${className}`}
    >
      {/* 1. Title Row */}
      <div className="flex items-center justify-between pb-3 border-b border-ios-separator/50 w-full min-w-0">
        <h3 className="font-semibold text-[17px] text-ios-label truncate">
          Task timer
        </h3>
        <span
          className={`text-[13px] font-semibold tracking-tight ${
            isFinished
              ? 'text-ios-red'
              : isRunning
              ? 'text-ios-green'
              : 'text-ios-secondary-label'
          }`}
        >
          {statusText}
        </span>
      </div>

      {/* 2. Circular Ring + Digits Centred (ring size: clamp(180px, 60%, 240px), aspect-ratio 1) */}
      <div className="my-5 flex flex-col items-center justify-center w-full min-w-0">
        <div className="relative flex items-center justify-center w-[clamp(180px,60%,240px)] aspect-square max-w-full">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r={radius}
              className="stroke-ios-fill"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={ringColor}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-300"
            />
          </svg>

          {/* SF Mono ONLY for timer digits, tabular-nums, light weight; status label under digits */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
            <span
              className={`text-[36px] sm:text-[42px] font-light font-mono tracking-tight tabular-nums ${
                isCritical ? 'text-ios-red animate-pulse' : 'text-ios-label'
              }`}
            >
              {displayMinutes}:{displaySeconds}
            </span>
            <span className="text-[12px] font-medium text-ios-secondary-label mt-0.5">
              {statusText}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Controls Row Centred (64px buttons, gap 16px) */}
      <div className="flex items-center justify-center gap-4 mb-5 w-full min-w-0">
        {!isRunning ? (
          <button
            type="button"
            onClick={handleStart}
            className="w-16 h-16 rounded-full bg-ios-green/20 text-ios-green font-semibold text-[15px] flex items-center justify-center ios-pressable hover:bg-ios-green/30 shadow-sm shrink-0"
          >
            Start
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePause}
            className="w-16 h-16 rounded-full bg-ios-orange/20 text-ios-orange font-semibold text-[15px] flex items-center justify-center ios-pressable hover:bg-ios-orange/30 shadow-sm shrink-0"
          >
            Pause
          </button>
        )}

        <button
          type="button"
          onClick={handleReset}
          className="w-16 h-16 rounded-full bg-ios-fill text-ios-label font-semibold text-[15px] flex items-center justify-center ios-pressable hover:bg-ios-fill/80 shadow-sm shrink-0"
        >
          Reset
        </button>
      </div>

      {/* 4. Presets Segmented Control (full card width with equal-width segments, scrollable container) */}
      <div className="w-full min-w-0 mb-3 overflow-x-auto scrollbar-none">
        <div className="w-full min-w-[280px] grid grid-cols-5 p-1 rounded-full bg-ios-fill/70 backdrop-blur-md">
          {[1, 3, 5, 10, 15].map((p) => {
            const isSelected = totalSeconds === p * 60;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPreset(p)}
                className={`py-1.5 rounded-full text-[13px] font-semibold transition text-center ios-pressable truncate ${
                  isSelected
                    ? 'bg-ios-secondary-bg text-ios-label shadow-sm'
                    : 'text-ios-secondary-label hover:text-ios-label'
                }`}
              >
                {p}m
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Custom Duration Row: "Custom" label + two compact filled inputs (min:sec, max 80px) + "Set" button. flex-wrap, gap 8px */}
      <form
        onSubmit={handleSetDuration}
        className="flex flex-wrap items-center justify-center gap-2 w-full min-w-0 pt-2 border-t border-ios-separator/50"
      >
        <span className="text-ios-secondary-label text-[13px] font-medium shrink-0">
          Custom
        </span>
        <div className="flex items-center space-x-1 shrink-0">
          <input
            type="number"
            min="0"
            max="99"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(e.target.value)}
            placeholder="00"
            className="w-14 max-w-[80px] bg-ios-fill rounded-xl py-1.5 text-center text-ios-label focus:outline-none focus:ring-2 focus:ring-ios-blue text-[13px] font-sans tabular-nums border-none"
          />
          <span className="text-ios-secondary-label font-semibold">:</span>
          <input
            type="number"
            min="0"
            max="59"
            value={inputSeconds}
            onChange={(e) => setInputSeconds(e.target.value)}
            placeholder="00"
            className="w-14 max-w-[80px] bg-ios-fill rounded-xl py-1.5 text-center text-ios-label focus:outline-none focus:ring-2 focus:ring-ios-blue text-[13px] font-sans tabular-nums border-none"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-1.5 rounded-full bg-ios-blue text-white text-[13px] font-semibold ios-pressable shadow-sm shrink-0"
        >
          Set
        </button>
      </form>
    </div>
  );
}
