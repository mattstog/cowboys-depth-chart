import { Player } from '../types/player';
import { getPositionDisplayName } from '../utils/positions';

interface DepthSelectorProps {
  position: string;
  players: Player[];
  onSelect: (player: Player) => void;
  onClose: () => void;
}

export const DepthSelector = ({ position, players, onSelect, onClose }: DepthSelectorProps) => {
  const displayPosition = getPositionDisplayName(position);
  const sortedPlayers = [...players].sort((a, b) => a.order - b.order);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-96 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-cowboys-navy text-white px-6 py-4">
          <h3 className="text-xl font-bold">Select {displayPosition}</h3>
        </div>
        
        <div className="overflow-y-auto max-h-80 p-4">
          {sortedPlayers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No players at this position</p>
          ) : (
            <div className="space-y-2">
              {sortedPlayers.map((player, index) => (
                <button
                  key={player.id}
                  onClick={() => {
                    onSelect(player);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg hover:border-cowboys-navy hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-cowboys-navy text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">
                        {player.firstName} {player.lastName}
                      </div>
                      <div className="text-sm text-gray-600">
                        #{player.jersey}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {index === 0 ? 'Starter' : `${index + 1}${index === 1 ? 'st' : index === 2 ? 'nd' : 'rd'} String`}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
