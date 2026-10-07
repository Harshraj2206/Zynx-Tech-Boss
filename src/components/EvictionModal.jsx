import React from 'react';
import { Skull, AlertOctagon } from 'lucide-react';
import { useHouse } from '../context/HouseContext';

export default function EvictionModal({ isOpen, onClose, contestant }) {
  const { evictContestant } = useHouse();

  if (!isOpen || !contestant) return null;

  const handleConfirm = () => {
    evictContestant(contestant.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm space-y-2">
        {/* iOS Action Sheet Panel */}
        <div className="bg-ios-sheet-bg/95 backdrop-blur-xl rounded-[22px] overflow-hidden border border-ios-separator/40 text-center shadow-ios-modal">
          <div className="p-5 border-b border-ios-separator/60">
            <div className="mx-auto w-10 h-10 rounded-full bg-ios-red/15 text-ios-red flex items-center justify-center mb-2.5">
              <Skull className="w-5 h-5 stroke-[2]" />
            </div>

            <h3 className="text-[17px] font-semibold text-ios-label">
              Evict {contestant.name}?
            </h3>

            <p className="text-[13px] text-ios-secondary-label mt-1.5 leading-snug">
              This will permanently evict {contestant.name} from Tech House, remove them from the live leaderboard, and issue a house-wide broadcast.
            </p>
          </div>

          {/* Destructive Action */}
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-3.5 text-[17px] font-semibold text-ios-red hover:bg-ios-fill/50 ios-pressable transition"
          >
            Evict Contestant
          </button>
        </div>

        {/* Cancel Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3.5 bg-ios-sheet-bg/95 backdrop-blur-xl rounded-[22px] text-[17px] font-semibold text-ios-blue border border-ios-separator/40 hover:bg-ios-fill/50 ios-pressable transition shadow-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
