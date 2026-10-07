import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

const STORAGE_KEY = 'tech_boss_command_center_v1';

export const SEED_CONTESTANTS = [
  {
    id: 'c-1',
    name: 'Linus Rustov',
    team: 'Team Backend',
    points: 260,
    status: 'immune',
    isCaptain: false,
    role: 'Kernel Architect',
    bio: 'Refuses garbage collection. Compiles everything from memory.',
    avatarColor: 'from-blue-600 to-indigo-800',
  },
  {
    id: 'c-2',
    name: 'Ada Script',
    team: 'Team Frontend',
    points: 245,
    status: 'active',
    isCaptain: true,
    role: 'CSS Sorceress',
    bio: 'Centers divs on the first try. Uncontested House Captain.',
    avatarColor: 'from-amber-500 to-rose-600',
  },
  {
    id: 'c-3',
    name: 'DevOps Dave',
    team: 'Team DevOps',
    points: 190,
    status: 'nominated',
    isCaptain: false,
    role: 'Kube Wrangle Master',
    bio: 'Runs in privileged mode. Accidentally brought down staging once.',
    avatarColor: 'from-red-500 to-orange-700',
  },
  {
    id: 'c-4',
    name: 'Satoshi Kernel',
    team: 'Team Backend',
    points: 210,
    status: 'active',
    isCaptain: false,
    role: 'Distributed Consensus',
    bio: 'Identity unknown. Verifies proofs before talking to housemates.',
    avatarColor: 'from-emerald-500 to-teal-800',
  },
  {
    id: 'c-5',
    name: 'Grace Hopper Jr.',
    team: 'Team AI',
    points: 285,
    status: 'active',
    isCaptain: false,
    role: 'Compiler Pioneer',
    bio: 'Finds literal bugs in the wiring. Current top scorer.',
    avatarColor: 'from-purple-500 to-indigo-700',
  },
  {
    id: 'c-6',
    name: 'Kube Jenkins',
    team: 'Team DevOps',
    points: 120,
    status: 'nominated',
    isCaptain: false,
    role: 'CI/CD Pipeline Whisperer',
    bio: 'Always building, frequently failing. In critical danger this week.',
    avatarColor: 'from-yellow-600 to-red-600',
  },
  {
    id: 'c-7',
    name: 'Prompt Priya',
    team: 'Team AI',
    points: 175,
    status: 'active',
    isCaptain: false,
    role: 'Neural Prompt Engineer',
    bio: 'Speaks only in system prompts. Zero hallucination tolerance.',
    avatarColor: 'from-cyan-500 to-blue-700',
  },
  {
    id: 'c-8',
    name: 'Async Alex',
    team: 'Team Frontend',
    points: 95,
    status: 'active',
    isCaptain: false,
    role: 'Event Loop Navigator',
    bio: 'Always awaits, never resolves immediately.',
    avatarColor: 'from-fuchsia-500 to-pink-700',
  },
  {
    id: 'c-9',
    name: 'CSS Charlie',
    team: 'Team Frontend',
    points: 140,
    status: 'active',
    isCaptain: false,
    role: 'Responsive Designer',
    bio: 'Obsessed with micro-interactions and smooth 120fps physics.',
    avatarColor: 'from-sky-400 to-cyan-700',
  },
  {
    id: 'c-10',
    name: 'Mongo Mike',
    team: 'Team Backend',
    points: 80,
    status: 'active',
    isCaptain: false,
    role: 'NoSQL Schemaless Rebel',
    bio: 'Rejects relations. Store first, query later.',
    avatarColor: 'from-teal-400 to-emerald-700',
  },
];

export const SEED_TASKS = [
  {
    id: 'task-1',
    title: 'Hotfix Production Race Condition',
    description: 'Resolve deadlocks in payment webhook workers before market opens.',
    assignedTo: 'ALL',
    points: 50,
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-2',
    title: 'Automate Zero-Downtime Deployment',
    description: 'Set up canary deployments and rolling rollback triggers.',
    assignedTo: 'c-3',
    points: 80,
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-3',
    title: 'Fine-Tune Local LLM On House Rules',
    description: 'Train 7B model to automatically detect house rule infractions.',
    assignedTo: 'c-5',
    points: 60,
    status: 'completed',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    completedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
];

export const SEED_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    message: 'BIG BOSS: Welcome to Season 1 of Tech House. All systems are online!',
    timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
    type: 'general',
  },
  {
    id: 'ann-2',
    message: 'CAPTAINCY ALERT: Ada Script has been crowned the House Captain after conquering the CSS Grid Challenge!',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    type: 'general',
  },
  {
    id: 'ann-3',
    message: 'NOMINATIONS OPEN: DevOps Dave and Kube Jenkins have entered the Danger Zone!',
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
    type: 'nomination',
  },
];

export const SEED_ACTIVITIES = [
  {
    id: 'act-1',
    text: 'Ada Script appointed House Captain.',
    type: 'captain',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'act-2',
    text: 'Grace Hopper Jr. completed task "Fine-Tune Local LLM" (+60 pts).',
    type: 'task',
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: 'act-3',
    text: 'Linus Rustov granted Immunity for bug-free compiler architecture.',
    type: 'immunity',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

const getInitialState = () => {
  const getSystemTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          theme: parsed.theme || getSystemTheme(),
          activeAnnouncementOverlay: null,
          toasts: [],
          floatingChanges: {},
        };
      }
    } catch (e) {
      console.warn('Failed to load saved state, using seed data:', e);
    }
  }

  return {
    contestants: SEED_CONTESTANTS,
    tasks: SEED_TASKS,
    announcements: SEED_ANNOUNCEMENTS,
    activities: SEED_ACTIVITIES,
    audioMuted: false,
    theme: getSystemTheme(),
    activeAnnouncementOverlay: null,
    toasts: [],
    floatingChanges: {},
  };
};

function houseReducer(state, action) {
  switch (action.type) {
    case 'ADD_POINTS': {
      const { contestantId, amount } = action.payload;
      const target = state.contestants.find((c) => c.id === contestantId);
      if (!target || target.status === 'evicted') return state;

      const newPoints = Math.max(0, target.points + amount);
      const updatedContestants = state.contestants.map((c) =>
        c.id === contestantId ? { ...c, points: newPoints } : c
      );

      const activity = {
        id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        text: `${target.name} received +${amount} points (Total: ${newPoints}).`,
        type: 'points',
        timestamp: new Date().toISOString(),
      };

      return {
        ...state,
        contestants: updatedContestants,
        activities: [activity, ...state.activities].slice(0, 40),
        floatingChanges: {
          ...state.floatingChanges,
          [contestantId]: { amount: `+${amount}`, type: 'positive', key: Date.now() },
        },
      };
    }

    case 'DEDUCT_POINTS': {
      const { contestantId, amount } = action.payload;
      const target = state.contestants.find((c) => c.id === contestantId);
      if (!target || target.status === 'evicted') return state;

      const newPoints = Math.max(0, target.points - amount);
      const updatedContestants = state.contestants.map((c) =>
        c.id === contestantId ? { ...c, points: newPoints } : c
      );

      const activity = {
        id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        text: `${target.name} penalized -${amount} points (Total: ${newPoints}).`,
        type: 'points_deduct',
        timestamp: new Date().toISOString(),
      };

      return {
        ...state,
        contestants: updatedContestants,
        activities: [activity, ...state.activities].slice(0, 40),
        floatingChanges: {
          ...state.floatingChanges,
          [contestantId]: { amount: `-${amount}`, type: 'negative', key: Date.now() },
        },
      };
    }

    case 'SET_POINTS': {
      const { contestantId, points } = action.payload;
      const target = state.contestants.find((c) => c.id === contestantId);
      if (!target || target.status === 'evicted') return state;

      const validPoints = Math.max(0, Number(points) || 0);
      const diff = validPoints - target.points;
      const updatedContestants = state.contestants.map((c) =>
        c.id === contestantId ? { ...c, points: validPoints } : c
      );

      return {
        ...state,
        contestants: updatedContestants,
        activities: [
          {
            id: `act-${Date.now()}`,
            text: `${target.name} score manually set to ${validPoints} pts.`,
            type: 'points',
            timestamp: new Date().toISOString(),
          },
          ...state.activities,
        ].slice(0, 40),
        floatingChanges: {
          ...state.floatingChanges,
          [contestantId]: {
            amount: diff >= 0 ? `+${diff}` : `${diff}`,
            type: diff >= 0 ? 'positive' : 'negative',
            key: Date.now(),
          },
        },
      };
    }

    case 'ASSIGN_CAPTAIN': {
      const { contestantId } = action.payload;
      const target = state.contestants.find((c) => c.id === contestantId);
      if (!target || target.status === 'evicted') return state;

      // Only one captain at a time
      const updatedContestants = state.contestants.map((c) => ({
        ...c,
        isCaptain: c.id === contestantId ? !c.isCaptain : false,
      }));

      const newIsCaptain = !target.isCaptain;
      const activity = {
        id: `act-${Date.now()}`,
        text: newIsCaptain
          ? `👑 ${target.name} is crowned House Captain!`
          : `${target.name} stepped down from Captaincy.`,
        type: 'captain',
        timestamp: new Date().toISOString(),
      };

      return {
        ...state,
        contestants: updatedContestants,
        activities: [activity, ...state.activities].slice(0, 40),
      };
    }

    case 'TOGGLE_NOMINATION': {
      const { contestantId } = action.payload;
      const target = state.contestants.find((c) => c.id === contestantId);
      if (!target) return state;

      // Business Rule: Evicted or Immune CANNOT be nominated!
      if (target.status === 'immune' || target.status === 'evicted') {
        return state;
      }

      const isNominated = target.status === 'nominated';
      const newStatus = isNominated ? 'active' : 'nominated';

      const updatedContestants = state.contestants.map((c) =>
        c.id === contestantId ? { ...c, status: newStatus } : c
      );

      const activity = {
        id: `act-${Date.now()}`,
        text: newStatus === 'nominated'
          ? `⚠️ ${target.name} has been NOMINATED for eviction!`
          : `🛡️ ${target.name} has been removed from nominations.`,
        type: newStatus === 'nominated' ? 'danger' : 'safe',
        timestamp: new Date().toISOString(),
      };

      return {
        ...state,
        contestants: updatedContestants,
        activities: [activity, ...state.activities].slice(0, 40),
      };
    }

    case 'TOGGLE_IMMUNITY': {
      const { contestantId } = action.payload;
      const target = state.contestants.find((c) => c.id === contestantId);
      if (!target || target.status === 'evicted') return state;

      const isImmune = target.status === 'immune';
      // Business Rule: Granting immunity clears any nomination!
      const newStatus = isImmune ? 'active' : 'immune';

      const updatedContestants = state.contestants.map((c) =>
        c.id === contestantId ? { ...c, status: newStatus } : c
      );

      const activity = {
        id: `act-${Date.now()}`,
        text: newStatus === 'immune'
          ? `🛡️ Immunity granted to ${target.name}! Existing nominations cleared.`
          : `Immunity revoked from ${target.name}.`,
        type: 'immunity',
        timestamp: new Date().toISOString(),
      };

      return {
        ...state,
        contestants: updatedContestants,
        activities: [activity, ...state.activities].slice(0, 40),
      };
    }

    case 'EVICT_CONTESTANT': {
      const { contestantId } = action.payload;
      const target = state.contestants.find((c) => c.id === contestantId);
      if (!target) return state;

      // Evict: clear captaincy, mark evicted, auto-dismiss from active
      const updatedContestants = state.contestants.map((c) =>
        c.id === contestantId
          ? { ...c, status: 'evicted', isCaptain: false }
          : c
      );

      const activity = {
        id: `act-${Date.now()}`,
        text: `🚨 EVICTION: ${target.name} has been permanently evicted from Tech House!`,
        type: 'eviction',
        timestamp: new Date().toISOString(),
      };

      const announcement = {
        id: `ann-${Date.now()}`,
        message: `BIG BOSS STATEMENT: ${target.name} has been evicted from the Tech House! Pack your gear and exit immediately.`,
        timestamp: new Date().toISOString(),
        type: 'eviction',
      };

      return {
        ...state,
        contestants: updatedContestants,
        announcements: [announcement, ...state.announcements],
        activities: [activity, ...state.activities].slice(0, 40),
        activeAnnouncementOverlay: {
          message: `${target.name.toUpperCase()} HAS BEEN EVICTED FROM TECH HOUSE`,
          type: 'eviction',
          subtext: 'Big Boss has terminated your session. Disconnecting neural link...',
        },
      };
    }

    case 'RESTORE_CONTESTANT': {
      const { contestantId } = action.payload;
      const target = state.contestants.find((c) => c.id === contestantId);
      if (!target || target.status !== 'evicted') return state;

      const updatedContestants = state.contestants.map((c) =>
        c.id === contestantId ? { ...c, status: 'active', isCaptain: false } : c
      );

      const activity = {
        id: `act-${Date.now()}`,
        text: `🔄 ${target.name} has been restored to the house as an active contestant.`,
        type: 'restore',
        timestamp: new Date().toISOString(),
      };

      return {
        ...state,
        contestants: updatedContestants,
        activities: [activity, ...state.activities].slice(0, 40),
      };
    }

    case 'ADD_CONTESTANT': {
      const { name, team, points, role, bio } = action.payload;
      const newId = `c-${Date.now()}`;
      const colors = [
        'from-cyan-500 to-blue-700',
        'from-emerald-500 to-teal-800',
        'from-violet-500 to-purple-800',
        'from-rose-500 to-pink-700',
        'from-amber-500 to-orange-700',
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const newContestant = {
        id: newId,
        name: name.trim(),
        team: team || 'Team Frontend',
        points: Math.max(0, Number(points) || 100),
        status: 'active',
        isCaptain: false,
        role: role?.trim() || 'Tech Housemate',
        bio: bio?.trim() || 'Ready to debug and conquer.',
        avatarColor: randomColor,
      };

      const activity = {
        id: `act-${Date.now()}`,
        text: `New contestant ${newContestant.name} joined ${newContestant.team}.`,
        type: 'general',
        timestamp: new Date().toISOString(),
      };

      return {
        ...state,
        contestants: [...state.contestants, newContestant],
        activities: [activity, ...state.activities].slice(0, 40),
      };
    }

    case 'UPDATE_CONTESTANT': {
      const { id, data } = action.payload;
      const updatedContestants = state.contestants.map((c) =>
        c.id === id ? { ...c, ...data } : c
      );
      return {
        ...state,
        contestants: updatedContestants,
      };
    }

    case 'REMOVE_CONTESTANT': {
      const { contestantId } = action.payload;
      const target = state.contestants.find((c) => c.id === contestantId);
      if (!target) return state;

      const updatedContestants = state.contestants.filter((c) => c.id !== contestantId);
      return {
        ...state,
        contestants: updatedContestants,
        activities: [
          {
            id: `act-${Date.now()}`,
            text: `${target.name} removed from registry.`,
            type: 'general',
            timestamp: new Date().toISOString(),
          },
          ...state.activities,
        ].slice(0, 40),
      };
    }

    case 'CREATE_TASK': {
      const { title, description, assignedTo, points } = action.payload;
      const newTask = {
        id: `task-${Date.now()}`,
        title: title.trim(),
        description: description?.trim() || 'Complete the assigned objective.',
        assignedTo: assignedTo || 'ALL',
        points: Math.max(5, Number(points) || 50),
        status: 'pending',
        createdAt: new Date().toISOString(),
        completedAt: null,
      };

      const activity = {
        id: `act-${Date.now()}`,
        text: `New Task Created: "${newTask.title}" (${newTask.points} pts).`,
        type: 'task',
        timestamp: new Date().toISOString(),
      };

      return {
        ...state,
        tasks: [newTask, ...state.tasks],
        activities: [activity, ...state.activities].slice(0, 40),
      };
    }

    case 'COMPLETE_TASK': {
      const { taskId } = action.payload;
      const targetTask = state.tasks.find((t) => t.id === taskId);
      if (!targetTask || targetTask.status === 'completed') return state;

      const taskPoints = targetTask.points;
      let updatedContestants = [...state.contestants];
      let awardedNames = [];

      // Auto-award points to assignee or all active contestants
      if (targetTask.assignedTo === 'ALL') {
        updatedContestants = updatedContestants.map((c) => {
          if (c.status !== 'evicted') {
            awardedNames.push(c.name);
            return { ...c, points: c.points + taskPoints };
          }
          return c;
        });
      } else {
        const singleAssignee = updatedContestants.find(
          (c) => c.id === targetTask.assignedTo
        );
        if (singleAssignee && singleAssignee.status !== 'evicted') {
          awardedNames.push(singleAssignee.name);
          updatedContestants = updatedContestants.map((c) =>
            c.id === targetTask.assignedTo
              ? { ...c, points: c.points + taskPoints }
              : c
          );
        }
      }

      const updatedTasks = state.tasks.map((t) =>
        t.id === taskId
          ? { ...t, status: 'completed', completedAt: new Date().toISOString() }
          : t
      );

      const activity = {
        id: `act-${Date.now()}`,
        text: `Task Completed: "${targetTask.title}"! Awarded +${taskPoints} pts to ${
          targetTask.assignedTo === 'ALL' ? 'all active contestants' : awardedNames.join(', ') || 'assignee'
        }.`,
        type: 'task_complete',
        timestamp: new Date().toISOString(),
      };

      return {
        ...state,
        tasks: updatedTasks,
        contestants: updatedContestants,
        activities: [activity, ...state.activities].slice(0, 40),
      };
    }

    case 'DELETE_TASK': {
      const { taskId } = action.payload;
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== taskId),
      };
    }

    case 'BROADCAST_ANNOUNCEMENT': {
      const { message, type = 'general' } = action.payload;
      const newAnnouncement = {
        id: `ann-${Date.now()}`,
        message: message.trim(),
        timestamp: new Date().toISOString(),
        type,
      };

      const activity = {
        id: `act-${Date.now()}`,
        text: `Big Boss Broadcast: "${message.trim()}"`,
        type: 'broadcast',
        timestamp: new Date().toISOString(),
      };

      return {
        ...state,
        announcements: [newAnnouncement, ...state.announcements],
        activities: [activity, ...state.activities].slice(0, 40),
        activeAnnouncementOverlay: {
          message: message.trim(),
          type,
          subtext: 'BIG BOSS HAS ISSUED A COMMAND TO THE TECH HOUSE',
        },
      };
    }

    case 'DISMISS_OVERLAY': {
      return {
        ...state,
        activeAnnouncementOverlay: null,
      };
    }

    case 'TOGGLE_THEME': {
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      };
    }

    case 'TOGGLE_AUDIO': {
      return {
        ...state,
        audioMuted: !state.audioMuted,
      };
    }

    case 'RESET_HOUSE': {
      return {
        contestants: SEED_CONTESTANTS,
        tasks: SEED_TASKS,
        announcements: SEED_ANNOUNCEMENTS,
        activities: SEED_ACTIVITIES,
        audioMuted: false,
        theme: state.theme || 'dark',
        activeAnnouncementOverlay: null,
        toasts: [
          {
            id: `toast-${Date.now()}`,
            message: 'House state successfully reset to default seeds!',
            type: 'info',
          },
        ],
        floatingChanges: {},
      };
    }

    case 'ADD_TOAST': {
      const newToast = {
        id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        message: action.payload.message,
        type: action.payload.type || 'info',
      };
      return {
        ...state,
        toasts: [...state.toasts.slice(-4), newToast],
      };
    }

    case 'REMOVE_TOAST': {
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload.id),
      };
    }

    default:
      return state;
  }
}

const HouseContext = createContext(null);

export function HouseProvider({ children }) {
  const [state, dispatch] = useReducer(houseReducer, null, getInitialState);

  // Sync theme class to documentElement
  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  // Sync to localStorage
  useEffect(() => {
    try {
      const toSave = {
        contestants: state.contestants,
        tasks: state.tasks,
        announcements: state.announcements,
        activities: state.activities,
        audioMuted: state.audioMuted,
        theme: state.theme,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.error('Failed to sync state to localStorage:', e);
    }
  }, [state.contestants, state.tasks, state.announcements, state.activities, state.audioMuted, state.theme]);

  // Toast auto-dismissal
  useEffect(() => {
    if (state.toasts.length > 0) {
      const timer = setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', payload: { id: state.toasts[0].id } });
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [state.toasts]);

  // Helper action dispatchers with sound and toasts
  const addToast = useCallback((message, type = 'info') => {
    dispatch({ type: 'ADD_TOAST', payload: { message, type } });
  }, []);

  const addPoints = useCallback((contestantId, amount) => {
    const c = state.contestants.find((item) => item.id === contestantId);
    if (!c || c.status === 'evicted') {
      addToast('Cannot award points to an evicted contestant!', 'error');
      return;
    }
    dispatch({ type: 'ADD_POINTS', payload: { contestantId, amount } });
    sounds.playPointUp(state.audioMuted);
    addToast(`+${amount} points awarded to ${c.name}`, 'success');
  }, [state.contestants, state.audioMuted, addToast]);

  const deductPoints = useCallback((contestantId, amount) => {
    const c = state.contestants.find((item) => item.id === contestantId);
    if (!c || c.status === 'evicted') {
      addToast('Cannot penalize an evicted contestant!', 'error');
      return;
    }
    dispatch({ type: 'DEDUCT_POINTS', payload: { contestantId, amount } });
    sounds.playPointDown(state.audioMuted);
    addToast(`-${amount} points deducted from ${c.name}`, 'warning');
  }, [state.contestants, state.audioMuted, addToast]);

  const setPoints = useCallback((contestantId, points) => {
    const c = state.contestants.find((item) => item.id === contestantId);
    if (!c || c.status === 'evicted') {
      addToast('Cannot change score of an evicted contestant!', 'error');
      return;
    }
    dispatch({ type: 'SET_POINTS', payload: { contestantId, points } });
    sounds.playPointUp(state.audioMuted);
    addToast(`${c.name} score updated to ${points}`, 'info');
  }, [state.contestants, state.audioMuted, addToast]);

  const assignCaptain = useCallback((contestantId) => {
    const c = state.contestants.find((item) => item.id === contestantId);
    if (!c || c.status === 'evicted') {
      addToast('Cannot assign Captaincy to an evicted contestant!', 'error');
      return;
    }
    dispatch({ type: 'ASSIGN_CAPTAIN', payload: { contestantId } });
    if (!c.isCaptain) {
      sounds.playBigBossGong(state.audioMuted);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      addToast(`👑 ${c.name} is now the House Captain!`, 'success');
    } else {
      addToast(`${c.name} stepped down as Captain.`, 'info');
    }
  }, [state.contestants, state.audioMuted, addToast]);

  const toggleNomination = useCallback((contestantId) => {
    const c = state.contestants.find((item) => item.id === contestantId);
    if (!c) return;

    if (c.status === 'evicted') {
      sounds.playAlert(state.audioMuted);
      addToast('Violation: Evicted contestants cannot be nominated!', 'error');
      return;
    }

    if (c.status === 'immune') {
      sounds.playAlert(state.audioMuted);
      addToast(`Action Blocked: ${c.name} has IMMUNITY and cannot be nominated!`, 'error');
      return;
    }

    dispatch({ type: 'TOGGLE_NOMINATION', payload: { contestantId } });
    if (c.status === 'nominated') {
      addToast(`${c.name} removed from Danger Zone.`, 'info');
    } else {
      sounds.playAlert(state.audioMuted);
      addToast(`⚠️ ${c.name} has entered the Danger Zone!`, 'warning');
    }
  }, [state.contestants, state.audioMuted, addToast]);

  const toggleImmunity = useCallback((contestantId) => {
    const c = state.contestants.find((item) => item.id === contestantId);
    if (!c) return;
    if (c.status === 'evicted') {
      addToast('Violation: Evicted contestants cannot receive immunity!', 'error');
      return;
    }

    dispatch({ type: 'TOGGLE_IMMUNITY', payload: { contestantId } });
    if (c.status === 'immune') {
      addToast(`Immunity revoked from ${c.name}.`, 'info');
    } else {
      sounds.playPointUp(state.audioMuted);
      addToast(`🛡️ Immunity granted to ${c.name}! Nominations cleared.`, 'success');
    }
  }, [state.contestants, state.audioMuted, addToast]);

  const evictContestant = useCallback((contestantId) => {
    const c = state.contestants.find((item) => item.id === contestantId);
    if (!c) return;

    dispatch({ type: 'EVICT_CONTESTANT', payload: { contestantId } });
    sounds.playEvictionAlarm(state.audioMuted);
    sounds.speakAnnouncement(`Big Boss order: ${c.name} has been evicted from the Tech House.`, state.audioMuted);
    addToast(`🚨 ${c.name} has been evicted!`, 'error');
  }, [state.contestants, state.audioMuted, addToast]);

  const restoreContestant = useCallback((contestantId) => {
    const c = state.contestants.find((item) => item.id === contestantId);
    if (!c) return;

    dispatch({ type: 'RESTORE_CONTESTANT', payload: { contestantId } });
    sounds.playPointUp(state.audioMuted);
    addToast(`🔄 ${c.name} has been restored to the house.`, 'success');
  }, [state.contestants, state.audioMuted, addToast]);

  const addContestant = useCallback((data) => {
    dispatch({ type: 'ADD_CONTESTANT', payload: data });
    sounds.playPointUp(state.audioMuted);
    addToast(`${data.name} has entered the Tech House!`, 'success');
  }, [state.audioMuted, addToast]);

  const updateContestant = useCallback((id, data) => {
    dispatch({ type: 'UPDATE_CONTESTANT', payload: { id, data } });
    addToast(`Contestant profile updated!`, 'info');
  }, [addToast]);

  const removeContestant = useCallback((contestantId) => {
    dispatch({ type: 'REMOVE_CONTESTANT', payload: { contestantId } });
    addToast(`Contestant removed from registry.`, 'info');
  }, [addToast]);

  const createTask = useCallback((taskData) => {
    dispatch({ type: 'CREATE_TASK', payload: taskData });
    sounds.playPointUp(state.audioMuted);
    addToast(`New Task "${taskData.title}" dispatched to house!`, 'success');
  }, [state.audioMuted, addToast]);

  const completeTask = useCallback((taskId) => {
    const task = state.tasks.find((t) => t.id === taskId);
    if (!task) return;

    dispatch({ type: 'COMPLETE_TASK', payload: { taskId } });
    sounds.playBigBossGong(state.audioMuted);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
    addToast(`Task Completed! +${task.points} pts awarded!`, 'success');
  }, [state.tasks, state.audioMuted, addToast]);

  const deleteTask = useCallback((taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: { taskId } });
    addToast(`Task cancelled.`, 'info');
  }, [addToast]);

  const broadcastAnnouncement = useCallback((message, type = 'general') => {
    dispatch({ type: 'BROADCAST_ANNOUNCEMENT', payload: { message, type } });
    sounds.playBigBossGong(state.audioMuted);
    sounds.speakAnnouncement(message, state.audioMuted);
  }, [state.audioMuted]);

  const dismissOverlay = useCallback(() => {
    dispatch({ type: 'DISMISS_OVERLAY' });
  }, []);

  const toggleAudio = useCallback(() => {
    dispatch({ type: 'TOGGLE_AUDIO' });
  }, []);

  const resetHouse = useCallback(() => {
    dispatch({ type: 'RESET_HOUSE' });
    sounds.playPointUp(false);
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({ type: 'REMOVE_TOAST', payload: { id } });
  }, []);

  const currentCaptain = state.contestants.find((c) => c.isCaptain && c.status !== 'evicted');
  const nominatedCount = state.contestants.filter((c) => c.status === 'nominated').length;
  const immuneCount = state.contestants.filter((c) => c.status === 'immune').length;
  const activeCount = state.contestants.filter((c) => c.status !== 'evicted').length;
  const evictedCount = state.contestants.filter((c) => c.status === 'evicted').length;

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' });
  }, []);

  return (
    <HouseContext.Provider
      value={{
        state,
        dispatch,
        currentCaptain,
        nominatedCount,
        immuneCount,
        activeCount,
        evictedCount,
        addPoints,
        deductPoints,
        setPoints,
        assignCaptain,
        toggleNomination,
        toggleImmunity,
        evictContestant,
        restoreContestant,
        addContestant,
        updateContestant,
        removeContestant,
        createTask,
        completeTask,
        deleteTask,
        broadcastAnnouncement,
        dismissOverlay,
        toggleAudio,
        toggleTheme,
        resetHouse,
        addToast,
        removeToast,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
}

export function useHouse() {
  const context = useContext(HouseContext);
  if (!context) {
    throw new Error('useHouse must be used within a HouseProvider');
  }
  return context;
}
