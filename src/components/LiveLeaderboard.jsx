import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Plus, Minus } from 'lucide-react';
import CountUp from './reactbits/CountUp';
import { useHouse } from '../context/HouseContext';

export default function LiveLeaderboard() {
  const { state, addPoints, deductPoints } = useHouse();

  const rankedContestants = state.contestants
    .filter((c) => c.status !== 'evicted')
    .sort((a, b) => b.points - a.points);

  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <span className="w-7 h-7 rounded-full bg-[#FFD60A]/20 text-[#FFD60A] font-bold text-[13px] flex items-center justify-center shadow-sm tabular-nums">
          1
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="w-7 h-7 rounded-full bg-[#C7C7CC]/25 text-[#C7C7CC] font-bold text-[13px] flex items-center justify-center shadow-sm tabular-nums">
          2
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="w-7 h-7 rounded-full bg-[#CD7F32]/25 text-[#CD7F32] font-bold text-[13px] flex items-center justify-center shadow-sm tabular-nums">
          3
        </span>
      );
    }
    return (
      <span className="w-7 h-7 rounded-full bg-ios-fill text-ios-secondary-label font-semibold text-[13px] flex items-center justify-center tabular-nums">
        {rank}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* iOS Large Title Header */}
      <div>
        <h1 className="text-[34px] font-bold tracking-[-0.022em] text-ios-label leading-[41px]">
          Leaderboard
        </h1>
        <p className="text-[17px] leading-[22px] text-ios-secondary-label mt-0.5">
          Live House Standings • Auto-sorted in real time
        </p>
      </div>

      {/* iOS Inset Grouped List (Liquid Glass) */}
      <div className="glass-card divide-y divide-ios-separator/60 overflow-hidden shadow-sm">
        {rankedContestants.map((contestant, index) => {
          const rank = index + 1;

          return (
            <motion.div
              key={contestant.id}
              layout
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-ios-fill/20 transition-colors"
            >
              {/* Left: Rank, Avatar, Name & Team */}
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="shrink-0">{getRankBadge(rank)}</div>

                {/* 40px Circular Avatar */}
                <div className="relative shrink-0">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${
                      contestant.avatarColor || 'from-blue-500 to-indigo-600'
                    } text-white font-semibold text-[15px] shadow-sm`}
                  >
                    {contestant.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>

                  {contestant.isCaptain && (
                    <div
                      className="absolute -top-1 -right-1 bg-ios-orange text-white p-0.5 rounded-full shadow"
                      title="House Captain"
                    >
                      <Crown className="w-2.5 h-2.5 stroke-[2.5]" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-ios-label text-[17px] truncate">
                      {contestant.name}
                    </span>
                    {contestant.isCaptain && (
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[13px] font-semibold bg-ios-orange/18 text-ios-orange shrink-0">
                        Captain
                      </span>
                    )}
                    {contestant.status === 'immune' && (
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[13px] font-semibold bg-ios-green/18 text-ios-green shrink-0">
                        Immune
                      </span>
                    )}
                    {contestant.status === 'nominated' && (
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[13px] font-semibold bg-ios-red/18 text-ios-red shrink-0">
                        Nominated
                      </span>
                    )}
                  </div>
                  <p className="text-[15px] text-ios-secondary-label truncate">
                    {contestant.team} • {contestant.role}
                  </p>
                </div>
              </div>

              {/* Right: Quick Point Controls & Score (36px min-height buttons) */}
              <div className="flex items-center space-x-3 shrink-0 ml-2">
                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => addPoints(contestant.id, 10)}
                    className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full bg-ios-green/18 text-ios-green flex items-center justify-center ios-pressable shrink-0"
                    title="Add 10 points"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => addPoints(contestant.id, 50)}
                    className="h-9 min-h-[36px] px-2.5 rounded-full bg-ios-green/18 text-ios-green font-semibold text-[15px] flex items-center justify-center ios-pressable shrink-0"
                    title="Add 50 points"
                  >
                    +50
                  </button>
                  <button
                    type="button"
                    onClick={() => deductPoints(contestant.id, 10)}
                    disabled={contestant.points <= 0}
                    className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full bg-ios-red/18 text-ios-red flex items-center justify-center ios-pressable disabled:opacity-40 shrink-0"
                    title="Deduct 10 points"
                  >
                    <Minus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

                <div className="text-right min-w-[75px] shrink-0">
                  <CountUp
                    to={contestant.points}
                    duration={0.6}
                    className="text-[17px] font-bold text-ios-label tracking-tight tabular-nums"
                  />
                  <span className="text-[13px] text-ios-secondary-label ml-1">pts</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
