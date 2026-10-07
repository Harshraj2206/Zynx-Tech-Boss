import React from 'react';
import { Users, Award, ShieldAlert, ShieldCheck, Crown, CheckSquare, TrendingUp, TrendingDown, Skull, UserCheck } from 'lucide-react';
import CountUp from './reactbits/CountUp';
import { useHouse } from '../context/HouseContext';

export default function HouseStatistics() {
  const { state, currentCaptain } = useHouse();

  const totalContestants = state.contestants.length;
  const activeContestants = state.contestants.filter((c) => c.status !== 'evicted');
  const activeCount = activeContestants.length;
  const evictedCount = state.contestants.filter((c) => c.status === 'evicted').length;
  const nominatedCount = state.contestants.filter((c) => c.status === 'nominated').length;
  const immuneCount = state.contestants.filter((c) => c.status === 'immune').length;

  const sortedByPoints = [...activeContestants].sort((a, b) => b.points - a.points);
  const highestScorer = sortedByPoints[0] || null;
  const lowestScorer = sortedByPoints[sortedByPoints.length - 1] || null;
  const totalActivePoints = activeContestants.reduce((acc, c) => acc + c.points, 0);
  const avgPoints = activeCount > 0 ? (totalActivePoints / activeCount).toFixed(1) : 0;

  const completedTasks = state.tasks.filter((t) => t.status === 'completed').length;
  const pendingTasks = state.tasks.filter((t) => t.status === 'pending').length;

  const teamAggregates = activeContestants.reduce((acc, c) => {
    const team = c.team || 'Unassigned';
    acc[team] = (acc[team] || 0) + c.points;
    return acc;
  }, {});

  const teams = Object.keys(teamAggregates);
  const maxTeamPoints = Math.max(...Object.values(teamAggregates), 1);

  const teamColorMap = {
    'Team Frontend': 'bg-ios-blue',
    'Team Backend': 'bg-ios-green',
    'Team DevOps': 'bg-ios-orange',
    'Team AI': 'bg-ios-purple',
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-[20px] sm:text-[22px] font-semibold text-ios-label tracking-tight">
          Overview
        </h2>
        <p className="text-[13px] text-ios-secondary-label font-medium mt-0.5">
          Live scores and team breakdown
        </p>
      </div>

      {/* Grid of Key Stat Metric Cards (Consistent 20px padding, equal height, sentence-case labels) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Total Contestants */}
        <div className="rounded-[20px] bg-ios-secondary-bg border border-ios-separator/50 p-5 shadow-ios-card flex flex-col justify-between h-full min-w-0">
          <div className="flex items-center justify-between text-ios-secondary-label mb-2">
            <span className="text-[13px] font-medium text-ios-secondary-label">Total</span>
            <Users className="w-4 h-4 text-ios-secondary-label" />
          </div>
          <div className="text-[30px] font-semibold text-ios-label tabular-nums leading-none my-1">
            <CountUp to={totalContestants} duration={0.8} />
          </div>
          <span className="text-[12px] text-ios-secondary-label">Registered</span>
        </div>

        {/* Active In House */}
        <div className="rounded-[20px] bg-ios-secondary-bg border border-ios-separator/50 p-5 shadow-ios-card flex flex-col justify-between h-full min-w-0">
          <div className="flex items-center justify-between text-ios-secondary-label mb-2">
            <span className="text-[13px] font-medium text-ios-secondary-label">Active</span>
            <UserCheck className="w-4 h-4 text-ios-secondary-label" />
          </div>
          <div className="text-[30px] font-semibold text-ios-label tabular-nums leading-none my-1">
            <CountUp to={activeCount} duration={0.8} />
          </div>
          <span className="text-[12px] text-ios-secondary-label">In house</span>
        </div>

        {/* Highest Scorer */}
        <div className="rounded-[20px] bg-ios-secondary-bg border border-ios-separator/50 p-5 shadow-ios-card flex flex-col justify-between h-full min-w-0">
          <div className="flex items-center justify-between text-ios-secondary-label mb-2">
            <span className="text-[13px] font-medium text-ios-secondary-label">Top leader</span>
            <TrendingUp className="w-4 h-4 text-ios-secondary-label" />
          </div>
          <div className="text-[18px] sm:text-[20px] font-semibold text-ios-label truncate my-1">
            {highestScorer ? highestScorer.name : 'N/A'}
          </div>
          <span className="text-[12px] text-ios-secondary-label tabular-nums">
            {highestScorer ? `${highestScorer.points.toLocaleString()} pts` : '0 pts'}
          </span>
        </div>

        {/* Lowest Scorer */}
        <div className="rounded-[20px] bg-ios-secondary-bg border border-ios-separator/50 p-5 shadow-ios-card flex flex-col justify-between h-full min-w-0">
          <div className="flex items-center justify-between text-ios-secondary-label mb-2">
            <span className="text-[13px] font-medium text-ios-secondary-label">Lowest</span>
            <TrendingDown className="w-4 h-4 text-ios-secondary-label" />
          </div>
          <div className="text-[18px] sm:text-[20px] font-semibold text-ios-label truncate my-1">
            {lowestScorer ? lowestScorer.name : 'N/A'}
          </div>
          <span className="text-[12px] text-ios-secondary-label tabular-nums">
            {lowestScorer ? `${lowestScorer.points.toLocaleString()} pts` : '0 pts'}
          </span>
        </div>

        {/* Average Points (Primary label colour, NOT purple) */}
        <div className="rounded-[20px] bg-ios-secondary-bg border border-ios-separator/50 p-5 shadow-ios-card flex flex-col justify-between h-full min-w-0">
          <div className="flex items-center justify-between text-ios-secondary-label mb-2">
            <span className="text-[13px] font-medium text-ios-secondary-label">Average</span>
            <Award className="w-4 h-4 text-ios-secondary-label" />
          </div>
          <div className="text-[30px] font-semibold text-ios-label tabular-nums leading-none my-1">
            <CountUp to={Number(avgPoints)} decimals={1} duration={0.8} />
          </div>
          <span className="text-[12px] text-ios-secondary-label">pts / person</span>
        </div>

        {/* Current Captain (Orange icon) */}
        <div className="rounded-[20px] bg-ios-secondary-bg border border-ios-separator/50 p-5 shadow-ios-card flex flex-col justify-between h-full min-w-0">
          <div className="flex items-center justify-between text-ios-secondary-label mb-2">
            <span className="text-[13px] font-medium text-ios-secondary-label">Captain</span>
            <Crown className="w-4 h-4 text-ios-orange" />
          </div>
          <div className="text-[18px] sm:text-[20px] font-semibold text-ios-label truncate my-1">
            {currentCaptain ? currentCaptain.name : 'Vacant'}
          </div>
          <span className="text-[12px] text-ios-orange font-medium">House lead</span>
        </div>

        {/* In Danger / Nominated (Red icon) */}
        <div className="rounded-[20px] bg-ios-secondary-bg border border-ios-separator/50 p-5 shadow-ios-card flex flex-col justify-between h-full min-w-0">
          <div className="flex items-center justify-between text-ios-secondary-label mb-2">
            <span className="text-[13px] font-medium text-ios-secondary-label">Nominated</span>
            <ShieldAlert className="w-4 h-4 text-ios-red" />
          </div>
          <div className="text-[30px] font-semibold text-ios-label tabular-nums leading-none my-1">
            <CountUp to={nominatedCount} duration={0.8} />
          </div>
          <span className="text-[12px] text-ios-secondary-label">At risk</span>
        </div>

        {/* Immune Count (Green icon) */}
        <div className="rounded-[20px] bg-ios-secondary-bg border border-ios-separator/50 p-5 shadow-ios-card flex flex-col justify-between h-full min-w-0">
          <div className="flex items-center justify-between text-ios-secondary-label mb-2">
            <span className="text-[13px] font-medium text-ios-secondary-label">Immune</span>
            <ShieldCheck className="w-4 h-4 text-ios-green" />
          </div>
          <div className="text-[30px] font-semibold text-ios-label tabular-nums leading-none my-1">
            <CountUp to={immuneCount} duration={0.8} />
          </div>
          <span className="text-[12px] text-ios-secondary-label">Protected</span>
        </div>

        {/* Tasks Ratio */}
        <div className="rounded-[20px] bg-ios-secondary-bg border border-ios-separator/50 p-5 shadow-ios-card flex flex-col justify-between h-full min-w-0">
          <div className="flex items-center justify-between text-ios-secondary-label mb-2">
            <span className="text-[13px] font-medium text-ios-secondary-label">Tasks</span>
            <CheckSquare className="w-4 h-4 text-ios-secondary-label" />
          </div>
          <div className="text-[28px] font-semibold text-ios-label tabular-nums leading-none my-1">
            {completedTasks} / {completedTasks + pendingTasks}
          </div>
          <span className="text-[12px] text-ios-secondary-label">Done / total</span>
        </div>

        {/* Evicted Count */}
        <div className="rounded-[20px] bg-ios-secondary-bg border border-ios-separator/50 p-5 shadow-ios-card flex flex-col justify-between h-full min-w-0">
          <div className="flex items-center justify-between text-ios-secondary-label mb-2">
            <span className="text-[13px] font-medium text-ios-secondary-label">Evicted</span>
            <Skull className="w-4 h-4 text-ios-secondary-label" />
          </div>
          <div className="text-[30px] font-semibold text-ios-label tabular-nums leading-none my-1">
            <CountUp to={evictedCount} duration={0.8} />
          </div>
          <span className="text-[12px] text-ios-secondary-label">Eliminated</span>
        </div>
      </div>

      {/* Team Points Single Accent Bar Chart (#0A84FF on #2C2C2E track, 8px high) */}
      <div className="rounded-[24px] bg-ios-secondary-bg border border-ios-separator/50 p-5 sm:p-6 shadow-ios-card min-w-0">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-ios-separator/50">
          <div>
            <h3 className="font-semibold text-[15px] text-ios-label">
              Team Score Distribution
            </h3>
            <p className="text-[12px] text-ios-secondary-label">
              Cumulative points across active members
            </p>
          </div>
          <span className="text-[13px] font-semibold text-ios-blue tabular-nums">
            {totalActivePoints.toLocaleString()} total points
          </span>
        </div>

        <div className="space-y-4">
          {teams.map((teamName) => {
            const teamPoints = teamAggregates[teamName] || 0;
            const percentage = Math.round((teamPoints / maxTeamPoints) * 100);
            const teamMemberCount = activeContestants.filter(
              (c) => c.team === teamName
            ).length;
            const isLeader = percentage === 100;

            return (
              <div key={teamName} className="space-y-1.5 text-[13px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 min-w-0 truncate">
                    <span className="font-medium text-ios-label truncate">{teamName}</span>
                    <span className="text-[12px] text-ios-secondary-label shrink-0">
                      ({teamMemberCount} members)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-[13px] shrink-0 ml-2">
                    <span className="font-semibold text-ios-label tabular-nums">
                      {teamPoints.toLocaleString()} pts
                    </span>
                    <span className="text-ios-secondary-label tabular-nums">
                      ({percentage}%)
                    </span>
                  </div>
                </div>

                {/* 8px high on #2C2C2E track, leader solid at 100%, others reduced opacity */}
                <div className="w-full bg-[#2C2C2E] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${Math.max(percentage, 4)}%`,
                      backgroundColor: '#0A84FF',
                      opacity: isLeader ? 1 : Math.max(0.35, percentage / 100),
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
