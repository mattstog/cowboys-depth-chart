import { useState } from 'react';
import { Player } from '../types/player';
import { FormationPlayer } from './FormationPlayer';
import { DepthSelector } from './DepthSelector';

interface FormationViewProps {
  players: Player[];
  onPlayerSwap: (player1Id: string, player2Id: string) => Promise<void>;
}

export const FormationView = ({ players, onPlayerSwap }: FormationViewProps) => {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [currentStarter, setCurrentStarter] = useState<Player | null>(null);

  const positionMapping: Record<string, string[]> = {
    'QB': ['QB'],
    'RB': ['RB'],
    'FB': ['FB'],
    'LT': ['LT'],
    'LG': ['LG'],
    'C': ['OC'],
    'RG': ['RG'],
    'RT': ['RT'],
    'WR-L': ['X'],
    'WR-R': ['Z'],
    'TE': ['TE'],
    'LDE': ['LDE'],
    'LDT': ['1-TECH'],
    'RDT': ['3-TECH'],
    'RDE': ['RDE'],
    'WLB': ['WLB'],
    'MLB': ['MLB'],
    'SLB': ['SLB'],
    'LCB': ['LCB'],
    'RCB': ['RCB'],
    'SS': ['SS'],
    'FS': ['FS'],
    'K': ['K'],
    'P': ['P'],
    'LS': ['LS'],
  };

  const getStarterForPosition = (formationPosition: string): Player | null => {
    const actualPositions = positionMapping[formationPosition] || [formationPosition];
    
    for (const actualPosition of actualPositions) {
      const positionPlayers = players.filter(p => p.position === actualPosition);
      if (positionPlayers.length > 0) {
        return positionPlayers.sort((a, b) => a.order - b.order)[0];
      }
    }
    return null;
  };

  const getPlayersForPosition = (formationPosition: string): Player[] => {
    const actualPositions = positionMapping[formationPosition] || [formationPosition];
    const allPlayers: Player[] = [];
    
    for (const actualPosition of actualPositions) {
      const positionPlayers = players.filter(p => p.position === actualPosition);
      allPlayers.push(...positionPlayers);
    }
    
    return allPlayers.sort((a, b) => a.order - b.order);
  };

  const handlePlayerSelect = async (selectedPlayer: Player) => {
    if (!currentStarter) {
      console.error('No current starter to swap with');
      return;
    }

    if (selectedPlayer.id === currentStarter.id) {
      setSelectedPosition(null);
      setCurrentStarter(null);
      return;
    }

    try {
      await onPlayerSwap(currentStarter.id, selectedPlayer.id);
      setSelectedPosition(null);
      setCurrentStarter(null);
    } catch (error) {
      console.error('Failed to swap players:', error);
    }
  };

  const handlePositionClick = (position: string) => {
    const starter = getStarterForPosition(position);
    setCurrentStarter(starter);
    setSelectedPosition(position);
  };

  const formations = {
    defense: [
      { position: 'LCB', x: 200, y: 140 },
      { position: 'FS', x: 480, y: 110 },
      { position: 'SS', x: 720, y: 110 },
      { position: 'RCB', x: 1000, y: 140 },
      { position: 'WLB', x: 330, y: 260 },
      { position: 'MLB', x: 600, y: 260 },
      { position: 'SLB', x: 870, y: 260 },
      { position: 'LDE', x: 270, y: 360 },
      { position: 'LDT', x: 470, y: 360 },
      { position: 'RDT', x: 730, y: 360 },
      { position: 'RDE', x: 930, y: 360 },
    ],
    offense: [
      // O-line with good padding from top line
      { position: 'LT', x: 350, y: 550 },
      { position: 'LG', x: 470, y: 550 },
      { position: 'C', x: 600, y: 550 },
      { position: 'RG', x: 730, y: 550 },
      { position: 'RT', x: 850, y: 550 },
      
      // TE further left, WR-R further right - MORE SPACE
      { position: 'TE', x: 960, y: 600 },
      { position: 'WR-R', x: 1070, y: 640 },
      
      // WR-L on left
      { position: 'WR-L', x: 200, y: 640 },
      
      // Backfield with plenty of space
      { position: 'QB', x: 600, y: 660 },
      { position: 'RB', x: 600, y: 780 },
    ],
    specialTeams: [
      // BELOW the line at 870 - centered properly
      { position: 'K', x: 440, y: 960 },
      { position: 'P', x: 600, y: 960 },
      { position: 'LS', x: 760, y: 960 },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-cowboys-navy mb-4">Formation View</h2>
        <p className="text-sm text-gray-600 mb-4">Click any position to change the depth chart order</p>
        
        <svg viewBox="0 0 1200 1040" className="w-full border-2 border-gray-300 rounded">
          {/* Defense zone - grey */}
          <rect x="0" y="0" width="1200" height="460" fill="#9CA3AF" />
          
          {/* Offense zone - blue */}
          <rect x="0" y="460" width="1200" height="410" fill="#041E42" />
          
          {/* Special teams zone - darker blue AT BOTTOM */}
          <rect x="0" y="870" width="1200" height="170" fill="#041E42" opacity="0.8" />
          
          {/* Line of scrimmage */}
          <line 
            x1="0" 
            y1="460" 
            x2="1200" 
            y2="460" 
            stroke="white" 
            strokeWidth="3" 
            strokeDasharray="15,10" 
          />
          
          {/* Special teams divider */}
          <line 
            x1="0" 
            y1="870" 
            x2="1200" 
            y2="870" 
            stroke="white" 
            strokeWidth="2" 
            strokeDasharray="10,5" 
          />
          
          <text x="30" y="40" fontSize="22" fontWeight="bold" fill="white">DEFENSE</text>
          <text x="30" y="500" fontSize="22" fontWeight="bold" fill="white">OFFENSE</text>
          <text x="30" y="910" fontSize="22" fontWeight="bold" fill="white">SPECIAL TEAMS</text>
          
          {formations.defense.map(({ position, x, y }) => (
            <FormationPlayer
              key={position}
              position={position}
              player={getStarterForPosition(position)}
              x={x}
              y={y}
              onClick={() => handlePositionClick(position)}
              isOffense={false}
            />
          ))}
          
          {formations.offense.map(({ position, x, y }) => (
            <FormationPlayer
              key={position}
              position={position}
              player={getStarterForPosition(position)}
              x={x}
              y={y}
              onClick={() => handlePositionClick(position)}
              isOffense={true}
            />
          ))}
          
          {formations.specialTeams.map(({ position, x, y }) => (
            <FormationPlayer
              key={position}
              position={position}
              player={getStarterForPosition(position)}
              x={x}
              y={y}
              onClick={() => handlePositionClick(position)}
              isOffense={false}
            />
          ))}
        </svg>
      </div>

      {selectedPosition && (
        <DepthSelector
          position={selectedPosition}
          players={getPlayersForPosition(selectedPosition)}
          onSelect={handlePlayerSelect}
          onClose={() => {
            setSelectedPosition(null);
            setCurrentStarter(null);
          }}
        />
      )}
    </div>
  );
};
