import React, { useState } from 'react';
import { Radio, Send, Bell, History } from 'lucide-react';
import AnimatedList from './reactbits/AnimatedList';
import { useHouse } from '../context/HouseContext';

const PRESETS = [
  {
    label: 'Task Time',
    type: 'task',
    message: 'Big Boss: Task submission window is now OPEN! All tech contestants assemble in the main bay.',
  },
  {
    label: 'Nominations Open',
    type: 'nomination',
    message: 'Big Boss: Nominations for this week are officially open! Beware of the Danger Zone.',
  },
  {
    label: 'Eviction Warning',
    type: 'critical',
    message: 'Big Boss: Someone will be permanently evicted from the Tech House tonight!',
  },
  {
    label: 'Rules Violation',
    type: 'critical',
    message: 'Big Boss: Severe rule infraction detected in staging cluster! Penalties will be enforced.',
  },
  {
    label: 'Captaincy Challenge',
    type: 'general',
    message: 'Big Boss: Captaincy challenge is underway. The winner claims absolute House Immunity!',
  },
];

export default function AnnouncementsPanel() {
  const { state, broadcastAnnouncement } = useHouse();
  const [message, setMessage] = useState('');
  const [announcementType, setAnnouncementType] = useState('general');

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    broadcastAnnouncement(message.trim(), announcementType);
    setMessage('');
  };

  const handleSelectPreset = (preset) => {
    broadcastAnnouncement(preset.message, preset.type);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[34px] font-bold tracking-tight text-ios-label" style={{ letterSpacing: '-0.022em' }}>
          Announcements
        </h1>
        <p className="text-[17px] text-ios-secondary-label mt-1">
          Broadcast live commands to the Tech House
        </p>
      </div>

      {/* Broadcast Card */}
      <div className="glass-card p-5 sm:p-6">
        <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-ios-separator/50">
          <Bell className="w-5 h-5 text-ios-blue stroke-[2]" />
          <h3 className="font-semibold text-[17px] text-ios-label">
            Transmit House Directive
          </h3>
        </div>

        {/* Quick Presets */}
        <div className="mb-5">
          <p className="text-[13px] font-medium text-ios-secondary-label mb-2.5">
            Quick presets
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(p)}
                className="h-9 px-4 rounded-full bg-ios-fill hover:bg-ios-blue hover:text-white text-ios-label text-[13px] font-medium transition ios-pressable shadow-sm flex items-center justify-center shrink-0"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Broadcast Form */}
        <form onSubmit={handleBroadcast} className="space-y-3">
          <div className="flex flex-wrap sm:flex-nowrap gap-2.5">
            <input
              type="text"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type message to broadcast to all housemates..."
              className="flex-1 min-w-[220px] h-11 bg-ios-fill rounded-[12px] px-4 text-[17px] text-ios-label placeholder-ios-tertiary-label focus:outline-none focus:ring-2 focus:ring-ios-blue border-none"
            />

            <select
              value={announcementType}
              onChange={(e) => setAnnouncementType(e.target.value)}
              className="h-11 bg-ios-fill rounded-[12px] px-4 text-[15px] font-medium text-ios-label focus:outline-none focus:ring-2 focus:ring-ios-blue border-none shrink-0"
            >
              <option value="general">General</option>
              <option value="task">Task Challenge</option>
              <option value="nomination">Nomination</option>
              <option value="critical">Critical Directive</option>
            </select>

            <button
              type="submit"
              className="h-11 px-6 rounded-full bg-ios-blue hover:opacity-90 text-white font-semibold text-[17px] flex items-center justify-center space-x-2 transition ios-pressable shadow-sm shrink-0"
            >
              <Send className="w-4 h-4 stroke-[2]" />
              <span>Broadcast</span>
            </button>
          </div>
        </form>
      </div>

      {/* Broadcast History Log */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 px-1">
          <History className="w-4 h-4 text-ios-secondary-label stroke-[2]" />
          <h3 className="text-[15px] font-medium text-ios-secondary-label">
            Announcement log ({state.announcements.length})
          </h3>
        </div>

        <div className="glass-card p-0 overflow-hidden divide-y divide-ios-separator/50">
          <AnimatedList className="w-full">
            {state.announcements.map((ann) => {
              const isEviction = ann.type === 'eviction';
              const isNomination = ann.type === 'nomination';

              return (
                <div
                  key={ann.id}
                  className="p-4 flex items-start justify-between gap-3 hover:bg-ios-fill/20 transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[13px] font-semibold ${
                          isEviction
                            ? 'bg-ios-red/15 text-ios-red'
                            : isNomination
                            ? 'bg-ios-orange/15 text-ios-orange'
                            : 'bg-ios-blue/15 text-ios-blue'
                        }`}
                      >
                        {ann.type}
                      </span>
                      <span className="text-[13px] text-ios-secondary-label tabular-nums">
                        {new Date(ann.timestamp).toLocaleTimeString([], {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-[15px] sm:text-[17px] text-ios-label leading-snug pt-0.5">
                      {ann.message}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => broadcastAnnouncement(ann.message, ann.type)}
                    className="shrink-0 h-9 px-3.5 rounded-full text-[13px] font-semibold bg-ios-fill text-ios-secondary-label hover:text-ios-blue transition ios-pressable flex items-center justify-center"
                  >
                    Replay
                  </button>
                </div>
              );
            })}
          </AnimatedList>
        </div>
      </div>
    </div>
  );
}
