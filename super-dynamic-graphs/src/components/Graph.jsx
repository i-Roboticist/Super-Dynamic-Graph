import { useState, useEffect, useRef } from 'react';
import Node from './Node';
import Edge from './Edge';
import { fetchGraphData, transformGraphData } from '../utils/graphUtils';

const Graph = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const svgRef = useRef(null);
  const animationRef = useRef();
  const draggingNode = useRef(null);
  const offset = useRef({ x: 0, y: 0 });

  // Physics parameters
  const SPRING_STIFFNESS = 0.02;
  const REPULSION_FORCE = 10000;
  const DAMPING = 0.95;
  const MAX_SPEED = 20;

  // Fetch and initialize graph data
  useEffect(() => {
    const initializeGraph = async () => {
      try {
        const apiData = await fetchGraphData();
        const { nodes: transformedNodes, edges: transformedEdges } = transformGraphData(apiData);
        setNodes(transformedNodes);
        setEdges(transformedEdges);
      } catch (error) {
        console.error('Failed to load graph data:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    initializeGraph();
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setNodes(currentNodes => {
        return currentNodes.map(node => {
          if (draggingNode.current === node.id) return node;

          let newVx = node.vx * DAMPING;
          let newVy = node.vy * DAMPING;

          // Node repulsion
          currentNodes.forEach(other => {
            if (node.id === other.id) return;
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const force = REPULSION_FORCE / (distance * distance);
            
            newVx += (dx / distance) * force;
            newVy += (dy / distance) * force;
          });

          // Spring forces
          node.connections.forEach(connectedId => {
            const other = currentNodes.find(n => n.id === connectedId);
            if (!other) return;
            const dx = other.x - node.x;
            const dy = other.y - node.y;
            newVx += dx * SPRING_STIFFNESS;
            newVy += dy * SPRING_STIFFNESS;
          });

          // Speed cap
          const speed = Math.sqrt(newVx ** 2 + newVy ** 2);
          if (speed > MAX_SPEED) {
            newVx = (newVx / speed) * MAX_SPEED;
            newVy = (newVy / speed) * MAX_SPEED;
          }

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

    if (!isLoading && !isError) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [isLoading, isError]);

  // Drag handlers
  const handleMouseDown = (nodeId, e) => {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const { x, y } = pt.matrixTransform(svg.getScreenCTM().inverse());

    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    offset.current = { x: x - node.x, y: y - node.y };
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

    setNodes(currentNodes => currentNodes.map(node => 
      node.id === draggingNode.current ? {
        ...node,
        x: mouseX - offset.current.x,
        y: mouseY - offset.current.y,
        vx: 0,
        vy: 0
      } : node
    ));
  };

  const handleMouseUp = () => {
    draggingNode.current = null;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  if (isLoading) return <div className="graph-loading">Loading graph visualization...</div>;
  if (isError) return <div className="graph-error">Failed to load graph data</div>;

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <svg
        ref={svgRef}
        viewBox="0 0 1000 800"
        width="100%"
        height="100%"
        style={{ backgroundColor: '#1a1a1a' }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
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