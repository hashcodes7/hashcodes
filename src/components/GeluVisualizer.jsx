import { useState } from "react";

export default function GeluVisualizer() {
  const [xVal, setXVal] = useState(1.0);

  // Exact GELU approximation formula used in GPT models
  const gelu = (x) => {
    return 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * Math.pow(x, 3))));
  };

  const currentGelu = gelu(xVal);

  // SVG Plot settings - compact height so everything fits in viewport
  const width = 600;
  const height = 220;
  const padding = 35;

  const minX = -4;
  const maxX = 4;
  const minY = -1;
  const maxY = 4;

  const toSvgX = (x) => padding + ((x - minX) / (maxX - minX)) * (width - 2 * padding);
  const toSvgY = (y) => height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);
  const toDomainX = (svgX) => minX + ((svgX - padding) / (width - 2 * padding)) * (maxX - minX);

  // Generate curve path points
  const points = [];
  const steps = 200;
  for (let i = 0; i <= steps; i++) {
    const x = minX + (i / steps) * (maxX - minX);
    const y = gelu(x);
    points.push(`${toSvgX(x).toFixed(2)},${toSvgY(y).toFixed(2)}`);
  }
  const pathD = `M ${points.join(" L ")}`;

  const activeSvgX = toSvgX(xVal);
  const activeSvgY = toSvgY(currentGelu);
  const zeroSvgY = toSvgY(0);
  const zeroSvgX = toSvgX(0);

  const handleSvgClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clampedX = Math.max(padding, Math.min(width - padding, clickX));
    const domainX = toDomainX(clampedX);
    setXVal(Number(domainX.toFixed(2)));
  };

  return (
    <div style={{
      padding: "1.25rem 1.5rem",
      background: "rgba(17, 24, 39, 0.4)",
      borderRadius: "16px",
      border: "1px solid rgba(255,255,255,0.07)",
      backdropFilter: "blur(12px)",
      color: "#f3f4f6",
      marginBottom: "1.75rem",
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
    }}>
      {/* Title & Unified Controls + Output Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", flexWrap: "wrap", gap: "10px" }}>
        <h4 style={{ margin: 0, color: "var(--accent-color)", fontSize: "1.05rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          📈 GELU Activation Curve
        </h4>

        {/* Combined Control & Output Bar (All in one place!) */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "1rem", 
          background: "rgba(17, 24, 39, 0.9)", 
          padding: "6px 14px", 
          borderRadius: "10px", 
          border: "1px solid rgba(255,255,255,0.08)",
          flexWrap: "wrap"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.82rem", color: "#9ca3af", fontWeight: 500 }}>Input x:</span>
            <input 
              type="range" 
              min="-4" 
              max="4" 
              step="0.05"
              value={xVal}
              onChange={(e) => setXVal(parseFloat(e.target.value))}
              style={{ cursor: "pointer", accentColor: "#38bdf8", width: "110px" }}
            />
            <span style={{ fontFamily: "monospace", fontWeight: "600", fontSize: "0.88rem", color: "#38bdf8", minWidth: "42px" }}>
              {xVal > 0 ? `+${xVal.toFixed(2)}` : xVal.toFixed(2)}
            </span>
          </div>
          
          <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.12)" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "monospace", fontSize: "0.88rem" }}>
            <span style={{ color: "#9ca3af" }}>Output GELU:</span>
            <strong style={{ color: "#818cf8", fontSize: "0.95rem", fontWeight: 700 }}>{currentGelu.toFixed(4)}</strong>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 0, marginBottom: "1rem", flexWrap: "wrap", gap: "10px" }}>
        <p style={{ fontSize: "0.82rem", color: "#9ca3af", margin: 0, lineHeight: "1.4" }}>
          Click anywhere on the curve or drag the slider above to see exact inputs &amp; outputs simultaneously.
        </p>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", fontSize: "0.78rem", color: "#9ca3af" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <div style={{ width: "16px", height: "3px", background: "#38bdf8", borderRadius: "2px" }} />
            <span>GELU(x)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <div style={{ width: "16px", height: "0", borderTop: "2px dashed rgba(255,255,255,0.4)" }} />
            <span>y = x (Identity)</span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Graph */}
      <div style={{ width: "100%", overflowX: "auto" }}>
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          style={{ width: "100%", height: "auto", display: "block", cursor: "crosshair", background: "rgba(11, 15, 23, 0.6)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}
          onClick={handleSvgClick}
        >
          {/* Grid lines */}
          <line x1={padding} y1={zeroSvgY} x2={width - padding} y2={zeroSvgY} stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1={zeroSvgX} y1={padding} x2={zeroSvgX} y2={height - padding} stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeDasharray="4 4" />

          {/* Reference Line y = x */}
          <line x1={toSvgX(-1)} y1={toSvgY(-1)} x2={toSvgX(4)} y2={toSvgY(4)} stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeDasharray="5 5" />

          {/* Curve */}
          <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="2.8" strokeLinecap="round" />

          {/* Active point indicator lines */}
          <line x1={activeSvgX} y1={zeroSvgY} x2={activeSvgX} y2={activeSvgY} stroke="#818cf8" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1={zeroSvgX} y1={activeSvgY} x2={activeSvgX} y2={activeSvgY} stroke="#818cf8" strokeWidth="1.2" strokeDasharray="3 3" />

          {/* Active Point Circle */}
          <circle cx={activeSvgX} cy={activeSvgY} r="6.5" fill="#818cf8" stroke="#ffffff" strokeWidth="2" />

          {/* On-Graph Floating Tooltip Badge directly attached to active point! */}
          <g transform={`translate(${Math.min(width - 110, Math.max(10, activeSvgX - 50))}, ${Math.max(15, activeSvgY - 32)})`}>
            <rect width="100" height="22" rx="6" fill="rgba(17, 24, 39, 0.9)" stroke="rgba(129, 140, 248, 0.6)" strokeWidth="1" />
            <text x="50" y="15" textAnchor="middle" fill="#f3f4f6" fontSize="10.5" fontFamily="monospace" fontWeight="600">
              ({xVal.toFixed(2)}, {currentGelu.toFixed(2)})
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
