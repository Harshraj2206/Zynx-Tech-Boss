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
                stiffness: 300,
                damping: 30,
              }}
              className="pointer-events-auto w-full max-w-md glass rounded-[22px] p-3.5 flex items-center space-x-3.5"
            >
              {/* App Icon Glyph */}
              <div className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                {isError ? (
                  <AlertCircle className="w-5 h-5 stroke-[2]" />
                ) : isSuccess ? (
                  <Check className="w-5 h-5 stroke-[2.5]" />
                ) : isWarning ? (
                  <AlertTriangle className="w-5 h-5 stroke-[2]" />
                ) : (
                  <Eye className="w-5 h-5 stroke-[2]" />
                )}
              </div>

              {/* Notification Message */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-[17px] font-semibold text-ios-label leading-tight">
                    Big Boss
                  </span>
                  <span className="text-[13px] text-ios-secondary-label">• now</span>
                </div>
                <p className="text-[15px] text-ios-secondary-label leading-tight mt-0.5 truncate">
                  {toast.message}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-ios-secondary-label hover:text-ios-label ios-pressable shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
