import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Player } from '../types/player';
import { STATUS_LABELS, getPositionDisplayName } from '../utils/positions';

interface PlayerCardProps {
  player: Player;
  index: number;
}

export const PlayerCard = ({ player, index }: PlayerCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: player.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const statusInfo = STATUS_LABELS[player.status] || { label: 'Unknown', color: 'bg-gray-100 text-gray-800', fullLabel: 'Unknown' };
  const displayPosition = getPositionDisplayName(player.position);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white border-2 border-gray-200 rounded-lg p-3 mb-2
        cursor-move hover:border-cowboys-navy hover:shadow-md
        transition-all duration-200
        ${isDragging ? 'opacity-50 shadow-lg scale-105' : ''}
      `}
    >
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0 w-8 h-8 bg-cowboys-navy text-white rounded-full flex items-center justify-center font-bold text-sm">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 truncate" style={{ fontFamily: 'Impact, "Arial Black", sans-serif', letterSpacing: '0.03em' }}>
            {player.firstName} {player.lastName}
          </div>
          <div className="text-sm text-gray-600">
            #{player.jersey} • {displayPosition}
          </div>
        </div>
        <div className="flex-shrink-0">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-center ${statusInfo.color}`}>
            {statusInfo.label}
          </span>
        </div>
      </div>
    </div>
  );
};
