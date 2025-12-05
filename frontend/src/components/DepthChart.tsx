import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Player, Phase } from '../types/player';
import { useDepthChart } from '../hooks/useDepthChart';
import { PhaseSection } from './PhaseSection';
import { PlayerCard } from './PlayerCard';
import { Header } from './Header';
import { StatusKey } from './StatusKey';
import { TabNavigation } from './TabNavigation';
import { FormationView } from './FormationView';
import { getPositionGroup } from '../utils/positions';

const PHASES: Phase[] = ['offense', 'defense', 'special-teams'];

export const DepthChart = () => {
  const { players, loading, error, movePlayer, swapPlayers, refetch } = useDepthChart();
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'formation'>('list');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const player = players.find(p => p.id === event.active.id);
    if (player) {
      setActivePlayer(player);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActivePlayer(null);

    if (!over || active.id === over.id) {
      return;
    }

    const activePlayer = players.find(p => p.id === active.id);
    if (!activePlayer) return;

    const isPosition = typeof over.id === 'string' && !players.some(p => p.id === over.id);

    if (isPosition) {
      const newPosition = over.id as string;
      const playersInNewPosition = players.filter(p => p.position === newPosition);
      const newOrder = playersInNewPosition.length + 1;

      try {
        await movePlayer(activePlayer.id, newPosition, newOrder);
      } catch (err) {
        console.error('Failed to move player:', err);
      }
    } else {
      const overPlayer = players.find(p => p.id === over.id);
      if (!overPlayer) return;

      const isSamePosition = activePlayer.position === overPlayer.position;

      if (isSamePosition) {
        const positionPlayers = players
          .filter(p => p.position === activePlayer.position)
          .sort((a, b) => a.order - b.order);

        const oldIndex = positionPlayers.findIndex(p => p.id === activePlayer.id);
        const newIndex = positionPlayers.findIndex(p => p.id === overPlayer.id);

        if (oldIndex !== newIndex) {
          arrayMove(positionPlayers, oldIndex, newIndex);
          
          try {
            await movePlayer(activePlayer.id, activePlayer.position, newIndex + 1);
          } catch (err) {
            console.error('Failed to reorder player:', err);
          }
        }
      } else {
        try {
          await movePlayer(activePlayer.id, overPlayer.position, overPlayer.order);
        } catch (err) {
          console.error('Failed to move player:', err);
        }
      }
    }
  };

  const handleDragCancel = () => {
    setActivePlayer(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cowboys-navy mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading depth chart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="bg-cowboys-navy text-white px-6 py-2 rounded-lg hover:bg-cowboys-blue transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const getPlayersByPhase = (phase: Phase) => {
    return players.filter(player => {
      const group = getPositionGroup(player.position);
      return group?.phase === phase;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'list' ? (
          <>
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              {PHASES.map(phase => (
                <PhaseSection
                  key={phase}
                  phase={phase}
                  players={getPlayersByPhase(phase)}
                />
              ))}

              <DragOverlay>
                {activePlayer ? (
                  <div className="rotate-3 scale-105">
                    <PlayerCard
                      player={activePlayer}
                      index={activePlayer.order - 1}
                    />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
            
            {/* Status Key only on List View */}
            <StatusKey />
          </>
        ) : (
          <FormationView players={players} onPlayerSwap={swapPlayers} />
        )}
      </main>

      <footer className="bg-cowboys-navy text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white text-sm">
            Developed by <span className="font-semibold">Matthew Stogner</span>
          </p>
          <p className="text-cowboys-silver text-xs mt-1">
            © {new Date().getFullYear()} Dallas Cowboys Interactive Depth Chart
          </p>
        </div>
      </footer>
    </div>
  );
};
