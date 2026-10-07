import React from 'react';
import { Activity, Radio, Shield, Crown, Zap, Skull, CheckCircle2, RotateCcw } from 'lucide-react';
import AnimatedList from './reactbits/AnimatedList';
import { useHouse } from '../context/HouseContext';

export default function ActivityFeed() {
  const { state } = useHouse();

  const getIcon = (type) => {
    switch (type) {
      case 'points':
      case 'points_deduct':
        return <Zap className="w-3.5 h-3.5 text-ios-blue" />;
      case 'captain':
        return <Crown className="w-3.5 h-3.5 text-ios-orange" />;
      case 'immunity':
        return <Shield className="w-3.5 h-3.5 text-ios-green" />;
      case 'danger':
        return <Activity className="w-3.5 h-3.5 text-ios-red" />;
      case 'eviction':
        return <Skull className="w-3.5 h-3.5 text-ios-red" />;
      case 'task':
      case 'task_complete':
        return <CheckCircle2 className="w-3.5 h-3.5 text-ios-green" />;
      case 'broadcast':
        return <Radio className="w-3.5 h-3.5 text-ios-blue" />;
      case 'restore':
        return <RotateCcw className="w-3.5 h-3.5 text-ios-blue" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-ios-secondary-label" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[28px] sm:text-[34px] font-bold tracking-tight text-ios-label">
          Activity Log
        </h1>
        <p className="text-[13px] text-ios-secondary-label font-medium mt-0.5">
          Audit trail of house actions, score adjustments, and nominations
        </p>
      </div>

      <div className="bg-ios-secondary-bg rounded-[20px] border border-ios-separator/50 overflow-hidden shadow-ios-card divide-y divide-ios-separator/50">
        <AnimatedList className="w-full">
          {state.activities.map((act) => (
            <div
              key={act.id}
              className="p-3.5 sm:p-4 flex items-center justify-between gap-3 text-[13px] hover:bg-ios-fill/20 transition-colors"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-7 h-7 rounded-full bg-ios-fill flex items-center justify-center shrink-0">
                  {getIcon(act.type)}
                </div>
                <span className="text-ios-label leading-tight truncate">
                  {act.text}
                </span>
              </div>

              <span className="shrink-0 text-[11px] text-ios-secondary-label tabular-nums">
                {new Date(act.timestamp).toLocaleTimeString([], {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </span>
            </div>
          ))}
        </AnimatedList>
      </div>
    </div>
  );
}
