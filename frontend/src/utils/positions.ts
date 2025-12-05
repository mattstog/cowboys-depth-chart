import { PositionGroup } from '../types/player';

export const POSITION_GROUPS: PositionGroup[] = [
  // Offense
  {
    name: 'Quarterbacks',
    positions: ['QB'],
    phase: 'offense',
  },
  {
    name: 'Running Backs',
    positions: ['RB'],
    phase: 'offense',
  },
  {
    name: 'Wide Receivers',
    positions: ['Z', 'X'],
    phase: 'offense',
  },
  {
    name: 'Tight Ends',
    positions: ['TE'],
    phase: 'offense',
  },
  {
    name: 'Fullbacks',
    positions: ['FB'],
    phase: 'offense',
  },
  {
    name: 'Offensive Line',
    positions: ['LT', 'LG', 'OC', 'RG', 'RT'],
    phase: 'offense',
  },
  
  // Defense
  {
    name: 'Defensive Line',
    positions: ['LDE', '1-TECH', '3-TECH', 'RDE'],
    phase: 'defense',
  },
  {
    name: 'Linebackers',
    positions: ['WLB', 'MLB', 'SLB'],
    phase: 'defense',
  },
  {
    name: 'Defensive Backs',
    positions: ['LCB', 'SS', 'FS', 'RCB'],
    phase: 'defense',
  },
  
  // Special Teams
  {
    name: 'Special Teams',
    positions: ['K', 'P', 'LS'],
    phase: 'special-teams',
  },
];

// Map database position codes to display names (ESPN style)
export const POSITION_DISPLAY_NAMES: Record<string, string> = {
  // Offense
  'QB': 'QB',
  'RB': 'RB',
  'FB': 'FB',
  'X': 'WR',
  'Z': 'WR',
  'TE': 'TE',
  'LT': 'LT',
  'LG': 'LG',
  'OC': 'C',
  'RG': 'RG',
  'RT': 'RT',
  
  // Defense
  'LDE': 'LDE',
  '1-TECH': 'LDT',
  '3-TECH': 'RDT',
  'RDE': 'RDE',
  'WLB': 'WLB',
  'MLB': 'MLB',
  'SLB': 'SLB',
  'LCB': 'LCB',
  'RCB': 'RCB',
  'SS': 'SS',
  'FS': 'FS',
  
  // Special Teams
  'K': 'PK',
  'P': 'P',
  'LS': 'LS',
};

export const getPositionDisplayName = (position: string): string => {
  return POSITION_DISPLAY_NAMES[position] || position;
};

export const getPositionGroup = (position: string): PositionGroup | undefined => {
  return POSITION_GROUPS.find(group => 
    group.positions.includes(position)
  );
};

export const getPositionsByPhase = (phase: string) => {
  return POSITION_GROUPS.filter(group => group.phase === phase);
};

export const STATUS_LABELS: Record<string, { label: string; color: string; fullLabel: string }> = {
  'A': { label: 'A', color: 'bg-green-100 text-green-800', fullLabel: 'Active' },
  'P': { label: 'PS', color: 'bg-blue-100 text-blue-800', fullLabel: 'Practice Squad' },
  'I': { label: 'IR', color: 'bg-red-100 text-red-800', fullLabel: 'Injured Reserve' },
  'R': { label: 'IR', color: 'bg-red-100 text-red-800', fullLabel: 'Injured Reserve' },
};

// Get unique status labels for display (no duplicates)
export const getUniqueStatusLabels = () => {
  const seen = new Set<string>();
  const unique: Array<{ code: string; label: string; color: string; fullLabel: string }> = [];
  
  Object.entries(STATUS_LABELS).forEach(([code, info]) => {
    if (!seen.has(info.label)) {
      seen.add(info.label);
      unique.push({ code, ...info });
    }
  });
  
  return unique;
};
