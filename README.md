# Dallas Cowboys Interactive Depth Chart

A modern, interactive depth chart application for the Dallas Cowboys with drag-and-drop functionality and multiple view modes. Built as a technical demonstration for the Dallas Cowboys Football Operations team.

🔗 **Live Demo**: [https://cowboys-depth-chart.vercel.app/](https://cowboys-depth-chart.vercel.app/)

## Features

### Dual View Modes

#### List View
- Traditional depth chart organized by position groups
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
cd DepthChartAPI
dotnet restore
dotnet run
# Runs on http://localhost:5210
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

## API Endpoints

### Players
- `GET /players` - Get all players
- `GET /players/{id}` - Get player by ID
- `PUT /players/{id}` - Update player
- `POST /players/reorder` - Bulk update player orders
- `POST /players/swap` - Swap two players' depth chart positions

## Project Structure
```
cowboys-depth-chart/
├── DepthChartAPI/              # ASP.NET Core backend
│   ├── Controllers/            # API controllers
│   │   └── PlayersController.cs
│   ├── Data/                   # Database context
│   │   └── DepthChartDbContext.cs
│   ├── Models/                 # Data models
│   │   └── Player.cs
│   ├── players.json            # Seed data
│   ├── Program.cs              # App configuration
│   └── Dockerfile              # Railway deployment
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── DepthChart.tsx  # Main container
│   │   │   ├── Header.tsx      # Cowboys-branded header
│   │   │   ├── TabNavigation.tsx
│   │   │   ├── PhaseSection.tsx
│   │   │   ├── PositionGroup.tsx
│   │   │   ├── PlayerCard.tsx
│   │   │   ├── FormationView.tsx     # Visual formation display
│   │   │   ├── FormationPlayer.tsx   # Player bubble component
│   │   │   └── DepthSelector.tsx     # Modal for swapping players
│   │   ├── hooks/
│   │   │   └── useDepthChart.ts      # State management
│   │   ├── types/
│   │   │   └── player.ts             # TypeScript types
│   │   └── utils/
│   │       └── positions.ts          # Position mappings & display names
│   ├── tailwind.config.js      # Cowboys color palette
│   └── package.json
└── README.md
```

## Position Mappings

The application uses ESPN-style position codes:

### Offense
- QB (Quarterback), RB (Running Back), FB (Fullback)
- X/Z → WR (Wide Receiver)
- TE (Tight End)
- LT, LG, OC→C, RG, RT (Offensive Line)

### Defense
- LDE, RDE (Defensive Ends)
- 1-TECH→LDT, 3-TECH→RDT (Defensive Tackles)
- WLB, MLB, SLB (Linebackers)
- LCB, RCB (Cornerbacks)
- SS, FS (Safeties)

### Special Teams
- K→PK (Kicker), P (Punter), LS (Long Snapper)

## Key Technologies

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **@dnd-kit** - Drag and drop functionality
- **Tailwind CSS** - Utility-first styling
- **Vercel** - Deployment platform

### Backend
- **ASP.NET Core 10.0** - Web API framework
- **Entity Framework Core** - ORM
- **In-Memory Database** - Development/demo database
- **Railway** - Deployment platform

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://cowboys-depth-chart-production.up.railway.app
```

### Backend (Railway)
```
PORT=8080  # Set automatically by Railway
```

## Deployment

### Frontend (Vercel)
1. Connected to GitHub repository
2. Root Directory: `frontend`
3. Framework: Vite
4. Environment Variable: `VITE_API_URL`
5. Auto-deploys on push to main branch

### Backend (Railway)
1. Connected to GitHub repository
2. Root Directory: `DepthChartAPI`
3. Uses Dockerfile for deployment
4. Auto-deploys on push to main branch
5. Public URL generated automatically

## Features Demonstrated

### For Coaching Staff
- **Formation View**: Visual representation for game planning
- **Quick Depth Changes**: Click any position to swap starters
- **Real-time Updates**: Changes sync across all views
- **Mobile Friendly**: Access depth chart from sidelines

### For Technical Evaluation
- **Modern Stack**: React, TypeScript, .NET Core
- **API Design**: RESTful endpoints with proper HTTP methods
- **State Management**: Custom React hooks with optimistic updates
- **Responsive Design**: Mobile-first approach
- **Performance**: Efficient rendering and minimal re-renders
- **Accessibility**: Keyboard navigation, semantic HTML
- **Error Handling**: User-friendly error messages
- **Code Quality**: TypeScript for type safety, clean architecture

## Development Decisions

See [TECHNICAL_DECISIONS.md](TECHNICAL_DECISIONS.md) for detailed technical rationale.

## Future Enhancements

- User authentication and role-based permissions
- Persistent database (PostgreSQL/SQL Server)
- Injury report integration
- Historical depth chart versions
- Export to PDF/CSV
- Advanced filtering and search
- Player statistics integration
- Multi-team support


## Author

**Matthew Stogner**

Technical Interview Project for Dallas Cowboys Football Operations - December 2025

## License

This project is for demonstration purposes as part of a technical interview process.

## Acknowledgments

- Dallas Cowboys organization for the interview opportunity
