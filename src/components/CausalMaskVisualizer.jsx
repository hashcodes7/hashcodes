import { useState } from "react";

export default function CausalMaskVisualizer({
  tokens = ["Tomorrow", "I", "am", "flying", "to"]
}) {
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(4); // default to last token ("to")

  return (
    <div style={{
      padding: "1.75rem",
      background: "rgba(17, 24, 39, 0.4)",
      borderRadius: "16px",
      border: "1px solid rgba(255,255,255,0.07)",
      backdropFilter: "blur(12px)",
      color: "#f3f4f6",
      marginBottom: "2rem",
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
    }}>
      <h4 style={{ margin: "0 0 10px 0", color: "var(--accent-color)", fontSize: "1.1rem", fontWeight: "600" }}>
        🎭 Interactive Causal Attention Mask Visualizer
      </h4>

      <p style={{ fontSize: "0.85rem", color: "#aaa", marginTop: 0, marginBottom: "20px", lineHeight: "1.5" }}>
        Autoregressive language models (like GPT) prevent future tokens from cheating during training. Click any query token below to see which preceding keys it is allowed to attend to!
      </p>

      {/* Token Selector */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "25px" }}>
        {tokens.map((token, idx) => {
          const isSelected = idx === selectedTokenIndex;
          return (
            <button
              key={idx}
              onClick={() => setSelectedTokenIndex(idx)}
              style={{
                padding: "8px 14px",
                borderRadius: "6px",
                border: isSelected ? "1px solid #10b981" : "1px solid rgba(255,255,255,0.15)",
                background: isSelected ? "rgba(16, 185, 129, 0.2)" : "#232323",
                color: isSelected ? "#10b981" : "#fff",
                fontWeight: isSelected ? "600" : "normal",
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              Pos {idx}: &quot;{token}&quot;
            </button>
          );
        })}
      </div>

      {/* Causal Mask Grid Matrix */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", margin: "0 auto", textAlign: "center" }}>
          <thead>
            <tr>
              <th style={{ padding: "8px", fontSize: "0.8rem", color: "#888" }}>Query \ Key</th>
              {tokens.map((t, j) => (
                <th key={j} style={{ padding: "8px", fontSize: "0.8rem", color: j <= selectedTokenIndex ? "#10b981" : "#666", minWidth: "70px" }}>
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tokens.map((qToken, i) => {
              const isCurrentRow = i === selectedTokenIndex;
              return (
                <tr key={i} style={{ background: isCurrentRow ? "rgba(255,255,255,0.03)" : "transparent" }}>
                  <td style={{ padding: "8px", fontSize: "0.85rem", fontWeight: "600", color: isCurrentRow ? "#10b981" : "#aaa", textAlign: "right" }}>
                    {qToken}
                  </td>
                  {tokens.map((_, j) => {
                    const isMasked = j > i;
                    const isHighlighted = isCurrentRow && !isMasked;
                    return (
                      <td key={j} style={{ padding: "4px" }}>
                        <div style={{
                          width: "60px",
                          height: "36px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "6px",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          margin: "0 auto",
                          background: isMasked ? "rgba(239, 68, 68, 0.1)" : (isHighlighted ? "rgba(16, 185, 129, 0.25)" : "rgba(255,255,255,0.05)"),
                          border: isMasked ? "1px solid rgba(239, 68, 68, 0.3)" : (isHighlighted ? "1px solid #10b981" : "1px solid rgba(255,255,255,0.1)"),
                          color: isMasked ? "#ef4444" : (isHighlighted ? "#10b981" : "#ccc"),
                          transition: "all 0.2s ease"
                        }}>
                          {isMasked ? "-∞" : "Score"}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "20px", fontSize: "0.8rem", color: "#888", textAlign: "center" }}>
        Token <strong style={{ color: "#10b981" }}>&quot;{tokens[selectedTokenIndex]}&quot;</strong> can attend to tokens up to Position {selectedTokenIndex}. Future positions are blocked with <span style={{ color: "#ef4444", fontWeight: "bold" }}>-∞</span> (which Softmax turns into 0.0 probability).
      </div>
    </div>
  );
}
