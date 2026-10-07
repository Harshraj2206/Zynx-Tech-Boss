import React, { useState } from 'react';
import { UserPlus, Search } from 'lucide-react';
import ContestantCard from './ContestantCard';
import ContestantModal from './ContestantModal';
import EvictionModal from './EvictionModal';
import { useHouse } from '../context/HouseContext';

export default function ContestantsGrid() {
  const { state } = useHouse();

  const [selectedTeam, setSelectedTeam] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [contestantToEdit, setContestantToEdit] = useState(null);
  const [contestantToEvict, setContestantToEvict] = useState(null);

  const activeContestants = state.contestants.filter((c) => c.status !== 'evicted');

  const filteredContestants = activeContestants.filter((c) => {
    const matchesTeam = selectedTeam === 'ALL' || c.team === selectedTeam;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.role && c.role.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.team.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTeam && matchesSearch;
  });

  const teams = ['ALL', 'Team Frontend', 'Team Backend', 'Team DevOps', 'Team AI'];

  return (
    <div className="space-y-6">
      {/* iOS Large Title Header & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[28px] sm:text-[34px] font-bold tracking-tight text-ios-label">
            Contestants
          </h1>
          <p className="text-[13px] text-ios-secondary-label font-medium mt-0.5">
            Manage house roster, captaincy, and scores
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setContestantToEdit(null);
            setIsAddModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-full bg-ios-blue text-white font-semibold text-[14px] flex items-center justify-center space-x-1.5 transition ios-pressable shadow-sm self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4 stroke-[2.5]" />
          <span>Enroll Contestant</span>
        </button>
      </div>

      {/* Filter Segmented Control & Search Input */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* iOS Team Filter Pills */}
        <div className="inline-flex p-1 rounded-full bg-ios-fill/70 backdrop-blur-md overflow-x-auto scrollbar-none">
          {teams.map((team) => (
            <button
              key={team}
              onClick={() => setSelectedTeam(team)}
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition ${
                selectedTeam === team
                  ? 'bg-ios-secondary-bg text-ios-label shadow-sm'
                  : 'text-ios-secondary-label hover:text-ios-label'
              }`}
            >
              {team}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-ios-secondary-label stroke-[2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contestant or role..."
            className="w-full bg-ios-fill rounded-full pl-10 pr-4 py-2 text-[14px] text-ios-label placeholder-ios-tertiary-label focus:outline-none focus:ring-2 focus:ring-ios-blue border-none"
          />
        </div>
      </div>

      {/* Contestants Grid (10 seeded) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredContestants.map((contestant) => (
          <ContestantCard
            key={contestant.id}
            contestant={contestant}
            onEdit={(c) => {
              setContestantToEdit(c);
              setIsAddModalOpen(true);
            }}
            onEvictPrompt={(c) => setContestantToEvict(c)}
          />
        ))}
      </div>

      {filteredContestants.length === 0 && (
        <div className="p-12 text-center rounded-[20px] bg-ios-secondary-bg border border-ios-separator/50 text-ios-secondary-label">
          <p className="text-[14px]">No contestants found matching your criteria.</p>
        </div>
      )}

      {/* Add / Edit Modal */}
      <ContestantModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setContestantToEdit(null);
        }}
        contestantToEdit={contestantToEdit}
      />

      {/* Eviction confirmation action sheet */}
      <EvictionModal
        isOpen={!!contestantToEvict}
        onClose={() => setContestantToEvict(null)}
        contestant={contestantToEvict}
      />
    </div>
  );
}
