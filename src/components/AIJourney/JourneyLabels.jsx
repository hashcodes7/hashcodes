import { useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Label = ({ children, active, position, style = {} }) => {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      const parent = ref.current.parentElement;
      if (parent) {
        parent.style.opacity = active ? 1 : 0;
        parent.style.pointerEvents = active ? "auto" : "none";
        parent.style.transition =
          "opacity 0.4s ease-in-out, transform 0.4s ease-in-out";
        parent.style.transform = active ? "scale(1)" : "scale(0.85)";
      }
    }
  });

  return (
    <Html
      position={position}
      center
      distanceFactor={8}
      style={{
        pointerEvents: "none",
        ...style,
      }}
    >
      <div
        ref={ref}
        style={{
          background: "rgba(10, 10, 10, 0.75)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "6px",
          padding: "0.35rem 0.75rem",
          color: "#ffffff",
          fontSize: "0.75rem",
          fontWeight: "700",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
        }}
      >
        {children}
      </div>
    </Html>
  );
};

const JourneyLabels = ({ activeStage, hoveredProject }) => {
  const isStage = (stageIdx) => {
    return activeStage === stageIdx;
  };

  return (
    <group>
      {/* ------------------ STAGE 0 LABELS ------------------ */}
      <Label position={[-1.5, 1.2, 0]} active={isStage(0)}>
        📄 PDF Ingestion
      </Label>
      <Label position={[1.5, -1.2, 0]} active={isStage(0)}>
        💻 Codebases
      </Label>
      <Label position={[-1.2, -1.5, 1]} active={isStage(0)}>
        🗄️ Knowledge Bases
      </Label>
      <Label position={[1.2, 1.5, -1]} active={isStage(0)}>
        📧 Emails & Logs
      </Label>

      {/* ------------------ STAGE 1 LABELS ------------------ */}
      <Label
        position={[1.5, 2.2, 0]}
        active={isStage(1)}
        style={{ borderColor: "#a855f7" }}
      >
        Similarity
      </Label>
      <Label
        position={[-1.5, 2.2, 1]}
        active={isStage(1)}
        style={{ borderColor: "#a855f7" }}
      >
        Qdrant
      </Label>
      <Label
        position={[-1.5, -2.2, -1]}
        active={isStage(1)}
        style={{ borderColor: "#a855f7" }}
      >
        Pinecone
      </Label>
      <Label
        position={[1.5, -2.2, 0.5]}
        active={isStage(1)}
        style={{ borderColor: "#a855f7" }}
      >
        FAISS
      </Label>

      {/* ------------------ STAGE 2 LABELS ------------------ */}
      <Label
        position={[0, 2.4, 0]}
        active={isStage(2)}
        style={{ borderColor: "#06b6d4" }}
      >
        Tokens
      </Label>
      <Label
        position={[0, -2.4, 0]}
        active={isStage(2)}
        style={{ borderColor: "#06b6d4" }}
      >
        Multi-Head Attention
      </Label>
      <Label
        position={[-2.4, 0, 0]}
        active={isStage(2)}
        style={{ borderColor: "#06b6d4" }}
      >
        Context Window
      </Label>
      <Label
        position={[2.4, 0, 0]}
        active={isStage(2)}
        style={{ borderColor: "#06b6d4" }}
      >
        Inference
      </Label>

      {/* ------------------ STAGE 3 LABELS ------------------ */}
      <Label
        position={[0, 1.6, 1]}
        active={isStage(3)}
        style={{ borderColor: "#00f0ff" }}
      >
        Gemini 1.5 Pro
      </Label>
      <Label
        position={[-1.6, -0.6, 0]}
        active={isStage(3)}
        style={{ borderColor: "#00f0ff" }}
      >
        Claude 3.5 Sonnet
      </Label>
      <Label
        position={[1.6, -0.6, 0]}
        active={isStage(3)}
        style={{ borderColor: "#00f0ff" }}
      >
        GPT-4o
      </Label>

      {/* ------------------ STAGE 4 LABELS ------------------ */}
      <Label position={[-3, 2.1, 0]} active={isStage(4)}>
        👤 User
      </Label>
      <Label position={[-1, 0.6, 0]} active={isStage(4)}>
        🔍 Retriever
      </Label>
      <Label position={[-1, -2.6, 0]} active={isStage(4)}>
        🗄️ Vector DB
      </Label>
      <Label position={[1, 0.6, 0]} active={isStage(4)}>
        🧠 LLM Core
      </Label>
      <Label position={[3, 2.1, 0]} active={isStage(4)}>
        ✍️ Response
      </Label>

      {/* ------------------ STAGE 5 LABELS ------------------ */}
      <Label
        position={[0, 1.8, 0]}
        active={isStage(5)}
        style={{ borderColor: "#3b82f6" }}
      >
        Planner Agent
      </Label>
      <Label
        position={[-2.0, 0.5, 0]}
        active={isStage(5)}
        style={{ borderColor: "#3b82f6" }}
      >
        Research Agent
      </Label>
      <Label
        position={[2.0, 0.5, 0]}
        active={isStage(5)}
        style={{ borderColor: "#3b82f6" }}
      >
        Memory System
      </Label>
      <Label
        position={[-1.2, -1.4, 0]}
        active={isStage(5)}
        style={{ borderColor: "#3b82f6" }}
      >
        Execution Agent
      </Label>
      <Label
        position={[1.2, -1.4, 0]}
        active={isStage(5)}
        style={{ borderColor: "#3b82f6" }}
      >
        Evaluator Agent
      </Label>

      {/* ------------------ STAGE 6 LABELS ------------------ */}
      <Label
        position={[-2.5, 0.4, 0]}
        active={isStage(6)}
        style={{
          borderColor:
            hoveredProject === 0
              ? "var(--accent-color)"
              : "rgba(255, 255, 255, 0.2)",
          transform: hoveredProject === 0 ? "scale(1.1)" : "scale(1)",
          background:
            hoveredProject === 0
              ? "rgba(0, 240, 255, 0.15)"
              : "rgba(10, 10, 10, 0.75)",
        }}
      >
        SourceIQ 🔍
      </Label>
      <Label
        position={[0, 2.6, 0]}
        active={isStage(6)}
        style={{
          borderColor:
            hoveredProject === 1
              ? "var(--accent-color)"
              : "rgba(255, 255, 255, 0.2)",
          transform: hoveredProject === 1 ? "scale(1.1)" : "scale(1)",
          background:
            hoveredProject === 1
              ? "rgba(0, 240, 255, 0.15)"
              : "rgba(10, 10, 10, 0.75)",
        }}
      >
        MintFrame 🧠
      </Label>
      <Label
        position={[2.5, 0.4, 0]}
        active={isStage(6)}
        style={{
          borderColor:
            hoveredProject === 2
              ? "var(--accent-color)"
              : "rgba(255, 255, 255, 0.2)",
          transform: hoveredProject === 2 ? "scale(1.1)" : "scale(1)",
          background:
            hoveredProject === 2
              ? "rgba(0, 240, 255, 0.15)"
              : "rgba(10, 10, 10, 0.75)",
        }}
      >
        Inficanvas 🎨
      </Label>
    </group>
  );
};

export default JourneyLabels;
