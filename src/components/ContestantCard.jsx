import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Shield, AlertTriangle, Plus, Minus, Edit3, Trash2, ShieldCheck } from 'lucide-react';
import CountUp from './reactbits/CountUp';
import { useHouse } from '../context/HouseContext';

export default function ContestantCard({
  contestant,
  onEdit,
  onEvictPrompt,
}) {
  const {
    state,
    addPoints,
    deductPoints,
    assignCaptain,
    toggleNomination,
    toggleImmunity,
    removeContestant,
  } = useHouse();

  const [customInput, setCustomInput] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const floatingChange = state.floatingChanges[contestant.id];
  const isEvicted = contestant.status === 'evicted';
  const isImmune = contestant.status === 'immune';
  const isNominated = contestant.status === 'nominated';
  const isCaptain = contestant.isCaptain;

  const handleCustomPointSubmit = (e) => {
    e.preventDefault();
    const val = Number(customInput);
    if (!isNaN(val) && val > 0) {
      addPoints(contestant.id, val);
      setCustomInput('');
      setShowCustom(false);
    }
  };

  const handleCustomPointDeduct = (e) => {
    e.preventDefault();
    const val = Number(customInput);
    if (!isNaN(val) && val > 0) {
      deductPoints(contestant.id, val);
      setCustomInput('');
      setShowCustom(false);
    }
  };

  // SF-style status capsule badge
  const renderStatusBadge = () => {
    if (isEvicted) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-ios-fill text-ios-secondary-label">
          Evicted
        </span>
      );
    }
    if (isImmune) {
      return (
        <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-ios-green/15 text-ios-green">
          <ShieldCheck className="w-3 h-3 stroke-[2]" />
          <span>Immune</span>
        </span>
      );
    }
    if (isNominated) {
      return (
        <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-ios-red/15 text-ios-red">
          <AlertTriangle className="w-3 h-3 stroke-[2]" />
          <span>Nominated</span>
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-ios-blue/15 text-ios-blue">
        Active
      </span>
    );
  };

  return (
    <div
      className="relative rounded-[20px] bg-ios-secondary-bg border border-ios-separator/50 p-4 sm:p-5 flex flex-col justify-between shadow-ios-card transition-all min-w-0"
    >
      {/* Floating score change pill */}
      <AnimatePresence>
        {floatingChange && (
          <motion.div
            key={floatingChange.key}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: -20, scale: 1.05 }}
            exit={{ opacity: 0, y: -32 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`absolute top-4 right-4 z-20 text-[12px] font-bold px-2.5 py-0.5 rounded-full shadow-md pointer-events-none tabular-nums ${
              floatingChange.type === 'positive'
                ? 'bg-ios-green text-white'
                : 'bg-ios-red text-white'
            }`}
          >
            {floatingChange.amount}
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        {/* Top Profile Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center space-x-3 min-w-0">
            {/* Circular Avatar with Gradient Initials */}
            <div className="relative shrink-0">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${
                  contestant.avatarColor || 'from-blue-500 to-indigo-600'
                } text-white font-semibold text-[16px] shadow-sm`}
              >
                {contestant.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>

              {isCaptain && (
                <div
                  className="absolute -top-1 -right-1 bg-ios-orange text-white p-1 rounded-full shadow"
                  title="House Captain"
                >
                  <Crown className="w-3 h-3 stroke-[2.5]" />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-ios-label text-[16px] leading-tight truncate">
                {contestant.name}
              </h3>
              <p className="text-[13px] text-ios-blue font-medium mt-0.5 truncate">
                {contestant.team}
              </p>
              <p className="text-[12px] text-ios-secondary-label truncate">
                {contestant.role || 'Contestant'}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-1 shrink-0">
            {renderStatusBadge()}
            {isCaptain && (
              <span className="text-[10px] font-semibold text-ios-orange">
                Captain
              </span>
            )}
          </div>
        </div>

        {/* Bio quote if available */}
        {contestant.bio && (
          <p className="text-[12px] text-ios-secondary-label italic mb-3 line-clamp-1 border-l-2 border-ios-separator pl-2">
            "{contestant.bio}"
          </p>
        )}

        {/* Score Row */}
        <div className="flex items-center justify-between p-3 rounded-[14px] bg-ios-fill/50 mb-3 min-w-0">
          <span className="text-[12px] font-medium text-ios-secondary-label">
            Total score
          </span>
          <div className="flex items-baseline space-x-1 shrink-0">
            <CountUp
              to={contestant.points}
              duration={0.7}
              className="text-2xl font-bold text-ios-label tracking-tight tabular-nums"
            />
            <span className="text-[12px] font-medium text-ios-secondary-label">pts</span>
          </div>
        </div>

        {/* Quick Points Buttons (Feature 4) */}
        {!isEvicted && (
          <div className="space-y-1.5 mb-3 min-w-0">
            <div className="flex items-center justify-between text-[11px] text-ios-secondary-label font-medium">
              <span>Quick points</span>
              <button
                type="button"
                onClick={() => setShowCustom(!showCustom)}
                className="text-ios-blue hover:underline"
              >
                {showCustom ? 'Close' : 'Custom +/-'}
              </button>
            </div>

            <div className="grid grid-cols-4 gap-1.5 min-w-0">
              <button
                type="button"
                onClick={() => addPoints(contestant.id, 10)}
                className="py-1.5 rounded-full bg-ios-green/15 text-ios-green text-[12px] font-semibold ios-pressable flex items-center justify-center space-x-0.5 truncate"
                title="Add 10 points"
              >
                <Plus className="w-3 h-3 stroke-[2.5]" />
                <span>10</span>
              </button>

              <button
                type="button"
                onClick={() => addPoints(contestant.id, 50)}
                className="py-1.5 rounded-full bg-ios-green/15 text-ios-green text-[12px] font-semibold ios-pressable flex items-center justify-center space-x-0.5 truncate"
                title="Add 50 points"
              >
                <Plus className="w-3 h-3 stroke-[2.5]" />
                <span>50</span>
              </button>

              <button
                type="button"
                onClick={() => deductPoints(contestant.id, 10)}
                disabled={contestant.points <= 0}
                className="py-1.5 rounded-full bg-ios-red/15 text-ios-red text-[12px] font-semibold ios-pressable flex items-center justify-center space-x-0.5 disabled:opacity-30 truncate"
                title="Deduct 10 points"
              >
                <Minus className="w-3 h-3 stroke-[2.5]" />
                <span>10</span>
              </button>

              <button
                type="button"
                onClick={() => deductPoints(contestant.id, 50)}
                disabled={contestant.points <= 0}
                className="py-1.5 rounded-full bg-ios-red/15 text-ios-red text-[12px] font-semibold ios-pressable flex items-center justify-center space-x-0.5 disabled:opacity-30 truncate"
                title="Deduct 50 points"
              >
                <Minus className="w-3 h-3 stroke-[2.5]" />
                <span>50</span>
              </button>
            </div>

            {/* Custom point form */}
            {showCustom && (
              <div className="p-2 rounded-[14px] bg-ios-fill/70 mt-1 flex flex-wrap sm:flex-nowrap items-center gap-1.5">
                <input
                  type="number"
                  min="1"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Amount"
                  className="flex-1 min-w-[70px] bg-ios-secondary-bg rounded-lg px-2.5 py-1.5 text-[13px] text-ios-label focus:outline-none focus:ring-2 focus:ring-ios-blue border-none tabular-nums"
                />
                <button
                  type="button"
                  onClick={handleCustomPointSubmit}
                  className="px-3 py-1.5 bg-ios-green text-white text-[12px] font-semibold rounded-lg ios-pressable shrink-0"
                >
                  +Add
                </button>
                <button
                  type="button"
                  onClick={handleCustomPointDeduct}
                  className="px-3 py-1.5 bg-ios-red text-white text-[12px] font-semibold rounded-lg ios-pressable shrink-0"
                >
                  -Sub
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* House Actions Row */}
      <div className="pt-2.5 border-t border-ios-separator/60 space-y-2">
        {!isEvicted ? (
          <div className="grid grid-cols-3 gap-1.5 text-[12px]">
            {/* Captaincy Toggle (Feature 5) */}
            <button
              type="button"
              onClick={() => assignCaptain(contestant.id)}
              className={`py-2 px-1 rounded-xl flex items-center justify-center space-x-1 font-semibold transition ios-pressable ${
                isCaptain
                  ? 'bg-ios-orange text-white shadow-sm'
                  : 'bg-ios-orange/15 text-ios-orange'
              }`}
              title={isCaptain ? 'Relinquish Captaincy' : 'Crown as Captain'}
            >
              <Crown className="w-3.5 h-3.5 stroke-[2]" />
              <span className="truncate">{isCaptain ? 'Captain' : 'Make Cap'}</span>
            </button>

            {/* Immunity Toggle (Feature 7) */}
            <button
              type="button"
              onClick={() => toggleImmunity(contestant.id)}
              className={`py-2 px-1 rounded-xl flex items-center justify-center space-x-1 font-semibold transition ios-pressable ${
                isImmune
                  ? 'bg-ios-green text-white shadow-sm'
                  : 'bg-ios-green/15 text-ios-green'
              }`}
              title={isImmune ? 'Revoke Immunity' : 'Grant Immunity (Clears Nominations)'}
            >
              <Shield className="w-3.5 h-3.5 stroke-[2]" />
              <span className="truncate">{isImmune ? 'Immune' : 'Immunity'}</span>
            </button>

            {/* Nomination Toggle (Feature 6 & 7 rule) */}
            <button
              type="button"
              onClick={() => toggleNomination(contestant.id)}
              disabled={isImmune}
              className={`py-2 px-1 rounded-xl flex items-center justify-center space-x-1 font-semibold transition ios-pressable ${
                isImmune
                  ? 'bg-ios-fill/50 text-ios-tertiary-label cursor-not-allowed opacity-50'
                  : isNominated
                  ? 'bg-ios-red text-white shadow-sm'
                  : 'bg-ios-red/15 text-ios-red'
              }`}
              title={
                isImmune
                  ? 'CANNOT NOMINATE: Contestant is Immune'
                  : isNominated
                  ? 'Remove nomination'
                  : 'Nominate for eviction'
              }
            >
              <AlertTriangle className="w-3.5 h-3.5 stroke-[2]" />
              <span className="truncate">
                {isImmune ? 'Locked' : isNominated ? 'Nom’d' : 'Nominate'}
              </span>
            </button>
          </div>
        ) : (
          <div className="p-2 text-center text-[12px] font-medium text-ios-secondary-label bg-ios-fill/50 rounded-xl">
            Contestant Evicted from House
          </div>
        )}

        {/* Card Management Controls: Edit, Remove, Evict */}
        <div className="flex items-center justify-between text-[12px] text-ios-secondary-label pt-1">
          <div className="flex items-center space-x-3">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(contestant)}
                className="flex items-center space-x-1 text-ios-blue hover:opacity-80 transition font-medium"
              >
                <Edit3 className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>Edit</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => removeContestant(contestant.id)}
              className="flex items-center space-x-1 text-ios-secondary-label hover:text-ios-red transition"
            >
              <Trash2 className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>Remove</span>
            </button>
          </div>

          {!isEvicted && isNominated && onEvictPrompt && (
            <button
              type="button"
              onClick={() => onEvictPrompt(contestant)}
              className="px-3 py-1 rounded-full bg-ios-red text-white font-semibold text-[11px] ios-pressable shadow-sm"
            >
              Evict Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
