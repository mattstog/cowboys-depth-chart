# Dallas Cowboys Interactive Depth Chart

An interactive, drag-and-drop depth chart application for managing football team rosters across offense, defense, and special teams.

![Dallas Cowboys](https://img.shields.io/badge/Team-Dallas%20Cowboys-041E42?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![.NET](https://img.shields.io/badge/.NET-9.0-512BD4?style=for-the-badge&logo=dotnet)

## 🎯 Features

- **📊 Interactive Depth Chart**: View players organized by position across all three phases
- **🎯 Drag & Drop**: Reorder players within positions or move them between positions
- **💾 Real-time Updates**: Changes persist immediately via REST API
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🎨 Cowboys Branding**: Authentic Dallas Cowboys colors and styling
- **⚡ Fast & Modern**: Built with Vite, React 18, and ASP.NET Core 9.0
- **♿ Accessible**: WCAG compliant drag-and-drop interactions

## 🏗️ Architecture

### Frontend
- **React 18** with **TypeScript** for type-safe component development
- **Vite 6** for lightning-fast builds and hot module replacement
- **@dnd-kit** for accessible, performant drag-and-drop
- **Tailwind CSS** for responsive, utility-first styling

### Backend
- **ASP.NET Core 9.0** with Minimal APIs
- **Entity Framework Core** with in-memory database
- **Swagger/OpenAPI** for API documentation
- **CORS** enabled for local development

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **.NET 9.0 SDK** ([Download](https://dotnet.microsoft.com/download/dotnet/9.0))
- **Git** (for cloning the repository)

Verify installations:
```bash
node --version   # Should be v18.x or higher
npm --version    # Should be 9.x or higher
dotnet --version # Should be 9.x
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cowboys-depth-chart
```

### 2. Start the Backend

```bash
cd DepthChartAPI
dotnet restore
dotnet run
```

The API will be available at:
- HTTP: `http://localhost:5210`
- Swagger UI: `http://localhost:5210/swagger`

### 3. Start the Frontend

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at:
- `http://localhost:5173`

### 4. Open the Application

Navigate to `http://localhost:5173` in your browser to see the interactive depth chart!

## 📖 Detailed Setup Instructions

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd DepthChartAPI
   ```

2. **Restore NuGet packages**:
   ```bash
   dotnet restore
   ```

3. **Run the application**:
   ```bash
   dotnet run
   ```

   The API will start and automatically seed the in-memory database with player data from `players.json`.

4. **Verify the API** (optional):
   - Open `http://localhost:5210/swagger` to see the API documentation
   - Test the `/players` endpoint to see all players

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production** (optional):
   ```bash
   npm run build
   npm run preview  # Preview the production build
   ```

## 🎮 How to Use

### Viewing the Depth Chart

The depth chart is organized into three main phases:
- **Offense** (Green): QB, RB, WR, TE, Offensive Line
- **Defense** (Red): Defensive Line, Linebackers, Defensive Backs
- **Special Teams** (Blue): K, P, LS, etc.

Each position shows players ranked by depth (1 = starter, 2 = backup, etc.).

### Reordering Players

**Within the Same Position:**
1. Click and hold on a player card
2. Drag the player up or down to change their depth order
3. Release to drop the player in the new position
4. Changes save automatically

**Moving Between Positions:**
1. Click and hold on a player card
2. Drag the player to a different position group
3. Release to move the player to that position
4. The player will be added to the end of the depth chart for that position

### Player Information

Each player card displays:
- **Depth Number**: Position in the depth chart (1, 2, 3, etc.)
- **Name**: First and last name
- **Jersey Number**: Uniform number
- **Position**: Position code (QB, RB, etc.)
- **Status Badge**:
  - 🟢 **Active**: Available to play
  - 🔵 **Practice Squad**: Practice squad member
  - 🔴 **Injured Reserve**: Unavailable due to injury

## 🔧 API Endpoints

### GET /players
Retrieves all players with their current positions and depth chart order.

**Response:**
```json
[
  {
    "id": "guid",
    "firstName": "Dak",
    "lastName": "Prescott",
    "jersey": 4,
    "position": "QB",
    "order": 1,
    "status": "A"
  }
]
```

### PUT /players/{id}
Updates a specific player's information.

**Request Body:**
```json
{
  "id": "guid",
  "firstName": "Dak",
  "lastName": "Prescott",
  "jersey": 4,
  "position": "QB",
  "order": 2,
  "status": "A"
}
```

### POST /players/reorder
Bulk update multiple players' positions and orders in a single request.

**Request Body:**
```json
[
  { "id": "guid1", "position": "QB", "order": 1 },
  { "id": "guid2", "position": "QB", "order": 2 }
]
```

### POST /players/swap
Swaps the positions and orders of two players.

**Request Body:**
```json
{
  "player1Id": "guid1",
  "player2Id": "guid2"
}
```

## 📁 Project Structure

```
cowboys-depth-chart/
├── DepthChartAPI/              # Backend (ASP.NET Core)
│   ├── Data/
│   │   └── DepthChartDbContext.cs
│   ├── Models/
│   │   └── Player.cs
│   ├── Program.cs              # API endpoints & configuration
│   ├── players.json            # Seed data
│   └── DepthChartAPI.csproj
│
├── frontend/                   # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/
│   │   │   ├── DepthChart.tsx       # Main container
│   │   │   ├── PhaseSection.tsx     # Offense/Defense/ST
│   │   │   ├── PositionGroup.tsx    # Position groups
│   │   │   ├── PlayerCard.tsx       # Individual players
│   │   │   └── Header.tsx           # App header
│   │   ├── hooks/
│   │   │   └── useDepthChart.ts     # API integration
│   │   ├── types/
│   │   │   └── player.ts            # TypeScript types
│   │   ├── utils/
│   │   │   └── positions.ts         # Position configuration
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── TECHNICAL_DECISIONS.md      # Architecture documentation
└── README.md                   # This file
```

## 🎨 Customization

### Adding New Positions

Edit `frontend/src/utils/positions.ts`:

```typescript
export const POSITION_GROUPS: PositionGroup[] = [
  {
    name: 'New Position Group',
    positions: ['NEW_POS'],
    phase: 'offense', // or 'defense' or 'special-teams'
  },
  // ... existing positions
];
```

### Changing Colors

Edit `frontend/tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      cowboys: {
        navy: '#041E42',      // Primary navy
        silver: '#869397',    // Silver accent
        blue: '#0D2648',      // Secondary blue
        white: '#FFFFFF',
      },
    },
  },
},
```

### Modifying Player Data

Edit `DepthChartAPI/players.json` and restart the backend:

```json
{
  "firstName": "New",
  "lastName": "Player",
  "jersey": 99,
  "position": "QB",
  "order": 3,
  "status": "A"
}
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Load application and verify all players display
- [ ] Drag a player within a position to reorder
- [ ] Drag a player to a different position
- [ ] Refresh the page and verify changes persist
- [ ] Test on mobile/tablet devices
- [ ] Verify all three phases (Offense, Defense, Special Teams) display correctly

### Automated Testing (Future Enhancement)

The project structure supports adding:
- **Frontend**: Jest + React Testing Library
- **Backend**: xUnit + Moq

## 🐛 Troubleshooting

### Backend won't start

**Error**: `Unable to find .NET SDK`
- **Solution**: Install .NET 9.0 SDK from [Microsoft's website](https://dotnet.microsoft.com/download)

**Error**: `Address already in use`
- **Solution**: Another process is using port 5210. Change the port in `DepthChartAPI/Properties/launchSettings.json`

### Frontend won't start

**Error**: `ENOENT: no such file or directory`
- **Solution**: Run `npm install` in the `frontend` directory

**Error**: `Cannot connect to backend`
- **Solution**: Ensure the backend is running on `http://localhost:5210`

### Drag and drop not working

- **Solution**: Ensure you're using a modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Try clearing browser cache and reloading

## 📝 Notes

### Data Persistence

The backend uses an **in-memory database**, which means:
- ✅ Fast performance
- ✅ No setup required
- ❌ Data resets when the server restarts
- ❌ Not suitable for production without modification

For production use, migrate to a persistent database (SQL Server, PostgreSQL, etc.).

### Browser Compatibility

Tested and supported on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📚 Additional Documentation

- [Technical Decisions Document](./TECHNICAL_DECISIONS.md) - Architecture and design decisions
- [API Documentation](http://localhost:5210/swagger) - Interactive API explorer (when backend is running)

## 🤝 Contributing

This is a technical assessment project. For production use, consider:
- Adding authentication/authorization
- Implementing persistent storage
- Adding comprehensive test coverage
- Setting up CI/CD pipelines
- Implementing real-time updates with SignalR

## 📄 License

This project is for demonstration purposes as part of a technical assessment.

## 👤 Author

**Matthew** - Technology Consultant & Co-founder at Archpoint Labs

---

**Go Cowboys! ⭐**
