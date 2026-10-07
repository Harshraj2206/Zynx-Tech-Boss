import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Skull, CheckCircle2 } from 'lucide-react';
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
        <h1 className="text-[28px] sm:text-[34px] font-bold tracking-tight text-ios-label">
          Danger Zone
        </h1>
        <p className="text-[13px] text-ios-secondary-label font-medium mt-0.5">
          Contestants nominated for elimination this week
        </p>
      </div>

      {/* Main Danger Zone Area (Red-tinted grouped section with gentle pulse, standard card border) */}
      {nominees.length > 0 ? (
        <div className="rounded-[24px] bg-ios-red/[0.06] border border-ios-separator/50 p-5 sm:p-6 shadow-ios-card">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-ios-separator/50">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-ios-red animate-pulse" />
              <h3 className="font-semibold text-[15px] text-ios-red tracking-tight">
                Active Nominees at Risk
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[12px] font-semibold bg-ios-red text-white shadow-sm tabular-nums">
              {nominees.length} {nominees.length === 1 ? 'Nominee' : 'Nominees'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {nominees.map((nominee) => (
              <div
                key={nominee.id}
                className="bg-ios-secondary-bg rounded-[18px] p-4 border border-ios-separator/50 flex flex-col justify-between shadow-sm min-w-0"
              >
                <div>
                  <div className="flex items-start justify-between mb-2.5">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div
                        className={`flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br ${
                          nominee.avatarColor || 'from-red-500 to-rose-700'
                        } text-white font-semibold text-[15px] shadow-sm shrink-0`}
                      >
                        {nominee.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-[15px] text-ios-label truncate">
                          {nominee.name}
                        </h4>
                        <p className="text-[12px] text-ios-red font-medium truncate">
                          {nominee.team}
                        </p>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-ios-red/15 text-ios-red shrink-0">
                      At risk
                    </span>
                  </div>

                  <div className="bg-ios-fill/50 rounded-xl p-2.5 mb-3 flex items-center justify-between text-[12px] min-w-0">
                    <span className="text-ios-secondary-label">Current score:</span>
                    <span className="font-semibold text-ios-label tabular-nums">
                      {nominee.points.toLocaleString()} pts
                    </span>
                  </div>
                </div>

                {/* Actions for Nominee */}
                <div className="pt-2 border-t border-ios-separator/50 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleNomination(nominee.id)}
                    className="flex-1 py-2 px-3 rounded-full bg-ios-fill text-ios-label text-[12px] font-semibold ios-pressable flex items-center justify-center space-x-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 stroke-[2] text-ios-green" />
                    <span>Rescue</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setContestantToEvict(nominee)}
                    className="flex-1 py-2 px-3 rounded-full bg-ios-red text-white text-[12px] font-semibold ios-pressable flex items-center justify-center space-x-1 shadow-sm"
                  >
                    <Skull className="w-3.5 h-3.5 stroke-[2]" />
                    <span>Evict</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-[24px] bg-ios-secondary-bg border border-ios-separator/50 p-10 text-center shadow-ios-card">
          <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-ios-green/15 text-ios-green mb-3">
            <CheckCircle2 className="w-7 h-7 stroke-[2]" />
          </div>
          <h3 className="text-[17px] font-semibold text-ios-label">
            Nobody is in Danger
          </h3>
          <p className="text-[13px] text-ios-secondary-label max-w-sm mx-auto mt-1">
            All active housemates are currently safe from eviction this cycle.
          </p>
        </div>
      )}

      {/* Nomination & Immunity Manager */}
      <div className="bg-ios-secondary-bg rounded-[24px] border border-ios-separator/50 p-5 sm:p-6 shadow-ios-card">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-ios-separator/60">
          <div>
            <h3 className="text-[15px] font-semibold text-ios-label">
              Nomination & Immunity Controls
            </h3>
            <p className="text-[12px] text-ios-secondary-label">
              Immune contestants are locked from nomination
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {state.contestants
            .filter((c) => c.status !== 'evicted')
            .map((c) => {
              const isImmune = c.status === 'immune';
              const isNominated = c.status === 'nominated';

              return (
                <div
                  key={c.id}
                  className={`p-3.5 rounded-[18px] border text-[13px] flex flex-col justify-between transition-all ${
                    isNominated
                      ? 'bg-ios-red/[0.04] border-ios-red/40'
                      : isImmune
                      ? 'bg-ios-green/[0.04] border-ios-green/40'
                      : 'bg-ios-fill/30 border-ios-separator/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-ios-label truncate">{c.name}</span>
                    {isImmune ? (
                      <span className="text-[10px] text-ios-green font-bold px-2 py-0.5 rounded-full bg-ios-green/15">
                        Immune
                      </span>
                    ) : isNominated ? (
                      <span className="text-[10px] text-ios-red font-bold px-2 py-0.5 rounded-full bg-ios-red/15">
                        Nominated
                      </span>
                    ) : (
                      <span className="text-[10px] text-ios-secondary-label">Safe</span>
                    )}
                  </div>

                  <p className="text-[11px] text-ios-blue font-medium mb-3">{c.team}</p>

                  <div className="flex items-center gap-1.5 pt-2 border-t border-ios-separator/40">
                    <button
                      type="button"
                      onClick={() => toggleNomination(c.id)}
                      disabled={isImmune}
                      className={`flex-1 py-1.5 px-2 rounded-full text-[12px] font-semibold transition ios-pressable ${
                        isImmune
                          ? 'bg-ios-fill/40 text-ios-tertiary-label cursor-not-allowed opacity-50'
                          : isNominated
                          ? 'bg-ios-fill text-ios-label hover:bg-ios-fill/80'
                          : 'bg-ios-red/15 text-ios-red hover:bg-ios-red/25'
                      }`}
                    >
                      {isImmune ? 'Locked' : isNominated ? 'Un-nominate' : 'Nominate'}
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleImmunity(c.id)}
                      className={`py-1.5 px-2.5 rounded-full text-[12px] font-semibold transition ios-pressable ${
                        isImmune
                          ? 'bg-ios-green text-white shadow-sm'
                          : 'bg-ios-fill text-ios-secondary-label hover:text-ios-green'
                      }`}
                      title={isImmune ? 'Revoke Immunity' : 'Grant Immunity'}
                    >
                      <ShieldCheck className="w-4 h-4 stroke-[2]" />
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
