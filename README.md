# Zynx Tech Boss – Big Boss Command Center

A real-time command center dashboard where Big Boss monitors and controls a Bigg Boss–style house of tech contestants. The system features a native Apple iOS Human Interface design language, live leaderboards, automated nomination cycles, immunity shields, task tracking, drift-free countdown timers, cinematic announcements, and audio telemetry with persistent browser storage.

## 12 Core Features

1. **Contestant Roster & Profiles**: Real-time management to enroll, view, edit, and remove housemates across teams (Frontend, Backend, DevOps, AI).
2. **Dynamic Live Leaderboard**: Auto-sorting leaderboard responding instantly to point modifications with animated rank reordering.
3. **Task & Challenge Management**: Create, assign, filter, and complete house challenges with automatic reward distribution.
4. **Instant Score Controls**: Quick points (+10, +50, -10, -50) and custom point adjustments with floating delta feedback (scores never drop below 0).
5. **Captaincy Governance**: Appoint house captains with distinct leadership badges and house-lead telemetry.
6. **Eviction Nominations**: Nominate vulnerable contestants for weekly eviction cycles.
7. **Immunity Shields**: Grant absolute immunity shields that instantly remove and block any eviction nominations.
8. **Danger Zone Dashboard**: Dedicated high-visibility monitor of all contestants currently facing eviction.
9. **Cinematic Broadcasts & Live Transmissions**: Transmit house directives with live overlay animations, speech synthesis, and activity logs.
10. **Apple Clock Task Timer**: Drift-free countdown timer with preset segmented controls (1m, 3m, 5m, 10m, 15m), custom duration inputs, and audio tick warnings under 10 seconds.
11. **House Telemetry & Analytics**: Live telemetry tracking active contestants, top leaders, lowest scorers, average points, and team score distribution bars.
12. **Permanent Eviction Protocol**: Safe multi-step confirmation modals that permanently eliminate contestants from the house and leaderboard into an archived hall of fame.

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS (Apple HIG Design System & SF Pro Tokens)
- **Animation**: Framer Motion & Motion Utils
- **Visual Effects**: React Bits (CountUp, DecryptedText, ParticlesBackground, AnimatedList) & Canvas Confetti
- **Icons**: Lucide React
- **Sound**: Web Audio API Sound Synthesizer & Web Speech API

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
