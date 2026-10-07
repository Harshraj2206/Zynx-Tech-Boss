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
    <aside className="hidden lg:flex flex-col w-64 shrink-0 p-4 border-r border-ios-separator/50 ios-blur h-[calc(100vh-3.5rem)] sticky top-14 self-start overflow-y-auto">
      <div className="px-3 py-2 text-[13px] font-medium text-ios-secondary-label">
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
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[15px] font-medium transition ios-pressable ${
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
                <span>{item.label}</span>
              </div>

              {badge !== null && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[12px] font-semibold tabular-nums ${
                    isActive
                      ? 'bg-white/20 text-white'
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

  // Primary 4 tabs + More
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
      {/* iOS Bottom Tab Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-ios-separator/60 ios-blur px-2 py-1 safe-area-pb">
        <div className="flex items-center justify-around h-12">
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
                <div className="relative">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                  {tab.badge > 0 && (
                    <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-ios-red text-white">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-0.5">{tab.label}</span>
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
            <MoreHorizontal className="w-5 h-5 stroke-[1.75]" />
            <span className="text-[10px] mt-0.5">More</span>
          </button>
        </div>
      </nav>

      {/* iOS "More" Bottom Sheet */}
      {showMoreSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-ios-sheet-bg rounded-t-[32px] border-t border-ios-separator/40 p-5 shadow-ios-sheet animate-in slide-in-from-bottom duration-300">
            {/* Grabber handle */}
            <div className="ios-grabber" />

            <div className="flex items-center justify-between pb-3 mb-2 border-b border-ios-separator/60">
              <h3 className="font-semibold text-[17px] text-ios-label">
                More Controls
              </h3>
              <button
                onClick={() => setShowMoreSheet(false)}
                className="w-7 h-7 rounded-full bg-ios-fill flex items-center justify-center text-ios-secondary-label"
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
                    className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-[16px] transition ios-pressable ${
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
