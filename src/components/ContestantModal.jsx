import React, { useState, useEffect } from 'react';
import { X, UserPlus, Save } from 'lucide-react';
import { useHouse } from '../context/HouseContext';

const DEFAULT_TEAMS = ['Team Frontend', 'Team Backend', 'Team DevOps', 'Team AI'];

export default function ContestantModal({ isOpen, onClose, contestantToEdit = null }) {
  const { addContestant, updateContestant } = useHouse();

  const [name, setName] = useState('');
  const [team, setTeam] = useState(DEFAULT_TEAMS[0]);
  const [points, setPointsInput] = useState('100');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (contestantToEdit) {
      setName(contestantToEdit.name);
      setTeam(contestantToEdit.team);
      setPointsInput(String(contestantToEdit.points));
      setRole(contestantToEdit.role || '');
      setBio(contestantToEdit.bio || '');
    } else {
      setName('');
      setTeam(DEFAULT_TEAMS[0]);
      setPointsInput('100');
      setRole('');
      setBio('');
    }
  }, [contestantToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (contestantToEdit) {
      updateContestant(contestantToEdit.id, {
        name: name.trim(),
        team,
        points: Math.max(0, Number(points) || 0),
        role: role.trim(),
        bio: bio.trim(),
      });
    } else {
      addContestant({
        name: name.trim(),
        team,
        points: Math.max(0, Number(points) || 100),
        role: role.trim(),
        bio: bio.trim(),
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-ios-sheet-bg rounded-t-[32px] sm:rounded-[28px] p-6 shadow-ios-modal border border-ios-separator/40 animate-in slide-in-from-bottom duration-300">
        {/* iOS Grabber handle */}
        <div className="ios-grabber" />

        <div className="flex items-center justify-between pb-3 border-b border-ios-separator/60">
          <div className="flex items-center space-x-2">
            <h3 className="text-[17px] font-semibold text-ios-label">
              {contestantToEdit ? 'Edit Contestant Profile' : 'Enroll New Contestant'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-ios-fill flex items-center justify-center text-ios-secondary-label hover:text-ios-label ios-pressable"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-[14px]">
          <div>
            <label className="block text-[12px] font-medium text-ios-secondary-label mb-1">
              Contestant name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Linus Rustov"
              className="w-full bg-ios-fill rounded-xl px-3.5 py-2.5 text-ios-label placeholder-ios-tertiary-label focus:outline-none focus:ring-2 focus:ring-ios-blue border-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-ios-secondary-label mb-1">
                House team
              </label>
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="w-full bg-ios-fill rounded-xl px-3.5 py-2.5 text-ios-label focus:outline-none focus:ring-2 focus:ring-ios-blue border-none"
              >
                {DEFAULT_TEAMS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-ios-secondary-label mb-1">
                Points (score)
              </label>
              <input
                type="number"
                min="0"
                value={points}
                onChange={(e) => setPointsInput(e.target.value)}
                className="w-full bg-ios-fill rounded-xl px-3.5 py-2.5 text-ios-label focus:outline-none focus:ring-2 focus:ring-ios-blue border-none tabular-nums"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-ios-secondary-label mb-1">
              Tech role / specialty
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Kernel Architect, Full Stack Ninja"
              className="w-full bg-ios-fill rounded-xl px-3.5 py-2.5 text-ios-label placeholder-ios-tertiary-label focus:outline-none focus:ring-2 focus:ring-ios-blue border-none"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-ios-secondary-label mb-1">
              Catchphrase / bio
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="e.g. Compiles from memory, never breaks prod."
              className="w-full bg-ios-fill rounded-xl px-3.5 py-2.5 text-ios-label placeholder-ios-tertiary-label focus:outline-none focus:ring-2 focus:ring-ios-blue border-none resize-none"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t border-ios-separator/60">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full text-ios-secondary-label hover:bg-ios-fill font-medium transition ios-pressable"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-ios-blue hover:opacity-90 text-white font-semibold transition ios-pressable shadow-sm"
            >
              {contestantToEdit ? 'Save Changes' : 'Enroll Contestant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
