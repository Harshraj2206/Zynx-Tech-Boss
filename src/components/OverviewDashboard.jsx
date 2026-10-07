import React from 'react';
import { Radio, AlertOctagon, Trophy, ArrowRight, ShieldAlert } from 'lucide-react';
import HouseStatistics from './HouseStatistics';
import TaskTimer from './TaskTimer';
import { useHouse } from '../context/HouseContext';

export default function OverviewDashboard({ onNavigate }) {
  const { state, nominatedCount } = useHouse();

  const top3 = state.contestants
    .filter((c) => c.status !== 'evicted')
    .sort((a, b) => b.points - a.points)
    .slice(0, 3);

  const nominees = state.contestants.filter((c) => c.status === 'nominated');

  return (
    <div className="space-y-6">
      {/* iOS Liquid Glass Hero Card */}
      <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-ios-blue/15 text-ios-blue text-[13px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-ios-blue animate-pulse" />
              <span>Session Active • 24/7 Surveillance</span>
            </div>

            <h1 className="text-[34px] font-bold tracking-[-0.022em] text-ios-label leading-[41px]">
              Tech House Command
            </h1>

            <p className="text-[17px] leading-[22px] text-ios-secondary-label max-w-xl">
              Real-time monitoring and control for Big Boss. Track contestant scores, enforce immunity, manage challenges, and conduct eliminations.
            </p>
          </div>

          {/* Quick Action Buttons (44px min-height, 17px/600) */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('announcements')}
              className="min-h-[44px] px-5 rounded-[14px] bg-ios-blue hover:opacity-90 text-white font-semibold text-[17px] flex items-center space-x-2 shadow-sm ios-pressable transition"
            >
              <Radio className="w-4 h-4 stroke-[2]" />
              <span>Broadcast</span>
            </button>
            <button
              onClick={() => onNavigate('danger')}
              className="min-h-[44px] px-5 rounded-[14px] bg-ios-red/18 text-ios-red font-semibold text-[17px] flex items-center space-x-2 ios-pressable transition"
            >
              <AlertOctagon className="w-4 h-4 stroke-[2]" />
              <span>Danger Zone ({nominatedCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone Alert Banner (If active nominees exist) */}
      {nominees.length > 0 && (
        <div className="glass-card bg-ios-red/[0.12] border-ios-red/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm min-w-0">
          <div className="flex items-center space-x-3 text-ios-red min-w-0">
            <ShieldAlert className="w-5 h-5 stroke-[2] shrink-0" />
            <span className="font-semibold text-[15px] truncate">
              {nominees.length} {nominees.length === 1 ? 'contestant is' : 'contestants are'} up for eviction
            </span>
          </div>
          <button
            onClick={() => onNavigate('danger')}
            className="min-h-[36px] px-4 rounded-full bg-ios-red text-white text-[15px] font-semibold flex items-center space-x-1.5 ios-pressable shrink-0 shadow-sm"
          >
            <span>Review</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* House Telemetry Statistics (Feature 11) */}
      <HouseStatistics />

      {/* Top 3 & Timer Widgets (Equal-height cards side by side >=1024px, stacked below 1024px) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Top 3 Standings */}
        <div className="h-full glass-card p-6 flex flex-col justify-between min-w-0 overflow-hidden">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-ios-separator/60">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-ios-orange stroke-[2]" />
                <h3 className="font-semibold text-[17px] text-ios-label">
                  Top 3
                </h3>
              </div>
              <button
                onClick={() => onNavigate('leaderboard')}
                className="text-[15px] font-semibold text-ios-blue hover:underline flex items-center space-x-1"
              >
                <span>Full Leaderboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-ios-separator/50">
              {top3.map((c, idx) => {
                const rank = idx + 1;
                return (
                  <div
                    key={c.id}
                    className="h-16 flex items-center justify-between px-1"
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      {/* 28px Circular Rank Badge (gold, silver, bronze) */}
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[13px] shrink-0 tabular-nums ${
                          rank === 1
                            ? 'bg-[#FFD60A]/20 text-[#FFD60A]'
                            : rank === 2
                            ? 'bg-[#C7C7CC]/25 text-[#C7C7CC]'
                            : 'bg-[#CD7F32]/25 text-[#CD7F32]'
                        }`}
                      >
                        {rank}
                      </span>
                      <div className="min-w-0">
                        <span className="font-semibold text-ios-label text-[17px] block truncate">
                          {c.name}
                        </span>
                        <span className="text-[15px] text-ios-secondary-label block truncate">
                          {c.team}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-3">
                      <span className="text-[17px] font-semibold text-ios-label tabular-nums">
                        {c.points.toLocaleString()}
                      </span>
                      <span className="text-[13px] text-ios-secondary-label ml-1">pts</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Task Timer Embedded Card */}
        <TaskTimer className="h-full" />
      </div>
    </div>
  );
}
