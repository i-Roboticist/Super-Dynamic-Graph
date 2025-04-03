const Edge = ({ nodes, from, to }) => {
    const node1 = nodes.find(n => n.id === from);
    const node2 = nodes.find(n => n.id === to);
  
    if (!node1 || !node2) return null;
  
    return (
      <line
        x1={node1.x}
        y1={node1.y}
        x2={node2.x}
        y2={node2.y}
        stroke="#666"
        strokeWidth="2"
      />
    );
  };
  
  export default Edge;