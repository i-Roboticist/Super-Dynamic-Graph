// src/utils/graphUtils.js

// Transform API response to internal format
export const transformGraphData = (apiData) => {
    const nodes = (apiData.nodes || []).map(node => ({
      id: node.id,
      x: node.x || Math.random() * 800 + 100,
      y: node.y || Math.random() * 600 + 100,
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
        { id: 1, x: 300, y: 400 },  // Left
        { id: 2, x: 500, y: 400 },  // Center
        { id: 3, x: 700, y: 400 },  // Right
        { id: 4, x: 400, y: 300 },  // Top-left
        { id: 5, x: 600, y: 300 },  // Top-right
        { id: 6, x: 400, y: 500 },  // Bottom-left
        { id: 7, x: 600, y: 500 }   // Bottom-right
      ],
      edges: [
        // Horizontal connections
        { from: 1, to: 2 }, { from: 2, to: 3 },
        // Upper triangle
        { from: 1, to: 4 }, { from: 4, to: 2 }, { from: 2, to: 5 }, { from: 5, to: 3 },
        // Lower triangle
        { from: 1, to: 6 }, { from: 6, to: 2 }, { from: 2, to: 7 }, { from: 7, to: 3 },
        // Cross connections
        { from: 4, to: 5 }, { from: 6, to: 7 }
      ]
    };
  };