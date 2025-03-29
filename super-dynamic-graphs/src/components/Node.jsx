const Node = ({ x, y, color, icon, onMouseDown }) => {
  const ICON_SIZE = 24;
  const NODE_RADIUS = 20;

  return (
    <g transform={`translate(${x},${y})`}>
      <circle
        r={NODE_RADIUS}
        fill={color || '#ff4444'}
        stroke="#fff"
        strokeWidth="2"
        onMouseDown={onMouseDown}
        style={{ cursor: 'grab' }}
      />
      {icon && (
        <image
          href={icon}
          x={-ICON_SIZE/2}
          y={-ICON_SIZE/2}
          width={ICON_SIZE}
          height={ICON_SIZE}
          preserveAspectRatio="xMidYMid meet"
          pointerEvents="none" // Add this line
        />
      )}
    </g>
  );
};

export default Node;