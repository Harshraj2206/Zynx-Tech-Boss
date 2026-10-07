import React from 'react';
import { Skull, RotateCcw, UserCheck } from 'lucide-react';
import { useHouse } from '../context/HouseContext';

export default function EvictedArchive() {
  const { state, restoreContestant } = useHouse();

  const evictedContestants = state.contestants.filter(
    (c) => c.status === 'evicted'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[34px] font-bold tracking-tight text-ios-label" style={{ letterSpacing: '-0.022em' }}>
          Evicted Archive
        </h1>
        <p className="text-[17px] text-ios-secondary-label mt-1">
          Contestants removed from active house residency
        </p>
      </div>

      {evictedContestants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {evictedContestants.map((c) => (
            <div
              key={c.id}
              className="glass-card p-5 flex flex-col justify-between opacity-90"
            >
              <div>
                <div className="flex items-start justify-between mb-3.5">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-ios-fill text-ios-secondary-label font-semibold text-[17px] grayscale shrink-0">
                      {c.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-ios-label text-[17px] line-through decoration-ios-secondary-label">
                        {c.name}
                      </h3>
                      <p className="text-[15px] text-ios-secondary-label font-medium">{c.team}</p>
                      <p className="text-[13px] text-ios-tertiary-label">{c.role}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[13px] font-semibold bg-ios-red/15 text-ios-red">
                    Evicted
                  </span>
                </div>

                <div className="bg-ios-fill/50 rounded-xl p-2.5 mb-4 flex items-center justify-between text-[13px]">
                  <span className="text-ios-secondary-label">Score at exit:</span>
                  <span className="font-semibold text-ios-label tabular-nums">{c.points.toLocaleString()} pts</span>
                </div>
              </div>

              {/* Restore Action */}
              <div className="pt-3 border-t border-ios-separator/50 flex items-center justify-between">
                <span className="text-[13px] text-ios-secondary-label">
                  Excluded from active house
                </span>
                <button
                  type="button"
                  onClick={() => restoreContestant(c.id)}
                  className="h-9 px-4 rounded-full bg-ios-blue text-white text-[13px] font-semibold transition ios-pressable flex items-center space-x-1.5 shadow-sm"
                  title="Restore contestant to active status"
                >
                  <RotateCcw className="w-3.5 h-3.5 stroke-[2]" />
                  <span>Restore</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-10 text-center">
          <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-ios-fill text-ios-secondary-label mb-3">
            <UserCheck className="w-7 h-7 stroke-[1.75]" />
          </div>
          <h3 className="text-[17px] font-semibold text-ios-label">
            No Evicted Contestants
          </h3>
          <p className="text-[15px] text-ios-secondary-label max-w-sm mx-auto mt-1">
            All original housemates are currently active in Tech House.
          </p>
        </div>
      )}
    </div>
  );
}
