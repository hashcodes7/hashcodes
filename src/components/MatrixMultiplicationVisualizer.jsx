import { useState } from "react";

export default function MatrixMultiplicationVisualizer({ matrixA, matrixB, nameA = "A", nameB = "B", nameRes = "AB" }) {
  const A = matrixA || [
    [2, 1, 3],
    [4, 0, 2],
  ];

  const B = matrixB || [
    [5, 2],
    [1, 4],
    [3, 7],
  ];

  const rowsA = A.length;
  const colsA = A[0].length;
  const rowsB = B.length;
  const colsB = B[0].length;

  const [activeCell, setActiveCell] = useState({ r: 0, c: 0 });

  const multiplyCell = (r, c) => {
    let sum = 0;
    for (let k = 0; k < colsA; k++) {
      sum += (A[r]?.[k] || 0) * (B[k]?.[c] || 0);
    }
    // Round to 3 decimal places consistently
    return Number.isInteger(sum) ? sum : Number(sum.toFixed(3));
  };

  // Helper for matrix bracket styles
  const bracketStyle = {
    position: "relative",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const bracketBeforeAfter = `
    .matrix-bracket::before, .matrix-bracket::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 8px;
      border: 2px solid rgba(255, 255, 255, 0.18);
    }
    .matrix-bracket::before {
      left: 0;
      border-right: none;
      border-radius: 8px 0 0 8px;
    }
    .matrix-bracket::after {
      right: 0;
      border-left: none;
      border-radius: 0 8px 8px 0;
    }
    .matrix-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 48px;
      height: 32px;
      padding: 0 6px;
      margin: 3px;
      border-radius: 8px;
      background: rgba(17, 24, 39, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #f3f4f6;
      font-weight: 500;
      font-size: 0.82rem;
      transition: all 0.2s ease;
      user-select: none;
    }
    .matrix-cell.active-a {
      background: rgba(56, 189, 248, 0.15);
      border-color: rgba(56, 189, 248, 0.5);
      color: #38bdf8;
    }
    .matrix-cell.active-b {
      background: rgba(52, 211, 153, 0.15);
      border-color: rgba(52, 211, 153, 0.5);
      color: #34d399;
    }
    .matrix-cell.active-res {
      background: rgba(129, 140, 248, 0.2);
      border-color: rgba(129, 140, 248, 0.6);
      color: #818cf8;
      box-shadow: 0 0 12px rgba(129, 140, 248, 0.25);
      cursor: pointer;
    }
    .matrix-cell.res-hover:hover {
      border-color: rgba(255, 255, 255, 0.4);
      cursor: pointer;
    }
  `;

  const renderCalculation = () => {
    if (!activeCell) return null;
    const { r, c } = activeCell;
    const result = multiplyCell(r, c);

    return (
      <div style={{
        marginTop: "1.5rem",
        padding: "0.85rem 1.5rem",
        background: "rgba(17, 24, 39, 0.8)",
        borderRadius: "10px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        fontSize: "1rem",
        fontFamily: "'Fira Code', monospace, serif",
        letterSpacing: "0.5px",
        color: "#e2e8f0",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)"
      }}>
        <span style={{ color: "#818cf8", fontWeight: 600 }}>({nameRes})<sub>{r + 1}{c + 1}</sub></span> = {" "}
        {Array.from({ length: colsA }).map((_, k) => (
          <span key={k}>
            (<span style={{ color: "#38bdf8" }}>{A[r][k]}</span> &middot; <span style={{ color: "#34d399" }}>{B[k][c]}</span>)
            {k < colsA - 1 ? " + " : ""}
          </span>
        ))}
        {" "} = <strong style={{ color: "#818cf8", fontWeight: 700 }}>{result.toFixed ? result.toFixed(3) : result}</strong>
      </div>
    );
  };

  return (
    <div style={{ 
      padding: "1.75rem", 
      background: "rgba(17, 24, 39, 0.4)", 
      borderRadius: "16px", 
      border: "1px solid rgba(255,255,255,0.07)", 
      backdropFilter: "blur(12px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "2rem",
      boxShadow: "0 10px 30px rgba(0,0,0,0.25)" 
    }}>
      <style>{bracketBeforeAfter}</style>

      <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        
        {/* Matrix A */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ marginBottom: "10px", fontStyle: "italic", fontWeight: "600", fontSize: "1.2rem", color: "#ddd" }} dangerouslySetInnerHTML={{ __html: nameA }}></div>
          <div className="matrix-bracket" style={bracketStyle}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {A.map((row, i) => (
                <div key={i} style={{ display: "flex" }}>
                  {row.map((val, j) => {
                    const isActive = activeCell?.r === i;
                    return (
                      <div key={j} className={`matrix-cell ${isActive ? 'active-a' : ''}`} style={{justifyContent: 'center'}}>
                        {val}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#888", margin: "0 10px", marginTop: "40px" }}>&times;</div>

        {/* Matrix B */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ marginBottom: "10px", fontStyle: "italic", fontWeight: "600", fontSize: "1.2rem", color: "#ddd" }} dangerouslySetInnerHTML={{ __html: nameB }}></div>
          <div className="matrix-bracket" style={bracketStyle}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {B.map((row, i) => (
                <div key={i} style={{ display: "flex" }}>
                  {row.map((val, j) => {
                    const isActive = activeCell?.c === j;
                    return (
                      <div key={j} className={`matrix-cell ${isActive ? 'active-b' : ''}`} style={{justifyContent: 'center'}}>
                        {val}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#888", margin: "0 10px", marginTop: "40px" }}>=</div>

        {/* Result Matrix AB */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ marginBottom: "10px", fontStyle: "italic", fontWeight: "600", fontSize: "1.2rem", color: "#ddd" }} dangerouslySetInnerHTML={{ __html: nameRes }}></div>
          <div className="matrix-bracket" style={bracketStyle}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {Array.from({ length: rowsA }).map((_, i) => (
                <div key={i} style={{ display: "flex" }}>
                  {Array.from({ length: colsB }).map((_, j) => {
                    const isActive = activeCell?.r === i && activeCell?.c === j;
                    return (
                      <div 
                        key={j} 
                        className={`matrix-cell res-hover ${isActive ? 'active-res' : ''}`}
                        style={{justifyContent: 'center'}}
                        onClick={() => setActiveCell({ r: i, c: j })}
                      >
                        {Number.isInteger(multiplyCell(i, j)) ? multiplyCell(i, j) : multiplyCell(i, j).toFixed(3)}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div style={{ 
        marginTop: "30px", 
        width: "100%", 
        borderTop: "1px solid rgba(255,255,255,0.1)", 
        display: "flex", 
        justifyContent: "center" 
      }}>
        {renderCalculation()}
      </div>

    </div>
  );
}
