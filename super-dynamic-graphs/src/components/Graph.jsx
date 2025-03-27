import { useState, useEffect, useRef } from 'react';
import Node from './Node';
import Edge from './Edge';

const Graph = () => {
  const [nodes, setNodes] = useState([
    { id: 1, x: 400, y: 300, vx: 0, vy: 0, connections: [2] },
    { id: 2, x: 500, y: 400, vx: 0, vy: 0, connections: [1, 3] },
    { id: 3, x: 300, y: 400, vx: 0, vy: 0, connections: [2] }
  ]);

  const [edges] = useState([
    { from: 1, to: 2 },
    { from: 2, to: 3 }
  ]);

  const svgRef = useRef(null);
  const animationRef = useRef();
  const draggingNode = useRef(null);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Physics parameters
  const SPRING_STIFFNESS = 0.02;
  const REPULSION_FORCE = 10000; // Changed to 10000 as requested
  const DAMPING = 0.95;

  useEffect(() => {
    const animate = () => {
      setNodes(nodes => {
        return nodes.map(node => {
          if (draggingNode.current === node.id) return node;

          let newVx = node.vx * DAMPING;
          let newVy = node.vy * DAMPING;

          // Node repulsion
          nodes.forEach(other => {
            if (node.id === other.id) return;
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            const force = REPULSION_FORCE / (distance * distance);
            
            newVx += (dx / distance) * force;
            newVy += (dy / distance) * force;
          });

          // Spring forces from edges
          node.connections.forEach(connectedId => {
            const other = nodes.find(n => n.id === connectedId);
            if (!other) return;
            const dx = other.x - node.x;
            const dy = other.y - node.y;
            newVx += dx * SPRING_STIFFNESS;
            newVy += dy * SPRING_STIFFNESS;
          });

          return {
            ...node,
            x: node.x + newVx,
            y: node.y + newVy,
            vx: newVx,
            vy: newVy
          };
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (nodeId, e) => {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const { x, y } = pt.matrixTransform(svg.getScreenCTM().inverse());

    // Find the node being dragged
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    // Calculate offset from mouse to node's center
    offset.current = {
      x: x - node.x,
      y: y - node.y
    };

    draggingNode.current = nodeId;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!draggingNode.current) return;
    
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const { x: mouseX, y: mouseY } = pt.matrixTransform(svg.getScreenCTM().inverse());

    setNodes(nodes => nodes.map(node => {
      if (node.id !== draggingNode.current) return node;
      
      // Update node position using current mouse position and offset
      return {
        ...node,
        x: mouseX - offset.current.x,
        y: mouseY - offset.current.y,
        vx: 0,
        vy: 0
      };
    }));
  };

  const handleMouseUp = () => {
    draggingNode.current = null;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <svg
        ref={svgRef}
        viewBox="0 0 1000 800"
        width="100%"
        height="100%"
        style={{ backgroundColor: '#1a1a1a' }}
      >
        {edges.map(edge => (
          <Edge
            key={`${edge.from}-${edge.to}`}
            nodes={nodes}
            from={edge.from}
            to={edge.to}
          />
        ))}
        {nodes.map(node => (
          <Node
            key={node.id}
            {...node}
            onMouseDown={(e) => handleMouseDown(node.id, e)}
          />
        ))}
      </svg>
    </div>
  );
};

export default Graph;