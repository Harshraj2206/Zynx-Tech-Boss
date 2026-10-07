import React, { useState } from 'react';
import { Plus, Users, User, Trash2, Check, X } from 'lucide-react';
import TaskTimer from './TaskTimer';
import { useHouse } from '../context/HouseContext';

export default function TaskManagement() {
  const { state, completeTask, deleteTask, createTask } = useHouse();

  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('ALL');
  const [points, setPoints] = useState('50');

  const activeContestants = state.contestants.filter((c) => c.status !== 'evicted');

  const filteredTasks = state.tasks.filter((t) => {
    if (filter === 'pending') return t.status === 'pending';
    if (filter === 'completed') return t.status === 'completed';
    return true;
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTask({
      title: title.trim(),
      description: description.trim(),
      assignedTo,
      points: Number(points) || 50,
    });

    setTitle('');
    setDescription('');
    setAssignedTo('ALL');
    setPoints('50');
    setShowCreateModal(false);
  };

  const getAssigneeInfo = (assignedId) => {
    if (assignedId === 'ALL') {
      return {
        label: 'All Contestants',
        isAll: true,
      };
    }
    const c = state.contestants.find((item) => item.id === assignedId);
    return {
      label: c ? c.name : 'Unknown',
      team: c ? c.team : '',
      isAll: false,
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[28px] sm:text-[34px] font-bold tracking-tight text-ios-label">
            Tasks & Timer
          </h1>
          <p className="text-[13px] text-ios-secondary-label font-medium mt-0.5">
            Dispatch challenges and monitor active task timers
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-full bg-ios-blue text-white font-semibold text-[14px] flex items-center justify-center space-x-1.5 transition ios-pressable shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Task</span>
        </button>
      </div>

      {/* Apple Clock Timer */}
      <TaskTimer />

      {/* iOS Segmented Control for Task Filters */}
      <div className="flex items-center justify-between">
        <div className="inline-flex p-1 rounded-full bg-ios-fill/70 backdrop-blur-md">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition ${
              filter === 'all'
                ? 'bg-ios-secondary-bg text-ios-label shadow-sm'
                : 'text-ios-secondary-label hover:text-ios-label'
            }`}
          >
            All ({state.tasks.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition ${
              filter === 'pending'
                ? 'bg-ios-secondary-bg text-ios-label shadow-sm'
                : 'text-ios-secondary-label hover:text-ios-label'
            }`}
          >
            Pending ({state.tasks.filter((t) => t.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition ${
              filter === 'completed'
                ? 'bg-ios-secondary-bg text-ios-label shadow-sm'
                : 'text-ios-secondary-label hover:text-ios-label'
            }`}
          >
            Completed ({state.tasks.filter((t) => t.status === 'completed').length})
          </button>
        </div>

        <span className="text-[12px] text-ios-secondary-label font-medium hidden sm:inline">
          {filteredTasks.length} tasks listed
        </span>
      </div>

      {/* Inset Grouped Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => {
          const assignee = getAssigneeInfo(task.assignedTo);
          const isPending = task.status === 'pending';

          return (
            <div
              key={task.id}
              className={`rounded-[20px] bg-ios-secondary-bg border border-ios-separator/50 p-4 sm:p-5 flex flex-col justify-between shadow-ios-card transition-all ${
                !isPending ? 'opacity-85' : ''
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-ios-blue/15 text-ios-blue tabular-nums">
                    +{task.points} pts reward
                  </span>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold shrink-0 ${
                      isPending
                        ? 'bg-ios-orange/15 text-ios-orange'
                        : 'bg-ios-green/15 text-ios-green'
                    }`}
                  >
                    {isPending ? 'Pending' : 'Completed'}
                  </span>
                </div>

                <h3 className="font-semibold text-ios-label text-[16px] mb-1 leading-snug break-words">
                  {task.title}
                </h3>

                <p className="text-[13px] text-ios-secondary-label mb-3 line-clamp-2">
                  {task.description}
                </p>

                <div className="p-2.5 rounded-[14px] bg-ios-fill/50 flex items-center justify-between text-[12px] mb-3">
                  <div className="flex items-center space-x-2">
                    {assignee.isAll ? (
                      <Users className="w-3.5 h-3.5 text-ios-blue stroke-[2]" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-ios-orange stroke-[2]" />
                    )}
                    <span className="font-medium text-ios-label">{assignee.label}</span>
                  </div>
                  {assignee.team && (
                    <span className="text-[11px] text-ios-secondary-label font-medium">
                      {assignee.team}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-ios-separator/50 flex items-center justify-between gap-2">
                {isPending ? (
                  <button
                    type="button"
                    onClick={() => completeTask(task.id)}
                    className="flex-1 py-2 px-3 rounded-full bg-ios-green text-white font-semibold text-[13px] transition ios-pressable flex items-center justify-center space-x-1.5 shadow-sm"
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Complete</span>
                  </button>
                ) : (
                  <div className="flex-1 py-2 px-3 rounded-full bg-ios-green/15 text-ios-green font-semibold text-[13px] flex items-center justify-center space-x-1">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Points Awarded</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  className="w-8 h-8 rounded-full bg-ios-fill text-ios-secondary-label hover:text-ios-red flex items-center justify-center ios-pressable"
                  title="Delete Task"
                >
                  <Trash2 className="w-3.5 h-3.5 stroke-[1.75]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Task iOS Bottom Sheet */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-ios-sheet-bg rounded-t-[32px] sm:rounded-[28px] p-6 shadow-ios-modal border border-ios-separator/40 animate-in slide-in-from-bottom duration-300">
            <div className="ios-grabber" />

            <div className="flex items-center justify-between pb-3 border-b border-ios-separator/60 mb-4">
              <h3 className="text-[17px] font-semibold text-ios-label">
                Assign New Task
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-7 h-7 rounded-full bg-ios-fill flex items-center justify-center text-ios-secondary-label hover:text-ios-label ios-pressable"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-[14px]">
              <div>
                <label className="block text-[12px] font-medium text-ios-secondary-label mb-1">
                  Task title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Hotfix Production Race Condition"
                  className="w-full bg-ios-fill rounded-xl px-3.5 py-2.5 text-ios-label placeholder-ios-tertiary-label focus:outline-none focus:ring-2 focus:ring-ios-blue border-none"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-ios-secondary-label mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details of the challenge..."
                  className="w-full bg-ios-fill rounded-xl px-3.5 py-2.5 text-ios-label placeholder-ios-tertiary-label focus:outline-none focus:ring-2 focus:ring-ios-blue border-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-ios-secondary-label mb-1">
                    Assign to
                  </label>
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full bg-ios-fill rounded-xl px-3.5 py-2.5 text-ios-label focus:outline-none focus:ring-2 focus:ring-ios-blue border-none"
                  >
                    <option value="ALL">All Contestants</option>
                    {activeContestants.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.team})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-ios-secondary-label mb-1">
                    Reward (pts)
                  </label>
                  <input
                    type="number"
                    min="5"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    className="w-full bg-ios-fill rounded-xl px-3.5 py-2.5 text-ios-label focus:outline-none focus:ring-2 focus:ring-ios-blue border-none tabular-nums"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-ios-separator/60">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-full text-ios-secondary-label font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-ios-blue text-white font-semibold transition ios-pressable shadow-sm"
                >
                  Dispatch Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
