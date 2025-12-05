# Dallas Cowboys Interactive Depth Chart

A modern, interactive depth chart application for the Dallas Cowboys with drag-and-drop functionality and multiple view modes. Built as a technical demonstration for the Dallas Cowboys Football Operations team.

🔗 **Live Demo**: [https://cowboys-depth-chart.vercel.app/](https://cowboys-depth-chart.vercel.app/)

## Features

### Dual View Modes

#### List View
- Traditional depth chart organized by position groups
- Full position names (e.g., "Quarterback", "Left Tackle", "Middle Linebacker")
- Drag-and-drop to reorder players within positions
- Move players between positions
- Status indicators (Active, Practice Squad, Injured Reserve)
- Real-time updates with backend synchronization

#### Formation View
- Visual representation of players in football formations
- Defense: 4-3 base formation with proper spacing
- Offense: Pro-style formation with offensive line, skill positions
- Special Teams: Kicker, Punter, Long Snapper
- Click any position to view depth and swap starters
- Color-coded zones (Defense: Grey, Offense: Blue, Special Teams: Darker Blue)
- Cowboys-branded silver borders on offensive players

### Design & Branding
- Official Dallas Cowboys colors (Navy #041E42, Silver #869397)
- Cowboys Impact font for headers and key elements
- NFL.com-inspired header with gradient background and watermark logo
- Responsive design for desktop, tablet, and mobile
- Smooth animations and transitions

### Technical Features
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: ASP.NET Core 10.0 with REST API
- **Drag & Drop**: @dnd-kit library for accessibility and performance
- **Styling**: Tailwind CSS 3.4
- **Database**: Entity Framework Core with in-memory database
- **Deployment**: Vercel (frontend) + Railway (backend)

## Live Deployment

- **Frontend**: [https://cowboys-depth-chart.vercel.app/](https://cowboys-depth-chart.vercel.app/)
- **Backend API**: [https://cowboys-depth-chart-production.up.railway.app](https://cowboys-depth-chart-production.up.railway.app)

## Local Development Setup

### Prerequisites
- Node.js 18+ and npm
- .NET 10.0 SDK

### Backend Setup
```bash
