import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertTriangle, AlertCircle, Info, X, Eye } from 'lucide-react';
import { useHouse } from '../context/HouseContext';

export default function ToastContainer() {
  const { state, removeToast } = useHouse();

  return (
    <div className="fixed top-16 left-0 right-0 z-50 flex flex-col items-center pointer-events-none px-4 space-y-2">
      <AnimatePresence>
        {state.toasts.map((toast) => {
          const isError = toast.type === 'error';
          const isSuccess = toast.type === 'success';
          const isWarning = toast.type === 'warning';

          const accentColor = isError
            ? 'text-ios-red'
            : isSuccess
            ? 'text-ios-green'
            : isWarning
            ? 'text-ios-orange'
            : 'text-ios-blue';

          const iconBg = isError
            ? 'bg-ios-red'
            : isSuccess
            ? 'bg-ios-green'
            : isWarning
            ? 'bg-ios-orange'
            : 'bg-ios-blue';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.94 }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 30,
              }}
              className="pointer-events-auto w-full max-w-md bg-ios-secondary-bg/90 ios-blur rounded-[20px] p-3 shadow-ios-modal border border-ios-separator/50 flex items-center space-x-3"
            >
              {/* App Icon Glyph */}
              <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                {isError ? (
                  <AlertCircle className="w-4 h-4 stroke-[2]" />
                ) : isSuccess ? (
                  <Check className="w-4 h-4 stroke-[2.5]" />
                ) : isWarning ? (
                  <AlertTriangle className="w-4 h-4 stroke-[2]" />
                ) : (
                  <Eye className="w-4 h-4 stroke-[2]" />
                )}
              </div>

              {/* Notification Message */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[12px] font-semibold text-ios-secondary-label">
                    Big Boss
                  </span>
                  <span className="text-[11px] text-ios-tertiary-label">• now</span>
                </div>
                <p className="text-[14px] font-medium text-ios-label leading-tight mt-0.5 truncate">
                  {toast.message}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="w-6 h-6 rounded-full flex items-center justify-center text-ios-secondary-label hover:text-ios-label ios-pressable"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
