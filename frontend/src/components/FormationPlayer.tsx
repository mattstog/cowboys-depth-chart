import { Player } from '../types/player';

interface FormationPlayerProps {
  player: Player | null;
  position: string;
  onClick: () => void;
  x: number;
  y: number;
  isOffense?: boolean;
}

export const FormationPlayer = ({ player, position, onClick, x, y, isOffense = false }: FormationPlayerProps) => {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{ cursor: 'pointer' }}
    >
      {/* Invisible larger hitbox for easier clicking */}
      <circle
        cx="0"
        cy="0"
        r="45"
        fill="transparent"
      />
      
      {/* Position circle - with silver border for offense */}
      <circle
        cx="0"
        cy="0"
        r="35"
        fill={player ? 'white' : '#E5E7EB'}
        stroke={isOffense ? '#869397' : '#041E42'}
        strokeWidth="3"
      />
      
      {/* Position label above */}
      <text
        x="0"
        y="-45"
        textAnchor="middle"
        fontSize="13"
        fontWeight="bold"
        fill="white"
        style={{ 
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          pointerEvents: 'none'
        }}
      >
        {position}
      </text>
      
      {/* Player info */}
      {player ? (
        <>
          {/* Jersey number on top */}
          <text
            x="0"
            y="-6"
            textAnchor="middle"
            fontSize="16"
            fontWeight="bold"
            fill="#041E42"
            style={{ pointerEvents: 'none' }}
          >
            #{player.jersey}
          </text>
          {/* Last name on bottom */}
          <text
            x="0"
            y="12"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="#041E42"
            style={{ pointerEvents: 'none' }}
          >
            {player.lastName.toUpperCase()}
          </text>
        </>
      ) : (
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fontSize="14"
          fill="#6B7280"
          dominantBaseline="middle"
          style={{ pointerEvents: 'none' }}
        >
          -
        </text>
      )}
    </g>
  );
};
