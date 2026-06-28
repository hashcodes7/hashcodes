import { useState } from "react";

export default function SoftmaxVisualizer({ 
  initialLogits = [-1.201, 0.891, 0.131, 0.307, 1.078],
  labels = ["I", "am", "learning", "to", "Delhi"]
}) {
  const [temperature, setTemperature] = useState(1.0);
  const [logits, setLogits] = useState(initialLogits);

  // Compute Softmax with Temperature
  const scaledLogits = logits.map((val) => val / temperature);
  const maxScaled = Math.max(...scaledLogits);
  const expValues = scaledLogits.map((val) => Math.exp(val - maxScaled)); // numerical stability
  const sumExp = expValues.reduce((a, b) => a + b, 0);
  const probabilities = expValues.map((val) => val / sumExp);

  const maxIndex = probabilities.indexOf(Math.max(...probabilities));

  const handleLogitChange = (index, value) => {
    const newLogits = [...logits];
    newLogits[index] = parseFloat(value) || 0;
    setLogits(newLogits);
  };

  return (
    <div style={{
      padding: "20px",
      background: "#1a1a1a",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.05)",
      color: "#fff",
      fontFamily: "Inter, sans-serif",
      marginBottom: "1.5rem"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", flexWrap: "wrap", gap: "10px" }}>
        <h4 style={{ margin: 0, color: "var(--accent-color, #00f0ff)", fontSize: "1.1rem", fontWeight: "600" }}>
          📊 Interactive Softmax & Temperature Visualizer
        </h4>
        
        {/* Temperature Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.05)", padding: "6px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
          <span style={{ fontSize: "0.85rem", color: "#aaa" }}>Temperature (T):</span>
          <input 
            type="range" 
            min="0.1" 
            max="2.0" 
            step="0.1" 
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            style={{ cursor: "pointer", accentColor: "var(--accent-color, #00f0ff)" }}
          />
          <span style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#00f0ff", minWidth: "30px" }}>
            {temperature.toFixed(1)}
          </span>
        </div>
      </div>

      <p style={{ fontSize: "0.85rem", color: "#aaa", marginTop: 0, marginBottom: "20px", lineHeight: "1.5" }}>
        Adjust the raw <strong>Logits</strong> or move the <strong>Temperature slider</strong> to explore how temperature controls randomness in LLM next-token generation (low <em>T</em> makes output greedy/deterministic, high <em>T</em> flattens probabilities).
      </p>

      {/* Probability Bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {labels.map((label, i) => {
          const prob = probabilities[i];
          const percent = (prob * 100).toFixed(1);
          const isMax = i === maxIndex;

          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Word Label */}
              <div style={{ width: "80px", fontWeight: "600", fontSize: "0.85rem", color: isMax ? "#10b981" : "#ddd", textAlign: "right" }}>
                &quot;{label}&quot;
              </div>

              {/* Editable Logit Input */}
              <input 
                type="number" 
                step="0.1"
                value={logits[i]}
                onChange={(e) => handleLogitChange(i, e.target.value)}
                style={{
                  width: "60px",
                  padding: "4px 6px",
                  background: "#232323",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "4px",
                  color: "#fff",
                  fontSize: "0.8rem",
                  textAlign: "center"
                }}
              />

              {/* Bar track */}
              <div style={{ flex: 1, height: "24px", background: "#232323", borderRadius: "6px", overflow: "hidden", position: "relative", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{
                  height: "100%",
                  width: `${percent}%`,
                  background: isMax ? "linear-gradient(90deg, #10b981, #34d399)" : "linear-gradient(90deg, #3b82f6, #60a5fa)",
                  borderRadius: "6px",
                  transition: "width 0.3s ease, background 0.3s ease"
                }} />
                <span style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#fff",
                  textShadow: "0 0 4px rgba(0,0,0,0.8)"
                }}>
                  {percent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Formula summary */}
      <div style={{ marginTop: "20px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: "0.8rem", color: "#888", display: "flex", justifyContent: "space-between" }}>
        <span>Formula: <i>P<sub>i</sub></i> = e<sup>z<sub>i</sub> / T</sup> / &Sigma; e<sup>z<sub>j</sub> / T</sup></span>
        <span>Predicted Token: <strong style={{ color: "#10b981" }}>&quot;{labels[maxIndex]}&quot;</strong></span>
      </div>
    </div>
  );
}
