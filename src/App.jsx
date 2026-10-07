import React, { useState } from 'react';
import { HouseProvider } from './context/HouseContext';
import Header from './components/Header';
import { DesktopSidebar, MobileTabBar } from './components/Navigation';
import OverviewDashboard from './components/OverviewDashboard';
import LiveLeaderboard from './components/LiveLeaderboard';
import ContestantsGrid from './components/ContestantsGrid';
import DangerZone from './components/DangerZone';
import TaskManagement from './components/TaskManagement';
import AnnouncementsPanel from './components/AnnouncementsPanel';
import EvictedArchive from './components/EvictedArchive';
import ActivityFeed from './components/ActivityFeed';
import CinematicOverlay from './components/CinematicOverlay';
import ToastContainer from './components/ToastContainer';
import ParticlesBackground from './components/reactbits/ParticlesBackground';

function MainApp() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-ios-bg text-ios-label flex flex-col relative selection:bg-ios-blue/20 selection:text-ios-blue">
      {/* Apple Liquid Glass Ambient Wallpaper Layer */}
      <ParticlesBackground />

      {/* Persistent Floating iOS Top Navigation Bar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Layout: Max 1200px centred, page padding 24px desktop / 16px mobile, sidebar >=900px */}
      <div className="flex-1 max-w-[1200px] w-full mx-auto flex gap-6 px-4 md:px-6 pb-28 min-[900px]:pb-8 relative z-10 pt-3">
        {/* Desktop Floating Glass Sidebar (>=900px) */}
        <DesktopSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Primary Viewport */}
        <main className="flex-1 min-w-0">
          {activeTab === 'overview' && (
            <OverviewDashboard onNavigate={setActiveTab} />
          )}
          {activeTab === 'leaderboard' && <LiveLeaderboard />}
          {activeTab === 'contestants' && <ContestantsGrid />}
          {activeTab === 'danger' && <DangerZone />}
          {activeTab === 'tasks' && <TaskManagement />}
          {activeTab === 'announcements' && <AnnouncementsPanel />}
          {activeTab === 'evicted' && <EvictedArchive />}
          {activeTab === 'feed' && <ActivityFeed />}
        </main>
      </div>

      {/* iOS Floating Glass Bottom Tab Bar (<900px) */}
      <MobileTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Apple Live Activity / Announcement Overlay */}
      <CinematicOverlay />

      {/* iOS Notification Banners */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <HouseProvider>
      <MainApp />
    </HouseProvider>
  );
}
