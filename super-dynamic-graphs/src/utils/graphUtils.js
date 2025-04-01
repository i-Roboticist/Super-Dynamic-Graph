export const transformGraphData = (apiData) => {
  const nodes = (apiData.nodes || []).map(node => ({
    id: node.id,
    x: node.x || Math.random() * 800 + 100,
    y: node.y || Math.random() * 600 + 100,
    color: node.color,
    icon: node.icon,
    name: node.name,
    difficulty: node.difficulty,
    videoId: node.videoId,
    prerequisites: node.prerequisites || [],
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

export const fetchGraphData = async () => {
  return {
    nodes: [
      { 
        id: 1,
        x: 300,
        y: 400,
        color: '#ff4444',
        icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        name: 'Derivatives',
        difficulty: 'Intermediate',
        prerequisites: ['Algebra Basics', 'Limits'],
        videoId: 'WUvTyaaNkzM'  // Updated video ID
      },
      { 
        id: 2,
        x: 500,
        y: 400,
        color: '#4CAF50',
        icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111615.png',
        name: 'Integrals',
        difficulty: 'Advanced',
        prerequisites: ['Derivatives', 'Limits'],
        videoId: 'rfG8ce4nNh0'  // Correct video ID
      },
      { 
        id: 3,
        x: 700,
        y: 400,
        color: '#2196F3',
        icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png',
        name: 'Differential Equations',
        difficulty: 'Expert',
        prerequisites: ['Derivatives', 'Integrals'],
        videoId: 'p_di4Zn4wz4'  // Correct video ID
      }
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 1, to: 3 }
    ]
  };
};