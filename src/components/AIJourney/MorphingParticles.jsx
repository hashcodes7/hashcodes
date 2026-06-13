import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const N = 1800;

// Simple deterministic LCG PRNG to ensure React purity guidelines
const lcg = (seed) => {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
};

// Helper to create a radial glow texture dynamically to avoid loading external files
const createGlowTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.18, 'rgba(255, 255, 255, 0.95)'); // Denser core for more visibility
  grad.addColorStop(0.45, 'rgba(255, 255, 255, 0.35)'); // Brighter aura falloff
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

// Helper for HSL color conversion to RGB array
const hslToRgb = (h, s, l) => {
  const c = new THREE.Color().setHSL(h / 360, s / 100, l / 100);
  return [c.r, c.g, c.b];
};

const MorphingParticles = ({ scrollProgress, hoveredProject, setHoveredProject, onProjectClick }) => {
  const geometryRef = useRef();
  const pointsRef = useRef();
  const groupRef = useRef();

  const glowTexture = useMemo(() => createGlowTexture(), []);

  // Precompute positions and colors for all 8 stages
  const stages = useMemo(() => {
    const nextRand = lcg(42);
    const positions = Array.from({ length: 8 }, () => new Float32Array(N * 3));
    const colors = Array.from({ length: 8 }, () => new Float32Array(N * 3));

    for (let i = 0; i < N; i++) {
      const i3 = i * 3;

      // ----------------------------------------------------
      // STAGE 0: Data Ingestion (Hollow cube + orbits)
      // ----------------------------------------------------
      if (i < 1000) {
        // Place on the surface of a cube
        const face = i % 6;
        const u = nextRand() * 2 - 1; // -1 to 1
        const v = nextRand() * 2 - 1; // -1 to 1
        const size = 1.0;

        if (face === 0) { positions[0][i3] = size; positions[0][i3+1] = u; positions[0][i3+2] = v; }
        else if (face === 1) { positions[0][i3] = -size; positions[0][i3+1] = u; positions[0][i3+2] = v; }
        else if (face === 2) { positions[0][i3] = u; positions[0][i3+1] = size; positions[0][i3+2] = v; }
        else if (face === 3) { positions[0][i3] = u; positions[0][i3+1] = -size; positions[0][i3+2] = v; }
        else if (face === 4) { positions[0][i3] = u; positions[0][i3+1] = v; positions[0][i3+2] = size; }
        else { positions[0][i3] = u; positions[0][i3+1] = v; positions[0][i3+2] = -size; }
      } else {
        // Orbiting particles (initial positions)
        const orbitRadius = 2.5 + (i % 5) * 0.3;
        const angle = i * 0.1;
        positions[0][i3] = orbitRadius * Math.cos(angle);
        positions[0][i3+1] = orbitRadius * Math.sin(angle) * 0.5;
        positions[0][i3+2] = orbitRadius * Math.sin(angle) * 0.866;
      }
      // Stage 0 Colors: Grayish-white, with subtle orange accents (increased lightness)
      const s0Color = i % 10 === 0 ? hslToRgb(24, 95, 68) : hslToRgb(0, 0, 90 - (i % 25));
      colors[0][i3] = s0Color[0]; colors[0][i3+1] = s0Color[1]; colors[0][i3+2] = s0Color[2];

      // ----------------------------------------------------
      // STAGE 1: Embeddings & Vector Search (4 Semantic clusters)
      // ----------------------------------------------------
      const clusterIdx = i % 4;
      const centers = [
        [1.5, 1.5, 0],
        [-1.5, 1.5, 1],
        [-1.5, -1.5, -1],
        [1.5, -1.5, 0.5]
      ];
      const center = centers[clusterIdx];
      // Distribute in a spherical cloud around the center
      const u1 = nextRand();
      const v1 = nextRand();
      const theta1 = u1 * Math.PI * 2;
      const phi1 = Math.acos(2 * v1 - 1);
      const r1 = 0.1 + nextRand() * 0.65;

      positions[1][i3] = center[0] + r1 * Math.sin(phi1) * Math.cos(theta1);
      positions[1][i3+1] = center[1] + r1 * Math.sin(phi1) * Math.sin(theta1);
      positions[1][i3+2] = center[2] + r1 * Math.cos(phi1);

      // Stage 1 Colors: Purple, Indigo, Magenta, Cyan gradients (increased lightness)
      const s1Colors = [
        hslToRgb(270, 90, 70), // Purple
        hslToRgb(240, 85, 65), // Indigo
        hslToRgb(320, 90, 70), // Magenta
        hslToRgb(180, 95, 65)  // Cyan
      ];
      colors[1][i3] = s1Colors[clusterIdx][0];
      colors[1][i3+1] = s1Colors[clusterIdx][1];
      colors[1][i3+2] = s1Colors[clusterIdx][2];

      // ----------------------------------------------------
      // STAGE 2: Transformer Architecture (8 Attention nodes in a ring)
      // ----------------------------------------------------
      const ringNode = i % 8;
      const ringAngle = (ringNode / 8) * Math.PI * 2;
      const ringRadius = 2.0;
      const nodeX = Math.cos(ringAngle) * ringRadius;
      const nodeY = Math.sin(ringAngle) * ringRadius;

      const u2 = nextRand();
      const v2 = nextRand();
      const theta2 = u2 * Math.PI * 2;
      const r2 = 0.05 + nextRand() * 0.3;

      positions[2][i3] = nodeX + r2 * Math.cos(theta2);
      positions[2][i3+1] = nodeY + r2 * Math.sin(theta2);
      positions[2][i3+2] = (v2 - 0.5) * 0.3;

      // Stage 2 Colors: Cyan/Teal/Indigo/Orange accents (increased lightness)
      const s2Color = ringNode % 2 === 0 ? hslToRgb(190, 95, 62) : hslToRgb(230, 85, 65);
      colors[2][i3] = s2Color[0]; colors[2][i3+1] = s2Color[1]; colors[2][i3+2] = s2Color[2];

      // ----------------------------------------------------
      // STAGE 3: Foundation Models (Energy core sphere + rings)
      // ----------------------------------------------------
      if (i < 1000) {
        // Core sphere
        const u3 = nextRand();
        const v3 = nextRand();
        const theta3 = u3 * Math.PI * 2;
        const phi3 = Math.acos(2 * v3 - 1);
        const r3 = nextRand() * 1.25;

        positions[3][i3] = r3 * Math.sin(phi3) * Math.cos(theta3);
        positions[3][i3+1] = r3 * Math.sin(phi3) * Math.sin(theta3);
        positions[3][i3+2] = r3 * Math.cos(phi3);
      } else {
        // Orbiting rings
        positions[3][i3] = 0;
        positions[3][i3+1] = 0;
        positions[3][i3+2] = 0;
      }
      // Stage 3 Colors: Orange, Amber, Deep Red (increased lightness)
      const s3Color = i < 1000 
        ? hslToRgb(20 + nextRand() * 15, 95, 62) 
        : hslToRgb(40, 95, 66);
      colors[3][i3] = s3Color[0]; colors[3][i3+1] = s3Color[1]; colors[3][i3+2] = s3Color[2];

      // ----------------------------------------------------
      // STAGE 4: RAG (5 Architecture nodes)
      // ----------------------------------------------------
      const ragNode = i % 5;
      const ragCenters = [
        [-3, 1.5, 0],
        [-1, 0, 0],
        [-1, -2, 0],
        [1, 0, 0],
        [3, 1.5, 0]
      ];
      const rCenter = ragCenters[ragNode];
      const u4 = nextRand();
      const theta4 = u4 * Math.PI * 2;
      const r4 = 0.05 + nextRand() * 0.4;

      positions[4][i3] = rCenter[0] + r4 * Math.cos(theta4);
      positions[4][i3+1] = rCenter[1] + r4 * Math.sin(theta4);
      positions[4][i3+2] = (nextRand() - 0.5) * 0.15;

      // Stage 4 Colors: Emerald, Green, Cyan (increased lightness)
      const s4Colors = [
        hslToRgb(200, 85, 62),
        hslToRgb(150, 90, 58),
        hslToRgb(270, 80, 62),
        hslToRgb(15, 95, 66),
        hslToRgb(160, 95, 58)
      ];
      colors[4][i3] = s4Colors[ragNode][0];
      colors[4][i3+1] = s4Colors[ragNode][1];
      colors[4][i3+2] = s4Colors[ragNode][2];

      // ----------------------------------------------------
      // STAGE 5: Agentic AI (5 central agents, 5 outer tools)
      // ----------------------------------------------------
      const agentNode = i % 10;
      let aX;
      let aY;
      if (agentNode < 5) {
        // Agent Node (inner pentagon)
        const angle = (agentNode / 5) * Math.PI * 2 - Math.PI / 2;
        aX = Math.cos(angle) * 1.3;
        aY = Math.sin(angle) * 1.3;
      } else {
        // Tool Node (outer pentagon)
        const angle = ((agentNode - 5) / 5) * Math.PI * 2 - Math.PI / 2 + Math.PI / 5;
        aX = Math.cos(angle) * 3.0;
        aY = Math.sin(angle) * 3.0;
      }
      const u5 = nextRand();
      const theta5 = u5 * Math.PI * 2;
      const r5 = agentNode < 5 ? (0.05 + nextRand() * 0.28) : (0.05 + nextRand() * 0.2);

      positions[5][i3] = aX + r5 * Math.cos(theta5);
      positions[5][i3+1] = aY + r5 * Math.sin(theta5);
      positions[5][i3+2] = (nextRand() - 0.5) * 0.2;

      // Stage 5 Colors: Royal Blue, Neon Blue, Teal, Magenta (increased lightness)
      const s5Color = agentNode < 5 ? hslToRgb(215, 95, 62) : hslToRgb(190, 95, 58);
      colors[5][i3] = s5Color[0]; colors[5][i3+1] = s5Color[1]; colors[5][i3+2] = s5Color[2];

      // ----------------------------------------------------
      // STAGE 6: Personal Projects (3 Large clustered nodes)
      // ----------------------------------------------------
      const projIdx = i % 3;
      const projCenters = [
        [-2.5, -0.5, 0],
        [0, 1.8, 0],
        [2.5, -0.5, 0]
      ];
      const pCenter = projCenters[projIdx];
      const u6 = nextRand();
      const v6 = nextRand();
      const theta6 = u6 * Math.PI * 2;
      const phi6 = Math.acos(2 * v6 - 1);
      const r6 = 0.05 + nextRand() * 0.45;

      positions[6][i3] = pCenter[0] + r6 * Math.sin(phi6) * Math.cos(theta6);
      positions[6][i3+1] = pCenter[1] + r6 * Math.sin(phi6) * Math.sin(theta6);
      positions[6][i3+2] = pCenter[2] + r6 * Math.cos(phi6) * 0.8;

      // Stage 6 Colors: Orange, Cyan, White/Gold (increased lightness)
      const s6Colors = [
        hslToRgb(24, 95, 62),
        hslToRgb(185, 95, 62),
        hslToRgb(280, 90, 66)
      ];
      colors[6][i3] = s6Colors[projIdx][0];
      colors[6][i3+1] = s6Colors[projIdx][1];
      colors[6][i3+2] = s6Colors[projIdx][2];

      // ----------------------------------------------------
      // STAGE 7: Final Stage (Massive glowing sphere / ecosystem)
      // ----------------------------------------------------
      const u7 = nextRand();
      const v7 = nextRand();
      const theta7 = u7 * Math.PI * 2;
      const phi7 = Math.acos(2 * v7 - 1);
      const r7 = 2.8;

      positions[7][i3] = r7 * Math.sin(phi7) * Math.cos(theta7);
      positions[7][i3+1] = r7 * Math.sin(phi7) * Math.sin(theta7);
      positions[7][i3+2] = r7 * Math.cos(phi7);

      // Stage 7 Colors: Holographic mix (increased lightness)
      const randColor = i % 4;
      const s7Colors = [
        hslToRgb(24, 95, 62),
        hslToRgb(270, 90, 66),
        hslToRgb(180, 95, 58),
        hslToRgb(330, 95, 62)
      ];
      colors[7][i3] = s7Colors[randColor][0];
      colors[7][i3+1] = s7Colors[randColor][1];
      colors[7][i3+2] = s7Colors[randColor][2];
    }

    return { positions, colors };
  }, []);

  // Initialize buffers
  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.attributes.position.copyArray(stages.positions[0]);
      geometryRef.current.attributes.color.copyArray(stages.colors[0]);
      geometryRef.current.attributes.position.needsUpdate = true;
      geometryRef.current.attributes.color.needsUpdate = true;
    }
  }, [stages]);

  // Morphing & Physics logic inside render loop
  useFrame((state) => {
    if (!geometryRef.current) return;

    const p = scrollProgress.current;
    const progress = p * 7;
    const index = Math.min(Math.floor(progress), 6);
    const factor = progress - index;

    const geom = geometryRef.current;
    const posAttr = geom.attributes.position;
    const colAttr = geom.attributes.color;
    const time = state.clock.getElapsedTime();

    // Mouse coordinates mapped to 3D space z=0 plane
    const { viewport } = state;
    const mouseX = (state.pointer.x * viewport.width) / 2;
    const mouseY = (state.pointer.y * viewport.height) / 2;

    // Rotate ecosystem in the final stage
    if (groupRef.current) {
      if (p > 0.85) {
        const ecosystemFactor = (p - 0.85) / 0.15;
        groupRef.current.rotation.y = time * 0.08 * ecosystemFactor;
        groupRef.current.rotation.x = time * 0.03 * ecosystemFactor;
      } else {
        groupRef.current.rotation.y = 0;
        groupRef.current.rotation.x = 0;
      }
    }

    // Dynamic morph calculations
    for (let i = 0; i < N; i++) {
      const i3 = i * 3;

      let ax = stages.positions[index][i3];
      let ay = stages.positions[index][i3+1];
      let az = stages.positions[index][i3+2];

      let bx = stages.positions[index + 1][i3];
      let by = stages.positions[index + 1][i3+1];
      let bz = stages.positions[index + 1][i3+2];

      // ----------------------------------------------------
      // Add custom deterministic dynamic behaviors
      // ----------------------------------------------------

      // 1. Orbiting particles in Stage 0
      if (index === 0 && i >= 1000) {
        const orbitRadius = 2.5 + (i % 5) * 0.35;
        const speed = 0.8 + (i % 3) * 0.3;
        const angle = (i * 0.15) + time * speed;
        const phi = i * 0.23;

        ax = orbitRadius * Math.cos(angle);
        ay = orbitRadius * Math.sin(angle) * Math.sin(phi);
        az = orbitRadius * Math.sin(angle) * Math.cos(phi);
      }

      // 2. Vector cloud clusters movement in Stage 1
      if (index === 1 || (index === 0 && factor > 0.5) || (index === 2 && factor < 0.5)) {
        const cluster = i % 4;
        const speed = 1.2;
        const offset = Math.sin(time * speed + cluster) * 0.15;
        const centers = [
          [1.5, 1.5, 0],
          [-1.5, 1.5, 1],
          [-1.5, -1.5, -1],
          [1.5, -1.5, 0.5]
        ];
        const center = centers[cluster];

        const dx = bx - center[0];
        const dy = by - center[1];
        const dz = bz - center[2];

        bx = center[0] + dx * (1 + offset);
        by = center[1] + dy * (1 + offset);
        bz = center[2] + dz * (1 + offset);
      }

      // 3. Orbiting rings in Stage 3 (Foundation Models)
      if (index === 3 || (index === 2 && factor > 0.5) || (index === 4 && factor < 0.5)) {
        if (i >= 1000) {
          const orbitRadius = 2.0 + (i % 4) * 0.28;
          const speed = 0.9 + (i % 2) * 0.4;
          const angle = (i * 0.18) + time * speed;

          if (i < 1260) {
            bx = orbitRadius * Math.cos(angle);
            by = orbitRadius * Math.sin(angle);
            bz = Math.sin(i * 1.5) * 0.025;
          } else if (i < 1520) {
            bx = Math.cos(i * 1.5) * 0.025;
            by = orbitRadius * Math.cos(angle);
            bz = orbitRadius * Math.sin(angle);
          } else {
            bx = orbitRadius * Math.cos(angle) * 0.866;
            by = orbitRadius * Math.sin(angle) * 0.5;
            bz = orbitRadius * Math.cos(angle) * 0.5 + orbitRadius * Math.sin(angle) * 0.866;
          }
        } else {
          const pulse = 1.0 + Math.sin(time * 3.0 + i) * 0.04;
          bx = bx * pulse;
          by = by * pulse;
          bz = bz * pulse;
        }
      }

      // 4. Data packet flows in Stage 4 (RAG)
      if (index === 4 || (index === 3 && factor > 0.5) || (index === 5 && factor < 0.5)) {
        if (i % 12 === 0) {
          const ragCenters = [
            [-3, 1.5, 0],
            [-1, 0, 0],
            [-1, -2, 0],
            [1, 0, 0],
            [3, 1.5, 0]
          ];

          const route = [0, 1, 2, 1, 3, 4];
          const flowSpeed = 0.35;
          const routeProgress = (time * flowSpeed + (i * 0.08)) % (route.length - 1);
          const segmentIndex = Math.floor(routeProgress);
          const segmentFactor = routeProgress - segmentIndex;

          const nStart = ragCenters[route[segmentIndex]];
          const nEnd = ragCenters[route[segmentIndex + 1]];

          bx = THREE.MathUtils.lerp(nStart[0], nEnd[0], segmentFactor) + Math.sin(i * 5.3) * 0.04;
          by = THREE.MathUtils.lerp(nStart[1], nEnd[1], segmentFactor) + Math.cos(i * 4.2) * 0.04;
          bz = THREE.MathUtils.lerp(nStart[2], nEnd[2], segmentFactor) + Math.sin(i * 3.1) * 0.04;
        }
      }

      // 5. Project Node expansion on hover (Stage 6)
      if (index === 6 || (index === 5 && factor > 0.5) || (index === 7 && factor < 0.5)) {
        const projectIdx = i % 3;
        if (hoveredProject === projectIdx) {
          const projCenters = [
            [-2.5, -0.5, 0],
            [0, 1.8, 0],
            [2.5, -0.5, 0]
          ];
          const pCenter = projCenters[projectIdx];
          
          const dx = bx - pCenter[0];
          const dy = by - pCenter[1];
          const dz = bz - pCenter[2];

          bx = pCenter[0] + dx * 1.55;
          by = pCenter[1] + dy * 1.55;
          bz = pCenter[2] + dz * 1.55;
        }
      }

      // Interpolate positions between active stage configurations
      let px = THREE.MathUtils.lerp(ax, bx, factor);
      let py = THREE.MathUtils.lerp(ay, by, factor);
      let pz = THREE.MathUtils.lerp(az, bz, factor);

      // Add default noise breathing
      const noiseSpeed = 1.5;
      const noiseAmp = 0.06;
      px += Math.sin(time * noiseSpeed + i) * noiseAmp;
      py += Math.cos(time * noiseSpeed * 0.8 + i * 1.3) * noiseAmp;
      pz += Math.sin(time * noiseSpeed * 1.2 + i * 0.7) * noiseAmp;

      // Mouse Repulsion Physics
      const mdx = px - mouseX;
      const mdy = py - mouseY;
      const mdistSq = mdx * mdx + mdy * mdy;
      const repulsionRadius = 1.8; // Radius of influence around cursor
      
      if (mdistSq < repulsionRadius * repulsionRadius) {
        const mdist = Math.sqrt(mdistSq);
        if (mdist > 0.01) {
          // Push away force based on distance falloff (closer = stronger push)
          const force = (repulsionRadius - mdist) / repulsionRadius;
          const pushStrength = force * force * 0.7; // springy exponential push
          
          px += (mdx / mdist) * pushStrength;
          py += (mdy / mdist) * pushStrength;
          
          // Beautiful 3D bubble/lens distortion: push particles forward in Z axis
          pz += pushStrength * 0.6;
        }
      }

      posAttr.array[i3] = px;
      posAttr.array[i3+1] = py;
      posAttr.array[i3+2] = pz;

      // Interpolate colors
      const car = stages.colors[index][i3];
      const cag = stages.colors[index][i3+1];
      const cab = stages.colors[index][i3+2];

      let cbr = stages.colors[index + 1][i3];
      let cbg = stages.colors[index + 1][i3+1];
      let cbb = stages.colors[index + 1][i3+2];

      // Boost hover colors in Stage 6 projects
      if (index === 6 && hoveredProject === (i % 3)) {
        cbr = Math.min(cbr * 1.4, 1.0);
        cbg = Math.min(cbg * 1.4, 1.0);
        cbb = Math.min(cbb * 1.4, 1.0);
      }

      colAttr.array[i3] = THREE.MathUtils.lerp(car, cbr, factor);
      colAttr.array[i3+1] = THREE.MathUtils.lerp(cag, cbg, factor);
      colAttr.array[i3+2] = THREE.MathUtils.lerp(cab, cbb, factor);
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={N}
            array={new Float32Array(N * 3)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={N}
            array={new Float32Array(N * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.24} // Increased size for better visibility
          vertexColors
          transparent
          map={glowTexture}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Invisible Hover & Click Targets for Stage 7 Projects */}
      <group>
        {/* Project 1 (SourceIQ) */}
        <mesh
          position={[-2.5, -0.5, 0]}
          onPointerOver={() => setHoveredProject(0)}
          onPointerOut={() => setHoveredProject(null)}
          onClick={() => onProjectClick(0)}
        >
          <sphereGeometry args={[0.9, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* Project 2 (MintFrame) */}
        <mesh
          position={[0, 1.8, 0]}
          onPointerOver={() => setHoveredProject(1)}
          onPointerOut={() => setHoveredProject(null)}
          onClick={() => onProjectClick(1)}
        >
          <sphereGeometry args={[0.9, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* Project 3 (Inficanvas) */}
        <mesh
          position={[2.5, -0.5, 0]}
          onPointerOver={() => setHoveredProject(2)}
          onPointerOut={() => setHoveredProject(null)}
          onClick={() => onProjectClick(2)}
        >
          <sphereGeometry args={[0.9, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
};

export default MorphingParticles;
