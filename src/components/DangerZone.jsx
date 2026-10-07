import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Skull, CheckCircle2, Lock } from 'lucide-react';
import EvictionModal from './EvictionModal';
import { useHouse } from '../context/HouseContext';

export default function DangerZone() {
  const {
    state,
    toggleNomination,
    toggleImmunity,
  } = useHouse();

  const [contestantToEvict, setContestantToEvict] = useState(null);

  const nominees = state.contestants.filter(
    (c) => c.status === 'nominated'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[34px] font-bold tracking-[-0.022em] text-ios-label leading-[41px]">
          Danger Zone
        </h1>
        <p className="text-[17px] leading-[22px] text-ios-secondary-label mt-0.5">
          Contestants nominated for elimination this week
        </p>
      </div>

      {/* Main Danger Zone Area (Red-tinted glass section) */}
      {nominees.length > 0 ? (
        <div className="glass-card bg-ios-red/[0.08] border-ios-red/30 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-ios-separator/60">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-ios-red animate-pulse" />
              <h3 className="font-semibold text-[17px] text-ios-red tracking-tight">
                Active Nominees at Risk
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-[13px] font-semibold bg-ios-red text-white shadow-sm tabular-nums">
              {nominees.length} {nominees.length === 1 ? 'Nominee' : 'Nominees'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nominees.map((nominee) => (
              <div
                key={nominee.id}
                className="glass-card p-5 flex flex-col justify-between shadow-sm min-w-0"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${
                          nominee.avatarColor || 'from-red-500 to-rose-700'
                        } text-white font-semibold text-[15px] shadow-sm shrink-0`}
                      >
                        {nominee.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-[17px] text-ios-label truncate">
                          {nominee.name}
                        </h4>
                        <p className="text-[15px] text-ios-secondary-label font-medium truncate">
                          {nominee.team}
                        </p>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[13px] font-semibold bg-ios-red/18 text-ios-red shrink-0">
                      Nominated
                    </span>
                  </div>

                  <div className="bg-ios-fill/50 rounded-xl p-3 mb-3 flex items-center justify-between text-[13px] min-w-0">
                    <span className="text-ios-secondary-label">Current score:</span>
                    <span className="font-semibold text-ios-label text-[15px] tabular-nums">
                      {nominee.points.toLocaleString()} pts
                    </span>
                  </div>
                </div>

                {/* Actions for Nominee (44px min-height buttons) */}
                <div className="pt-3 border-t border-ios-separator/60 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleNomination(nominee.id)}
                    className="flex-1 min-h-[44px] py-2 px-3 rounded-[14px] bg-ios-fill text-ios-label text-[17px] font-semibold ios-pressable flex items-center justify-center space-x-1.5"
                  >
                    <ShieldCheck className="w-4 h-4 stroke-[2] text-ios-green" />
                    <span>Rescue</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setContestantToEvict(nominee)}
                    className="flex-1 min-h-[44px] py-2 px-3 rounded-[14px] bg-ios-red text-white text-[17px] font-semibold ios-pressable flex items-center justify-center space-x-1.5 shadow-sm"
                  >
                    <Skull className="w-4 h-4 stroke-[2]" />
                    <span>Evict</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Calm Empty State */
        <div className="glass-card p-10 text-center">
          <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-ios-green/18 text-ios-green mb-3">
            <CheckCircle2 className="w-7 h-7 stroke-[2]" />
          </div>
          <h3 className="text-[22px] font-semibold text-ios-label">
            Nobody is up for eviction
          </h3>
          <p className="text-[15px] text-ios-secondary-label max-w-sm mx-auto mt-1">
            All active housemates are currently safe from elimination this week.
          </p>
        </div>
      )}

      {/* Nomination & Immunity Manager */}
      <div className="glass-card p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-ios-separator/60">
          <div>
            <h3 className="text-[17px] font-semibold text-ios-label">
              Nomination & Immunity Controls
            </h3>
            <p className="text-[13px] text-ios-secondary-label">
              Immune contestants are locked from nomination
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {state.contestants
            .filter((c) => c.status !== 'evicted')
            .map((c) => {
              const isImmune = c.status === 'immune';
              const isNominated = c.status === 'nominated';

              return (
                <div
                  key={c.id}
                  className={`p-4 rounded-[18px] border text-[15px] flex flex-col justify-between transition-all ${
                    isNominated
                      ? 'bg-ios-red/[0.06] border-ios-red/40'
                      : isImmune
                      ? 'bg-ios-green/[0.06] border-ios-green/40'
                      : 'bg-ios-fill/25 border-ios-separator/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-ios-label text-[17px] truncate">{c.name}</span>
                    {isImmune ? (
                      <span className="text-[13px] text-ios-green font-semibold px-2.5 py-0.5 rounded-full bg-ios-green/18">
                        Immune
                      </span>
                    ) : isNominated ? (
                      <span className="text-[13px] text-ios-red font-semibold px-2.5 py-0.5 rounded-full bg-ios-red/18">
                        Nominated
                      </span>
                    ) : (
                      <span className="text-[13px] text-ios-secondary-label px-2.5 py-0.5 rounded-full bg-ios-fill">
                        Safe
                      </span>
                    )}
                  </div>

                  <p className="text-[15px] text-ios-secondary-label font-medium mb-3 truncate">{c.team}</p>

                  {/* 44px Nominate Row + 44px Shield Immunity Circle Button */}
                  <div className="flex items-center gap-2 pt-2 border-t border-ios-separator/40">
                    <button
                      type="button"
                      onClick={() => toggleNomination(c.id)}
                      disabled={isImmune}
                      className={`flex-1 min-h-[44px] px-3 rounded-[14px] text-[17px] font-semibold transition ios-pressable flex items-center justify-center space-x-1.5 ${
                        isImmune
                          ? 'bg-ios-fill text-ios-secondary-label cursor-not-allowed opacity-40'
                          : isNominated
                          ? 'bg-ios-fill text-ios-label hover:bg-ios-fill/80'
                          : 'bg-ios-red/18 text-ios-red hover:bg-ios-red/25'
                      }`}
                      title={isImmune ? 'Cannot nominate: Contestant is Immune' : isNominated ? 'Un-nominate contestant' : 'Nominate for eviction'}
                    >
                      {isImmune ? (
                        <>
                          <Lock className="w-4 h-4 stroke-[2]" />
                          <span>Locked</span>
                        </>
                      ) : isNominated ? (
                        <span>Un-nominate</span>
                      ) : (
                        <span>Nominate</span>
                      )}
                    </button>

                    {/* Shield immunity button: 44px circle, green filled when immune, gray when not */}
                    <button
                      type="button"
                      onClick={() => toggleImmunity(c.id)}
                      aria-label={isImmune ? `Revoke immunity from ${c.name}` : `Grant immunity to ${c.name}`}
                      className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition ios-pressable shrink-0 ${
                        isImmune
                          ? 'bg-ios-green text-white shadow-sm'
                          : 'bg-ios-fill text-ios-secondary-label hover:text-ios-green'
                      }`}
                      title={isImmune ? 'Revoke Immunity' : 'Grant Immunity'}
                    >
                      <ShieldCheck className="w-5 h-5 stroke-[2]" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Eviction confirmation action sheet */}
      <EvictionModal
        isOpen={!!contestantToEvict}
        onClose={() => setContestantToEvict(null)}
        contestant={contestantToEvict}
      />
    </div>
  );
}
