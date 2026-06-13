import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Simple deterministic LCG PRNG to ensure react purity rules
const lcg = (seed) => {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
};

// Helper to create line geometry from a list of point pairs
const createLineGeometry = (pairs) => {
  const points = [];
  pairs.forEach(([p1, p2]) => {
    points.push(new THREE.Vector3(...p1));
    points.push(new THREE.Vector3(...p2));
  });
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return geometry;
};

const StageLines = ({ scrollProgress }) => {
  // Use separate refs to avoid reassigning ref objects in render
  const embeddingsRef = useRef();
  const transformerRef = useRef();
  const ragRef = useRef();
  const agentRef = useRef();
  const projectsRef = useRef();
  const ecosystemRef = useRef();

  // 1. Embeddings (Stage 2) - Lines connecting close nodes in clusters
  const embeddingsGeometry = useMemo(() => {
    const nextRand = lcg(1);
    const pairs = [];
    const centers = [
      [1.5, 1.5, 0],
      [-1.5, 1.5, 1],
      [-1.5, -1.5, -1],
      [1.5, -1.5, 0.5]
    ];
    // Generate some random web connections within each cluster center
    centers.forEach(center => {
      const numPoints = 8;
      const points = [];
      for (let i = 0; i < numPoints; i++) {
        const theta = (i / numPoints) * Math.PI * 2;
        const r = 0.4 + nextRand() * 0.3;
        points.push([
          center[0] + Math.cos(theta) * r,
          center[1] + Math.sin(theta) * r,
          center[2] + (nextRand() - 0.5) * 0.4
        ]);
      }
      // Connect points to center and to each other
      points.forEach(p => {
        pairs.push([center, p]);
      });
      for (let i = 0; i < numPoints; i++) {
        pairs.push([points[i], points[(i + 1) % numPoints]]);
        if (i % 2 === 0) {
          pairs.push([points[i], points[(i + 3) % numPoints]]);
        }
      }
    });
    return createLineGeometry(pairs);
  }, []);

  // 2. Transformer (Stage 3) - Attention Ring connections
  const transformerGeometry = useMemo(() => {
    const pairs = [];
    const radius = 2.0;
    const numNodes = 8;
    const nodes = [];
    for (let i = 0; i < numNodes; i++) {
      const angle = (i / numNodes) * Math.PI * 2;
      nodes.push([Math.cos(angle) * radius, Math.sin(angle) * radius, 0]);
    }
    // Connect nodes in a circle and draw internal attention lines
    for (let i = 0; i < numNodes; i++) {
      pairs.push([nodes[i], nodes[(i + 1) % numNodes]]);
      // Connect to opposite nodes for attention
      pairs.push([nodes[i], nodes[(i + 4) % numNodes]]);
      pairs.push([nodes[i], nodes[(i + 3) % numNodes]]);
      pairs.push([nodes[i], nodes[(i + 5) % numNodes]]);
    }
    return createLineGeometry(pairs);
  }, []);

  // 3. RAG (Stage 5) - Thick pipeline paths
  const ragGeometry = useMemo(() => {
    const pairs = [];
    const node0 = [-3, 1.5, 0];    // User
    const node1 = [-1, 0, 0];      // Retriever
    const node2 = [-1, -2, 0];     // Vector DB
    const node3 = [1, 0, 0];       // LLM
    const node4 = [3, 1.5, 0];     // Response

    // Helper to generate double/triple lines for a "pipe" effect
    const addPipe = (p1, p2, offset = 0.05) => {
      pairs.push([p1, p2]);
      pairs.push([
        [p1[0], p1[1] + offset, p1[2]],
        [p2[0], p2[1] + offset, p2[2]]
      ]);
      pairs.push([
        [p1[0], p1[1] - offset, p1[2]],
        [p2[0], p2[1] - offset, p2[2]]
      ]);
    };

    addPipe(node0, node1);
    addPipe(node1, node2);
    addPipe(node1, node3);
    addPipe(node3, node4);

    return createLineGeometry(pairs);
  }, []);

  // 4. Agentic AI (Stage 6) - Agent web
  const agentGeometry = useMemo(() => {
    const pairs = [];
    const agentRadius = 1.3;
    const numAgents = 5;
    const agents = [];
    for (let i = 0; i < numAgents; i++) {
      const angle = (i / numAgents) * Math.PI * 2 - Math.PI / 2;
      agents.push([Math.cos(angle) * agentRadius, Math.sin(angle) * agentRadius, 0]);
    }

    const toolRadius = 3.0;
    const tools = [];
    for (let i = 0; i < numAgents; i++) {
      const angle = (i / numAgents) * Math.PI * 2 - Math.PI / 2 + (Math.PI / 5);
      tools.push([Math.cos(angle) * toolRadius, Math.sin(angle) * toolRadius, 0]);
    }

    // Connect agents in a star/ring
    for (let i = 0; i < numAgents; i++) {
      pairs.push([agents[i], agents[(i + 1) % numAgents]]);
      pairs.push([agents[i], agents[(i + 2) % numAgents]]);
    }

    // Connect agents to corresponding tools
    for (let i = 0; i < numAgents; i++) {
      pairs.push([agents[i], tools[i]]);
      pairs.push([agents[i], tools[(i + 1) % numAgents]]);
    }

    return createLineGeometry(pairs);
  }, []);

  // 5. Projects (Stage 7) - 3 Project nodes
  const projectsGeometry = useMemo(() => {
    const nextRand = lcg(2);
    const pairs = [];
    const centers = [
      [-2.5, -0.5, 0],
      [0, 1.8, 0],
      [2.5, -0.5, 0]
    ];

    centers.forEach(center => {
      const points = [];
      const numPoints = 6;
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const r = 0.5;
        points.push([
          center[0] + Math.cos(angle) * r,
          center[1] + Math.sin(angle) * r,
          center[2] + (nextRand() - 0.5) * 0.1
        ]);
      }
      points.forEach(p => {
        pairs.push([center, p]);
      });
      for (let i = 0; i < numPoints; i++) {
        pairs.push([points[i], points[(i + 1) % numPoints]]);
        pairs.push([points[i], points[(i + 3) % numPoints]]);
      }
    });

    return createLineGeometry(pairs);
  }, []);

  // 6. Ecosystem (Final Stage) - Dynamic constellation-like sphere web
  const ecosystemGeometry = useMemo(() => {
    const nextRand = lcg(3);
    const pairs = [];
    const numPoints = 35;
    const points = [];

    // Generate random points on a sphere
    for (let i = 0; i < numPoints; i++) {
      const u = nextRand();
      const v = nextRand();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.8;
      points.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ]);
    }

    // Connect close points
    for (let i = 0; i < numPoints; i++) {
      for (let j = i + 1; j < numPoints; j++) {
        const dx = points[i][0] - points[j][0];
        const dy = points[i][1] - points[j][1];
        const dz = points[i][2] - points[j][2];
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < 3.5) { // distance threshold squared
          pairs.push([points[i], points[j]]);
        }
      }
    }
    return createLineGeometry(pairs);
  }, []);

  // Animate line opacities based on current scroll segment
  useFrame(() => {
    const p = scrollProgress.current; // 0 to 1
    const progress = p * 7;
    const index = Math.min(Math.floor(progress), 6);
    const factor = progress - index;

    // Reset all opacities
    const refs = [embeddingsRef, transformerRef, ragRef, agentRef, projectsRef, ecosystemRef];
    refs.forEach(ref => {
      if (ref.current) {
        ref.current.material.opacity = 0;
        ref.current.visible = false;
      }
    });

    // Helpers to fade lines in and out
    const setOpacity = (ref, opacity) => {
      if (ref.current && opacity > 0.01) {
        ref.current.visible = true;
        ref.current.material.opacity = opacity;
      }
    };

    // Stage 1 -> Stage 2 (Index 0 to 1)
    if (index === 0) {
      setOpacity(embeddingsRef, factor);
    }
    // Stage 2 -> Stage 3 (Index 1 to 2)
    else if (index === 1) {
      setOpacity(embeddingsRef, 1 - factor);
      setOpacity(transformerRef, factor);
    }
    // Stage 3 -> Stage 4 (Index 2 to 3)
    else if (index === 2) {
      setOpacity(transformerRef, 1 - factor);
    }
    // Stage 4 -> Stage 5 (Index 3 to 4)
    else if (index === 3) {
      setOpacity(ragRef, factor);
    }
    // Stage 5 -> Stage 6 (Index 4 to 5)
    else if (index === 4) {
      setOpacity(ragRef, 1 - factor);
      setOpacity(agentRef, factor);
    }
    // Stage 6 -> Stage 7 (Index 5 to 6)
    else if (index === 5) {
      setOpacity(agentRef, 1 - factor);
      setOpacity(projectsRef, factor);
    }
    // Stage 7 -> Final Stage (Index 6)
    else if (index === 6) {
      setOpacity(projectsRef, 1 - factor);
      setOpacity(ecosystemRef, factor);
    }
  });

  return (
    <group>
      {/* Embeddings Lines */}
      <lineSegments ref={embeddingsRef} geometry={embeddingsGeometry}>
        <lineBasicMaterial
          color="#a855f7"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Transformer Lines */}
      <lineSegments ref={transformerRef} geometry={transformerGeometry}>
        <lineBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* RAG Lines */}
      <lineSegments ref={ragRef} geometry={ragGeometry}>
        <lineBasicMaterial
          color="#10b981"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Agentic AI Lines */}
      <lineSegments ref={agentRef} geometry={agentGeometry}>
        <lineBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Projects Lines */}
      <lineSegments ref={projectsRef} geometry={projectsGeometry}>
        <lineBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Ecosystem Lines */}
      <lineSegments ref={ecosystemRef} geometry={ecosystemGeometry}>
        <lineBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

export default StageLines;
