import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import MorphingParticles from "./MorphingParticles";
import StageLines from "./StageLines";
import JourneyLabels from "./JourneyLabels";

// Parallax camera controller that responds to mouse movement
const CameraController = () => {
  useFrame((state) => {
    // Gentle parallax mouse hover effect
    const mouseX = state.pointer.x * 0.8;
    const mouseY = state.pointer.y * 0.6;

    // Smoothly interpolate camera position
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      mouseX,
      0.05,
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      mouseY,
      0.05,
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

// Inner scene wrapper to handle responsive group scaling
const SceneWrapper = ({
  scrollProgress,
  activeStage,
  hoveredProject,
  setHoveredProject,
  onProjectClick,
}) => {
  const { size } = useThree();

  // Calculate dynamic group scale based on screen width directly in render (pure)
  let scale = 1.05;

  if (size.width < 768) {
    // Mobile
    scale = size.width / 550; // scales down on smaller screens
  } else if (size.width < 1024) {
    // Tablet
    scale = 0.8;
  }

  return (
    <group scale={[scale, scale, scale]}>
      <MorphingParticles
        scrollProgress={scrollProgress}
        hoveredProject={hoveredProject}
        setHoveredProject={setHoveredProject}
        onProjectClick={onProjectClick}
      />
      <StageLines scrollProgress={scrollProgress} />
      <JourneyLabels
        activeStage={activeStage}
        hoveredProject={hoveredProject}
      />
    </group>
  );
};

const AIJourneyCanvas = ({
  scrollProgress,
  activeStage,
  hoveredProject,
  setHoveredProject,
  onProjectClick,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 3, 5]} intensity={0.8} />
        <pointLight position={[-3, -3, 2]} intensity={0.3} color="#a855f7" />

        <SceneWrapper
          scrollProgress={scrollProgress}
          activeStage={activeStage}
          hoveredProject={hoveredProject}
          setHoveredProject={setHoveredProject}
          onProjectClick={onProjectClick}
        />

        <CameraController />
      </Canvas>
    </div>
  );
};

export default AIJourneyCanvas;
