import { useState } from 'react';

const Node = ({ x, y, color, icon, onMouseDown, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ICON_SIZE = 24;
  const NODE_RADIUS = 20;

  return (
    <g 
      transform={`translate(${x},${y})`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'grab' }}
      onClick={onClick}
    >
      {isHovered && (
        <circle
          r={NODE_RADIUS + 5}
          fill={color || '#ff4444'}
          opacity="0.3"
          filter="url(#glow)"
        />
      )}
      
      <circle
        r={NODE_RADIUS}
        fill={color || '#ff4444'}
        stroke="#fff"
        strokeWidth="2"
        onMouseDown={onMouseDown}
      />
      
      {icon && (
        <image
          href={icon}
          x={-ICON_SIZE/2}
          y={-ICON_SIZE/2}
          width={ICON_SIZE}
          height={ICON_SIZE}
          preserveAspectRatio="xMidYMid meet"
          pointerEvents="none"
        />
      )}
    </g>
  );
};

export default Node;