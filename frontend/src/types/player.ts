export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  jersey: number;
  position: string;
  order: number;
  status: string;
}

export type Phase = 'offense' | 'defense' | 'special-teams';

export interface PositionGroup {
  name: string;
  positions: string[];
  phase: Phase;
}
