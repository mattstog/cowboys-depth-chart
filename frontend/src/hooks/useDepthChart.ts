import { useState, useEffect } from 'react';
import { Player } from '../types/player';

const API_BASE_URL = 'http://localhost:5210';

export const useDepthChart = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/players`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }
      
      const data = await response.json();
      setPlayers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching players:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const updatePlayer = async (player: Player) => {
    try {
      const response = await fetch(`${API_BASE_URL}/players/${player.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(player),
      });

      if (!response.ok) {
        throw new Error('Failed to update player');
      }

      const updatedPlayer = await response.json();
      
      setPlayers(prev => 
        prev.map(p => p.id === updatedPlayer.id ? updatedPlayer : p)
      );

      return updatedPlayer;
    } catch (err) {
      console.error('Error updating player:', err);
      throw err;
    }
  };

  const reorderPlayers = async (updatedPlayers: Player[]) => {
    try {
      const response = await fetch(`${API_BASE_URL}/players/reorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlayers),
      });

      if (!response.ok) {
        throw new Error('Failed to reorder players');
      }

      setPlayers(prev => {
        const updated = [...prev];
        updatedPlayers.forEach(updatedPlayer => {
          const index = updated.findIndex(p => p.id === updatedPlayer.id);
          if (index !== -1) {
            updated[index] = { ...updated[index], ...updatedPlayer };
          }
        });
        return updated;
      });
    } catch (err) {
      console.error('Error reordering players:', err);
      throw err;
    }
  };

  const swapPlayers = async (player1Id: string, player2Id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/players/swap`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player1Id, player2Id }),
      });

      if (!response.ok) {
        throw new Error('Failed to swap players');
      }

      const result = await response.json();
      
      // Update local state with swapped players
      setPlayers(prev => 
        prev.map(p => {
          if (p.id === result.player1.id) return result.player1;
          if (p.id === result.player2.id) return result.player2;
          return p;
        })
      );
    } catch (err) {
      console.error('Error swapping players:', err);
      throw err;
    }
  };

  const movePlayer = async (playerId: string, newPosition: string, newOrder: number) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    const oldPosition = player.position;
    const oldOrder = player.order;

    const updates: Player[] = [];

    if (oldPosition === newPosition) {
      const positionPlayers = players
        .filter(p => p.position === newPosition)
        .sort((a, b) => a.order - b.order);

      positionPlayers.forEach((p, index) => {
        if (p.id === playerId) {
          updates.push({ ...p, order: newOrder });
        } else if (oldOrder < newOrder) {
          if (p.order > oldOrder && p.order <= newOrder) {
            updates.push({ ...p, order: p.order - 1 });
          }
        } else {
          if (p.order >= newOrder && p.order < oldOrder) {
            updates.push({ ...p, order: p.order + 1 });
          }
        }
      });
    } else {
      updates.push({ ...player, position: newPosition, order: newOrder });

      players
        .filter(p => p.position === newPosition && p.order >= newOrder)
        .forEach(p => {
          updates.push({ ...p, order: p.order + 1 });
        });

      players
        .filter(p => p.position === oldPosition && p.order > oldOrder)
        .forEach(p => {
          updates.push({ ...p, order: p.order - 1 });
        });
    }

    await reorderPlayers(updates);
  };

  return {
    players,
    loading,
    error,
    updatePlayer,
    reorderPlayers,
    movePlayer,
    swapPlayers,
    refetch: fetchPlayers,
  };
};
