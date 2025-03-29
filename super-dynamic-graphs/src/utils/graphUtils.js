// src/utils/graphUtils.js

// Transform API response to internal format
export const transformGraphData = (apiData) => {
  const nodes = (apiData.nodes || []).map(node => ({
    id: node.id,
    x: node.x || Math.random() * 800 + 100,
    y: node.y || Math.random() * 600 + 100,
    color: node.color, // Add color property
    icon: node.icon,   // Add icon property
    vx: 0,
    vy: 0,
    connections: [
      ...new Set([
          ...(node.connections || []),
          ...(apiData.edges || [])
            .filter(e => e.from === node.id)
            .map(e => e.to),
          ...(apiData.edges || [])
            .filter(e => e.to === node.id)
            .map(e => e.from)
        ])
      ]
    }));
  
    const edges = (apiData.edges || []).map(edge => ({
      from: edge.from,
      to: edge.to
    }));
  
    return { nodes, edges };
  };
  
  // In src/utils/graphUtils.js
// In src/utils/graphUtils.js
export const fetchGraphData = async () => {
  return {
    nodes: [
      { 
        id: 1, 
        x: 300, 
        y: 400,
        color: '#ff4444',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png' // Red node with GitHub icon
      },
      { 
        id: 2, 
        x: 500, 
        y: 400,
        color: '#4CAF50',
        icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111615.png' // Green node with Slack icon
      },
      { 
        id: 3, 
        x: 700, 
        y: 400,
        color: '#2196F3',
        icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png' // Blue node with Twitter icon
      }
    ],
    edges: [
      { from: 1, to: 2 },  // Connect left to center
      { from: 2, to: 3 },  // Connect center to right
      { from: 1, to: 3 }   // Cross-connect left to right
    ]
  };
};