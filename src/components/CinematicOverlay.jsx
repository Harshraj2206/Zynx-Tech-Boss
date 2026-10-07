import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, AlertOctagon, Radio, X } from 'lucide-react';
import DecryptedText from './reactbits/DecryptedText';
import { useHouse } from '../context/HouseContext';

export default function CinematicOverlay() {
  const { state, dismissOverlay } = useHouse();
  const overlayData = state.activeAnnouncementOverlay;
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!overlayData) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          dismissOverlay();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [overlayData, dismissOverlay]);

  if (!overlayData) return null;

  const isEviction = overlayData.type === 'eviction';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 ios-blur"
      >
        {/* iOS Live Activity / Lock Screen Announcement Card */}
        <motion.div
          initial={{ scale: 0.88, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.92, y: 10, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative max-w-xl w-full p-6 sm:p-8 rounded-[28px] bg-ios-secondary-bg/95 border border-ios-separator/50 shadow-ios-modal text-center"
        >
          {/* Header Live Activity Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-ios-fill mb-5 text-[12px] font-semibold">
            {isEviction ? (
              <>
                <AlertOctagon className="w-3.5 h-3.5 text-ios-red stroke-[2]" />
                <span className="text-ios-red">House eviction directive</span>
              </>
            ) : (
              <>
                <Radio className="w-3.5 h-3.5 text-ios-blue stroke-[2]" />
                <span className="text-ios-blue">Big Boss live transmission</span>
              </>
            )}
          </div>

          {/* Eye Symbol */}
          <div className="flex justify-center mb-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg ${
                isEviction ? 'bg-ios-red' : 'bg-ios-blue'
              }`}
            >
              <Eye className="w-8 h-8 stroke-[2]" />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-[13px] font-medium text-ios-secondary-label mb-2">
            {overlayData.subtext || 'Attention Tech House'}
          </p>

          {/* Main Title Message with DecryptedText effect */}
          <div className="min-h-[70px] flex items-center justify-center my-3">
            <h2
              className={`text-2xl sm:text-3xl font-bold tracking-tight leading-tight ${
                isEviction ? 'text-ios-red' : 'text-ios-label'
              }`}
            >
              <DecryptedText
                text={overlayData.message}
                speed={20}
                sequential={true}
                className="font-bold"
              />
            </h2>
          </div>

          {/* Dismiss bar & button */}
          <div className="mt-6 pt-4 border-t border-ios-separator/60 flex flex-col items-center space-y-3">
            {/* Auto dismiss progress bar */}
            <div className="w-full bg-ios-fill h-1 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
                className={`h-full ${isEviction ? 'bg-ios-red' : 'bg-ios-blue'}`}
              />
            </div>

            <div className="flex items-center justify-between w-full text-[13px] text-ios-secondary-label pt-1">
              <span>Auto-dismiss in {countdown}s</span>
              <button
                onClick={dismissOverlay}
                className={`px-5 py-2 rounded-full font-semibold transition ios-pressable flex items-center space-x-1.5 ${
                  isEviction
                    ? 'bg-ios-red text-white'
                    : 'bg-ios-blue text-white'
                }`}
              >
                <span>Acknowledge</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
