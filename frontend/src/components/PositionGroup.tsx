import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Player } from '../types/player';
import { PlayerCard } from './PlayerCard';
// import { getPositionDisplayName } from '../utils/positions';

interface PositionGroupProps {
  position: string;
  players: Player[];
}

// Full position names for List View
const FULL_POSITION_NAMES: Record<string, string> = {
  // Offense
  'QB': 'Quarterback',
  'RB': 'Running Back',
  'FB': 'Fullback',
  'X': 'Wide Receiver (X)',
  'Z': 'Wide Receiver (Z)',
  'TE': 'Tight End',
  'LT': 'Left Tackle',
  'LG': 'Left Guard',
  'OC': 'Center',
  'RG': 'Right Guard',
  'RT': 'Right Tackle',
  
  // Defense
  'LDE': 'Left Defensive End',
  '1-TECH': 'Left Defensive Tackle',
  '3-TECH': 'Right Defensive Tackle',
  'RDE': 'Right Defensive End',
  'WLB': 'Weakside Linebacker',
  'MLB': 'Middle Linebacker',
  'SLB': 'Strongside Linebacker',
  'LCB': 'Left Cornerback',
  'RCB': 'Right Cornerback',
  'SS': 'Strong Safety',
  'FS': 'Free Safety',
  
  // Special Teams
  'K': 'Kicker',
  'P': 'Punter',
  'LS': 'Long Snapper',
};

const getFullPositionName = (position: string): string => {
  return FULL_POSITION_NAMES[position] || position;
};

export const PositionGroupComponent = ({ position, players }: PositionGroupProps) => {
  const { setNodeRef } = useDroppable({
    id: position,
  });

  const sortedPlayers = [...players].sort((a, b) => a.order - b.order);

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-50 rounded-lg p-4 min-h-[120px] border-2 border-gray-200 hover:border-cowboys-navy transition-colors"
    >
      <h3 className="font-bold text-cowboys-navy mb-3 text-lg uppercase" style={{ fontFamily: 'Impact, "Arial Black", sans-serif', letterSpacing: '0.05em' }}>
        {getFullPositionName(position)}
      </h3>
      
      <SortableContext
        items={sortedPlayers.map(p => p.id)}
        strategy={verticalListSortingStrategy}
      >
        {sortedPlayers.length === 0 ? (
          <div className="text-gray-400 text-sm italic text-center py-4">
            No players
          </div>
        ) : (
          sortedPlayers.map((player, index) => (
            <PlayerCard
              key={player.id}
              player={player}
              index={index}
            />
          ))
        )}
      </SortableContext>
    </div>
  );
};
