import { Player, Phase } from '../types/player';
import { getPositionsByPhase } from '../utils/positions';
import { PositionGroupComponent } from './PositionGroup';

interface PhaseSectionProps {
  phase: Phase;
  players: Player[];
}

const PHASE_LABELS: Record<Phase, string> = {
  'offense': 'Offense',
  'defense': 'Defense',
  'special-teams': 'Special Teams',
};

const PHASE_COLORS: Record<Phase, string> = {
  'offense': 'bg-cowboys-navy',
  'defense': 'bg-cowboys-navy',
  'special-teams': 'bg-cowboys-navy',
};

export const PhaseSection = ({ phase, players }: PhaseSectionProps) => {
  const positionGroups = getPositionsByPhase(phase);

  // Get ALL positions defined for this phase (not just those with players)
  const allPositions = positionGroups.flatMap(group => group.positions);

  return (
    <div className="mb-8">
      <div className={`${PHASE_COLORS[phase]} text-white px-6 py-4 rounded-t-lg`}>
        <h2 className="text-2xl font-bold">{PHASE_LABELS[phase]}</h2>
      </div>
      
      <div className="bg-white border-2 border-gray-200 rounded-b-lg p-6">
        {allPositions.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No positions found for this phase
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allPositions.map(position => {
              const positionPlayers = players.filter(p => p.position === position);
              return (
                <PositionGroupComponent
                  key={position}
                  position={position}
                  players={positionPlayers}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
