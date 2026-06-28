/* eslint-disable react-refresh/only-export-components */
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import MatrixMultiplicationVisualizer from "../components/MatrixMultiplicationVisualizer";
import SoftmaxVisualizer from "../components/SoftmaxVisualizer";
import CausalMaskVisualizer from "../components/CausalMaskVisualizer";
import GeluVisualizer from "../components/GeluVisualizer";
import ReluVisualizer from "../components/ReluVisualizer";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import mermaid from "mermaid";
import katex from "katex";
import "katex/dist/katex.min.css";

const InlineMath = ({ math }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: katex.renderToString(math, {
        displayMode: false,
        throwOnError: false,
      }),
    }}
  />
);

const BlockMath = ({ math }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: katex.renderToString(math, {
        displayMode: true,
        throwOnError: false,
      }),
    }}
  />
);

const NavButton = ({ direction, targetTopic }) => {
  if (!targetTopic || targetTopic === "None") {
    return <div style={{ width: "50%" }}></div>;
  }

  const isPrev = direction === "prev";

  return (
    <div style={{ width: "50%", display: "flex", justifyContent: isPrev ? "flex-start" : "flex-end" }}>
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('navigate-topic', { detail: targetTopic }))}
        style={{
          background: "transparent",
          border: "none",
          textAlign: isPrev ? "left" : "right",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: isPrev ? "flex-start" : "flex-end",
          gap: "0.25rem",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <span style={{
          color: "var(--text-secondary)",
          fontSize: "0.85rem",
          fontWeight: "500",
          marginLeft: isPrev ? "1.5rem" : "0",
          marginRight: !isPrev ? "1.5rem" : "0",
        }}>
          {isPrev ? "Previous" : "Next"}
        </span>
        <span style={{
          color: "#fff",
          fontSize: "1.1rem",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          {isPrev && <ChevronLeft size={18} />}
          {targetTopic}
          {!isPrev && <ChevronRight size={18} />}
        </span>
      </button>
    </div>
  );
};

const TopicLink = ({ targetTopic, children, isChapterHeader = false }) => (
  <button
    onClick={() => window.dispatchEvent(new CustomEvent('navigate-topic', { detail: targetTopic }))}
    style={{
      background: "transparent",
      border: "none",
      color: isChapterHeader ? "#fff" : "var(--accent-color)",
      cursor: "pointer",
      padding: 0,
      font: "inherit",
      textAlign: "left",
      fontSize: isChapterHeader ? "1.05rem" : "0.95rem",
      fontWeight: isChapterHeader ? 600 : 400,
      textDecoration: "none",
      transition: "all 0.2s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = isChapterHeader ? "var(--accent-color)" : "#ffffff";
      if (!isChapterHeader) e.currentTarget.style.textDecoration = "underline";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = isChapterHeader ? "#fff" : "var(--accent-color)";
      if (!isChapterHeader) e.currentTarget.style.textDecoration = "none";
    }}
  >
    {children}
  </button>
);

const Callout = ({ type, title, children }) => {
  const styles = {
    abstract: { border: 'rgba(255, 255, 255, 0.4)', bg: 'rgba(255, 255, 255, 0.05)', color: '#fff' },
    info: { border: 'rgba(0, 240, 255, 0.4)', bg: 'rgba(0, 240, 255, 0.05)', color: 'var(--accent-color)' },
    tip: { border: 'rgba(16, 185, 129, 0.4)', bg: 'rgba(16, 185, 129, 0.05)', color: '#10b981' },
    quote: { border: 'rgba(245, 158, 11, 0.4)', bg: 'rgba(245, 158, 11, 0.05)', color: '#f59e0b' },
    success: { border: 'rgba(16, 185, 129, 0.4)', bg: 'rgba(16, 185, 129, 0.05)', color: '#10b981' },
    example: { border: 'rgba(139, 92, 246, 0.4)', bg: 'rgba(139, 92, 246, 0.05)', color: '#8b5cf6' },
  };
  const theme = styles[type] || styles.info;
  return (
    <div style={{
      borderLeft: '4px solid ' + theme.border,
      background: theme.bg,
      padding: '1.5rem',
      borderRadius: '0 12px 12px 0',
      marginBottom: '2rem',
      marginTop: '1rem'
    }}>
      <div style={{ fontWeight: 600, color: theme.color, marginBottom: '0.75rem', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {title}
      </div>
      <div style={{ color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
        {children}
      </div>
    </div>
  );
};

const CodeBlock = ({ language, children }) => {
  const [copied, setCopied] = useState(false);
  const codeString =
    typeof children === "string" ? children.trim() : String(children).trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        background: "#1e1e1e",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "12px",
        overflow: "hidden",
        marginBottom: "1.5rem",
        fontSize: "0.95rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1rem",
          background: "rgba(255, 255, 255, 0.05)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <span style={{ color: "#888", fontSize: "0.85rem" }}>
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: "transparent",
            border: "none",
            color: copied ? "#10b981" : "#888",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            fontSize: "0.8rem",
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || "text"}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "transparent",
          fontSize: "0.9rem",
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export const llmChaptersData = [
  {
    title: "Chapter 0 : Index",
    topics: [
      {
        title: "Chapter 0.1 - Course Index",
        summary: "Overview and complete index of all LLM architecture chapters",
        content: (
          <>
            Welcome to the complete, step-by-step mathematical breakdown of Large Language Models (Decoder-only Transformer Architecture)! Below is the structured index of all course modules:
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem", marginTop: "1.5rem" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 0.1 - Course Index" isChapterHeader={true}>Chapter 0: Setup & Architecture Ingredients</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 0.1 - Course Index">0.1 Course Index</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 0.2 - Architecture Ingredients">0.2 Architecture Ingredients</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 1.1 - Dot Products" isChapterHeader={true}>Chapter 1: Pre-Requisite Maths</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 1.1 - Dot Products">1.1 Dot Products</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 1.2 - Matrix Multiplication">1.2 Matrix Multiplication</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 2.1 - Tokenization & Input Prompt" isChapterHeader={true}>Chapter 2: Input Processing & Embeddings</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 2.1 - Tokenization & Input Prompt">2.1 Tokenization & Input Prompt</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 2.2 - Token Embedding Lookup (We Matrix)">2.2 Token Embedding Lookup (<InlineMath math={String.raw`W_E`} />)</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 2.3 - Positional Embeddings & Combined Input Matrix">2.3 Positional Embeddings (<InlineMath math={String.raw`W_P`} />)</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 3.1 - Weight Matrices (WQ, WK, WV) & Projections" isChapterHeader={true}>Chapter 3: Single-Head Self-Attention</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 3.1 - Weight Matrices (WQ, WK, WV) & Projections">3.1 Weight Matrices (<InlineMath math={String.raw`W_Q, W_K, W_V`} />)</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 3.2 - Raw Attention Scores & Dimension Scaling">3.2 Raw Attention Scores & Scaling</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 3.3 - Causal Masking, Softmax Weights & Context Vector">3.3 Masking, Softmax & Context Vector</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 4.1 - Multi-Head Self-Attention & Concatenation" isChapterHeader={true}>Chapter 4: Multi-Head Attention</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 4.1 - Multi-Head Self-Attention & Concatenation">4.1 Multi-Head Self-Attention</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 4.2 - Output Projection (WO)">4.2 Output Projection (<InlineMath math={String.raw`W_O`} />)</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 5.1 - 1st Residual Connection" isChapterHeader={true}>Chapter 5: Pre FFN Cleanup</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 5.1 - 1st Residual Connection">5.1 1st Residual Connection</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 5.2 - 1st Layer Normalization">5.2 1st Layer Normalization</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 6.1 - First Linear Layer (W1 Feature Expansion)" isChapterHeader={true}>Chapter 6: Feed-Forward Network (FFN)</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 6.1 - First Linear Layer (W1 Feature Expansion)">6.1 First Linear Layer (<InlineMath math={String.raw`W_1`} />)</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 6.2 - GELU Activation Function">6.2 GELU Activation Function</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 6.3 - Second Linear Layer (W2 Model Projection)">6.3 Second Linear Layer (<InlineMath math={String.raw`W_2`} />)</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 7.1 - 2nd Residual Connection" isChapterHeader={true}>Chapter 7: Post FFN Cleanup</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 7.1 - 2nd Residual Connection">7.1 2nd Residual Connection</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 7.2 - 2nd Layer Normalization">7.2 2nd Layer Normalization</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 8.1 - LM Head Projection & Next Word Prediction (&quot;Delhi&quot;)" isChapterHeader={true}>Chapter 8: Next Word Generation</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 8.1 - LM Head Projection & Next Word Prediction (&quot;Delhi&quot;)">8.1 LM Head Projection & Prediction</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 9.1 - Activation Functions (ReLU vs. GELU vs. SwiGLU)" isChapterHeader={true}>Chapter 9: Optional Alternatives & Modern Variants</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 9.1 - Activation Functions (ReLU vs. GELU vs. SwiGLU)">9.1 Activation Functions (ReLU, GELU, SwiGLU)</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 9.2 - Normalization Alternatives (LayerNorm vs. RMSNorm)">9.2 Normalization (LayerNorm vs. RMSNorm)</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 9.3 - Positional Encoding Variants (Absolute vs. RoPE vs. ALiBi)">9.3 Positional Encodings (RoPE & ALiBi)</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 9.4 - Attention Variants (MHA vs. MQA vs. GQA & FlashAttention)">9.4 Attention Variants (GQA & FlashAttention)</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 9.5 - Scaling & Efficiency (Mixture of Experts - MoE & KV Caching)">9.5 Scaling & Speedups (MoE & KV Caching)</TopicLink></li>
                </ul>
              </div>
            </div>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="None" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 0.2 - Architecture Ingredients" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 0.2 - Architecture Ingredients",
        summary: "Pre-trained weight matrices, vectors, and hyperparameter assumptions used throughout this course",
        content: (
          <>
            <h2 id="architecture-ingredients" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🛠️ Architecture Ingredients & Pre-Trained Weight Matrices
            </h2>
            Below are all the static weight matrices and parameters assumed to be learned during model training. These exact values are referenced and multiplied throughout the interactive visualizations in this course:

            <h3>1. Token Embedding Matrix (<InlineMath math={String.raw`W_E`} />)</h3>
            Projects discrete token IDs into dense continuous embedding vectors (<InlineMath math={String.raw`\text{Vocab Size } 5 \times \text{Model Dim } 3`} />):
            <BlockMath math={String.raw`W_E = \begin{bmatrix} 0.43 & 0.15 & 0.89 \\ 0.55 & 0.87 & 0.66 \\ 0.57 & 0.85 & 0.64 \\ 0.22 & 0.58 & 0.33 \\ 0.77 & 0.25 & 0.10 \end{bmatrix}`} />

            <h3>2. Positional Embedding Matrix (<InlineMath math={String.raw`W_P`} />)</h3>
            Encodes spatial order information for sequence positions (<InlineMath math={String.raw`\text{Max Seq Len } 5 \times \text{Model Dim } 3`} />):
            <BlockMath math={String.raw`W_P = \begin{bmatrix} 0.29 & -0.30 & -0.51 \\ -0.66 & -0.13 & -0.49 \\ -0.10 & -0.36 & 0.08 \\ 1.09 & -1.22 & 0.04 \\ -0.35 & 0.46 & 0.50 \end{bmatrix}`} />

            <h3 style={{ color: "#fff", marginTop: "2rem" }}>📦 Per-Transformer Layer Parameters</h3>

            <h3>3. Query Weight Matrix (<InlineMath math={String.raw`W_Q`} />)</h3>
            Projects input representations to Query vectors for Head 1 (<InlineMath math={String.raw`\text{Model Dim } 3 \times \text{Head Dim } 2`} />):
            <BlockMath math={String.raw`W_Q = \begin{bmatrix} 0.5 & -0.2 \\ 0.1 & 0.8 \\ -0.4 & 0.3 \end{bmatrix}`} />

            <h3>4. Key Weight Matrix (<InlineMath math={String.raw`W_K`} />)</h3>
            Projects input representations to Key vectors for Head 1 (<InlineMath math={String.raw`\text{Model Dim } 3 \times \text{Head Dim } 2`} />):
            <BlockMath math={String.raw`W_K = \begin{bmatrix} -0.3 & 0.6 \\ 0.7 & -0.1 \\ 0.2 & 0.5 \end{bmatrix}`} />

            <h3>5. Value Weight Matrix (<InlineMath math={String.raw`W_V`} />)</h3>
            Projects input representations to Value vectors for Head 1 (<InlineMath math={String.raw`\text{Model Dim } 3 \times \text{Head Dim } 2`} />):
            <BlockMath math={String.raw`W_V = \begin{bmatrix} 0.4 & -0.3 \\ 0.1 & 0.8 \\ -0.5 & 0.2 \end{bmatrix}`} />

            <h3>6. Output Projection Matrix (<InlineMath math={String.raw`W_O`} />)</h3>
            Projects multi-head concatenated outputs back to model dimensions (<InlineMath math={String.raw`\text{Concat Dim } 6 \times \text{Model Dim } 3`} />):
            <BlockMath math={String.raw`W_O = \begin{bmatrix} 0.3 & -0.2 & 0.5 \\ -0.6 & 0.1 & 0.4 \\ 0.2 & 0.7 & -0.3 \\ 0.8 & -0.5 & 0.2 \\ -0.1 & 0.4 & 0.6 \\ 0.5 & 0.3 & -0.2 \end{bmatrix}`} />

            <h3>7. LayerNorm 1 Parameters (<InlineMath math={String.raw`\gamma, \beta`} />)</h3>
            Learned element-wise scaling (<InlineMath math={String.raw`\gamma`} />) and shifting (<InlineMath math={String.raw`\beta`} />) parameters for 1st Layer Normalization:
            <BlockMath math={String.raw`\gamma = \begin{bmatrix} 1.0 & 1.0 & 1.0 \end{bmatrix}, \quad \beta = \begin{bmatrix} 0.0 & 0.0 & 0.0 \end{bmatrix}`} />

            <h3>8. FFN Linear Layer 1 Weight Matrix (<InlineMath math={String.raw`W_1`} />) (+ bias)</h3>
            Expands feature space (<InlineMath math={String.raw`\text{Model Dim } 3 \times \text{Hidden Dim } 6`} />) with zero initial bias vector <InlineMath math={String.raw`b_1`} />:
            <BlockMath math={String.raw`W_1 = \begin{bmatrix} 0.4 & -0.2 & 0.1 & 0.6 & -0.5 & 0.3 \\ -0.1 & 0.8 & -0.4 & 0.2 & 0.7 & -0.6 \\ 0.5 & 0.3 & 0.9 & -0.2 & 0.1 & 0.4 \end{bmatrix}, \quad b_1 = \begin{bmatrix} 0 & 0 & 0 & 0 & 0 & 0 \end{bmatrix}`} />

            <h3>9. FFN Linear Layer 2 Weight Matrix (<InlineMath math={String.raw`W_2`} />) (+ bias)</h3>
            Projects back to model space (<InlineMath math={String.raw`\text{Hidden Dim } 6 \times \text{Model Dim } 3`} />) with zero initial bias vector <InlineMath math={String.raw`b_2`} />:
            <BlockMath math={String.raw`W_2 = \begin{bmatrix} 0.2 & -0.4 & 0.5 \\ -0.3 & 0.6 & 0.1 \\ 0.7 & -0.2 & -0.5 \\ 0.1 & 0.3 & 0.8 \\ -0.6 & 0.5 & 0.2 \\ 0.4 & -0.1 & 0.3 \end{bmatrix}, \quad b_2 = \begin{bmatrix} 0 & 0 & 0 \end{bmatrix}`} />

            <h3>10. LayerNorm 2 Parameters (<InlineMath math={String.raw`\gamma, \beta`} />)</h3>
            Learned element-wise scaling (<InlineMath math={String.raw`\gamma`} />) and shifting (<InlineMath math={String.raw`\beta`} />) parameters for 2nd Layer Normalization:
            <BlockMath math={String.raw`\gamma = \begin{bmatrix} 1.0 & 1.0 & 1.0 \end{bmatrix}, \quad \beta = \begin{bmatrix} 0.0 & 0.0 & 0.0 \end{bmatrix}`} />

            <h3 style={{ color: "#fff", marginTop: "2rem" }}>🎯 Post-Transformer Block (LM Head)</h3>

            <h3>11. LM Head Matrix (<InlineMath math={String.raw`W_{\text{LM Head}}`} />)</h3>
            Projects final hidden state to vocabulary logit scores (<InlineMath math={String.raw`\text{Model Dim } 3 \times \text{Vocab Size } 5`} />):
            <BlockMath math={String.raw`W_{\text{LM Head}} = \begin{bmatrix} 0.3 & -0.2 & 0.7 & 0.1 & -0.4 \\ -0.5 & 0.8 & -0.1 & 0.6 & 0.2 \\ 0.4 & 0.3 & -0.6 & 0.5 & -0.7 \end{bmatrix}`} />

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 0.1 - Course Index" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 1.1 - Dot Products" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 1 Pre Requisite Maths",
    topics: [
      {
        title: "Chapter 1.1 - Dot Products",
        summary: "Detailed breakdown of Chapter 1.1 - Dot Products",
        content: (
          <>
            <h2 id="calculating-dot-products" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              Calculating Dot Products
            </h2>
            suppose we have a tensor with list of values
            <CodeBlock language="python">{`import torch
        
inputs = torch.tensor(
  [[0.43, 0.15, 0.89], # Your     (x^1)
   [0.55, 0.87, 0.66], # journey  (x^2)
   [0.57, 0.85, 0.64], # starts   (x^3)
   [0.22, 0.58, 0.33], # with     (x^4)
   [0.77, 0.25, 0.10], # one      (x^5)
   [0.05, 0.80, 0.55]] # step     (x^6)
)
print(inputs)`}</CodeBlock>
            we will now take 2 values and multiply them mathematically
            <CodeBlock language="python">{`print ([0.4300*0.5500+ 0.1500*0.8700+ 0.8900*0.6600])`}</CodeBlock>
            now lets try to do same through torch library
            <CodeBlock language="python">{`print(torch.dot(inputs[0],inputs[1]))`}</CodeBlock>
            so dot is of [x, y, z] and [a, b, c] is [x*a +y*b + zc ] both mathematically and by using torch.dot() library method.
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 0.2 - Architecture Ingredients" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 1.2 - Matrix Multiplication" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 1.2 - Matrix Multiplication",
        summary: "Detailed breakdown of Chapter 1.2 - Matrix Multiplication",
        content: (
          <>
            <h2 id="matrix-multiplication" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              ✖️ Matrix Multiplication
            </h2>
            Matrix multiplication is essentially just doing many <strong>Dot Products</strong> all at once. Let's visualize how a <InlineMath math={String.raw`2 \times 2`} /> matrix multiplies with another <InlineMath math={String.raw`2 \times 2`} /> matrix mathematically.
            <BlockMath math={String.raw`\begin{bmatrix} \textcolor{red}{A} & \textcolor{red}{B} \\ \textcolor{skyblue}{C} & \textcolor{skyblue}{D} \end{bmatrix} \times \begin{bmatrix} \textcolor{green}{E} & \textcolor{orange}{F} \\ \textcolor{green}{G} & \textcolor{orange}{H} \end{bmatrix} = \begin{bmatrix} (\textcolor{red}{A} \times \textcolor{green}{E}) + (\textcolor{red}{B} \times \textcolor{green}{G}) & (\textcolor{red}{A} \times \textcolor{orange}{F}) + (\textcolor{red}{B} \times \textcolor{orange}{H}) \\ (\textcolor{skyblue}{C} \times \textcolor{green}{E}) + (\textcolor{skyblue}{D} \times \textcolor{green}{G}) & (\textcolor{skyblue}{C} \times \textcolor{orange}{F}) + (\textcolor{skyblue}{D} \times \textcolor{orange}{H}) \end{bmatrix}`} />
            <MatrixMultiplicationVisualizer />
            <h3 id="matrix-dimension-rules" style={{ color: "#fff", fontSize: "1.35rem", fontWeight: 700, marginTop: "1.75rem", marginBottom: "0.75rem" }}>
              📐 Matrix Dimension Rules (The Golden Rule)
            </h3>
            When multiplying two matrices, say a matrix of size <InlineMath math={String.raw`a \times b`} /> with another matrix of size <InlineMath math={String.raw`c \times d`} />:
            <Callout type="info" title="Dimension Compatibility & Output Size">
              <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: "1.8" }}>
                <li><strong>The Inner Dimensions Must Match (b = c):</strong> The number of <strong>Columns (width)</strong> in the first matrix must equal the number of <strong>Rows (height)</strong> in the second matrix.</li>
                <li><strong>The Resulting Matrix Size (a &times; d):</strong> The output matrix will inherit its <strong>height (rows)</strong> from the first matrix and its <strong>width (columns)</strong> from the second matrix.</li>
              </ul>
              <BlockMath math={String.raw`(a \times \mathbf{b}) \times (\mathbf{c} \times d) \longrightarrow (a \times d) \quad \text{where } \mathbf{b = c}`} />
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 1.1 - Dot Products" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 2.1 - Tokenization & Input Prompt" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 2 Input Processing & Embeddings (End-to-End Walkthrough)",
    topics: [
      {
        title: "Chapter 2.1 - Tokenization & Input Prompt",
        summary: "Converting raw prompt into token IDs",
        content: (
          <>
            <h2 id="input-tokenization" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🔤 Tokenizing the Input Prompt
            </h2>
            Let me take our example prompt: <strong>&quot;Tomorrow I am flying to&quot;</strong>.
            When passed into our BPE tokenizer (like GPT-2), each word is mapped to a specific numerical Token ID:
            <CodeBlock language="python">{`prompt = "Tomorrow I am flying to"
token_ids = [49488, 314, 716, 7348, 284]`}</CodeBlock>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 1.2 - Matrix Multiplication" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 2.2 - Token Embedding Lookup (We Matrix)" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 2.2 - Token Embedding Lookup (We Matrix)",
        summary: "Looking up token IDs in the embedding matrix",
        content: (
          <>
            <h2 id="embedding-lookup" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              📦 Token Embedding Matrix Lookup (<InlineMath math={String.raw`W_e`} />)
            </h2>
            Each token ID is looked up in the <strong>token embedding matrix</strong> <InlineMath math={String.raw`W_e`} /> of size <InlineMath math={String.raw`(50257 \times 3)`} /> (where vocabulary size is 50,257 and model dimension is 3).
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Word</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Token ID</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Token Embeddings (3D Vector)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.75rem", fontWeight: 700, color: "var(--accent-color)" }}>Tomorrow</td><td style={{ padding: "0.75rem" }}>49488</td><td style={{ padding: "0.75rem", fontFamily: "monospace" }}>[ 0.62, -0.15,  0.48]</td></tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.75rem", fontWeight: 700, color: "var(--accent-color)" }}>I</td><td style={{ padding: "0.75rem" }}>314</td><td style={{ padding: "0.75rem", fontFamily: "monospace" }}>[-0.31,  0.84,  0.12]</td></tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.75rem", fontWeight: 700, color: "var(--accent-color)" }}>am</td><td style={{ padding: "0.75rem" }}>716</td><td style={{ padding: "0.75rem", fontFamily: "monospace" }}>[ 0.17,  0.39, -0.56]</td></tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.75rem", fontWeight: 700, color: "var(--accent-color)" }}>flying</td><td style={{ padding: "0.75rem" }}>7348</td><td style={{ padding: "0.75rem", fontFamily: "monospace" }}>[ 0.91, -0.44,  0.27]</td></tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.75rem", fontWeight: 700, color: "var(--accent-color)" }}>to</td><td style={{ padding: "0.75rem" }}>284</td><td style={{ padding: "0.75rem", fontFamily: "monospace" }}>[-0.08,  0.71,  0.65]</td></tr>
              </tbody>
            </table>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 2.1 - Tokenization & Input Prompt" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 2.3 - Positional Embeddings & Combined Input Matrix" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 2.3 - Positional Embeddings & Combined Input Matrix",
        summary: "Adding positional embeddings to create the final input matrix",
        content: (
          <>
            <h2 id="positional-embeddings" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              📍 Positional Embeddings & Input Matrix Construction
            </h2>
            Transformers process tokens concurrently, so we look up positional embeddings for each index (0 to 4) and add them element-wise to the token embeddings:
            <BlockMath math={String.raw`\text{Position 0} \rightarrow [ 0.10,  0.00, -0.10] \\ \text{Position 1} \rightarrow [ 0.20, -0.10,  0.05] \\ \text{Position 2} \rightarrow [ 0.30,  0.10,  0.00] \\ \text{Position 3} \rightarrow [ 0.40, -0.20,  0.10] \\ \text{Position 4} \rightarrow [ 0.50,  0.00, -0.05]`} />
            <Callout type="info" title="Element-wise Addition (Token + Positional)">
              <CodeBlock language="text">{`[ 0.62, -0.15,  0.48] + [ 0.10,  0.00, -0.10] = [ 0.72, -0.15,  0.38]  
[-0.31,  0.84,  0.12] + [ 0.20, -0.10,  0.05] = [-0.11,  0.74,  0.17]  
[ 0.17,  0.39, -0.56] + [ 0.30,  0.10,  0.00] = [ 0.47,  0.49, -0.56]  
[ 0.91, -0.44,  0.27] + [ 0.40, -0.20,  0.10] = [ 1.31, -0.64,  0.37]  
[-0.08,  0.71,  0.65] + [ 0.50,  0.00, -0.05] = [ 0.42,  0.71,  0.60]`}</CodeBlock>
            </Callout>
            <BlockMath math={String.raw`\mathbf{X}_{\text{input}} = \begin{bmatrix} 0.72 & -0.15 & 0.38 \\ -0.11 & 0.74 & 0.17 \\ 0.47 & 0.49 & -0.56 \\ 1.31 & -0.64 & 0.37 \\ 0.42 & 0.71 & 0.60 \end{bmatrix}`} />
            <Callout type="tip" title="💡 Modern Architectural Alternative">
              Modern LLMs (such as LLaMA, Gemma, and Mistral) replace static position vector addition with <strong>Rotary Position Embeddings (RoPE)</strong>. Explore how geometric rotation works in <TopicLink targetTopic="Chapter 9.3 - Positional Encoding Variants (Absolute vs. RoPE vs. ALiBi)">Chapter 9.3 (RoPE & ALiBi)</TopicLink>.
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 2.2 - Token Embedding Lookup (We Matrix)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 3.1 - Weight Matrices (WQ, WK, WV) & Projections" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 3 Single-Head Self-Attention Mechanics (Step-by-Step)",
    topics: [
      {
        title: "Chapter 3.1 - Weight Matrices (WQ, WK, WV) & Projections",
        summary: "Understanding weight matrices and calculating Query, Key, Value vectors",
        content: (
          <>
            <h2 id="weight-matrices-qkv" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🔑 Weight Matrices (<InlineMath math={String.raw`W_Q, W_K, W_V`} />) & QKV Projections
            </h2>
            <Callout type="info" title="Training vs. Inference Weight Origins">
              Weight matrices are <strong>not random during inference</strong>. They were initialized randomly before training, but during training they were updated millions/billions of times using gradient descent!
              <ul style={{ margin: "0.5rem 0 0 0", paddingLeft: "1.2rem", lineHeight: "1.8" }}>
                <li><strong><InlineMath math={String.raw`W_Q`} />:</strong> Learns how to create <strong>Queries</strong> (&quot;What am I looking for?&quot;)</li>
                <li><strong><InlineMath math={String.raw`W_K`} />:</strong> Learns how to create <strong>Keys</strong> (&quot;What information do I contain?&quot;)</li>
                <li><strong><InlineMath math={String.raw`W_V`} />:</strong> Learns how to create <strong>Values</strong> (&quot;What information should I pass on?&quot;)</li>
              </ul>
            </Callout>
            <BlockMath math={String.raw`\mathbf{X}_{\text{input vector}} = \begin{bmatrix} 0.72 & -0.15 & 0.38 \\ -0.11 & 0.74 & 0.17 \\ 0.47 & 0.49 & -0.56 \\ 1.31 & -0.64 & 0.37 \\ 0.42 & 0.71 & 0.60 \end{bmatrix}`} />

            <h3>Defining the Weight Matrices</h3>
            <BlockMath math={String.raw`W_Q = \begin{bmatrix} 0.5 & -0.2 \\ 0.1 & 0.8 \\ -0.4 & 0.3 \end{bmatrix}_{(3 \times 2)}, \quad W_K = \begin{bmatrix} -0.3 & 0.6 \\ 0.7 & -0.1 \\ 0.2 & 0.5 \end{bmatrix}_{(3 \times 2)}, \quad W_V = \begin{bmatrix} 0.4 & -0.3 \\ 0.1 & 0.8 \\ -0.5 & 0.2 \end{bmatrix}_{(3 \times 2)}`} />
            <h3>Calculating Q, K, V Projections (<InlineMath math={String.raw`\mathbf{X} \times W`} />)</h3>
            <p>1. <strong>Queries (<InlineMath math={String.raw`Q = \mathbf{X} \times W_Q`} />):</strong></p>
            <BlockMath math={String.raw`Q = \begin{bmatrix} 0.193 & -0.150 \\ -0.049 & 0.665 \\ 0.508 & 0.130 \\ 0.443 & -0.663 \\ 0.041 & 0.664 \end{bmatrix}_{(5 \times 2)}`} />
            <MatrixMultiplicationVisualizer
              matrixA={[[0.72, -0.15, 0.38], [-0.11, 0.74, 0.17], [0.47, 0.49, -0.56], [1.31, -0.64, 0.37], [0.42, 0.71, 0.60]]}
              matrixB={[[0.5, -0.2], [0.1, 0.8], [-0.4, 0.3]]}
              nameA="X" nameB="W<sub>Q</sub>" nameRes="Q"
            />
            <p>2. <strong>Keys (<InlineMath math={String.raw`K = \mathbf{X} \times W_K`} />):</strong></p>
            <BlockMath math={String.raw`K = \begin{bmatrix} -0.245 & 0.637 \\ 0.585 & -0.055 \\ 0.090 & -0.047 \\ -0.767 & 1.035 \\ 0.491 & 0.481 \end{bmatrix}_{(5 \times 2)}`} />
            <MatrixMultiplicationVisualizer
              matrixA={[[0.72, -0.15, 0.38], [-0.11, 0.74, 0.17], [0.47, 0.49, -0.56], [1.31, -0.64, 0.37], [0.42, 0.71, 0.60]]}
              matrixB={[[-0.3, 0.6], [0.7, -0.1], [0.2, 0.5]]}
              nameA="X" nameB="W<sub>K</sub>" nameRes="K"
            />
            <p>3. <strong>Values (<InlineMath math={String.raw`V = \mathbf{X} \times W_V`} />):</strong></p>
            <BlockMath math={String.raw`V = \begin{bmatrix} 0.083 & -0.260 \\ -0.055 & 0.659 \\ 0.517 & 0.139 \\ 0.275 & -0.831 \\ -0.061 & 0.562 \end{bmatrix}_{(5 \times 2)}`} />
            <MatrixMultiplicationVisualizer
              matrixA={[[0.72, -0.15, 0.38], [-0.11, 0.74, 0.17], [0.47, 0.49, -0.56], [1.31, -0.64, 0.37], [0.42, 0.71, 0.60]]}
              matrixB={[[0.4, -0.3], [0.1, 0.8], [-0.5, 0.2]]}
              nameA="X" nameB="W<sub>V</sub>" nameRes="V"
            />
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 2.3 - Positional Embeddings & Combined Input Matrix" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 3.2 - Raw Attention Scores & Dimension Scaling" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 3.2 - Raw Attention Scores & Dimension Scaling",
        summary: "Calculating QK^T dot products and scaling by sqrt(dk)",
        content: (
          <>
            <h2 id="attention-scores-scaling" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              ⚡ Calculating & Scaling Raw Attention Scores
            </h2>
            We compute raw attention scores by taking the matrix multiplication of Query matrix <InlineMath math={String.raw`Q`} /> with the transpose of Key matrix <InlineMath math={String.raw`K^T`} />:
            <BlockMath math={String.raw`\text{Scores} = Q K^T = \begin{bmatrix} -0.143 & 0.120 & 0.026 & -0.300 & 0.021 \\ 0.436 & -0.060 & -0.035 & 0.703 & 0.306 \\ -0.044 & 0.292 & 0.045 & -0.268 & 0.314 \\ -0.559 & 0.293 & 0.076 & -1.053 & -0.132 \\ 0.418 & -0.007 & -0.026 & 0.639 & 0.355 \end{bmatrix}`} />
            <MatrixMultiplicationVisualizer
              matrixA={[[0.193, -0.150], [-0.049, 0.665], [0.508, 0.126], [0.443, -0.707], [0.041, 0.672]]}
              matrixB={[[-0.245, 0.586, 0.100, -0.775, 0.495], [0.637, -0.047, -0.045, 0.999, 0.497]]}
              nameA="Q" nameB="K<sup>T</sup>" nameRes="Scores"
            />
            <Callout type="tip" title="Why Scale by √dₖ?">
              If we didn&apos;t divide by <InlineMath math={String.raw`\sqrt{d_k}`} />, dot products would grow larger as vector dimensions grow. Large values cause softmax to produce extreme 0s and 1s, leading to vanishing gradients and making training unstable!
              <br /><br />
              Here <InlineMath math={String.raw`d_k = 2 \implies \sqrt{d_k} = \sqrt{2} \approx 1.414`} />.
            </Callout>
            <h3>Scaling the Scores (<InlineMath math={String.raw`\text{Scores} / \sqrt{2}`} />)</h3>
            <BlockMath math={String.raw`\text{Scaled Scores} = \begin{bmatrix} -0.101 & 0.085 & 0.018 & -0.212 & 0.015 \\ 0.308 & -0.042 & -0.025 & 0.497 & 0.216 \\ -0.031 & 0.206 & 0.032 & -0.189 & 0.222 \\ -0.395 & 0.207 & 0.054 & -0.744 & -0.093 \\ 0.296 & -0.005 & -0.018 & 0.452 & 0.251 \end{bmatrix}`} />
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 3.1 - Weight Matrices (WQ, WK, WV) & Projections" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 3.3 - Causal Masking, Softmax Weights & Context Vector" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 3.3 - Causal Masking, Softmax Weights & Context Vector",
        summary: "Applying causal mask, softmax, and multiplying with Value matrix V",
        content: (
          <>
            <h2 id="masking-softmax-context" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🎭 Causal Masking, Softmax & Final Context Vector
            </h2>
            In autoregressive LLMs (like GPT), tokens cannot look into the future. We apply an upper-triangular causal mask of <InlineMath math={String.raw`-\infty`} />:
            <BlockMath math={String.raw`\text{Mask} = \begin{bmatrix} 0 & -\infty & -\infty & -\infty & -\infty \\ 0 & 0 & -\infty & -\infty & -\infty \\ 0 & 0 & 0 & -\infty & -\infty \\ 0 & 0 & 0 & 0 & -\infty \\ 0 & 0 & 0 & 0 & 0 \end{bmatrix}`} />
            <BlockMath math={String.raw`\text{Masked Scores} = \text{Scaled Scores} + \text{Mask} = \begin{bmatrix} -0.101 & -\infty & -\infty & -\infty & -\infty \\ 0.308 & -0.042 & -\infty & -\infty & -\infty \\ -0.031 & 0.206 & 0.032 & -\infty & -\infty \\ -0.395 & 0.207 & 0.054 & -0.744 & -\infty \\ 0.296 & -0.005 & -0.018 & 0.452 & 0.251 \end{bmatrix}`} />
            <CausalMaskVisualizer tokens={["Tomorrow", "I", "am", "flying", "to"]} />
            <h3>Applying Softmax (<InlineMath math={String.raw`A_w = \text{softmax}(\text{Masked Scores})`} />)</h3>
            <Callout type="info" title="Dropout Note">
              Dropout is skipped during text inference (generation mode) and is exclusively used during training to prevent overfitting.
            </Callout>
            <BlockMath math={String.raw`A_w = \begin{bmatrix} 1.000 & 0 & 0 & 0 & 0 \\ 0.587 & 0.413 & 0 & 0 & 0 \\ 0.301 & 0.382 & 0.317 & 0 & 0 \\ 0.192 & 0.351 & 0.301 & 0.156 & 0 \\ 0.229 & 0.169 & 0.167 & 0.268 & 0.219 \end{bmatrix}`} />
            <h3>Multiplying Attention Weights with Value Matrix (<InlineMath math={String.raw`A_w \times V`} />)</h3>
            Multiplying <InlineMath math={String.raw`A_w`} /> by <InlineMath math={String.raw`V`} /> yields the final Context Vector matrix:
            <BlockMath math={String.raw`\text{Context Vector} = A_w \times V = \begin{bmatrix} 0.083 & -0.260 \\ 0.026 & 0.120 \\ 0.170 & 0.212 \\ 0.134 & 0.056 \\ 0.127 & 0.013 \end{bmatrix}`} />
            <MatrixMultiplicationVisualizer
              matrixA={[[1.000, 0, 0, 0, 0], [0.587, 0.413, 0, 0, 0], [0.301, 0.382, 0.317, 0, 0], [0.192, 0.351, 0.301, 0.156, 0], [0.229, 0.169, 0.167, 0.268, 0.219]]}
              matrixB={[[0.083, -0.260], [-0.055, 0.659], [0.517, 0.137], [0.209, -0.829], [-0.048, 0.562]]}
              nameA="A<sub>w</sub>" nameB="V" nameRes="Context Vector"
            />
            <Callout type="success" title="Self-Attention Story Complete!">
              This concludes the exact mathematical calculation of single-head self-attention! Notice how row 0 corresponds to Head 1 in our multi-head setup.
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 3.2 - Raw Attention Scores & Dimension Scaling" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 4.1 - Multi-Head Self-Attention & Concatenation" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 4 Multi-Head Attention & Transformer Block",
    topics: [
      {
        title: "Chapter 4.1 - Multi-Head Self-Attention & Concatenation",
        summary: "Calculating multi-head attention and concatenating outputs",
        content: (
          <>
            <h2 id="multi-head-attention" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🧠 Multi-Head Self-Attention Mechanism
            </h2>
            We repeat the self-attention process across 3 independent attention heads (each producing 2-dimensional context vectors per token):
            <Callout type="tip" title="💡 Modern Architectural Alternative">
              Standard Multi-Head Attention maintains separate Key &amp; Value vectors for every head. For high-speed production inference, models like LLaMA 3 use <strong>Grouped-Query Attention (GQA)</strong> and <strong>FlashAttention</strong>. Learn how in <TopicLink targetTopic="Chapter 9.4 - Attention Variants (MHA vs. MQA vs. GQA & FlashAttention)">Chapter 9.4 (GQA & FlashAttention)</TopicLink>.
            </Callout>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginTop: "1rem", marginBottom: "1.5rem" }}>
              <Callout type="tip" title="Head 1 (5×2)">
                <CodeBlock language="text">{`[ 0.083, -0.260]
[ 0.026,  0.120]
[ 0.170,  0.212]
[ 0.134,  0.056]
[ 0.127,  0.013]`}</CodeBlock>
              </Callout>
              <Callout type="tip" title="Head 2 (5×2)">
                <CodeBlock language="text">{`[-0.192,  0.381]
[ 0.114,  0.248]
[ 0.292, -0.071]
[ 0.056,  0.319]
[ 0.173,  0.201]`}</CodeBlock>
              </Callout>
              <Callout type="tip" title="Head 3 (5×2)">
                <CodeBlock language="text">{`[ 0.214,  0.090]
[ 0.097, -0.161]
[ 0.333,  0.282]
[ 0.011, -0.084]
[ 0.205,  0.118]`}</CodeBlock>
              </Callout>
            </div>
            <h3>Concatenating Context Vectors Side-by-Side</h3>
            Placing the 3 head outputs side-by-side yields a unified <InlineMath math={String.raw`(5 \times 6)`} /> matrix:
            <BlockMath math={String.raw`\mathbf{Z}_{\text{concat}} = \begin{bmatrix} 0.083 & -0.260 & | & -0.192 & 0.381 & | & 0.214 & 0.090 \\ 0.026 & 0.120 & | & 0.114 & 0.248 & | & 0.097 & -0.161 \\ 0.170 & 0.212 & | & 0.292 & -0.071 & | & 0.333 & 0.282 \\ 0.134 & 0.056 & | & 0.056 & 0.319 & | & 0.011 & -0.084 \\ 0.127 & 0.013 & | & 0.173 & 0.201 & | & 0.205 & 0.118 \end{bmatrix}`} />
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 3.3 - Causal Masking, Softmax Weights & Context Vector" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 4.2 - Output Projection (WO)" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 4.2 - Output Projection (WO)",
        summary: "Projecting multi-head attention outputs back to model dimension using WO",
        content: (
          <>
            <h2 id="output-projection" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              ⚙️ Output Projection Matrix (<InlineMath math={String.raw`W_O`} />)
            </h2>
            We multiply the concatenated attention matrix <InlineMath math={String.raw`(5 \times 6)`} /> by the Output Projection Matrix <InlineMath math={String.raw`W_O`} /> <InlineMath math={String.raw`(6 \times 3)`} /> to project back to the model dimension:
            <BlockMath math={String.raw`W_O = \begin{bmatrix} 0.3 & -0.2 & 0.5 \\ -0.6 & 0.1 & 0.4 \\ 0.2 & 0.7 & -0.3 \\ 0.8 & -0.5 & 0.2 \\ -0.1 & 0.4 & 0.6 \\ 0.5 & 0.3 & -0.2 \end{bmatrix}`} />
            <BlockMath math={String.raw`\text{Multi-Head Attention Output} = \mathbf{Z}_{\text{concat}} \times W_O = \begin{bmatrix} 0.413 & -0.149 & 0.123 \\ -0.066 & 0.171 & -0.027 \\ 0.296 & 0.291 & 0.042 \\ 0.291 & -0.029 & -0.002 \\ 0.243 & 0.069 & 0.048 \end{bmatrix}`} />
            <MatrixMultiplicationVisualizer
              matrixA={[[0.083, -0.260, -0.192, 0.381, 0.214, 0.090], [0.026, 0.120, 0.114, 0.248, 0.097, -0.161], [0.170, 0.212, 0.292, -0.071, 0.333, 0.282], [0.134, 0.056, 0.056, 0.319, 0.011, -0.084], [0.127, 0.013, 0.173, 0.201, 0.205, 0.118]]}
              matrixB={[[0.3, -0.2, 0.5], [-0.6, 0.1, 0.4], [0.2, 0.7, -0.3], [0.8, -0.5, 0.2], [-0.1, 0.4, 0.6], [0.5, 0.3, -0.2]]}
              nameA="Z<sub>concat</sub>" nameB="W<sub>O</sub>" nameRes="Attention Output"
            />
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 4.1 - Multi-Head Self-Attention & Concatenation" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 5.1 - 1st Residual Connection" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 5 Pre FFN cleanup",
    topics: [
      {
        title: "Chapter 5.1 - 1st Residual Connection",
        summary: "Adding original input matrix to attention output matrix",
        content: (
          <>
            <h2 id="first-residual-connection" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🔗 1st Residual Connection
            </h2>
            We add the original input matrix <InlineMath math={String.raw`\mathbf{X}_{\text{input}}`} /> to the multi-head attention output matrix:
            <BlockMath math={String.raw`\text{Residual Output}_1 = \mathbf{X}_{\text{input}} + \text{Attention Output} = \begin{bmatrix} 1.133 & -0.299 & 0.503 \\ -0.176 & 0.911 & 0.143 \\ 0.766 & 0.781 & -0.518 \\ 1.601 & -0.669 & 0.368 \\ 0.663 & 0.779 & 0.648 \end{bmatrix}`} />
            <Callout type="info" title="Why Residual Connections?">
              Residual connections allow gradients to flow directly backwards during backpropagation without exploding or vanishing, enabling very deep network architectures to train reliably!
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 4.2 - Output Projection (WO)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 5.2 - 1st Layer Normalization" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 5.2 - 1st Layer Normalization",
        summary: "Detailed mathematical step-by-step breakdown of 1st Layer Normalization",
        content: (
          <>
            <h2 id="layer-norm-mechanics" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🧪 1st Layer Normalization (Step-by-Step Breakdown)
            </h2>
            Layer Normalization stabilizes deep neural network training by normalizing inputs across feature dimensions independently for each sequence token (row-by-row).
            <br /><br />
            Let&apos;s take our <strong>Residual Output 1</strong> matrix:
            <BlockMath math={String.raw`\text{Residual Output}_1 = \begin{bmatrix} 1.133 & -0.299 & 0.503 \\ -0.176 & 0.911 & 0.143 \\ 0.766 & 0.781 & -0.518 \\ 1.601 & -0.669 & 0.368 \\ 0.663 & 0.779 & 0.648 \end{bmatrix}`} />
            <Callout type="tip" title="💡 Modern Architectural Alternative">
              While standard LayerNorm computes both mean and variance, models like LLaMA use <strong>RMSNorm (Root Mean Square Normalization)</strong> to eliminate mean-centering and boost GPU throughput. Learn more in <TopicLink targetTopic="Chapter 9.2 - Normalization Alternatives (LayerNorm vs. RMSNorm)">Chapter 9.2 (RMSNorm)</TopicLink>.
            </Callout>

            <Callout type="example" title="Step-by-Step Walkthrough for Row 1: [1.133, -0.299, 0.503]">
              <p><strong>Step 1: Calculate Row Mean (<InlineMath math={String.raw`\mu`} />)</strong></p>
              <BlockMath math={String.raw`\mu = \frac{1.133 + (-0.299) + 0.503}{3} = \frac{1.337}{3} \approx 0.446`} />

              <p><strong>Step 2: Subtract Mean (Deviations from Mean <InlineMath math={String.raw`x - \mu`} />)</strong></p>
              <CodeBlock language="text">{`1.133  - 0.446 =  0.687
-0.299 - 0.446 = -0.745
0.503  - 0.446 =  0.057
Deviations = [ 0.687, -0.745,  0.057]`}</CodeBlock>

              <p><strong>Step 3: Calculate Squared Deviations & Variance (<InlineMath math={String.raw`\sigma^2`} />)</strong></p>
              <CodeBlock language="text">{`Squares = [ 0.687², (-0.745)², 0.057² ] = [ 0.472, 0.555, 0.003 ]
Variance = (0.472 + 0.555 + 0.003) / 3 = 0.343`}</CodeBlock>

              <p><strong>Step 4: Add Epsilon (<InlineMath math={String.raw`\varepsilon`} />) & Calculate Standard Deviation (<InlineMath math={String.raw`\sigma`} />)</strong></p>
              <BlockMath math={String.raw`\text{Variance} + \varepsilon \approx 0.343 \implies \sigma = \sqrt{\text{Variance} + \varepsilon} = \sqrt{0.343} \approx 0.586`} />

              <p><strong>Step 5: Normalize by Standard Deviation</strong></p>
              <BlockMath math={String.raw`\hat{x} = \begin{bmatrix} \frac{0.687}{0.586} & \frac{-0.745}{0.586} & \frac{0.057}{0.586} \end{bmatrix} = \begin{bmatrix} 1.17 & -1.27 & 0.10 \end{bmatrix}`} />

              <p><strong>Step 6: Apply Learned Scale (<InlineMath math={String.raw`\gamma`} />) and Shift (<InlineMath math={String.raw`\beta`} />) Parameters</strong></p>
              <BlockMath math={String.raw`\text{LayerNorm}(x) = \gamma \odot \hat{x} + \beta`} />
              With standard initial values <InlineMath math={String.raw`\gamma = [1, 1, 1]`} /> and <InlineMath math={String.raw`\beta = [0, 0, 0]`} />:
              <BlockMath math={String.raw`\text{Final Row 1 Result} = \begin{bmatrix} 1.40 & -1.52 & 0.12 \end{bmatrix}`} />
            </Callout>

            <h3>Final LayerNorm Output Across All Tokens</h3>
            Applying this exact row-wise normalization across all 5 tokens yields:
            <BlockMath math={String.raw`\text{LayerNorm Output}_1 = \begin{bmatrix} 1.40 & -1.52 & 0.12 \\ -1.15 & 1.29 & -0.14 \\ 0.71 & 0.70 & -1.41 \\ 1.31 & -1.14 & -0.17 \\ -0.16 & 0.91 & -0.75 \end{bmatrix}`} />
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 5.1 - 1st Residual Connection" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 6.1 - First Linear Layer (W1 Feature Expansion)" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 6 Feed-Forward Network (FFN)",
    topics: [
      {
        title: "Chapter 6.1 - First Linear Layer (W1 Feature Expansion)",
        summary: "Expanding token vectors from 3 model dimensions to 6 hidden dimensions using weight matrix W1",
        content: (
          <>
            Since our token vectors only have 3 feature dimensions, we expand them to 6 hidden dimensions using weight matrix <InlineMath math={String.raw`W_1`} /> (<InlineMath math={String.raw`3 \times 6`} />):
            <BlockMath math={String.raw`W_1 = \begin{bmatrix} 0.4 & -0.2 & 0.1 & 0.6 & -0.5 & 0.3 \\ -0.1 & 0.8 & -0.4 & 0.2 & 0.7 & -0.6 \\ 0.5 & 0.3 & 0.9 & -0.2 & 0.1 & 0.4 \end{bmatrix}`} />
            Multiplying <InlineMath math={String.raw`\text{LayerNorm Output}_1 \times W_1`} /> yields the pre-activation hidden matrix (<InlineMath math={String.raw`5 \times 6`} />):
            <BlockMath math={String.raw`\text{FFN Hidden Layer (Before GELU)} = \begin{bmatrix} 0.772 & -1.460 & 0.856 & 0.512 & -1.752 & 1.428 \\ -0.644 & 1.219 & -0.757 & -0.404 & 1.463 & -1.180 \\ -0.492 & 0.118 & -1.478 & -0.566 & -0.006 & -0.891 \\ 0.551 & -1.228 & 0.438 & 0.575 & -1.471 & 1.012 \\ -0.529 & 0.536 & -1.055 & 0.236 & 0.640 & -0.903 \end{bmatrix}`} />
            <MatrixMultiplicationVisualizer
              matrixA={[[1.40, -1.52, 0.12], [-1.15, 1.29, -0.14], [0.71, 0.70, -1.41], [1.31, -1.14, -0.17], [-0.16, 0.91, -0.75]]}
              matrixB={[[0.4, -0.2, 0.1, 0.6, -0.5, 0.3], [-0.1, 0.8, -0.4, 0.2, 0.7, -0.6], [0.5, 0.3, 0.9, -0.2, 0.1, 0.4]]}
              nameA="LN<sub>1</sub>" nameB="W<sub>1</sub>" nameRes="Hidden"
            />
            <Callout type="tip" title="💡 Modern Architectural Alternative">
              Instead of routing every token through a single dense FFN, sparse scaling architectures like Mixtral and DeepSeek dynamically route tokens to specialized expert subnetworks using <strong>Mixture of Experts (MoE)</strong>. Discover how in <TopicLink targetTopic="Chapter 9.5 - Scaling & Efficiency (Mixture of Experts - MoE & KV Caching)">Chapter 9.5 (MoE Architecture)</TopicLink>.
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 5.2 - 1st Layer Normalization" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 6.2 - GELU Activation Function" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 6.2 - GELU Activation Function",
        summary: "Applying non-linear GELU activation function element-wise to hidden representations",
        content: (
          <>
            The Gaussian Error Linear Unit (GELU) introduces smooth non-linearity to neural representations. Unlike ReLU which hard-clamps negative numbers to zero, GELU allows small negative gradients to flow back, preventing dead neurons:
            <BlockMath math={String.raw`\text{GELU}(x) = x \cdot \Phi(x) \approx 0.5x \cdot \left(1 + \tanh\left(\sqrt{\frac{2}{\pi}} \left(x + 0.044715 x^3\right)\right)\right)`} />
            <GeluVisualizer />
            <Callout type="info" title="Sample GELU Transformations">
              <CodeBlock language="text">{`GELU(0.772)  ≈  0.603
GELU(-1.460) ≈ -0.106
GELU(0.856)  ≈  0.689
GELU(-1.752) ≈ -0.070`}</CodeBlock>
            </Callout>
            <Callout type="tip" title="💡 Modern Activation Alternatives">
              While GELU is standard in GPT-2, models like LLaMA use <strong>SwiGLU</strong>, and earlier models used <strong>ReLU</strong>. Compare formulas and interactive activation curves in <TopicLink targetTopic="Chapter 9.1 - Activation Functions (ReLU vs. GELU vs. SwiGLU)">Chapter 9.1 (Activation Functions)</TopicLink>.
            </Callout>
            Applying GELU element-wise yields the activated hidden matrix (<InlineMath math={String.raw`5 \times 6`} />):
            <BlockMath math={String.raw`\text{FFN Hidden Layer (After GELU)} = \begin{bmatrix} 0.603 & -0.106 & 0.689 & 0.357 & -0.070 & 1.319 \\ -0.167 & 1.082 & -0.170 & -0.139 & 1.354 & -0.141 \\ -0.153 & 0.064 & -0.103 & -0.161 & -0.003 & -0.167 \\ 0.391 & -0.135 & 0.293 & 0.414 & -0.105 & 0.854 \\ -0.158 & 0.378 & -0.154 & 0.140 & 0.473 & -0.165 \end{bmatrix}`} />
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 6.1 - First Linear Layer (W1 Feature Expansion)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 6.3 - Second Linear Layer (W2 Model Projection)" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 6.3 - Second Linear Layer (W2 Model Projection)",
        summary: "Projecting 6 hidden dimensions back to the original 3 model dimensions using weight matrix W2",
        content: (
          <>
            We project back from 6 hidden dimensions to the original 3 model dimensions using weight matrix <InlineMath math={String.raw`W_2`} /> (<InlineMath math={String.raw`6 \times 3`} />):
            <BlockMath math={String.raw`W_2 = \begin{bmatrix} 0.2 & -0.4 & 0.5 \\ -0.3 & 0.6 & 0.1 \\ 0.7 & -0.2 & -0.5 \\ 0.1 & 0.3 & 0.8 \\ -0.6 & 0.5 & 0.2 \\ 0.4 & -0.1 & 0.3 \end{bmatrix}`} />
            Multiplying <InlineMath math={String.raw`\text{GELU Output} \times W_2`} /> yields the final FFN output matrix (<InlineMath math={String.raw`5 \times 3`} />):
            <BlockMath math={String.raw`\text{FFN Output} = \begin{bmatrix} 1.228 & -0.564 & 0.583 \\ -0.810 & 1.420 & -0.561 \\ -0.210 & 0.117 & -0.015 \\ 0.836 & -0.351 & 0.390 \\ -0.339 & 0.563 & -0.140 \end{bmatrix}`} />
            <Callout type="success" title="FFN Output Complete!">
              This is the final transformation performed by the Feed-Forward Network inside the Transformer block!
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 6.2 - GELU Activation Function" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 7.1 - 2nd Residual Connection" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 7 Post FFN cleanup",
    topics: [
      {
        title: "Chapter 7.1 - 2nd Residual Connection",
        summary: "Adding LayerNorm 1 output to FFN output",
        content: (
          <>
            <h2 id="second-residual-connection" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🔗 2nd Residual Connection
            </h2>
            We add the output of the first Layer Normalization (<InlineMath math={String.raw`\text{LayerNorm Output}_1`} />) to the output of the Feed-Forward Network (<InlineMath math={String.raw`\text{FFN Output}`} />):
            <BlockMath math={String.raw`\text{Residual Output}_2 = \text{LayerNorm Output}_1 + \text{FFN Output} = \begin{bmatrix} 2.628 & -2.084 & 0.703 \\ -1.960 & 2.710 & -0.701 \\ 0.500 & 0.817 & -1.425 \\ 2.146 & -1.491 & 0.220 \\ -0.499 & 1.473 & -0.890 \end{bmatrix}`} />
            <Callout type="info" title="Why Second Residual Connection?">
              Just like the first residual connection, this second shortcut ensures gradient stability around the Feed-Forward Network layer, allowing deep Transformer models to retain representations from earlier processing stages.
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 6.3 - Second Linear Layer (W2 Model Projection)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 7.2 - 2nd Layer Normalization" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 7.2 - 2nd Layer Normalization",
        summary: "Detailed mathematical step-by-step breakdown of 2nd Layer Normalization",
        content: (
          <>
            <h2 id="second-layer-norm-mechanics" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🧪 2nd Layer Normalization (Step-by-Step Breakdown)
            </h2>
            The second Layer Normalization stabilizes representations right before sending them to subsequent Transformer blocks or the final language model head.
            <br /><br />
            Let&apos;s take our <strong>Residual Output 2</strong> matrix:
            <BlockMath math={String.raw`\text{Residual Output}_2 = \begin{bmatrix} 2.628 & -2.084 & 0.703 \\ -1.960 & 2.710 & -0.701 \\ 0.500 & 0.817 & -1.425 \\ 2.146 & -1.491 & 0.220 \\ -0.499 & 1.473 & -0.890 \end{bmatrix}`} />
            <Callout type="tip" title="💡 Modern Architectural Alternative">
              Recall that modern LLMs often replace standard 2nd LayerNorm with <strong>RMSNorm</strong> for faster memory bandwidth. See the full formula and comparison in <TopicLink targetTopic="Chapter 9.2 - Normalization Alternatives (LayerNorm vs. RMSNorm)">Chapter 9.2 (RMSNorm)</TopicLink>.
            </Callout>

            <Callout type="example" title="Step-by-Step Walkthrough for Row 1: [2.628, -2.084, 0.703]">
              <p><strong>Step 1: Calculate Row Mean (<InlineMath math={String.raw`\mu`} />)</strong></p>
              <BlockMath math={String.raw`\mu = \frac{2.628 + (-2.084) + 0.703}{3} = \frac{1.247}{3} \approx 0.416`} />

              <p><strong>Step 2: Subtract Mean (Deviations from Mean <InlineMath math={String.raw`x - \mu`} />)</strong></p>
              <CodeBlock language="text">{` 2.628 - 0.416 =  2.212
-2.084 - 0.416 = -2.500
 0.703 - 0.416 =  0.287
Deviations = [ 2.212, -2.500,  0.287]`}</CodeBlock>

              <p><strong>Step 3: Calculate Squared Deviations & Variance (<InlineMath math={String.raw`\sigma^2`} />)</strong></p>
              <CodeBlock language="text">{`Squares = [ 2.212², (-2.500)², 0.287² ] = [ 4.893, 6.250, 0.082 ]
Variance = (4.893 + 6.250 + 0.082) / 3 = 3.742`}</CodeBlock>

              <p><strong>Step 4: Add Epsilon (<InlineMath math={String.raw`\varepsilon`} />) & Calculate Standard Deviation (<InlineMath math={String.raw`\sigma`} />)</strong></p>
              <BlockMath math={String.raw`\text{Variance} + \varepsilon \approx 3.742 \implies \sigma = \sqrt{\text{Variance} + \varepsilon} = \sqrt{3.742} \approx 1.934`} />

              <p><strong>Step 5: Normalize by Standard Deviation</strong></p>
              <BlockMath math={String.raw`\hat{x} = \begin{bmatrix} \frac{2.212}{1.934} & \frac{-2.500}{1.934} & \frac{0.287}{1.934} \end{bmatrix} = \begin{bmatrix} 1.14 & -1.29 & 0.15 \end{bmatrix}`} />

              <p><strong>Step 6: Apply Learned Scale (<InlineMath math={String.raw`\gamma`} />) and Shift (<InlineMath math={String.raw`\beta`} />) Parameters</strong></p>
              <BlockMath math={String.raw`\text{LayerNorm}(x) = \gamma \odot \hat{x} + \beta`} />
              With standard initial values <InlineMath math={String.raw`\gamma = [1, 1, 1]`} /> and <InlineMath math={String.raw`\beta = [0, 0, 0]`} />:
              <BlockMath math={String.raw`\text{Final Row 1 Result} = \begin{bmatrix} 1.28 & -1.16 & -0.12 \end{bmatrix}`} />
            </Callout>

            <h3>Final LayerNorm Output Across All Tokens</h3>
            Applying this exact row-wise normalization across all 5 tokens yields:
            <BlockMath math={String.raw`\text{LayerNorm Output}_2 = \begin{bmatrix} 1.28 & -1.16 & -0.12 \\ -1.02 & 1.36 & -0.34 \\ 0.48 & 0.91 & -1.39 \\ 1.30 & -1.14 & -0.16 \\ -0.41 & 1.38 & -0.97 \end{bmatrix}`} />
            <Callout type="info" title="Multi-Layer Progression">
              If this is not the last Transformer block, this matrix becomes the input for the next layer's self-attention mechanism, repeating the cycle.
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 7.1 - 2nd Residual Connection" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 8.1 - LM Head Projection & Next Word Prediction (&quot;Delhi&quot;)" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 8 Next Word Generation & LM Head (Inference)",
    topics: [
      {
        title: "Chapter 8.1 - LM Head Projection & Next Word Prediction (\"Delhi\")",
        summary: "Multiplying final hidden state by LM Head to predict the next word",
        content: (
          <>
            <h2 id="lm-head-prediction" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🎯 LM Head Projection & Next-Word Prediction
            </h2>
            Since this is the final layer block in inference, we extract only the <strong>last token's hidden state</strong> (Position 4, corresponding to word <em>"to"</em>):
            <BlockMath math={String.raw`\mathbf{h}_{\text{last}} = \begin{bmatrix} -0.41 & 1.38 & -0.97 \end{bmatrix}`} />
            <h3>The LM Head Matrix</h3>
            The <strong>LM Head Matrix</strong> projects from the Model Dimension (3) to Vocabulary Size (5 sample words in our dictionary):
            <BlockMath math={String.raw`W_{\text{LM Head}} = \begin{bmatrix} 0.3 & -0.2 & 0.7 & 0.1 & -0.4 \\ -0.5 & 0.8 & -0.1 & 0.6 & 0.2 \\ 0.4 & 0.3 & -0.6 & 0.5 & -0.7 \end{bmatrix}`} />
            <h3>Multiplying Last Hidden State by LM Head</h3>
            <BlockMath math={String.raw`\text{Logits} = \mathbf{h}_{\text{last}} \times W_{\text{LM Head}} = \begin{bmatrix} -1.201 & 0.891 & 0.131 & 0.307 & \mathbf{1.078} \end{bmatrix}`} />
            <MatrixMultiplicationVisualizer
              matrixA={[[-0.41, 1.38, -0.97]]}
              matrixB={[[0.3, -0.2, 0.7, 0.1, -0.4], [-0.5, 0.8, -0.1, 0.6, 0.2], [0.4, 0.3, -0.6, 0.5, -0.7]]}
              nameA="h<sub>last</sub>" nameB="W<sub>LM</sub>" nameRes="Logits"
            />
            <SoftmaxVisualizer
              initialLogits={[-1.201, 0.891, 0.131, 0.307, 1.078]}
              labels={["I", "am", "learning", "to", "Delhi"]}
            />
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Index</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Token ID</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Vocabulary Word</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Output Logit Score</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.75rem" }}>0</td><td style={{ padding: "0.75rem" }}>49488</td><td style={{ padding: "0.75rem" }}>&quot;I&quot;</td><td style={{ padding: "0.75rem" }}>-1.201</td></tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.75rem" }}>1</td><td style={{ padding: "0.75rem" }}>314</td><td style={{ padding: "0.75rem" }}>&quot;am&quot;</td><td style={{ padding: "0.75rem" }}>0.891</td></tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.75rem" }}>2</td><td style={{ padding: "0.75rem" }}>716</td><td style={{ padding: "0.75rem" }}>&quot;learning&quot;</td><td style={{ padding: "0.75rem" }}>0.131</td></tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}><td style={{ padding: "0.75rem" }}>3</td><td style={{ padding: "0.75rem" }}>7348</td><td style={{ padding: "0.75rem" }}>&quot;to&quot;</td><td style={{ padding: "0.75rem" }}>0.307</td></tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(16, 185, 129, 0.1)" }}><td style={{ padding: "0.75rem", fontWeight: 700, color: "#10b981" }}>4</td><td style={{ padding: "0.75rem", fontWeight: 700, color: "#10b981" }}>284</td><td style={{ padding: "0.75rem", fontWeight: 700, color: "#10b981" }}>&quot;Delhi&quot;</td><td style={{ padding: "0.75rem", fontWeight: 700, color: "#10b981" }}>1.078 (MAX)</td></tr>
              </tbody>
            </table>
            <Callout type="success" title="Final Prediction Result">
              The maximum logit score corresponds to Word 4 (<strong>&quot;Delhi&quot;</strong>) with a score of <strong>1.078</strong>. The model appends &quot;Delhi&quot;, completing the sentence:
              <br /><br />
              <strong style={{ fontSize: "1.2rem", color: "var(--accent-color)" }}>&quot;Tomorrow I am flying to Delhi&quot;</strong>
            </Callout>
            <Callout type="tip" title="💡 Production Speedup: KV Caching">
              During step-by-step next-word generation, recomputing attention for previous tokens is inefficient. Production inference servers use <strong>Key-Value (KV) Caching</strong> to store past states. Read how in <TopicLink targetTopic="Chapter 9.5 - Scaling & Efficiency (Mixture of Experts - MoE & KV Caching)">Chapter 9.5 (KV Caching)</TopicLink>.
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 7.2 - 2nd Layer Normalization" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 9.1 - ReLU Activation Function (Alternative to GELU)" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 9 Optional Alternatives",
    topics: [
      {
        title: "Chapter 9.1 - Activation Functions (ReLU vs. GELU vs. SwiGLU)",
        summary: "Exploring alternative activation functions in Transformer Feed-Forward Networks",
        content: (
          <>
            <h2 id="activation-variants" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              ⚡ Chapter 9.1: Activation Functions (ReLU vs. GELU vs. SwiGLU)
            </h2>
            While our core walkthrough uses <strong>GELU</strong> (standard in GPT-2 & BERT), modern large language models leverage alternative non-linear activations to optimize gradient flow and feature expression.
            <br /><br />
            <strong style={{ color: "#fff", fontSize: "1.1rem" }}>1. Rectified Linear Unit (ReLU)</strong><br />
            Used in the original 2017 Transformer (<em>&quot;Attention Is All You Need&quot;</em>). It strictly zeroes out negative values:
            <BlockMath math={String.raw`\text{ReLU}(x) = \max(0, x)`} />
            <ReluVisualizer />

            <strong style={{ color: "#fff", fontSize: "1.1rem", marginTop: "1.5rem", display: "block" }}>2. SwiGLU (Swish-Gated Linear Unit)</strong><br />
            Used in state-of-the-art LLMs like <strong>LLaMA 1/2/3, PaLM, and Mistral</strong>. SwiGLU replaces the standard 2-layer FFN with a 3-matrix gated architecture:
            <BlockMath math={String.raw`\text{SwiGLU}(x) = \text{Swish}_1(x W_1) \otimes (x W_3) W_2`} />
            <Callout type="tip" title="Why SwiGLU Outperforms GELU">
              Gated Linear Units (GLUs) allow the network to dynamically control how much information flows through each hidden dimension by multiplying two parallel linear projections (<InlineMath math={String.raw`W_1`} /> and <InlineMath math={String.raw`W_3`} />). Empirical benchmarks show SwiGLU significantly improves downstream reasoning performance.
            </Callout>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 8.1 - LM Head Projection & Next Word Prediction (&quot;Delhi&quot;)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 9.2 - Normalization Alternatives (LayerNorm vs. RMSNorm)" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 9.2 - Normalization Alternatives (LayerNorm vs. RMSNorm)",
        summary: "Comparing standard Layer Normalization with Root Mean Square Normalization (RMSNorm)",
        content: (
          <>
            <h2 id="norm-variants" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🧪 Chapter 9.2: Normalization Alternatives (LayerNorm vs. RMSNorm)
            </h2>
            In Chapters 5.2 and 7.2, we executed standard <strong>Layer Normalization</strong>, which computes both row-wise mean (<InlineMath math={String.raw`\mu`} strokeWidth={1.5} />) and variance (<InlineMath math={String.raw`\sigma^2`} />):
            <BlockMath math={String.raw`\text{LayerNorm}(x) = \frac{x - \mu}{\sqrt{\sigma^2 + \epsilon}} \odot \gamma + \beta`} />

            <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem" }}>
              RMSNorm (Root Mean Square Normalization)
            </h3>
            Adopted by <strong>LLaMA, Gemma, and Mistral</strong>, RMSNorm assumes that scaling invariance is the primary driver of LayerNorm's success, rendering mean-centering (<InlineMath math={String.raw`x - \mu`} />) unnecessary.
            <BlockMath math={String.raw`\text{RMSNorm}(x) = \frac{x}{\text{RMS}(x)} \odot \gamma, \quad \text{where } \text{RMS}(x) = \sqrt{\frac{1}{d} \sum_{i=1}^d x_i^2 + \epsilon}`} />

            <Callout type="info" title="Computational Efficiency of RMSNorm">
              By skipping mean calculation and bias subtraction (<InlineMath math={String.raw`\beta = 0`} />), RMSNorm reduces GPU memory access operations (IOPS) and boosts training throughput by 10% to 50% without degrading model accuracy.
            </Callout>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 9.1 - Activation Functions (ReLU vs. GELU vs. SwiGLU)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 9.3 - Positional Encoding Variants (Absolute vs. RoPE vs. ALiBi)" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 9.3 - Positional Encoding Variants (Absolute vs. RoPE vs. ALiBi)",
        summary: "Understanding modern relative position encodings like Rotary Position Embeddings (RoPE)",
        content: (
          <>
            <h2 id="positional-variants" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              📍 Chapter 9.3: Positional Encoding Variants (Absolute vs. RoPE vs. ALiBi)
            </h2>
            In Chapter 2.3, we used <strong>Absolute Positional Embeddings</strong> (<InlineMath math={String.raw`W_P`} />), where a static vector is directly added to token vectors. However, absolute embeddings struggle to extrapolate to context lengths longer than trained.
            <br /><br />
            <strong style={{ color: "#fff", fontSize: "1.1rem" }}>Rotary Position Embedding (RoPE)</strong><br />
            Used in <strong>LLaMA, GPT-NeoX, and Mistral</strong>. Instead of adding vectors, RoPE rotates the Query and Key vectors in 2D vector pairs by an angle proportional to their sequence position <InlineMath math={String.raw`m`} />:
            <BlockMath math={String.raw`R_{\Theta, m}^d = \begin{bmatrix} \cos m\theta_1 & -\sin m\theta_1 & 0 & 0 \\ \sin m\theta_1 & \cos m\theta_1 & 0 & 0 \\ 0 & 0 & \cos m\theta_2 & -\sin m\theta_2 \\ 0 & 0 & \sin m\theta_2 & \cos m\theta_2 \end{bmatrix}`} />
            <Callout type="success" title="Relative Geometric Attention">
              Because dot products between rotated Queries and Keys preserve relative distance (<InlineMath math={String.raw`m - n`} />), RoPE enables seamless context window extension (e.g., from 4k to 128k tokens) via frequency scaling.
            </Callout>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 9.2 - Normalization Alternatives (LayerNorm vs. RMSNorm)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 9.4 - Attention Variants (MHA vs. MQA vs. GQA & FlashAttention)" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 9.4 - Attention Variants (MHA vs. MQA vs. GQA & FlashAttention)",
        summary: "Exploring Multi-Query Attention (MQA), Grouped-Query Attention (GQA), and memory-efficient FlashAttention",
        content: (
          <>
            <h2 id="attention-variants" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🧠 Chapter 9.4: Attention Variants (MHA vs. MQA vs. GQA & FlashAttention)
            </h2>
            Standard <strong>Multi-Head Attention (MHA)</strong> maintains separate Query, Key, and Value heads for every attention head. While expressive, loading huge Key/Value matrices during inference creates massive GPU memory bottlenecks.
            <br /><br />
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "var(--text-secondary)" }}>
              <li><strong style={{ color: "#fff" }}>Multi-Query Attention (MQA)</strong>: All Query heads share a single key and value head. Extremely fast inference, but can slightly degrade model capability.</li>
              <li><strong style={{ color: "#fff" }}>Grouped-Query Attention (GQA)</strong>: Used in <strong>LLaMA 2/3 (70B) & Mistral</strong>. Query heads are partitioned into $G$ groups, with each group sharing one Key and Value head. Delivers near-MHA quality at near-MQA generation speeds!</li>
            </ul>

            <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem" }}>
              FlashAttention (IO-Aware Exact Attention)
            </h3>
            Standard attention computes and materializes intermediate <InlineMath math={String.raw`(N \times N)`} /> score matrices in slow GPU High Bandwidth Memory (HBM). <strong>FlashAttention</strong> tiles the attention matrix into blocks processed directly inside fast GPU SRAM using online softmax scaling, achieving 2-4x speedups without approximation!

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 9.3 - Positional Encoding Variants (Absolute vs. RoPE vs. ALiBi)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 9.5 - Scaling & Efficiency (Mixture of Experts - MoE & KV Caching)" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 9.5 - Scaling & Efficiency (Mixture of Experts - MoE & KV Caching)",
        summary: "Understanding Mixture of Experts (MoE) routing networks and Key-Value (KV) Caching for fast inference",
        content: (
          <>
            <h2 id="scaling-variants" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🚀 Chapter 9.5: Scaling & Efficiency (Mixture of Experts - MoE & KV Caching)
            </h2>
            <strong style={{ color: "#fff", fontSize: "1.1rem" }}>1. Mixture of Experts (MoE) Architecture</strong><br />
            Used in <strong>Mixtral 8x7B, DeepSeek-V2/V3, and GPT-4</strong>. Instead of passing every token through one dense Feed-Forward Network (FFN), MoE replaces the FFN layer with multiple independent &quot;Expert&quot; networks. A lightweight <strong>Router (Gating Network)</strong> dynamically selects the top-$k$ experts (e.g., 2 out of 8) for each token:
            <BlockMath math={String.raw`y = \sum_{i=1}^N \text{Softmax}(\text{TopK}(x \cdot W_{\text{gate}}))_i \cdot \text{Expert}_i(x)`} />
            <Callout type="example" title="Sparse Computation Efficiency">
              MoE allows a model to have 47 Billion total parameters while only activating 13 Billion parameters per token, delivering massive model capacity at a fraction of the inference compute cost!
            </Callout>

            <strong style={{ color: "#fff", fontSize: "1.1rem", marginTop: "1.5rem", display: "block" }}>2. Key-Value (KV) Caching in Autoregressive Generation</strong><br />
            During step-by-step next-token generation, earlier tokens' Key and Value vectors do not change. By storing (<InlineMath math={String.raw`K`} /> and <InlineMath math={String.raw`V`} />) tensors in GPU memory, the model avoids recomputing attention for previous tokens at every new step, turning $O(N^2)$ generation time into $O(N)$!

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 9.4 - Attention Variants (MHA vs. MQA vs. GQA & FlashAttention)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="None" />
            </div>
          </>
        ),
      },
    ],
  },
];
