const Node = ({ x, y, onMouseDown }) => {
    return (
      <circle
        cx={x}
        cy={y}
        r="20"
        fill="#ff4444"
        stroke="#fff"
        strokeWidth="2"
        onMouseDown={onMouseDown}
        style={{ cursor: 'grab' }}
      />
    );
  };
  
  export default Node;