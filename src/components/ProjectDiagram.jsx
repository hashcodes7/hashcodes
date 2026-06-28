export default function ProjectDiagram({ name }) {
  switch (name) {
    case "ingestion":
      return (
        <svg
          width="100%"
          height="340"
          viewBox="0 0 600 340"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#00f0ff" />
            </marker>
          </defs>

          {/* Folder node */}
          <rect
            x="220"
            y="10"
            width="160"
            height="40"
            rx="8"
            fill="rgba(0, 240, 255, 0.05)"
            stroke="var(--accent-color)"
            strokeWidth="1.5"
          />
          <text
            x="300"
            y="34"
            fill="#fff"
            fontSize="11"
            fontWeight="700"
            textAnchor="middle"
          >
            /knowledge_source (Folder)
          </text>

          <line
            x1="300"
            y1="50"
            x2="300"
            y2="75"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />

          {/* Extract node */}
          <rect
            x="200"
            y="75"
            width="200"
            height="40"
            rx="8"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text
            x="300"
            y="99"
            fill="var(--text-primary)"
            fontSize="11"
            textAnchor="middle"
          >
            extract_text_from_file (Handler)
          </text>

          <line
            x1="300"
            y1="115"
            x2="300"
            y2="140"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />

          {/* Chunk node */}
          <rect
            x="180"
            y="140"
            width="240"
            height="40"
            rx="8"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text
            x="300"
            y="164"
            fill="var(--text-primary)"
            fontSize="11"
            textAnchor="middle"
          >
            Chunking Strategy: Semantic or Recursive
          </text>

          <line
            x1="300"
            y1="180"
            x2="300"
            y2="205"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />

          {/* Map node */}
          <rect
            x="190"
            y="205"
            width="220"
            height="40"
            rx="8"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="var(--accent-color)"
            strokeWidth="1"
          />
          <text
            x="300"
            y="229"
            fill="#fff"
            fontSize="11"
            fontWeight="700"
            textAnchor="middle"
          >
            Parent-Child Context Mapping
          </text>

          {/* Branches */}
          <path
            d="M 300 245 L 300 270 L 150 270 L 150 290"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />
          <path
            d="M 300 245 L 300 270 L 450 270 L 450 290"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />

          {/* FAISS node */}
          <rect
            x="70"
            y="290"
            width="160"
            height="40"
            rx="8"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text
            x="150"
            y="314"
            fill="var(--text-secondary)"
            fontSize="10"
            textAnchor="middle"
          >
            FAISS HNSW Vector Store
          </text>

          {/* BM25 node */}
          <rect
            x="370"
            y="290"
            width="160"
            height="40"
            rx="8"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text
            x="450"
            y="314"
            fill="var(--text-secondary)"
            fontSize="10"
            textAnchor="middle"
          >
            SimpleBM25 Keyword Index
          </text>
        </svg>
      );

    case "retrieval":
      return (
        <svg
          width="100%"
          height="340"
          viewBox="0 0 600 340"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          {/* Query Node */}
          <rect
            x="210"
            y="10"
            width="180"
            height="40"
            rx="8"
            fill="rgba(0, 240, 255, 0.05)"
            stroke="var(--accent-color)"
            strokeWidth="1.5"
          />
          <text
            x="300"
            y="34"
            fill="#fff"
            fontSize="11"
            fontWeight="700"
            textAnchor="middle"
          >
            User Query Input
          </text>

          {/* Branches to Dual Search */}
          <path
            d="M 300 50 L 300 70 L 150 70 L 150 90"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />
          <path
            d="M 300 50 L 300 70 L 450 70 L 450 90"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />

          {/* Dense Retrieval */}
          <rect
            x="60"
            y="90"
            width="180"
            height="40"
            rx="8"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text
            x="150"
            y="114"
            fill="var(--text-primary)"
            fontSize="10"
            textAnchor="middle"
          >
            Dense: FAISS HNSW search
          </text>

          {/* Sparse Retrieval */}
          <rect
            x="360"
            y="90"
            width="180"
            height="40"
            rx="8"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text
            x="450"
            y="114"
            fill="var(--text-primary)"
            fontSize="10"
            textAnchor="middle"
          >
            Sparse: BM25 keyword search
          </text>

          {/* Lines merging to RRF */}
          <path
            d="M 150 130 L 150 150 L 300 150 L 300 170"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />
          <path
            d="M 450 130 L 450 150 L 300 150 L 300 170"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />

          {/* Reciprocal Rank Fusion */}
          <rect
            x="180"
            y="170"
            width="240"
            height="40"
            rx="8"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="var(--accent-color)"
            strokeWidth="1"
          />
          <text
            x="300"
            y="194"
            fill="#fff"
            fontSize="11"
            fontWeight="700"
            textAnchor="middle"
          >
            Reciprocal Rank Fusion (RRF)
          </text>

          <line
            x1="300"
            y1="210"
            x2="300"
            y2="235"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />

          {/* Cross-Encoder Rerank */}
          <rect
            x="170"
            y="235"
            width="260"
            height="40"
            rx="8"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text
            x="300"
            y="259"
            fill="var(--text-primary)"
            fontSize="11"
            textAnchor="middle"
          >
            Cross-Encoder Reranking & Namespace Boost
          </text>

          <line
            x1="300"
            y1="275"
            x2="300"
            y2="300"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />

          {/* Context Swapping */}
          <rect
            x="190"
            y="300"
            width="220"
            height="30"
            rx="6"
            fill="rgba(0, 240, 255, 0.05)"
            stroke="var(--accent-color)"
            strokeWidth="1"
          />
          <text
            x="300"
            y="318"
            fill="#fff"
            fontSize="10"
            fontWeight="700"
            textAnchor="middle"
          >
            Parent Context Expansion
          </text>
        </svg>
      );

    case "model":
      return (
        <svg
          width="100%"
          height="240"
          viewBox="0 0 600 240"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          {/* Model Configuration */}
          <rect
            x="210"
            y="10"
            width="180"
            height="40"
            rx="8"
            fill="rgba(0, 240, 255, 0.05)"
            stroke="var(--accent-color)"
            strokeWidth="1.5"
          />
          <text
            x="300"
            y="34"
            fill="#fff"
            fontSize="11"
            fontWeight="700"
            textAnchor="middle"
          >
            Model Engine Select
          </text>

          {/* Branches */}
          <path
            d="M 300 50 L 300 75 L 140 75 L 140 100"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />
          <path
            d="M 300 50 L 300 75 L 300 100"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />
          <path
            d="M 300 50 L 300 75 L 460 75 L 460 100"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />

          {/* GGUF Node */}
          <rect
            x="40"
            y="100"
            width="180"
            height="40"
            rx="8"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text
            x="130"
            y="124"
            fill="var(--text-primary)"
            fontSize="10"
            textAnchor="middle"
          >
            Local GGUF (llama.cpp)
          </text>

          {/* HF Node */}
          <rect
            x="230"
            y="100"
            width="140"
            height="40"
            rx="8"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text
            x="300"
            y="124"
            fill="var(--text-primary)"
            fontSize="10"
            textAnchor="middle"
          >
            Local HF (BitsAndBytes)
          </text>

          {/* API Node */}
          <rect
            x="380"
            y="100"
            width="160"
            height="40"
            rx="8"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text
            x="460"
            y="124"
            fill="var(--text-primary)"
            fontSize="10"
            textAnchor="middle"
          >
            Cloud API (Gemini)
          </text>

          {/* Lines merging to Execution */}
          <path
            d="M 130 140 L 130 165 L 300 165 L 300 185"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />
          <path
            d="M 300 140 L 300 185"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />
          <path
            d="M 460 140 L 460 165 L 300 165 L 300 185"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />

          {/* Inference Execution */}
          <rect
            x="210"
            y="185"
            width="180"
            height="45"
            rx="8"
            fill="rgba(0, 240, 255, 0.05)"
            stroke="var(--accent-color)"
            strokeWidth="1.5"
          />
          <text
            x="300"
            y="211"
            fill="#fff"
            fontSize="11"
            fontWeight="700"
            textAnchor="middle"
          >
            Token Generation Output
          </text>
        </svg>
      );

    case "generation":
      return (
        <svg
          width="100%"
          height="240"
          viewBox="0 0 600 240"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          {/* Inputs */}
          <rect
            x="30"
            y="10"
            width="140"
            height="40"
            rx="8"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text
            x="100"
            y="34"
            fill="var(--text-secondary)"
            fontSize="10"
            textAnchor="middle"
          >
            Retrieved Context
          </text>

          <rect
            x="215"
            y="10"
            width="170"
            height="40"
            rx="8"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text
            x="300"
            y="34"
            fill="var(--text-secondary)"
            fontSize="10"
            textAnchor="middle"
          >
            Rolling Chat Buffer (SQLite)
          </text>

          <rect
            x="420"
            y="10"
            width="150"
            height="40"
            rx="8"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text
            x="495"
            y="34"
            fill="var(--text-secondary)"
            fontSize="10"
            textAnchor="middle"
          >
            Strict Grounding Rules
          </text>

          {/* Lines merging to Assembly */}
          <path
            d="M 100 50 L 100 80 L 300 80 L 300 100"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />
          <path
            d="M 300 50 L 300 100"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />
          <path
            d="M 495 50 L 495 80 L 300 80 L 300 100"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />

          {/* Prompt Assembly */}
          <rect
            x="180"
            y="100"
            width="240"
            height="40"
            rx="8"
            fill="rgba(255, 255, 255, 0.02)"
            stroke="var(--accent-color)"
            strokeWidth="1"
          />
          <text
            x="300"
            y="124"
            fill="#fff"
            fontSize="11"
            fontWeight="700"
            textAnchor="middle"
          >
            Prompt Construction & Budgeting
          </text>

          <line
            x1="300"
            y1="140"
            x2="300"
            y2="165"
            stroke="#00f0ff"
            strokeWidth="1.5"
          />

          {/* Token Generation */}
          <rect
            x="170"
            y="165"
            width="260"
            height="50"
            rx="8"
            fill="rgba(0, 240, 255, 0.05)"
            stroke="var(--accent-color)"
            strokeWidth="1.5"
          />
          <text
            x="300"
            y="190"
            fill="#fff"
            fontSize="11"
            fontWeight="700"
            textAnchor="middle"
          >
            Real-time Token Stream (Yield)
          </text>
          <text
            x="300"
            y="204"
            fill="var(--text-secondary)"
            fontSize="9"
            textAnchor="middle"
          >
            TextIteratorStreamer + Queue
          </text>
        </svg>
      );

    default:
      return null;
  }
}
