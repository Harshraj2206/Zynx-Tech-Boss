import React, { useState } from 'react';
import {
  LayoutDashboard,
  Trophy,
  Users,
  AlertTriangle,
  CheckSquare,
  Radio,
  Skull,
  Activity,
  MoreHorizontal,
  X
} from 'lucide-react';
import { useHouse } from '../context/HouseContext';

export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'contestants', label: 'Contestants', icon: Users },
  { id: 'danger', label: 'Danger Zone', icon: AlertTriangle, isDanger: true },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'announcements', label: 'Announcements', icon: Radio },
  { id: 'evicted', label: 'Evicted', icon: Skull },
  { id: 'feed', label: 'Activity Log', icon: Activity },
];

export function DesktopSidebar({ activeTab, setActiveTab }) {
  const { nominatedCount, state } = useHouse();
  const activeCount = state.contestants.filter((c) => c.status !== 'evicted').length;
  const evictedCount = state.contestants.filter((c) => c.status === 'evicted').length;

  return (
    <aside className="hidden min-[900px]:flex flex-col w-[260px] shrink-0 glass rounded-[28px] p-3 sticky top-[80px] self-start max-h-[calc(100vh-96px)] overflow-y-auto">
      <div className="px-3.5 py-2 text-[13px] font-semibold text-ios-secondary-label">
        Menu
      </div>

      <nav className="space-y-1 mt-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          let badge = null;
          if (item.id === 'danger' && nominatedCount > 0) badge = nominatedCount;
          if (item.id === 'contestants') badge = activeCount;
          if (item.id === 'evicted' && evictedCount > 0) badge = evictedCount;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full h-12 min-h-[48px] px-3.5 rounded-[14px] flex items-center justify-between text-[17px] font-medium transition ios-pressable ${
                isActive
                  ? 'bg-ios-blue text-white shadow-sm font-semibold'
                  : 'text-ios-label hover:bg-ios-fill/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-5 h-5 stroke-[1.75] ${
                    isActive
                      ? 'text-white'
                      : item.isDanger
                      ? 'text-ios-red'
                      : 'text-ios-blue'
                  }`}
                />
                <span className="leading-tight">{item.label}</span>
              </div>

              {badge !== null && (
                <span
                  className={`min-w-[22px] h-[22px] px-2 rounded-full text-[13px] font-semibold tabular-nums flex items-center justify-center ${
                    isActive
                      ? 'bg-white/25 text-white'
                      : item.isDanger
                      ? 'bg-ios-red text-white'
                      : 'bg-ios-fill text-ios-secondary-label'
                  }`}
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export function MobileTabBar({ activeTab, setActiveTab }) {
  const { nominatedCount } = useHouse();
  const [showMoreSheet, setShowMoreSheet] = useState(false);

  // Primary 4 tabs + More (5 tabs total)
  const primaryTabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'leaderboard', label: 'Ranks', icon: Trophy },
    { id: 'contestants', label: 'House', icon: Users },
    { id: 'danger', label: 'Danger', icon: AlertTriangle, badge: nominatedCount },
  ];

  const moreTabs = [
    { id: 'tasks', label: 'Tasks & Timer', icon: CheckSquare },
    { id: 'announcements', label: 'Announcements', icon: Radio },
    { id: 'evicted', label: 'Evicted Archive', icon: Skull },
    { id: 'feed', label: 'Activity Log', icon: Activity },
  ];

  const isMoreActive = moreTabs.some((t) => t.id === activeTab);

  return (
    <>
      {/* iOS Floating Glass Bottom Tab Bar (Below 900px, 5 tabs, 24px icons, 10px labels) */}
      <nav className="min-[900px]:hidden fixed bottom-3 left-3 right-3 z-40 max-w-[500px] mx-auto h-[58px] glass rounded-[28px] px-2 flex items-center justify-around shadow-2xl safe-area-pb">
        <div className="flex items-center justify-around w-full h-full">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-col items-center justify-center flex-1 h-full min-w-[44px] ios-pressable transition ${
                  isActive ? 'text-ios-blue font-semibold' : 'text-ios-secondary-label'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                  {tab.badge > 0 && (
                    <span className="absolute -top-1 -right-2 px-1.5 min-w-[16px] h-4 rounded-full text-[10px] font-bold bg-ios-red text-white flex items-center justify-center tabular-nums">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight font-medium leading-none">
                  {tab.label}
                </span>
              </button>
            );
          })}

          {/* More Tab */}
          <button
            onClick={() => setShowMoreSheet(true)}
            className={`flex flex-col items-center justify-center flex-1 h-full min-w-[44px] ios-pressable transition ${
              isMoreActive ? 'text-ios-blue font-semibold' : 'text-ios-secondary-label'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <MoreHorizontal className="w-6 h-6 stroke-[1.75]" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-medium leading-none">
              More
            </span>
          </button>
        </div>
      </nav>

      {/* iOS "More" Bottom Sheet (Radius 28px top, grabber, spring slide-up) */}
      {showMoreSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg glass rounded-t-[28px] border-t border-ios-separator/40 p-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Grabber handle */}
            <div className="ios-grabber" />

            <div className="flex items-center justify-between pb-3 mb-2 border-b border-ios-separator/60">
              <h3 className="font-semibold text-[17px] text-ios-label">
                More Controls
              </h3>
              <button
                onClick={() => setShowMoreSheet(false)}
                className="w-8 h-8 rounded-full bg-ios-fill flex items-center justify-center text-ios-secondary-label hover:text-ios-label ios-pressable"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              {moreTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setShowMoreSheet(false);
                    }}
                    className={`w-full min-h-[44px] flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-[17px] transition ios-pressable ${
                      isActive
                        ? 'bg-ios-blue text-white font-semibold'
                        : 'text-ios-label hover:bg-ios-fill/50'
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
