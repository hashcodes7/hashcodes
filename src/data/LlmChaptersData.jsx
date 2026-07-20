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
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Welcome to the complete, step-by-step mathematical breakdown of Large Language Models (Decoder-only Transformer Architecture)! Below is the structured index of all course modules:
            </p>
            
            <Callout type="info" title="Course Repository">
              <p style={{ marginTop: "0.5rem", lineHeight: "1.8", color: "#fff" }}>
                All the code, notebooks, and materials for this course can be found on our official GitHub repository: <br/>
                <a href="https://github.com/hashcodes7/GPT2-End-to-End-Architecture" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-color)", textDecoration: "underline", fontWeight: 600 }}>
                  hashcodes7/GPT2-End-to-End-Architecture
                </a>
              </p>
            </Callout>
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
                  <TopicLink targetTopic="Chapter 8.1 - LM Head Projection & Logits Calculation (&quot;Delhi&quot;)" isChapterHeader={true}>Chapter 8: Next Word Generation</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 8.1 - LM Head Projection & Logits Calculation (&quot;Delhi&quot;)">8.1 LM Head Projection & Logits</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 8.2 - Softmax Probabilities & Sampling Strategies (Temperature, Top-K, Top-P)">8.2 Sampling (Temperature, Top-K, Top-P)</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 8.3 - Autoregressive Generation Loop & Decoding">8.3 Autoregressive Generation Loop</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 9.1 - Calculating Text Generation Loss (Cross Entropy)" isChapterHeader={true}>Chapter 9: Training</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 9.1 - Calculating Text Generation Loss (Cross Entropy)">9.1 Cross Entropy Loss</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 9.2 - Generating Text Batches">9.2 Generating Text Batches</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 9.3 - Calculating the Batch Loss">9.3 Calculating the Batch Loss</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 9.4 - Backpropogation (loss.backward())">9.4 Backpropagation</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 9.5 - The Optimization Step">9.5 The Optimization Step</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 9.6 - Tensor">9.6 Tensors</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 9.7 - Weight Optimization">9.7 Weight Optimization (Optimizers)</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 9.8 - Complete Training Pipeline">9.8 Complete Training Pipeline</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 10.1 - Saving our model weights..." isChapterHeader={true}>Chapter 10: Pretrained Weights</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 10.1 - Saving our model weights...">10.1 Saving & Loading Weights</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 10.2 - Downloading GPT Model Pretrained Weights">10.2 Downloading GPT-2 Weights</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 10.3 - Tensorflow weights conversion to Pytorch (mapping)">10.3 Mapping TF to PyTorch</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 10.4 - Complete Weight Loading Pipeline">10.4 Complete Weight Loading Pipeline</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 11.1 - Introduction to Finetuning" isChapterHeader={true}>Chapter 11: Finetuning</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 11.1 - Introduction to Finetuning">11.1 Introduction to Finetuning</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 11.2 - Instruction Dataset">11.2 Instruction Dataset</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 11.3 - The Collate Function (Padding & Masking)">11.3 Collate Function (Padding & Masking)</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 11.4 - The Finetuning Pipeline">11.4 The Finetuning Pipeline</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 12.1 - Activation Functions (ReLU vs. GELU vs. SwiGLU)" isChapterHeader={true}>Chapter 12: Optional Alternatives & Modern Variants</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 12.1 - Activation Functions (ReLU vs. GELU vs. SwiGLU)">12.1 Activation Functions (ReLU, GELU, SwiGLU)</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 12.2 - Normalization Alternatives (LayerNorm vs. RMSNorm)">12.2 Normalization (LayerNorm vs. RMSNorm)</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 12.3 - Positional Encoding Variants (Absolute vs. RoPE vs. ALiBi)">12.3 Positional Encodings (RoPE & ALiBi)</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 12.4 - Attention Variants (MHA vs. MQA vs. GQA & FlashAttention)">12.4 Attention Variants (GQA & FlashAttention)</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 12.5 - Scaling & Efficiency (Mixture of Experts - MoE & KV Caching)">12.5 Scaling & Speedups (MoE & KV Caching)</TopicLink></li>
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
              Modern LLMs (such as LLaMA, Gemma, and Mistral) replace static position vector addition with <strong>Rotary Position Embeddings (RoPE)</strong>. Explore how geometric rotation works in <TopicLink targetTopic="Chapter 12.3 - Positional Encoding Variants (Absolute vs. RoPE vs. ALiBi)">Chapter 12.3 (RoPE & ALiBi)</TopicLink>.
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
              Standard Multi-Head Attention maintains separate Key &amp; Value vectors for every head. For high-speed production inference, models like LLaMA 3 use <strong>Grouped-Query Attention (GQA)</strong> and <strong>FlashAttention</strong>. Learn how in <TopicLink targetTopic="Chapter 12.4 - Attention Variants (MHA vs. MQA vs. GQA & FlashAttention)">Chapter 12.4 (GQA & FlashAttention)</TopicLink>.
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
              While standard LayerNorm computes both mean and variance, models like LLaMA use <strong>RMSNorm (Root Mean Square Normalization)</strong> to eliminate mean-centering and boost GPU throughput. Learn more in <TopicLink targetTopic="Chapter 12.2 - Normalization Alternatives (LayerNorm vs. RMSNorm)">Chapter 12.2 (RMSNorm)</TopicLink>.
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
              Instead of routing every token through a single dense FFN, sparse scaling architectures like Mixtral and DeepSeek dynamically route tokens to specialized expert subnetworks using <strong>Mixture of Experts (MoE)</strong>. Discover how in <TopicLink targetTopic="Chapter 12.5 - Scaling & Efficiency (Mixture of Experts - MoE & KV Caching)">Chapter 12.5 (MoE Architecture)</TopicLink>.
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
              While GELU is standard in GPT-2, models like LLaMA use <strong>SwiGLU</strong>, and earlier models used <strong>ReLU</strong>. Compare formulas and interactive activation curves in <TopicLink targetTopic="Chapter 12.1 - Activation Functions (ReLU vs. GELU vs. SwiGLU)">Chapter 12.1 (Activation Functions)</TopicLink>.
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
              Recall that modern LLMs often replace standard 2nd LayerNorm with <strong>RMSNorm</strong> for faster memory bandwidth. See the full formula and comparison in <TopicLink targetTopic="Chapter 12.2 - Normalization Alternatives (LayerNorm vs. RMSNorm)">Chapter 12.2 (RMSNorm)</TopicLink>.
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
              <NavButton direction="next" targetTopic="Chapter 8.1 - LM Head Projection & Logits Calculation (&quot;Delhi&quot;)" />
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
        title: "Chapter 8.1 - LM Head Projection & Logits Calculation (\"Delhi\")",
        summary: "Multiplying final hidden state by LM Head to calculate vocabulary logits",
        content: (
          <>
            <h2 id="lm-head-prediction" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🎯 LM Head Projection & Logits Calculation
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
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 7.2 - 2nd Layer Normalization" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 8.2 - Softmax Probabilities & Sampling Strategies (Temperature, Top-K, Top-P)" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 8.2 - Softmax Probabilities & Sampling Strategies (Temperature, Top-K, Top-P)",
        summary: "Converting logits to probabilities and controlling randomness via Temperature, Top-K, and Top-P sampling",
        content: (
          <>
            <h2 id="sampling-strategies" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🎲 Softmax Probabilities & Sampling Strategies
            </h2>
            Raw logits are converted into a probability distribution using the <strong>Softmax</strong> function. However, in text generation, picking the maximum probability token every time (Greedy Search) can cause repetitive, robotic text!
            <br /><br />
            <strong style={{ color: "#fff", fontSize: "1.1rem" }}>1. Temperature Scaling (<InlineMath math={String.raw`T`} />)</strong><br />
            Logits are divided by temperature <InlineMath math={String.raw`T`} /> before Softmax:
            <BlockMath math={String.raw`P(y_i) = \frac{e^{z_i / T}}{\sum_j e^{z_j / T}}`} />
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "var(--text-secondary)" }}>
              <li><strong style={{ color: "#fff" }}>Low Temperature (<InlineMath math={String.raw`T \to 0`} />):</strong> Sharpen probabilities towards deterministic, greedy selection.</li>
              <li><strong style={{ color: "#fff" }}>High Temperature (<InlineMath math={String.raw`T > 1`} />):</strong> Flattens probabilities for creative, varied generation.</li>
            </ul>

            <strong style={{ color: "#fff", fontSize: "1.1rem", marginTop: "1.5rem", display: "block" }}>2. Top-K Sampling</strong><br />
            Truncates the vocabulary to only the top <InlineMath math={String.raw`K`} /> highest probability candidate tokens (e.g., <InlineMath math={String.raw`K = 50`} />), zeroing out unlikely noise tokens before sampling.

            <strong style={{ color: "#fff", fontSize: "1.1rem", marginTop: "1.5rem", display: "block" }}>3. Top-P (Nucleus) Sampling</strong><br />
            Dynamically selects the smallest set of top tokens whose cumulative probability exceeds <InlineMath math={String.raw`P`} /> (e.g., <InlineMath math={String.raw`P = 0.90`} />).

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 8.1 - LM Head Projection & Logits Calculation (&quot;Delhi&quot;)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 8.3 - Autoregressive Generation Loop & Decoding" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 8.3 - Autoregressive Generation Loop & Decoding",
        summary: "Appending generated tokens back to the prompt and looping autoregressively until completion",
        content: (
          <>
            <h2 id="autoregressive-loop" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🔁 Autoregressive Next-Token Generation Loop
            </h2>
            Large Language Models generate text one token at a time in an <strong>autoregressive loop</strong>. Once token ID `284` (<strong>"Delhi"</strong>) is sampled, it is appended to our input prompt:
            <CodeBlock language="text">{`Step 1 Input : "Tomorrow I am flying to" ➔ Model Predicts: "Delhi"
Step 2 Input : "Tomorrow I am flying to Delhi" ➔ Model Predicts: "next"`}</CodeBlock>

            <Callout type="success" title="End-to-End Inference Completed!">
              The model repeats this forward pass cycle, appending each newly generated token to the context window until an End-of-Sequence (<code>&lt;EOS&gt;</code>) token is generated!
            </Callout>

            <Callout type="tip" title="💡 Production Speedup: KV Caching">
              During step-by-step next-word generation, recomputing attention for previous tokens is inefficient. Production inference servers use <strong>Key-Value (KV) Caching</strong> to store past states. Read how in <TopicLink targetTopic="Chapter 12.5 - Scaling & Efficiency (Mixture of Experts - MoE & KV Caching)">Chapter 12.5 (KV Caching)</TopicLink>.
            </Callout>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 8.2 - Softmax Probabilities & Sampling Strategies (Temperature, Top-K, Top-P)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 12.1 - Activation Functions (ReLU vs. GELU vs. SwiGLU)" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 9 Training",
    topics: [
      {
        title: "Chapter 9.1 - Understanding Training a model",
        summary: "Overview of training a LLM based on its Loss function",
        content: (
          <>
            <Callout type="abstract" title="Overview">
              Here we will talk about training a LLM based on its Loss function
            </Callout>

            <h2 id="what-we-need" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🛠️ What we need
            </h2>
            <BlockMath math={String.raw`\begin{array}{ccc} \color{blue}{\Large\textbf{Inputs}} & & \color{green}{\Large\textbf{Targets (shifted by 1 place)}} \\[0.6em] \begin{bmatrix} I & had & always & Thought \\ Jack & Gisburn & rather & a \end{bmatrix} & \color{orange}{\Longrightarrow} & \begin{bmatrix} had & always & Thought & Jack \\ Gisburn & rather & a & Cheap \end{bmatrix} \end{array}`} />

            <h2 id="what-we-have-currently" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🛠️ What we have currently
            </h2>
            <BlockMath math={String.raw`\begin{array}{cc} \color{RoyalBlue}{\Large\textbf{Inputs}} & \color{ForestGreen}{\Large\textbf{Output Logits}} \\[0.8em] \begin{bmatrix} I & had & always & Thought\\ Jack & Gisburn & rather & a \end{bmatrix} & \color{orange}{\Longrightarrow} & \left[ \begin{array}{c} \left[ \begin{array}{c} I \rightarrow [v_1,v_2,\ldots,v_{50257}]\\ had \rightarrow [v_1,v_2,\ldots,v_{50257}]\\ always \rightarrow [v_1,v_2,\ldots,v_{50257}]\\ Thought \rightarrow [v_1,v_2,\ldots,v_{50257}] \end{array} \right] \\[1.5em] \left[ \begin{array}{c} Jack \rightarrow [v_1,v_2,\ldots,v_{50257}]\\ Gisburn \rightarrow [v_1,v_2,\ldots,v_{50257}]\\ rather \rightarrow [v_1,v_2,\ldots,v_{50257}]\\ a \rightarrow [v_1,v_2,\ldots,v_{50257}] \end{array} \right] \end{array} \right] \end{array}`} />

            <h2 id="understanding-the-size" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              ⚙️ Understanding the size
            </h2>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff" }}>
              <li>
                <strong style={{ color: "var(--accent-color)" }}>1 Input Batch</strong>
                <ul style={{ paddingLeft: "1.5rem", marginTop: "0.25rem" }}>
                  <li>contains <strong style={{ color: "var(--accent-color)" }}>2 samples/sequences</strong></li>
                  <li>each sequence contains <strong style={{ color: "var(--accent-color)" }}>4 tokens</strong></li>
                </ul>
              </li>
            </ul>
            Similarly:
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", marginTop: "0.5rem", color: "#fff" }}>
              <li>
                <strong style={{ color: "var(--accent-color)" }}>1 Output Batch</strong>
                <ul style={{ paddingLeft: "1.5rem", marginTop: "0.25rem" }}>
                  <li>contains <strong style={{ color: "var(--accent-color)" }}>2 output samples</strong>/sequences</li>
                  <li>each output sequence contains <strong style={{ color: "var(--accent-color)" }}>4 logit vectors</strong></li>
                  <li>each logit vector has <strong style={{ color: "var(--accent-color)" }}>50,257 values</strong></li>
                </ul>
              </li>
            </ul>

            <h2 id="flattening-the-logits" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              ⚙️ Flattening the Logits Output
            </h2>
            <BlockMath math={String.raw`\begin{array}{ccc} \color{RoyalBlue}{\Large\textbf{Output Tensor}} & \color{DarkOrange}{\Large\Longrightarrow} & \color{ForestGreen}{\Large\textbf{Flattened Output Tensor}} \\[1em] \left[ \begin{array}{c} \left[ \begin{array}{l} I \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ had \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ always \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ Thought \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}] \end{array} \right] \\[1.3em] \left[ \begin{array}{l} Jack \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ Gisburn \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ rather \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ a \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}] \end{array} \right] \end{array} \right] & & \left[ \begin{array}{l} I \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ had \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ always \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ Thought \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ Jack \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ Gisburn \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ rather \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ a \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}] \end{array} \right] \\[1em] \color{gray}{\text{Shape }(2,4,50257)} & & \color{gray}{\text{Shape }(8,50257)} \end{array}`} />

            <h2 id="softmaxing-the-logits" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              ⚙️ Softmaxing the logits tensor
            </h2>
            <BlockMath math={String.raw`\begin{array}{ccc} \color{RoyalBlue}{\Large\textbf{Flattened Output Tensor}} & \color{DarkOrange}{\Large\Longrightarrow} & \color{ForestGreen}{\Large\textbf{Softmaxed Output Tensor}} \\[1em] \left[ \begin{array}{l} I \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ had \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ always \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ Thought \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ Jack \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ Gisburn \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ rather \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ a \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}] \end{array} \right] & & \left[ \begin{array}{l} I \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ had \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ always \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ Thought \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ Jack \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ Gisburn \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ rather \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}]\\ a \rightarrow [v_1,v_2,v_3,\ldots,v_{50257}] \end{array} \right] \\[1em] \color{gray}{\text{Shape }(8,50257)} & & \color{gray}{\text{Shape }(8,50257)} \end{array}`} />

            <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem" }}>
              Explanation till now
            </h3>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff" }}>
              <li>basically firstly now its softmaxed and sum =1 so we can say these are probability of next word</li>
              <li>we call it like if we look at 2nd Row, had : then we have access to its previous words also. so it would be that if &quot;I had&quot; is the input , [v1,v2,v3....v50257] is the probability of each word</li>
              <li>since next word is &quot;always&quot;. so lets say according to vocabulary that word comes at 591th place.</li>
              <li>v<sub>591</sub> =probability of &quot;always&quot; =should be maximum</li>
              <li>If its not the maximum, we atleast want it to be the maximum because its the actual real next word</li>
            </ul>

            <h2 id="training" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Training
            </h2>
            lets say we have this sentance
            <CodeBlock language="text">
              Although the weather forecast predicted heavy rain throughout the afternoon
            </CodeBlock>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              how many inputs we will take in 1 training set is called <span style={{ color: "#4FC3F7", fontWeight: "bold" }}>context length</span>.
            </p>
            so if context length is =4 we will take 

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Input</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Target</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Although the weather forecast</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>the weather forecast predicted</td>
                </tr>
              </tbody>
            </table>

            similarly we make it for each sentance.
            and we get total of <span style={{ color: "#4FC3F7", fontWeight: "bold" }}>6 training sets</span>.

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Training Set</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Input</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Target</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>1</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Although the weather forecast</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>the weather forecast predicted</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>2</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>the weather forecast predicted</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>weather forecast predicted heavy</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>3</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>weather forecast predicted heavy</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>forecast predicted heavy rain</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>4</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>forecast predicted heavy rain</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>predicted heavy rain throughout</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>5</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>predicted heavy rain throughout</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>heavy rain throughout the</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>6</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>heavy rain throughout the</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>rain throughout the afternoon</td>
                </tr>
              </tbody>
            </table>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              taking each example through 1 generation cycle is waste of resources so we group them in batches. lets say we took 1 batch = 2 training sets so 6/2= 3 batches will be made
              the 3 batches are :
            </p>

            <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem" }}>
              batch 1 :
            </h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Training Set</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Input</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Target</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>1</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Although the weather forecast</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>the weather forecast predicted</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>2</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>the weather forecast predicted</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>weather forecast predicted heavy</td>
                </tr>
              </tbody>
            </table>

            <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem" }}>
              batch 2 :
            </h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Training Set</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Input</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Target</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>3</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>weather forecast predicted heavy</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>forecast predicted heavy rain</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>4</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>forecast predicted heavy rain</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>predicted heavy rain throughout</td>
                </tr>
              </tbody>
            </table>

            <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem" }}>
              batch 3 :
            </h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Training Set</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Input</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Target</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>5</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>predicted heavy rain throughout</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>heavy rain throughout the</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>6</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>heavy rain throughout the</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>rain throughout the afternoon</td>
                </tr>
              </tbody>
            </table>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              so the training sets overlap, this is called <span style={{ color: "#4FC3F7", fontWeight: "bold" }}>stride</span>. so since we shifted input 2 from input 1 by 1 token, stride =1 in our case. (most overlapping, this is best way).
            </p>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff" }}>
              <li>A <strong style={{ color: "var(--accent-color)" }}>stride of 1</strong> gives the <strong style={{ color: "var(--accent-color)" }}>maximum overlap</strong>, which is the most common and generally the best approach for training LLMs.</li>
            </ul>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 8.3 - Autoregressive Generation Loop & Decoding" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 9.2 - Batches and Epochs" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 9.2 - Batches and Epochs",
        summary: "Understanding how training sets are grouped into batches and epochs",
        content: (
          <>
            <Callout type="abstract" title="Overview">
              <p style={{ marginTop: "0.5rem", lineHeight: "1.8", color: "#fff" }}>
                every epoch can contain many batches. every batch can contain many training sets.<br />
                simple analogy is that<br />
                1 batch = the weights changed once<br />
                1 epoch = the entire dataset has been read through once
              </p>
            </Callout>

            <p style={{ marginTop: "1.5rem", lineHeight: "1.8", color: "#fff" }}>
              Suppose we have:
            </p>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff" }}>
              <li><span style={{ color: "#FFD54F", fontWeight: "bold" }}>1000 Training Sets</span></li>
              <li><span style={{ color: "#FFD54F", fontWeight: "bold" }}>Batch Size = 50</span></li>
            </ul>

            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff", listStyleType: "none", marginTop: "1rem" }}>
              <li style={{ marginBottom: "1rem" }}>
                2. Number of batches:
                <ul style={{ paddingLeft: "1.5rem", marginTop: "0.25rem", listStyleType: "disc" }}>
                  <li><strong style={{ color: "var(--accent-color)" }}>1000 ÷ 50 = 20 batches</strong></li>
                </ul>
              </li>
              <li style={{ marginBottom: "1rem" }}>
                3. Each batch processes <strong style={{ color: "var(--accent-color)" }}>50 training sets</strong> and performs <strong style={{ color: "var(--accent-color)" }}>1 weight update</strong>.
              </li>
              <li style={{ marginBottom: "1rem" }}>
                4. Therefore:
                <ul style={{ paddingLeft: "1.5rem", marginTop: "0.25rem", listStyleType: "disc" }}>
                  <li><strong style={{ color: "var(--accent-color)" }}>20 batches = 20 weight updates</strong></li>
                </ul>
              </li>
              <li style={{ marginBottom: "1rem" }}>
                5. After all <strong style={{ color: "var(--accent-color)" }}>20 batches</strong> are processed, the model has seen all <strong style={{ color: "var(--accent-color)" }}>1000 training sets</strong> once. This is called <strong style={{ color: "var(--accent-color)" }}><span style={{ color: "#4FC3F7" }}>1 Epoch</span></strong>.
              </li>
              <li style={{ marginBottom: "1rem" }}>
                6. If we train for <strong style={{ color: "var(--accent-color)" }}>10 epochs</strong>:
                <ul style={{ paddingLeft: "1.5rem", marginTop: "0.25rem", listStyleType: "disc" }}>
                  <li><strong style={{ color: "var(--accent-color)" }}>20 batches/epoch × 10 epochs = 200 weight updates</strong></li>
                </ul>
              </li>
            </ul>

            <CodeBlock language="bash">{`Epoch 1 

Batch 1 (Examples 1–50) 
↓ Update weights

Batch 2 (Examples 51–100)
↓ Update weights... 

Batch 20 (Examples 951–1000) ↓ 
Update weights✅ 

Entire dataset has now been seen once 
= 1 Epoch Completed (20 times weight changed)`}</CodeBlock>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 9.1 - Understanding Training a model" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 9.3 - Looking at 1 Epoch data" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 9.3 - Looking at 1 Epoch data",
        summary: "Visualizing inputs and probabilities over a complete training epoch",
        content: (
          <>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              sentence = &quot;hi my name is harshu who really loves my family&quot;
            </p>

            <h2 id="batch-1" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Batch 1
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Context Seen</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Output</th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>Probability of Output</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Target</th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>Probability of Target</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Full Probability Matrix Strip `[hi, my, name, is, harshu, who, really, loves, family]`</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>hi</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>hi</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.24</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.13</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.24, 0.13, 0.11, 0.09, 0.12, 0.10, 0.08, 0.07, 0.06]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>hi my</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>really</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.18</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>name</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.10</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.09, 0.12, 0.10, 0.11, 0.13, 0.14, 0.18, 0.07, 0.06]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>hi my name</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.21</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>is</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.12</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.08, 0.21, 0.09, 0.12, 0.13, 0.11, 0.10, 0.09, 0.07]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>hi my name is</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>harshu</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.29</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>harshu</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.29</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.05, 0.06, 0.07, 0.09, 0.29, 0.16, 0.12, 0.09, 0.07]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.26</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>name</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.12</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.08, 0.26, 0.12, 0.10, 0.08, 0.14, 0.09, 0.07, 0.06]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my name</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>really</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.20</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>is</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.09</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.07, 0.11, 0.15, 0.09, 0.14, 0.13, 0.20, 0.06, 0.05]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my name is</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.22</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>harshu</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.11</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.06, 0.09, 0.10, 0.13, 0.11, 0.22, 0.12, 0.10, 0.07]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my name is harshu</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.31</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.31</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.04, 0.06, 0.08, 0.07, 0.09, 0.31, 0.14, 0.13, 0.08]</td>
                </tr>
              </tbody>
            </table>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="batch-2" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Batch 2
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Context Seen</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Output</th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>Probability of Output</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Target</th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>Probability of Target</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Full Probability Matrix Strip `[hi, my, name, is, harshu, who, really, loves, family]`</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>name</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>name</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.24</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>is</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.13</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.06, 0.12, 0.24, 0.13, 0.09, 0.14, 0.10, 0.07, 0.05]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>name is</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.21</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>harshu</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.12</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.05, 0.08, 0.10, 0.18, 0.12, 0.21, 0.11, 0.09, 0.06]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>name is harshu</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>really</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.20</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.14</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.05, 0.07, 0.08, 0.09, 0.16, 0.14, 0.20, 0.13, 0.08]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>name is harshu who</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>really</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.30</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>really</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.30</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.04, 0.05, 0.06, 0.06, 0.09, 0.12, 0.30, 0.18, 0.10]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>is</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>is</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.25</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>harshu</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.13</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.05, 0.09, 0.08, 0.25, 0.13, 0.14, 0.10, 0.09, 0.07]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>is harshu</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.29</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.29</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.04, 0.06, 0.06, 0.08, 0.11, 0.29, 0.15, 0.13, 0.08]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>is harshu who</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>loves</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.28</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>really</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.16</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.04, 0.06, 0.06, 0.07, 0.08, 0.17, 0.16, 0.28, 0.08]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>is harshu who really</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>loves</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.35</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>loves</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.35</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.03, 0.04, 0.04, 0.05, 0.05, 0.09, 0.15, 0.35, 0.20]</td>
                </tr>
              </tbody>
            </table>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="batch-3" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Batch 3
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Context Seen</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Output</th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>Probability of Output</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Target</th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>Probability of Target</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Full Probability Matrix Strip `[hi, my, name, is, harshu, who, really, loves, family]`</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>harshu</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>harshu</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.24</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.12</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.05, 0.09, 0.08, 0.08, 0.24, 0.12, 0.13, 0.15, 0.06]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>harshu who</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>really</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.28</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>really</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.28</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.04, 0.06, 0.05, 0.05, 0.09, 0.16, 0.28, 0.18, 0.09]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>harshu who really</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>loves</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.34</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>loves</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.34</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.03, 0.04, 0.04, 0.05, 0.05, 0.10, 0.16, 0.34, 0.19]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>harshu who really loves</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>family</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.33</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.18</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.03, 0.18, 0.04, 0.05, 0.05, 0.06, 0.08, 0.18, 0.33]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.23</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>really</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.16</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.04, 0.09, 0.08, 0.08, 0.09, 0.23, 0.16, 0.14, 0.09]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who really</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>loves</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.31</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>loves</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.31</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.03, 0.05, 0.05, 0.05, 0.06, 0.12, 0.18, 0.31, 0.15]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who really loves</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.39</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.39</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.03, 0.39, 0.04, 0.04, 0.04, 0.06, 0.09, 0.18, 0.13]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who really loves my</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.34</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>family</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.17</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.03, 0.34, 0.03, 0.03, 0.03, 0.06, 0.09, 0.22, 0.17]</td>
                </tr>
              </tbody>
            </table>

            <div style={{ textAlign: "center", marginTop: "2rem", marginBottom: "2rem" }}>
              <h2 style={{ color: "#FF5252", fontSize: "1.5rem", fontWeight: 600 }}>
                Sentence = &quot;hi my name is harshu who really loves my family&quot;
              </h2>
            </div>

            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff", listStyleType: "disc" }}>
              <li>Total words (tokens) = <strong style={{ color: "var(--accent-color)" }}>10</strong></li>
              <li>Context Length (<InlineMath math={String.raw`T`} />) = <strong style={{ color: "var(--accent-color)" }}>4</strong></li>
              <li>Batch Size (<InlineMath math={String.raw`B`} />) = <strong style={{ color: "var(--accent-color)" }}>2</strong></li>
              <li>Training Sets (<InlineMath math={String.raw`N`} />) = <strong style={{ color: "var(--accent-color)" }}>24</strong></li>
              <li>
                <strong style={{ color: "var(--accent-color)" }}>Batch Size</strong> Number of context-length input sequences passed to the model in one batch.
                <ul style={{ paddingLeft: "1.5rem", marginTop: "0.25rem", listStyleType: "circle" }}>
                  <li>eg batch 1 has 2 (hi my name is      &amp;       my name is harshu)</li>
                </ul>
              </li>
              <li><strong style={{ color: "var(--accent-color)" }}>context length</strong> is length of 1 input eg (my name is harshu) =4 tokens =4</li>
              <li>no. of training sets that can be created =</li>
            </ul>

            <BlockMath math={String.raw`\text{Total Training Sets} = (\text{Total Tokens} - \text{Context Length}) \times \text{Context Length}`} />

            <BlockMath math={String.raw`\text{Number of Batches} = \frac{\text{Number of Training Sets}}{\text{Context Length} \times \text{Batch Size}} = \frac{24}{4 \times 2} = 3`} />

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              If we train for <InlineMath math={String.raw`E`} /> epochs:
            </p>

            <BlockMath math={String.raw`\text{Total Batch Iterations} = \text{Number of Batches} \times \text{Epochs}`} />

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Example (<InlineMath math={String.raw`Epochs=5`} />):
            </p>

            <BlockMath math={String.raw`\text{Total Batch Iterations} = 3 \times 5 = 15`} />

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 9.2 - Batches and Epochs" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 9.4 - Cross entropy loss" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 9.4 - Cross entropy loss",
        summary: "Measuring how much probability the model assigned to the correct next token",
        content: (
          <>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Cross Entropy Loss measures <strong style={{ color: "var(--accent-color)" }}>how much probability the model assigned to the actual (correct) next token</strong>.
            </p>

            <Callout type="info" title="Note">
              <p style={{ marginTop: "0.5rem", lineHeight: "1.8", color: "#fff" }}>
                It <strong style={{ color: "var(--accent-color)" }}>does not care which token was predicted</strong>. It only looks at the probability of the correct target token.
              </p>
            </Callout>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="formula" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Formula (Single Training Set)
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              For one training set (one prediction):
            </p>
            
            <BlockMath math={String.raw`\boxed{\text{Cross Entropy Loss} = -\ln\left(P(\text{Target})\right)}`} />
            
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              where
            </p>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff", listStyleType: "disc" }}>
              <li><InlineMath math={String.raw`P(\text{Target})`} /> = probability assigned to the actual next token.</li>
              <li><InlineMath math={String.raw`\ln`} /> = natural logarithm.</li>
            </ul>

            <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem" }}>
              Interpretation
            </h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem", maxWidth: "400px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)" }}>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>Probability of Correct Target</th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>Loss</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>1.00</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.000</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.90</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.105</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.50</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.693</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.20</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>1.609</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.10</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>2.303</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.01</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>4.605</td>
                </tr>
              </tbody>
            </table>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="batch-predictions" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Batch Predictions (taking B1 batch)
            </h2>
            
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Context Seen</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Output</th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>Probability of Output</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Target</th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>Probability of Target</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Full Probability Matrix Strip `[hi, my, name, is, harshu, who, really, loves, family]`</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>hi</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>hi</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.24</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.13</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.24, 0.13, 0.11, 0.09, 0.12, 0.10, 0.08, 0.07, 0.06]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>hi my</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>really</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.18</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>name</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.10</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.09, 0.12, 0.10, 0.11, 0.13, 0.14, 0.18, 0.07, 0.06]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>hi my name</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.21</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>is</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.12</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.08, 0.21, 0.09, 0.12, 0.13, 0.11, 0.10, 0.09, 0.07]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>hi my name is</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>harshu</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.29</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>harshu</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.29</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.05, 0.06, 0.07, 0.09, 0.29, 0.16, 0.12, 0.09, 0.07]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.26</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>name</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.12</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.08, 0.26, 0.12, 0.10, 0.08, 0.14, 0.09, 0.07, 0.06]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my name</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>really</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.20</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>is</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.09</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.07, 0.11, 0.15, 0.09, 0.14, 0.13, 0.20, 0.06, 0.05]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my name is</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.22</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>harshu</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.11</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.06, 0.09, 0.10, 0.13, 0.11, 0.22, 0.12, 0.10, 0.07]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my name is harshu</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.31</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.31</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.04, 0.06, 0.08, 0.07, 0.09, 0.31, 0.14, 0.13, 0.08]</td>
                </tr>
              </tbody>
            </table>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem" }}>
              Step 1 — Calculate Loss for Every Training Set
            </h3>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Using
            </p>
            <BlockMath math={String.raw`\text{Loss}=-\ln(P(\text{Target}))`} />

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem", maxWidth: "600px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)" }}>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>#</th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>Probability of Target</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Calculation</th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>Loss</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>1</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.13</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`-\ln(0.13)`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>2.040</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>2</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.10</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`-\ln(0.10)`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>2.303</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>3</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.12</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`-\ln(0.12)`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>2.120</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>4</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.29</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`-\ln(0.29)`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>1.238</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>5</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.12</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`-\ln(0.12)`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>2.120</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>6</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.09</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`-\ln(0.09)`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>2.408</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>7</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.11</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`-\ln(0.11)`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>2.207</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>8</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.31</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`-\ln(0.31)`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>1.171</td>
                </tr>
              </tbody>
            </table>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem" }}>
              Step 2 — Average All Losses
            </h3>

            <BlockMath math={String.raw`\begin{aligned}
\text{Batch Loss} &= \frac{2.040 + 2.303 + 2.120 + 1.238 + 2.120 + 2.408 + 2.207 + 1.171}{8} \\[4pt]
&= \frac{15.607}{8} \\[4pt]
&= \boxed{1.951}
\end{aligned}`} />

            <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem" }}>
              Batch feeding Input target explained
            </h3>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Here the entire logits is passed as first input so first tensor is inputs logits tensor so logits are like :
            </p>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.24, 0.13, 0.11, 0.09, 0.12, 0.10, 0.08, 0.07, 0.06]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.09, 0.12, 0.10, 0.11, 0.13, 0.14, 0.18, 0.07, 0.06]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.08, 0.21, 0.09, 0.12, 0.13, 0.11, 0.10, 0.09, 0.07]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.05, 0.06, 0.07, 0.09, 0.29, 0.16, 0.12, 0.09, 0.07]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.08, 0.26, 0.12, 0.10, 0.08, 0.14, 0.09, 0.07, 0.06]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.07, 0.11, 0.15, 0.09, 0.14, 0.13, 0.20, 0.06, 0.05]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.06, 0.09, 0.10, 0.13, 0.11, 0.22, 0.12, 0.10, 0.07]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.04, 0.06, 0.08, 0.07, 0.09, 0.31, 0.14, 0.13, 0.08]</td>
                </tr>
              </tbody>
            </table>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              while on other hand targets are like this :<br />
              <CodeBlock language="text">{`[ [4, 3, 1, 7], [2, 5, 6, 8] ]`}</CodeBlock>
              after flattening it looks like this :<br />
              <CodeBlock language="text">{`[4, 3, 1, 7, 2, 5, 6, 8]`}</CodeBlock>
            </p>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              or if we say better :
            </p>

            <h2 id="logits" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Logits / Probability Tensor (Simplified)
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Shape:
            </p>
            <BlockMath math={String.raw`(8,\;9)`} />

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)" }}>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>Row</th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "left" }}>Probability Distribution `[hi, my, name, is, harshu, who, really, loves, family]`</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>1</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.24, 0.13, 0.11, 0.09, 0.12, 0.10, 0.08, 0.07, 0.06]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>2</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.09, 0.12, 0.10, 0.11, 0.13, 0.14, 0.18, 0.07, 0.06]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>3</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.08, 0.21, 0.09, 0.12, 0.13, 0.11, 0.10, 0.09, 0.07]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>4</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.05, 0.06, 0.07, 0.09, 0.29, 0.16, 0.12, 0.09, 0.07]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>5</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.08, 0.26, 0.12, 0.10, 0.08, 0.14, 0.09, 0.07, 0.06]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>6</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.07, 0.11, 0.15, 0.09, 0.14, 0.13, 0.20, 0.06, 0.05]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>7</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.06, 0.09, 0.10, 0.13, 0.11, 0.22, 0.12, 0.10, 0.07]</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>8</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.04, 0.06, 0.08, 0.07, 0.09, 0.31, 0.14, 0.13, 0.08]</td>
                </tr>
              </tbody>
            </table>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              and <strong style={{ color: "var(--accent-color)" }}>targets tensor</strong> is like this initially:<br />
              <CodeBlock language="text">{`targets =
[
  [1, 2, 3, 4],
  [2, 3, 4, 5]
]`}</CodeBlock>
              after flattening it becomes <CodeBlock language="text">{`[1, 2, 3, 4, 2, 3, 4, 5]`}</CodeBlock><br />
              this is simply index no. of the logit that <strong style={{ color: "var(--accent-color)" }}>should have the most probability</strong>
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="both-tensors-together" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Both Tensors Together
            </h2>
            
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)" }}>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>Row</th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "left" }}>Logits / Probability Tensor <InlineMath math={String.raw`(8\times9)`} /></th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>Target Tensor <InlineMath math={String.raw`(8)`} /></th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>1</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.24, <span style={{ color: "#4CAF50", fontWeight: "bold" }}>0.13</span>, 0.11, 0.09, 0.12, 0.10, 0.08, 0.07, 0.06]</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}><strong style={{ color: "var(--accent-color)" }}>1</strong></td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>2</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.09, 0.12, <span style={{ color: "#4CAF50", fontWeight: "bold" }}>0.10</span>, 0.11, 0.13, 0.14, 0.18, 0.07, 0.06]</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}><strong style={{ color: "var(--accent-color)" }}>2</strong></td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>3</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.08, 0.21, 0.09, <span style={{ color: "#4CAF50", fontWeight: "bold" }}>0.12</span>, 0.13, 0.11, 0.10, 0.09, 0.07]</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}><strong style={{ color: "var(--accent-color)" }}>3</strong></td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>4</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.05, 0.06, 0.07, 0.09, <span style={{ color: "#4CAF50", fontWeight: "bold" }}>0.29</span>, 0.16, 0.12, 0.09, 0.07]</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}><strong style={{ color: "var(--accent-color)" }}>4</strong></td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>5</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.08, 0.26, <span style={{ color: "#4CAF50", fontWeight: "bold" }}>0.12</span>, 0.10, 0.08, 0.14, 0.09, 0.07, 0.06]</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}><strong style={{ color: "var(--accent-color)" }}>2</strong></td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>6</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.07, 0.11, 0.15, <span style={{ color: "#4CAF50", fontWeight: "bold" }}>0.09</span>, 0.14, 0.13, 0.20, 0.06, 0.05]</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}><strong style={{ color: "var(--accent-color)" }}>3</strong></td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>7</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.06, 0.09, 0.10, 0.13, <span style={{ color: "#4CAF50", fontWeight: "bold" }}>0.11</span>, 0.22, 0.12, 0.10, 0.07]</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}><strong style={{ color: "var(--accent-color)" }}>4</strong></td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>8</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>[0.04, 0.06, 0.08, 0.07, 0.09, <span style={{ color: "#4CAF50", fontWeight: "bold" }}>0.31</span>, 0.14, 0.13, 0.08]</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}><strong style={{ color: "var(--accent-color)" }}>5</strong></td>
                </tr>
              </tbody>
            </table>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              targets tensor is simply the index of the logit vector which should had the maximum value in probability list.
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h1 id="important-observation" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              Important Observation
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Cross entropy <strong style={{ color: "var(--accent-color)" }}>does not care whether the predicted token matches the target directly</strong>. Instead, it looks at <strong style={{ color: "var(--accent-color)" }}>how much probability the model assigned to the correct target token</strong>.
            </p>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              For example:
            </p>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Context</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Predicted</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Correct Target</th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>Probability of Target</th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>Loss</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>hi my name is</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>harshu ✅</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>harshu</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.29</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>1.238</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>my name is harshu</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who ✅</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>who</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.31</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>1.171</td>
                </tr>
              </tbody>
            </table>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Although the predictions are correct, the loss is <strong style={{ color: "var(--accent-color)" }}>not zero</strong> because the model is only <strong style={{ color: "var(--accent-color)" }}>29%</strong> and <strong style={{ color: "var(--accent-color)" }}>31%</strong> confident.
            </p>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Likewise,
            </p>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Context</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Predicted</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Correct Target</th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>Probability of Target</th>
                  <th style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>Loss</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>hi my</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>really ❌</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>name</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>0.10</td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "right" }}>2.303</td>
                </tr>
              </tbody>
            </table>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              The model predicted the wrong token and assigned only <strong style={{ color: "var(--accent-color)" }}>10%</strong> probability to the correct target, resulting in a much higher loss.
            </p>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 9.3 - Looking at 1 Epoch data" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 9.5 - Backpropogation" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 9.5 - Backpropogation",
        summary: "Understanding how gradients are calculated to improve model weights",
        content: (
          <>
            <h1 id="loss-backward" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "1rem", marginBottom: "1rem" }}>
              <CodeBlock language="python">{`loss.backward()`}</CodeBlock>
            </h1>
            
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              After computing the batch loss, we still don't know <strong style={{ color: "var(--accent-color)" }}>how to improve the model</strong>.
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              The batch loss only tells us the <strong style={{ color: "var(--accent-color)" }}>loss value</strong>
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              It <strong style={{ color: "var(--accent-color)" }}>doesn't tell us which weights should increase or decrease</strong>.
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>loss.backward()</code> does this for each single weight in every weight in the weights matrix
            </p>

            <BlockMath math={String.raw`\text{Gradient} = \frac{\partial \text{Loss}}{\partial \text{Weight}}`} />

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              This value is called the <strong style={{ color: "var(--accent-color)" }}>gradient</strong>. it calculates
            </p>
            
            <Callout type="info" title="Core Idea">
              <p style={{ marginTop: "0.5rem", lineHeight: "1.8", color: "#fff" }}>
                <strong style={{ color: "var(--accent-color)" }}>&quot;If I slightly change each weight in the model, how will the loss change?&quot;</strong>
              </p>
            </Callout>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem", maxWidth: "600px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Gradient</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Positive</strong> (<InlineMath math={String.raw`> 0`} />)</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Increasing the weight <strong style={{ color: "var(--accent-color)" }}>increases the loss</strong>. ❌</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Negative</strong> (<InlineMath math={String.raw`< 0`} />)</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Increasing the weight <strong style={{ color: "var(--accent-color)" }}>decreases the loss</strong>. ✅</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Zero</strong> (<InlineMath math={String.raw`= 0`} />)</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>A tiny change in the weight does not change the loss (locally flat).</td>
                </tr>
              </tbody>
            </table>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              backpropogation attaches the information to these tensors about how they &quot;should change&quot; in order to achieve targets . how it attaches the information we will learn in ch 8.6 Tensors<br/>
              The Backpropogation step will calculate this for each type of weight matrix there is<br/>
              these are the matrix:
            </p>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Layer</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Weight Matrix</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Purpose</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Updated by Backprop?</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Token Embedding</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>Embedding Matrix</code></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Converts token IDs → vectors</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>✅ Yes</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Positional Embedding</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>Position Embedding Matrix</code></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Adds position information</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>✅ Yes</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Query Projection</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`W_Q`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Creates Query vectors</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>✅ Yes</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Key Projection</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`W_K`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Creates Key vectors</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>✅ Yes</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Value Projection</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`W_V`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Creates Value vectors</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>✅ Yes</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Attention Output Projection</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`W_O`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Combines attention heads</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>✅ Yes</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Feed Forward Layer 1</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`W_1`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Expands hidden dimension</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>✅ Yes</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Feed Forward Layer 2</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`W_2`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Compresses back to model dimension</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>✅ Yes</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Final Output Layer (LM Head)</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`W_{out}`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Produces vocabulary logits</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>✅ Yes</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>LayerNorm Scale</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`\gamma`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Learns feature scaling</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>✅ Yes</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>LayerNorm Bias</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`\beta`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Learns feature shifting</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>✅ Yes</td>
                </tr>
              </tbody>
            </table>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 9.4 - Cross entropy loss" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 9.6 - Tensor" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 9.6 - Tensor",
        summary: "Understanding PyTorch Tensors, Gradients, and the Computation Graph",
        content: (
          <>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              In the previous chapter, we learned that:
            </p>
            <CodeBlock language="python">{`loss.backward()`}</CodeBlock>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              computes the <strong style={{ color: "var(--accent-color)" }}>gradient for every trainable weight</strong> in the model.
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h1 id="what-is-a-tensor" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              What is a Tensor?
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              A tensor is the fundamental data structure in PyTorch.
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Everything in a neural network is stored as tensors:
            </p>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff", listStyleType: "disc", marginTop: "1rem" }}>
              <li>Inputs</li>
              <li>Outputs</li>
              <li>Embeddings</li>
              <li>Weight matrices</li>
              <li>Bias vectors</li>
              <li>Activations</li>
              <li>Gradients</li>
              <li>Loss</li>
            </ul>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              A tensor is much more than just a matrix of numbers.<br/>
              It also stores metadata that allows PyTorch's automatic differentiation (Autograd) system to work.
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h1 id="internal-structure" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              A Tensor's Internal Structure
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Conceptually, a tensor looks like this:
            </p>
            <CodeBlock language="text">{`Tensor
├── Values
├── Shape
├── Data Type (dtype)
├── Device (CPU/GPU)
├── requires_grad
├── grad
├── grad_fn
└── Other memory/layout information`}</CodeBlock>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Let's understand each field.
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="tensor-structure" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Tensor Structure
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              A PyTorch tensor is more than just a matrix of numbers. It also stores metadata used by the Autograd engine.
            </p>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Field</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Purpose</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Values</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>The actual numerical data stored in the tensor.</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>[[0.52, -0.18], [1.31, 0.74]]</code></td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Shape</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Dimensions of the tensor.</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>torch.Size([2, 2])</code></td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>dtype</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Type of values stored.</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>torch.float32</code></td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>device</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Where the tensor is stored and computed.</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>cpu</code>, <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>cuda:0</code></td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>requires_grad</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Whether PyTorch should compute gradients for this tensor.</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>True</code></td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>grad</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Stores the computed gradients after `loss.backward()`.</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>[[+0.12, -0.08], [+0.43, +0.01]]</code></td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>grad_fn</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Stores the operation that created this tensor. Used to traverse the computation graph during backpropagation.</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>CrossEntropyLossBackward0</code>, <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>MatMulBackward0</code>, <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>AddBackward0</code></td>
                </tr>
              </tbody>
            </table>

            <Callout type="info" title="Note">
              <p style={{ marginTop: "0.5rem", lineHeight: "1.8", color: "#fff" }}>
                For understanding neural network training, the two most important fields are <strong style={{ color: "var(--accent-color)" }}>.grad</strong> and <strong style={{ color: "var(--accent-color)" }}>.grad_fn</strong>.
              </p>
              <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff", listStyleType: "disc", marginTop: "0.5rem" }}>
                <li><strong style={{ color: "var(--accent-color)" }}>.grad</strong> stores the gradients that the optimizer uses to update the weights.</li>
                <li><strong style={{ color: "var(--accent-color)" }}>.grad_fn</strong> stores how the tensor was created, allowing <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>loss.backward()</code> to trace the computation graph backward using the chain rule.</li>
              </ul>
            </Callout>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h1 id="gradient-matrix" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              Gradient Matrix (torch.grad)
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Every trainable tensor has a gradient tensor of exactly the same shape.
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>Example</p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>torch.Weight Matrix =</p>
            <CodeBlock language="text">{`[
 [0.52, -0.18],
 [1.31,  0.74]
]`}</CodeBlock>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>torch.grad Gradient Matrix=</p>
            <CodeBlock language="text">{`[
 [+0.12, -0.08],
 [+0.43, +0.01]
]`}</CodeBlock>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>Every value has a corresponding 1-1 gradient.</p>
            <CodeBlock language="text">{`Weight                  Gradient

0.52        ←→          +0.12

-0.18       ←→          -0.08

1.31        ←→          +0.43

0.74        ←→          +0.01`}</CodeBlock>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h1 id="grad-fn" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              7. grad_fn
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Every tensor created through an operation remembers <strong style={{ color: "var(--accent-color)" }}>how it was created</strong>.
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>Example</p>
            <CodeBlock language="python">{`x = torch.tensor([2.0], requires_grad=True)

y = x * 3`}</CodeBlock>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>Now</p>
            <CodeBlock language="python">{`x.grad_fn`}</CodeBlock>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>returns</p>
            <CodeBlock language="text">{`None`}</CodeBlock>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>because <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>x</code> was created directly.</p>
            
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>But</p>
            <CodeBlock language="python">{`y.grad_fn`}</CodeBlock>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>returns something like</p>
            <CodeBlock language="text">{`<MulBackward0>`}</CodeBlock>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              This tells PyTorch that <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>y</code> was produced by a multiplication operation.
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Every operation performed during the forward pass creates another node in the computation graph.
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h1 id="computation-graph" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              The Computation Graph
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>Suppose we execute</p>
            <CodeBlock language="python">{`logits = model(inputs)

loss = criterion(logits, targets)`}</CodeBlock>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>The graph conceptually looks like</p>
            <CodeBlock language="text">{`Model Weights
      │
      ▼
Forward Operations
      │
      ▼
Logits
      │
      ▼
Cross Entropy
      │
      ▼
Loss`}</CodeBlock>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Each tensor remembers the operation that created it.<br/>
              These connections form the computation graph.
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h1 id="chain-rule" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              Chain Rule
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Backpropagation is based on the <strong style={{ color: "var(--accent-color)" }}>Chain Rule</strong> from calculus.
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Instead of computing
            </p>
            <CodeBlock language="text">{`∂Loss / ∂Weight`}</CodeBlock>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              directly, PyTorch computes gradients one operation at a time while moving backward through the computation graph.
            </p>
            
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>Conceptually,</p>
            <CodeBlock language="text">{`Loss
 ↑
CrossEntropyBackward
 ↑
LinearBackward
 ↑
MatMulBackward
 ↑
EmbeddingBackward
 ↑
Weights`}</CodeBlock>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Each operation:
            </p>
            <ol style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff", listStyleType: "decimal", marginTop: "1rem" }}>
              <li>receives the gradient from the layer above,</li>
              <li>computes gradients for its own inputs,</li>
              <li>passes those gradients to the previous operation.</li>
            </ol>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              By repeatedly applying the chain rule, PyTorch eventually computes
            </p>
            <CodeBlock language="text">{`∂Loss / ∂Weight`}</CodeBlock>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              for every trainable parameter.
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h1 id="gradient-accumulation" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              Gradient Accumulation
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              One important property of PyTorch is that gradients <strong style={{ color: "var(--accent-color)" }}>accumulate</strong>.
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>Suppose after one backward pass</p>
            <CodeBlock language="text">{`weight.grad

[
 [0.20, 0.15]
]`}</CodeBlock>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>Calling</p>
            <CodeBlock language="python">{`loss.backward()`}</CodeBlock>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>again <strong style={{ color: "var(--accent-color)" }}>without clearing gradients</strong> results in</p>
            <CodeBlock language="text">{`weight.grad

[
 [0.40, 0.30]
]`}</CodeBlock>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              The new gradients are <strong style={{ color: "var(--accent-color)" }}>added</strong> to the existing ones.<br/>
              PyTorch does <strong style={{ color: "var(--accent-color)" }}>not</strong> automatically replace old gradients.
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              This behavior is useful when gradients from multiple mini-batches need to be accumulated before updating the weights.
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h1 id="clearing-gradients" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              Clearing Gradients
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Before computing gradients for a new training iteration, the previous gradients must be removed.
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>This is done using</p>
            <CodeBlock language="python">{`optimizer.zero_grad()`}</CodeBlock>
            
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>Conceptually</p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>Before</p>
            <CodeBlock language="text">{`weight.grad

[
 [0.20, 0.15]
]`}</CodeBlock>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>After</p>
            <CodeBlock language="python">{`optimizer.zero_grad()`}</CodeBlock>
            <CodeBlock language="text">{`weight.grad

[
 [0.00, 0.00]
]`}</CodeBlock>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Now the next call to
            </p>
            <CodeBlock language="python">{`loss.backward()`}</CodeBlock>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              stores only the gradients for the current forward pass.
            </p>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              A typical training iteration therefore follows this sequence:
            </p>
            <CodeBlock language="python">{`optimizer.zero_grad()

loss = model(...)

loss.backward()

optimizer.step()`}</CodeBlock>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h1 id="summary" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              Summary
            </h1>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff", listStyleType: "disc", marginTop: "1rem" }}>
              <li>A tensor stores much more than just numerical values.</li>
              <li>Every trainable tensor can store a gradient tensor in its <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>.grad</code> field.</li>
              <li>The gradient tensor always has the same shape as the original tensor.</li>
              <li>Every gradient corresponds one-to-one with a weight.</li>
              <li>Each gradient tells how changing that specific weight would affect the loss.</li>
              <li>Tensors created by operations remember how they were created through <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>grad_fn</code>.</li>
              <li>These connections form the computation graph.</li>
              <li>During backpropagation, PyTorch applies the chain rule to compute gradients for every trainable parameter.</li>
              <li>Gradients accumulate by default.</li>
              <li><code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>optimizer.zero_grad()</code> clears old gradients before the next backward pass.</li>
            </ul>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 9.5 - Backpropogation" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 9.7 - Weight Optimization" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 9.7 - Weight Optimization",
        summary: "How optimizers update weights using gradients to minimize loss",
        content: (
          <>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Now that every tensor is attached with a grad matrix which tells each of values about in which direction they should change, its time to change it. 
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              we use <strong style={{ color: "var(--accent-color)" }}>optimizers</strong> for this<br/>
              these optimizers change the weight in direction indicated by grad to achieve lesser loss<br/>
              there isnt a defined weights for best case scenario. there can be many combinations for least loss.
            </p>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem", maxWidth: "600px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Configuration A</strong></th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Configuration B</strong></th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>
                    <BlockMath math={String.raw`\begin{aligned} w_1 &= 3 \\ w_2 &= 7 \\ \text{Loss} &= 0.001 \end{aligned}`} />
                  </td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>
                    <BlockMath math={String.raw`\begin{aligned} w_1 &= 6 \\ w_2 &= 2 \\ \text{Loss} &= 0.001 \end{aligned}`} />
                  </td>
                </tr>
              </tbody>
            </table>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              least loss cant also be judged by just one weight but many weights combine together for least loss . eg:
            </p>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Original Configuration</strong></th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Only <InlineMath math={String.raw`w_1`} /> Changed</strong></th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>All Weights Adjusted</strong></th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>
                    <BlockMath math={String.raw`\begin{aligned} w_1 &= 2 \\ w_2 &= 5 \\ w_3 &= -1 \\ \text{Loss} &= 0.05 \end{aligned}`} />
                  </td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>
                    <BlockMath math={String.raw`\begin{aligned} w_1 &= 4 \\ w_2 &= 5 \\ w_3 &= -1 \\ \text{Loss} &= 2.10 \end{aligned}`} />
                  </td>
                  <td style={{ padding: "0.75rem", color: "#fff", textAlign: "center" }}>
                    <BlockMath math={String.raw`\begin{aligned} w_1 &= 4 \\ w_2 &= 8 \\ w_3 &= -3 \\ \text{Loss} &= 0.03 \end{aligned}`} />
                  </td>
                </tr>
              </tbody>
            </table>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              so we changed w1 to better value increased the loss while combination of other weights decreased it.<br/>
              This is what optimizers are good at.
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="common-optimizers" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Common Optimizers
            </h2>
            
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Optimizer</strong></th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Main Idea</strong></th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Used for Modern LLMs?</strong></th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>SGD (Stochastic Gradient Descent)</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Updates each weight using only the current gradient.</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>❌ Rare</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>SGD + Momentum</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Uses the current gradient and remembers previous update directions to reduce zig-zagging and speed up convergence.</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>⚠️ Sometimes</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>Adam</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Combines momentum with an adaptive learning rate for each weight.</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>✅ Yes</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><strong style={{ color: "var(--accent-color)" }}>AdamW</strong></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Adam with improved weight decay (regularization), leading to better generalization. Standard optimizer for modern Transformers and LLMs.</td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>⭐ Yes (Standard)</td>
                </tr>
              </tbody>
            </table>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h3 id="sgd" style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem" }}>
              1. SGD (Stochastic Gradient Descent)
            </h3>
            
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              <strong style={{ color: "var(--accent-color)" }}>SGD Formula</strong><br/>
              For every trainable weight,
            </p>
            <BlockMath math={String.raw`w_{\text{new}} = w_{\text{old}} - \eta \frac{\partial L}{\partial w}`} />
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>where</p>
            
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem", marginBottom: "1.5rem", maxWidth: "400px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Symbol</th>
                  <th style={{ padding: "0.75rem", color: "#fff" }}>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`w_{\text{old}}`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Current weight</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`w_{\text{new}}`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Updated weight</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`\eta`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Learning rate</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "0.75rem", color: "#fff" }}><InlineMath math={String.raw`\frac{\partial L}{\partial w}`} /></td>
                  <td style={{ padding: "0.75rem", color: "#fff" }}>Gradient computed by backpropagation</td>
                </tr>
              </tbody>
            </table>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>Suppose - </p>
            <BlockMath math={String.raw`\text{Gradient} = -5`} />
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              A <strong style={{ color: "var(--accent-color)" }}>negative gradient</strong> means the weight should be <strong style={{ color: "var(--accent-color)" }}>increased</strong> to reduce the loss. so Substitute the values in formula : -
            </p>
            <BlockMath math={String.raw`w_{\text{new}} = 10 - 0.1(-5) = 10.5`} />
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              The weight changed from 10 to 10.5
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h3 id="sgd-momentum" style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem" }}>
              2. SGD + Momentum
            </h3>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              An improved version of SGD.<br/><br/>
              Instead of looking only at the current gradient, it also remembers previous update directions (called <strong style={{ color: "var(--accent-color)" }}>momentum</strong>).
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>This helps:</p>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff", listStyleType: "disc", marginTop: "1rem" }}>
              <li>Reduce zig-zagging.</li>
              <li>Move faster through shallow regions.</li>
              <li>Reach a minimum in fewer updates.</li>
            </ul>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Think of pushing a heavy ball downhill—it keeps rolling in the same general direction instead of changing direction every step.
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h3 id="adam" style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem" }}>
              3. Adam (Adaptive Moment Estimation)
            </h3>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Adam combines two powerful ideas:
            </p>
            <ol style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff", listStyleType: "decimal", marginTop: "1rem" }}>
              <li><strong style={{ color: "var(--accent-color)" }}>Momentum</strong> – remembers previous gradients.</li>
              <li><strong style={{ color: "var(--accent-color)" }}>Adaptive Learning Rate</strong> – automatically adjusts the step size independently for every weight.</li>
            </ol>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>This allows Adam to:</p>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff", listStyleType: "disc", marginTop: "1rem" }}>
              <li>Converge faster than SGD.</li>
              <li>Handle noisy gradients well.</li>
              <li>Require less manual tuning of the learning rate.</li>
            </ul>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Because of these advantages, Adam became one of the most popular optimizers in deep learning.
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h3 id="adamw" style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 600, marginTop: "2rem", marginBottom: "0.75rem" }}>
              4. AdamW
            </h3>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              AdamW is an improved version of Adam.<br/><br/>
              It performs the same adaptive updates as Adam but applies <strong style={{ color: "var(--accent-color)" }}>weight decay</strong> correctly as a separate regularization step.
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>Benefits:</p>
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff", listStyleType: "disc", marginTop: "1rem" }}>
              <li>Better generalization.</li>
              <li>More stable training.</li>
              <li>Prevents weights from growing unnecessarily large.</li>
            </ul>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="usage" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Usage
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              for optimizer defining we simply do
            </p>
            <CodeBlock language="python">{`optimizer = torch.optim.AdamW( 
    model.parameters(),
    lr=0.0004, 
    weight_decay=0.1 
)`}</CodeBlock>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              for optimizer using we simply call <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>optimizer.step()</code> thats all.
            </p>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 9.6 - Tensor" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 9.8 - Complete Training Pipeline" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 9.8 - Complete Training Pipeline",
        summary: "Putting all the pretraining pieces together to train on text",
        content: (
          <>
            <h1 id="pipeline-start" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              The Pretraining Pipeline
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              We've built all the pieces: the model, the loss function, the backpropagation step, and the optimizer. Now it's time to put it all together and train our model to predict the next word using a short story!
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="step-1" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Step 1: Data Preparation & Dataloaders
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              First, we download our text data (<em>The Verdict</em>), tokenize it, and split it into <strong style={{ color: "var(--accent-color)" }}>Training</strong> (90%) and <strong style={{ color: "var(--accent-color)" }}>Validation</strong> (10%) sets. Then we create our DataLoaders to fetch batches automatically.
            </p>
            <CodeBlock language="python">{`# Load Config & Tokenizer
tokenizer = tiktoken.get_encoding("gpt2")
GPT_CONFIG_124M = {
    "vocab_size": 50257, "context_length": 256, "emb_dim": 768,
    "n_heads": 12, "n_layers": 12, "drop_rate": 0.1, "qkv_bias": False
}

# Download Data
raw_text = download_and_load_file(
    file_path="the-verdict.txt",
    url="https://raw.githubusercontent.com/rasbt/LLMs-from-scratch/main/ch02/01_main-chapter-code/the-verdict.txt"
)

# Split 90/10
train_ratio = 0.9
split_idx = int(train_ratio * len(raw_text))
train_data, val_data = raw_text[:split_idx], raw_text[split_idx:]

# Create DataLoaders (Batch Size 2, Length 256)
train_loader = create_dataloader(train_data, batch_size=2, context_length=256, stride=256, shuffle=True, drop_last=True)
val_loader = create_dataloader(val_data, batch_size=2, context_length=256, stride=256, shuffle=False, drop_last=False)`}</CodeBlock>

            <Callout type="info" title="Understanding what we have done">
              <ol style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff", listStyleType: "decimal", marginTop: "0.5rem" }}>
                <li>We took the raw data from the book.</li>
                <li>We split it into a 90:10 ratio for training and validation.</li>
                <li>We tokenized the text, resulting in <strong style={{ color: "var(--accent-color)" }}>4612 training tokens</strong> and <strong style={{ color: "var(--accent-color)" }}>534 validation tokens</strong>.</li>
                <li>We divided the tokens into sequences (training sets) of length <strong style={{ color: "var(--accent-color)" }}>256</strong>:
                  <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
                    <li>Training: <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>4612 / 256 = 18</code> training sets</li>
                    <li>Validation: <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>534 / 256 = 2</code> validation sets</li>
                  </ul>
                </li>
                <li>We grouped the training sets into batches of size <strong style={{ color: "var(--accent-color)" }}>2</strong>:
                  <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
                    <li><code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>18 / 2 = 9</code> batches</li>
                  </ul>
                </li>
                <li>Now we have 9 batches, each has 2 sentences, each of that is 256 tokens long!</li>
              </ol>
            </Callout>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="step-2" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Step 2: Model & Device Setup
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              We initialize our GPT model and send it to the GPU (or CPU) to make computations fast.
            </p>
            <CodeBlock language="python">{`from e_gpt_model import GPTModel

model = GPTModel(GPT_CONFIG_124M)
device = device_selector() # Auto-selects CUDA, MPS, or CPU
model.to(device)`}</CodeBlock>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="step-3" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Step 3: Training Loop
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              We use our <strong style={{ color: "var(--accent-color)" }}>AdamW</strong> optimizer to run the training loop for 2 epochs. 
            </p>
            <CodeBlock language="python">{`from l_trainer import train_model_simple

optimizer = torch.optim.AdamW(model.parameters(), lr=0.0004, weight_decay=0.1)

train_losses, val_losses, tokens_seen = train_model_simple(
    model, train_loader, val_loader, optimizer, device,
    num_epochs=2, eval_freq=5, eval_iter=5,
    start_context="Every effort moves you", tokenizer=tokenizer
)`}</CodeBlock>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Once training finishes, you can plot the <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>train_losses</code> and <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>val_losses</code> using Matplotlib to visually see the model learning!
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="step-4" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Step 4: Generate Text
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Finally, we ask our trained model to generate text!
            </p>
            <CodeBlock language="python">{`from g_text_generator import generate_text

generated_text = generate_text(
    model=model,
    tokenizer=tokenizer,
    prompt="Every effort moves you",
    device=device,
    max_new_tokens=50,
)

print(generated_text)`}</CodeBlock>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 9.7 - Weight Optimization" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 10.1 - Saving our model weights..." />
            </div>
          </>
        ),
      }
    ],
  },
  {
    title: "Chapter 10 Weight Loading",
    topics: [
      {
        title: "Chapter 10.1 - Saving our model weights...",
        summary: "How to save and load PyTorch model weights",
        content: (
          <>
            <h1 id="saving-weights" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              Saving our current model's weights
            </h1>
            <CodeBlock language="python">{`torch.save(model.state_dict(), "model.pth")`}</CodeBlock>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h1 id="loading-weights" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              Loading a model's weights
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              first make sure you have same config as copying model from
            </p>
            <CodeBlock language="python">{`GPT_CONFIG_124M = {
    "vocab_size": 50257,   # Vocabulary size
    "context_length": 256, # Shortened context length (orig: 1024)
    "emb_dim": 768,        # Embedding dimension
    "n_heads": 12,         # Number of attention heads
    "n_layers": 12,        # Number of layers
    "drop_rate": 0.1,      # Dropout rate
    "qkv_bias": False      # Query-key-value bias
}`}</CodeBlock>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              next load the weights
            </p>
            <CodeBlock language="python">{`model = GPTModel(GPT_CONFIG_124M)

if torch.cuda.is_available():
    device = torch.device("cuda")
elif torch.backends.mps.is_available():
    # Use PyTorch 2.9 or newer for stable mps results
    major, minor = map(int, torch.__version__.split(".")[:2])
    if (major, minor) >= (2, 9):
        device = torch.device("mps")
else:
    device = torch.device("cpu")

print("Device:", device)

model.load_state_dict(torch.load("model.pth", map_location=device, weights_only=True))
model.eval();`}</CodeBlock>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              we can load the model to be loaded on desired device irrespective of what it was saved as using <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>map_location=device</code>
            </p>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 9.7 - Weight Optimization" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 10.2 - Loading OpenAI's Weight..." />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 10.2 - Downloading GPT Model Pretrained Weights",
        summary: "Fetching pre-trained weights from OpenAI instead of training from scratch",
        content: (
          <>
            <h1 id="why-download" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              Why download pretrained weights?
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Training a model like GPT-2 from scratch takes thousands of hours on supercomputers and costs millions of dollars.
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Instead of training it ourselves, we can just <strong style={{ color: "var(--accent-color)" }}>download the weights that OpenAI already trained</strong> and load them into our model architecture.
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h1 id="the-process" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              The Download Process
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              To get the weights, we run a Python script that does three main things:
            </p>

            <ol style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff", listStyleType: "decimal", marginTop: "1rem" }}>
              <li><strong style={{ color: "var(--accent-color)" }}>Connects to OpenAI's servers:</strong> It reaches out to their public storage to find the specific GPT-2 model size we want (like the 124M parameter version).</li>
              <li><strong style={{ color: "var(--accent-color)" }}>Downloads the necessary files:</strong> It pulls down several files containing the raw model weights, vocabulary, and configuration (hyperparameters).</li>
              <li><strong style={{ color: "var(--accent-color)" }}>Converts the formats:</strong> OpenAI originally trained GPT-2 using a framework called <strong style={{ color: "var(--accent-color)" }}>TensorFlow</strong>. Our model is built in <strong style={{ color: "var(--accent-color)" }}>PyTorch</strong>. The script automatically reads the TensorFlow checkpoint and converts the weights into a PyTorch-friendly dictionary.</li>
            </ol>

            <Callout type="info" title="High-Level View">
              <p style={{ marginTop: "0.5rem", lineHeight: "1.8", color: "#fff" }}>
                You don't need to write the download script from scratch. We just use a pre-built function:
              </p>
              <CodeBlock language="python">{`settings, params = download_and_load_gpt2(model_size="124M", models_dir="gpt2")`}</CodeBlock>
              <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff", listStyleType: "disc", marginTop: "0.5rem" }}>
                <li><code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>settings</code> contains the model configuration (like vocabulary size and number of layers).</li>
                <li><code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>params</code> contains all the actual matrices of numbers (the trained weights).</li>
              </ul>
            </Callout>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />
            
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Once we have these <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>params</code>, we can copy them block by block into our own PyTorch model (which we learned how to do in Chapter 10.1).
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h1 id="the-script" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              The Full Download Script
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              For those who want to see exactly how the download and conversion work under the hood, here is the complete source code. 
              This code was authored by Sebastian Raschka for his excellent book <a href="https://www.manning.com/books/build-a-large-language-model-from-scratch" target="_blank" rel="noreferrer" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>Build a Large Language Model From Scratch</a> (available on <a href="https://github.com/rasbt/LLMs-from-scratch" target="_blank" rel="noreferrer" style={{ color: "var(--accent-color)", textDecoration: "underline" }}>GitHub</a>).
            </p>

            <CodeBlock language="python">{`# Copyright (c) Sebastian Raschka under Apache License 2.0 (see LICENSE.txt).
# Source for "Build a Large Language Model From Scratch"
#   - https://www.manning.com/books/build-a-large-language-model-from-scratch
# Code: https://github.com/rasbt/LLMs-from-scratch

import os
import requests
import json
import numpy as np
import tensorflow as tf
from tqdm import tqdm

def download_and_load_gpt2(model_size, models_dir):
    # Validate model size
    allowed_sizes = ("124M", "355M", "774M", "1558M")
    if model_size not in allowed_sizes:
        raise ValueError(f"Model size not in {allowed_sizes}")

    # Define paths
    model_dir = os.path.join(models_dir, model_size)
    base_url = "https://openaipublic.blob.core.windows.net/gpt-2/models"
    backup_base_url = "https://f001.backblazeb2.com/file/LLMs-from-scratch/gpt2"
    filenames = [
        "checkpoint", "encoder.json", "hparams.json",
        "model.ckpt.data-00000-of-00001", "model.ckpt.index",
        "model.ckpt.meta", "vocab.bpe"
    ]

    # Download files
    os.makedirs(model_dir, exist_ok=True)
    for filename in filenames:
        file_url = os.path.join(base_url, model_size, filename)
        backup_url = os.path.join(backup_base_url, model_size, filename)
        file_path = os.path.join(model_dir, filename)
        download_file(file_url, file_path, backup_url)

    # Load settings and params
    tf_ckpt_path = tf.train.latest_checkpoint(model_dir)
    settings = json.load(open(os.path.join(model_dir, "hparams.json"), "r", encoding="utf-8"))
    params = load_gpt2_params_from_tf_ckpt(tf_ckpt_path, settings)

    return settings, params

def download_file(url, destination, backup_url=None):
    def _attempt_download(download_url):
        response = requests.get(download_url, stream=True, timeout=60)
        response.raise_for_status()

        file_size = int(response.headers.get("Content-Length", 0))

        # Check if file exists and has same size
        if os.path.exists(destination):
            file_size_local = os.path.getsize(destination)
            if file_size and file_size == file_size_local:
                print(f"File already exists and is up-to-date: {destination}")
                return True

        block_size = 1024  # 1 KB
        desc = os.path.basename(download_url)
        with tqdm(total=file_size, unit="iB", unit_scale=True, desc=desc) as progress_bar:
            with open(destination, "wb") as file:
                for chunk in response.iter_content(chunk_size=block_size):
                    if chunk:
                        file.write(chunk)
                        progress_bar.update(len(chunk))
        return True

    try:
        if _attempt_download(url):
            return
    except requests.exceptions.RequestException:
        if backup_url is not None:
            print(f"Primary URL ({url}) failed. Attempting backup URL: {backup_url}")
            try:
                if _attempt_download(backup_url):
                    return
            except requests.exceptions.RequestException:
                pass

        error_message = (
            f"Failed to download from both primary URL ({url})"
            f"{' and backup URL (' + backup_url + ')' if backup_url else ''}."
            "\\nCheck your internet connection or the file availability.\\n"
            "For help, visit: https://github.com/rasbt/LLMs-from-scratch/discussions/273"
        )
        print(error_message)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

def load_gpt2_params_from_tf_ckpt(ckpt_path, settings):
    # Initialize parameters dictionary with empty blocks for each layer
    params = {"blocks": [{} for _ in range(settings["n_layer"])]}

    # Iterate over each variable in the checkpoint
    for name, _ in tf.train.list_variables(ckpt_path):
        # Load the variable and remove singleton dimensions
        variable_array = np.squeeze(tf.train.load_variable(ckpt_path, name))

        # Process the variable name to extract relevant parts
        variable_name_parts = name.split("/")[1:]  # Skip the 'model/' prefix

        # Identify the target dictionary for the variable
        target_dict = params
        if variable_name_parts[0].startswith("h"):
            layer_number = int(variable_name_parts[0][1:])
            target_dict = params["blocks"][layer_number]

        # Recursively access or create nested dictionaries
        for key in variable_name_parts[1:-1]:
            target_dict = target_dict.setdefault(key, {})

        # Assign the variable array to the last key
        last_key = variable_name_parts[-1]
        target_dict[last_key] = variable_array

    return params`}</CodeBlock>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 10.1 - Saving our model weights..." />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 10.3 - Tensorflow weights conversion to Pytorch (mapping)" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 10.3 - Tensorflow weights conversion to Pytorch (mapping)",
        summary: "Mapping raw OpenAI weights to our PyTorch GPT architecture",
        content: (
          <>
            <h1 id="mapping-weights" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              Mapping Weights to PyTorch
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              We've downloaded OpenAI's GPT-2 weights, but they are stored as raw <strong style={{ color: "var(--accent-color)" }}>NumPy arrays</strong> from TensorFlow. 
              Our model is built in PyTorch using specific layer names (like <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>pos_emb</code>, <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>tok_emb</code>, etc.).
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              We need a utility script to map (or translate) these raw arrays exactly into our PyTorch model's <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>nn.Parameter</code> fields.
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="assign-function" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              The Assign Helper
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              First, we create a small helper function that checks if the shape of the downloaded weight perfectly matches the shape of our PyTorch layer. If it does, it turns the NumPy array into a <strong style={{ color: "var(--accent-color)" }}>PyTorch Parameter</strong>.
            </p>
            <CodeBlock language="python">{`def assign(left, right):
    if left.shape != right.shape:
        raise ValueError(
            f"Shape mismatch: {left.shape} != {right.shape}"
        )

    return torch.nn.Parameter(
        torch.as_tensor(
            right,
            dtype=left.dtype,
            device=left.device,
        )
    )`}</CodeBlock>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="mapping-process" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              The Mapping Process
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Here is how we map the different parts of the model:
            </p>
            
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff", listStyleType: "disc", marginTop: "1rem" }}>
              <li>
                <strong style={{ color: "var(--accent-color)" }}>1. Embeddings:</strong> We match the Positional Embeddings (<code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>wpe</code>) and Token Embeddings (<code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>wte</code>).
              </li>
              <li>
                <strong style={{ color: "var(--accent-color)" }}>2. Transformer Blocks (Attention):</strong> TensorFlow saves the Query, Key, and Value weights as one massive matrix. We use <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>np.split</code> to divide it into three separate pieces. <br/>
                <em>Note: We also have to transpose (`.T`) the matrices because TensorFlow and PyTorch store them in different orientations!</em>
              </li>
              <li>
                <strong style={{ color: "var(--accent-color)" }}>3. Feed Forward & LayerNorm:</strong> We assign the weights and biases for the Feed-Forward network and the Scale (<code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>g</code>) and Shift (<code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>b</code>) parameters for Layer Normalization.
              </li>
              <li>
                <strong style={{ color: "var(--accent-color)" }}>4. Weight Tying:</strong> The final Output Projection Head uses the exact same weights as the Token Embeddings (<code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>wte</code>).
              </li>
            </ul>

            <Callout type="info" title="Under the Hood: The Full Script">
              <p style={{ marginTop: "0.5rem", lineHeight: "1.8", color: "#fff" }}>
                Here is the full <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>weight_loader.py</code> script showing every single mapping step across the layers.
              </p>
              <CodeBlock language="python">{`import numpy as np
import torch

def assign(left, right):
    if left.shape != right.shape:
        raise ValueError(
            f"Shape mismatch: {left.shape} != {right.shape}"
        )
    return torch.nn.Parameter(
        torch.as_tensor(right, dtype=left.dtype, device=left.device)
    )

def load_weights_into_gpt(gpt, params):
    # Embeddings
    gpt.pos_emb.weight = assign(gpt.pos_emb.weight, params["wpe"])
    gpt.tok_emb.weight = assign(gpt.tok_emb.weight, params["wte"])

    # Transformer Blocks
    for b in range(len(params["blocks"])):
        # ---------------- Attention ----------------
        q_w, k_w, v_w = np.split(params["blocks"][b]["attn"]["c_attn"]["w"], 3, axis=-1)

        gpt.trf_blocks[b].att.W_query.weight = assign(gpt.trf_blocks[b].att.W_query.weight, q_w.T)
        gpt.trf_blocks[b].att.W_key.weight = assign(gpt.trf_blocks[b].att.W_key.weight, k_w.T)
        gpt.trf_blocks[b].att.W_value.weight = assign(gpt.trf_blocks[b].att.W_value.weight, v_w.T)

        q_b, k_b, v_b = np.split(params["blocks"][b]["attn"]["c_attn"]["b"], 3, axis=-1)

        gpt.trf_blocks[b].att.W_query.bias = assign(gpt.trf_blocks[b].att.W_query.bias, q_b)
        gpt.trf_blocks[b].att.W_key.bias = assign(gpt.trf_blocks[b].att.W_key.bias, k_b)
        gpt.trf_blocks[b].att.W_value.bias = assign(gpt.trf_blocks[b].att.W_value.bias, v_b)

        gpt.trf_blocks[b].att.out_proj.weight = assign(gpt.trf_blocks[b].att.out_proj.weight, params["blocks"][b]["attn"]["c_proj"]["w"].T)
        gpt.trf_blocks[b].att.out_proj.bias = assign(gpt.trf_blocks[b].att.out_proj.bias, params["blocks"][b]["attn"]["c_proj"]["b"])

        # ---------------- Feed Forward ----------------
        gpt.trf_blocks[b].ff.layers[0].weight = assign(gpt.trf_blocks[b].ff.layers[0].weight, params["blocks"][b]["mlp"]["c_fc"]["w"].T)
        gpt.trf_blocks[b].ff.layers[0].bias = assign(gpt.trf_blocks[b].ff.layers[0].bias, params["blocks"][b]["mlp"]["c_fc"]["b"])
        gpt.trf_blocks[b].ff.layers[2].weight = assign(gpt.trf_blocks[b].ff.layers[2].weight, params["blocks"][b]["mlp"]["c_proj"]["w"].T)
        gpt.trf_blocks[b].ff.layers[2].bias = assign(gpt.trf_blocks[b].ff.layers[2].bias, params["blocks"][b]["mlp"]["c_proj"]["b"])

        # ---------------- LayerNorm ----------------
        gpt.trf_blocks[b].norm1.scale = assign(gpt.trf_blocks[b].norm1.scale, params["blocks"][b]["ln_1"]["g"])
        gpt.trf_blocks[b].norm1.shift = assign(gpt.trf_blocks[b].norm1.shift, params["blocks"][b]["ln_1"]["b"])
        gpt.trf_blocks[b].norm2.scale = assign(gpt.trf_blocks[b].norm2.scale, params["blocks"][b]["ln_2"]["g"])
        gpt.trf_blocks[b].norm2.shift = assign(gpt.trf_blocks[b].norm2.shift, params["blocks"][b]["ln_2"]["b"])

    # Final LayerNorm
    gpt.final_norm.scale = assign(gpt.final_norm.scale, params["g"])
    gpt.final_norm.shift = assign(gpt.final_norm.shift, params["b"])

    # Output projection (weight tying)
    gpt.out_head.weight = assign(gpt.out_head.weight, params["wte"])`}</CodeBlock>
            </Callout>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 10.2 - Downloading GPT Model Pretrained Weights" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 10.4 - Complete Weight Loading Pipeline" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 10.4 - Complete Weight Loading Pipeline",
        summary: "Downloading, loading, mapping, and testing our pretrained weights",
        content: (
          <>
            <h1 id="pipeline" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              The Pretrained Pipeline
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Now that we know how to map weights from TensorFlow to PyTorch, let's put it all together into a complete pipeline. We will download the actual weights from OpenAI's GPT-2 (124M version), map them to our custom model architecture, and generate some text to test it!
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="step-1" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Step 1: Downloading the Weights
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              We use our download script to grab the 124 Million parameter weights from OpenAI.
            </p>
            <CodeBlock language="python">{`from n_gpt_download import download_and_load_gpt2

settings, params = download_and_load_gpt2(model_size="124M", models_dir="gpt2")

print("Token embedding weight tensor dimensions:", params["wte"].shape)`}</CodeBlock>

            <h2 id="step-2" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Step 2: Initializing our Model
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              We update our basic GPT configuration to match the 124M model's exact specifications (like extending the context length from 256 up to 1024), and initialize the PyTorch model.
            </p>
            <CodeBlock language="python">{`from e_gpt_model import GPTModel

NEW_CONFIG = GPT_CONFIG_124M.copy()
NEW_CONFIG.update({
    "emb_dim": 768, "n_layers": 12, "n_heads": 12, 
    "context_length": 1024, "qkv_bias": True
})

model = GPTModel(NEW_CONFIG)
model.eval() # Set model to evaluation mode`}</CodeBlock>

            <h2 id="step-3" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Step 3: The Big Mapping
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Here is where the magic happens! We pass the raw downloaded dictionary (<code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>params</code>) and our PyTorch <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>model</code> into our weight loader function. After this runs, our PyTorch model has the exact "brain" of GPT-2!
            </p>
            <CodeBlock language="python">{`from o_tensorflow_model_loader import load_weights_into_gpt

load_weights_into_gpt(model, params)`}</CodeBlock>

            <h2 id="step-4" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Step 4: Generate Text
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              We send the model to the GPU for faster processing, setup the Tiktoken tokenizer, and ask it to generate text based on a prompt!
            </p>
            <CodeBlock language="python">{`model.to(device) # Move model to GPU (or CPU)

from g_text_generator import generate_text
import tiktoken
tokenizer = tiktoken.get_encoding("gpt2")

generated_text = generate_text(
    model=model,
    tokenizer=tokenizer,
    prompt="Every effort moves you",
    device=device,
    max_new_tokens=50,
)

print(generated_text)`}</CodeBlock>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 10.3 - Tensorflow weights conversion to Pytorch (mapping)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 11.1 - Introduction to Finetuning" />
            </div>
          </>
        ),
      }
    ],
  },
  {
    title: "Chapter 11 Finetuning",
    topics: [
      {
        title: "Chapter 11.1 - Introduction to Finetuning",
        summary: "What is finetuning and why do we need it?",
        content: (
          <>
            <h1 id="what-is-finetuning" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              What is Finetuning?
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Up until now, we've focused on <strong style={{ color: "var(--accent-color)" }}>Pretraining</strong>. During pretraining, an LLM reads billions of words from the internet to learn grammar, facts, and how to predict the next word. 
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Think of pretraining like <strong style={{ color: "var(--accent-color)" }}>going to elementary and high school</strong>. The model gets a broad, general education, but it isn't an expert at any one specific job. If you ask a pretrained model a question, it might just reply with another question instead of answering!
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="specializing" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Going to "Specialty School"
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              <strong style={{ color: "var(--accent-color)" }}>Finetuning</strong> is like sending the model to medical school or law school. We take our generally smart model and train it just a little bit more on a very specific, high-quality dataset.
            </p>

            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "#fff", listStyleType: "disc", marginTop: "1rem" }}>
              <li><strong style={{ color: "var(--accent-color)" }}>Instruction Finetuning:</strong> Teaching the model to act like a helpful assistant (like ChatGPT). Instead of just predicting next words, it learns to follow instructions and answer questions politely.</li>
              <li><strong style={{ color: "var(--accent-color)" }}>Classification Finetuning:</strong> Teaching the model to categorize text, like sorting emails into "Spam" or "Not Spam", or deciding if a movie review is "Positive" or "Negative".</li>
            </ul>

            <Callout type="info" title="Why not train from scratch?">
              <p style={{ marginTop: "0.5rem", lineHeight: "1.8", color: "#fff" }}>
                Pretraining takes thousands of GPUs and millions of dollars. Finetuning only takes a fraction of that time and cost because the model already knows <em>how</em> to read and write. We are just slightly adjusting its weights to point it in a specific direction!
              </p>
            </Callout>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 10.3 - Tensorflow weights conversion to Pytorch (mapping)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 11.2 - Instruction Dataset" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 11.2 - Instruction Dataset",
        summary: "Formatting raw text into instruction prompts for the model",
        content: (
          <>
            <h1 id="the-raw-data" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              The Raw Data
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Before we can teach our model to follow instructions, we need to show it what a good instruction and response look like. Usually, this data comes in a JSON file that looks like this:
            </p>
            <CodeBlock language="json">{`{
  "instruction": "Evaluate the following mathematical expression.",
  "input": "4 + 5 * 2",
  "output": "According to the order of operations (PEMDAS), multiplication is performed before addition. 5 * 2 = 10, then 4 + 10 = 14."
}`}</CodeBlock>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="formatting-the-prompt" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Formatting the Prompt
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              The model doesn't understand JSON dictionary keys. It just reads one long string of text. So, we need to squish the instruction, the input, and the output into a single, predictable template. We do this using the <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>format_input</code> function:
            </p>
            <CodeBlock language="python">{`def format_input(entry):
    instruction_text = (
        f"Below is an instruction that describes a task. "
        f"Write a response that appropriately completes the request."
        f"\\n\\n### Instruction:\\n{entry['instruction']}"
    )

    input_text = f"\\n\\n### Input:\\n{entry['input']}" if entry["input"] else ""

    return instruction_text + input_text`}</CodeBlock>

            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Notice that this function only creates the <em>question</em> part (Instruction + Input). We keep the <em>answer</em> part (Response) separate for a moment so we can cleanly attach it later!
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="the-dataset-class" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              The Dataset Class
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              In PyTorch, we use a <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>Dataset</code> class to load our data. Our <strong style={{ color: "var(--accent-color)" }}>InstructionDataset</strong> does something very smart: it pre-tokenizes everything right when it starts up!
            </p>
            <CodeBlock language="python">{`from torch.utils.data import Dataset

class InstructionDataset(Dataset):
    def __init__(self, data, tokenizer):
        self.data = data

        # Pre-tokenize texts to save time during training
        self.encoded_texts = []
        for entry in data:
            # 1. Get the formatted question
            instruction_plus_input = format_input(entry)
            
            # 2. Add the target response
            response_text = f"\\n\\n### Response:\\n{entry['output']}"
            
            # 3. Squish them together!
            full_text = instruction_plus_input + response_text
            
            # 4. Convert words to Token IDs immediately
            self.encoded_texts.append(
                tokenizer.encode(full_text)
            )

    def __getitem__(self, index):
        return self.encoded_texts[index]

    def __len__(self):
        return len(self.data)`}</CodeBlock>

            <Callout type="tip" title="Why Pre-Tokenize?">
              <p style={{ marginTop: "0.5rem", lineHeight: "1.8", color: "#fff" }}>
                Tokenizing text (converting words to numbers) takes CPU power. If we tokenize the text inside the <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>__getitem__</code> function, we would be tokenizing on the fly while the GPU waits. By doing it once in <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>__init__</code>, our training loop runs much faster!
              </p>
            </Callout>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 11.1 - Introduction to Finetuning" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 11.3 - The Collate Function (Padding & Masking)" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 11.3 - The Collate Function (Padding & Masking)",
        summary: "Packing different-sized sequences into uniform batches",
        content: (
          <>
            <h1 id="the-problem" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              The Problem: Different Lengths
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              In Chapter 9.2, we learned that we train the model in <strong style={{ color: "var(--accent-color)" }}>batches</strong> to make things fast. A GPU requires batches to be perfect rectangles (matrices). 
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              But here is the problem: Instructions are not the same length! One instruction might be 15 words long, while another is 50 words long. How do we pack them into a perfect rectangle?
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="padding" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Padding to the Rescue
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              We use a trick called <strong style={{ color: "var(--accent-color)" }}>Padding</strong>. We find the longest sentence in our current batch, and we add "empty" tokens to the end of all the shorter sentences until they match the longest one. We use a special token ID for this (often <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>50256</code>, which is the End-Of-Text token in GPT-2).
            </p>

            <h2 id="masking" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Masking the Loss
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              When we train the model, we compare its predictions against the <strong style={{ color: "var(--accent-color)" }}>targets</strong> (which are shifted 1 step into the future, just like we saw in Chapter 9.1).
              <br/><br/>
              However, we don't want the model to get penalized for failing to predict our fake "Padding" tokens! To fix this, we set the target ID of all padding tokens to <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>-100</code>. PyTorch's loss function automatically ignores any target with an ID of -100.
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="the-code" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              The Code: `collate_fn`
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              The <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>collate_fn</code> does all this heavy lifting automatically for every single batch:
            </p>
            <CodeBlock language="python">{`import torch

def collate_fn(
    batch,
    pad_token_id=50256,
    ignore_index=-100,
    allowed_max_length=None,
    device="cpu"
):
    # 1. Find the longest sequence in the batch
    batch_max_length = max(len(item)+1 for item in batch)

    inputs_lst, targets_lst = [], []

    for item in batch:
        new_item = item.copy()
        new_item += [pad_token_id] # Add end token
        
        # 2. Pad sequences to max_length
        padded = (
            new_item + [pad_token_id] *
            (batch_max_length - len(new_item))
        )
        
        # 3. Shift the targets 1 position to the right
        inputs = torch.tensor(padded[:-1])
        targets = torch.tensor(padded[1:])

        # 4. Replace padding tokens in targets with ignore_index (-100)
        mask = targets == pad_token_id
        indices = torch.nonzero(mask).squeeze()
        if indices.numel() > 1:
            targets[indices[1:]] = ignore_index

        if allowed_max_length is not None:
            inputs = inputs[:allowed_max_length]
            targets = targets[:allowed_max_length]

        inputs_lst.append(inputs)
        targets_lst.append(targets)

    inputs_tensor = torch.stack(inputs_lst).to(device)
    targets_tensor = torch.stack(targets_lst).to(device)

    return inputs_tensor, targets_tensor`}</CodeBlock>

            <h2 id="testing-it-out" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Testing it out
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Let's see what happens when we feed it 3 sequences of different lengths (5, 2, and 3 tokens long).
            </p>
            <CodeBlock language="python">{`inputs_1 = [0, 1, 2, 3, 4]
inputs_2 = [5, 6]
inputs_3 = [7, 8, 9]

batch = (inputs_1, inputs_2, inputs_3)

inputs, targets = collate_fn(batch)
print("Inputs:\\n", inputs)
print("Targets:\\n", targets)`}</CodeBlock>

            <CodeBlock language="bash">{`Inputs:
 tensor([[    0,     1,     2,     3,     4],
         [    5,     6, 50256, 50256, 50256],
         [    7,     8,     9, 50256, 50256]])
Targets:
 tensor([[    1,     2,     3,     4, 50256],
         [    6, 50256,  -100,  -100,  -100],
         [    8,     9, 50256,  -100,  -100]])`}</CodeBlock>

            <Callout type="tip" title="Notice the Target Shift!">
              <p style={{ marginTop: "0.5rem", lineHeight: "1.8", color: "#fff" }}>
                Look closely at the <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>Targets</code> matrix. The numbers are shifted 1 position to the left (meaning they represent the <em>next</em> word). And all the padding tokens after the first one are set to <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>-100</code>, protecting the model from unfair loss calculations!
              </p>
            </Callout>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 11.2 - Instruction Dataset" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 11.4 - The Finetuning Pipeline" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 11.4 - The Finetuning Pipeline",
        summary: "Putting it all together to build our custom Assistant",
        content: (
          <>
            <h1 id="the-pipeline" style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}>
              The Grand Finale: The Finetuning Pipeline
            </h1>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              We've arrived! We have our model architecture (Chapter 1-8), our training loop concepts (Chapter 9), our pretrained weights (Chapter 10), and our Instruction data formatting (Chapter 11). 
            </p>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Now, we put it all together in one massive pipeline to transform a basic "Next Word Predictor" into a smart, instruction-following assistant!
            </p>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="step-1" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Step 1: Preparing the Data
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              First, we download our instruction dataset and split it into three piles: <strong style={{ color: "var(--accent-color)" }}>Training</strong> (85%), <strong style={{ color: "var(--accent-color)" }}>Testing</strong> (10%), and <strong style={{ color: "var(--accent-color)" }}>Validation</strong> (5%). Then we load them into our <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>InstructionDataset</code> and pass them through our padded <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>collate_fn</code>.
            </p>

            <CodeBlock language="python">{`# Load Data
data = download_and_load_file("instruction-data.json", url)

# Split Data (85% / 10% / 5%)
train_portion = int(len(data) * 0.85)
test_portion = int(len(data) * 0.1)

train_data = data[:train_portion]
test_data = data[train_portion:train_portion + test_portion]
val_data = data[train_portion + test_portion:]

# Setup DataLoaders with our customized collate function
train_dataset = InstructionDataset(train_data, tokenizer)
train_loader = DataLoader(
    train_dataset, batch_size=8, collate_fn=customized_collate_fn, shuffle=True
)`}</CodeBlock>


            <h2 id="step-2" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Step 2: Loading the Pretrained Brain
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Next, we initialize our PyTorch <code style={{ background: "rgba(255,255,255,0.1)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>GPTModel</code> and load the pretrained weights from OpenAI's GPT-2 Medium (355 Million parameters).
            </p>
            <CodeBlock language="python">{`settings, params = download_and_load_gpt2(model_size="355M", models_dir="gpt2")

model = GPTModel(BASE_CONFIG)
load_weights_into_gpt(model, params) # Map the TF weights to PyTorch!
model.to(device)`}</CodeBlock>

            <Callout type="warning" title="Before Finetuning...">
              <p style={{ marginTop: "0.5rem", lineHeight: "1.8", color: "#fff" }}>
                If you ask this model a question right now (like "I would love to..."), it will just babble on and predict the next word. It does <em>not</em> know how to answer questions politely yet!
              </p>
            </Callout>

            <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.1)", margin: "2rem 0" }} />

            <h2 id="step-3" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Step 3: The Finetuning Loop
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Now for the magic. We set up an <strong style={{ color: "var(--accent-color)" }}>AdamW Optimizer</strong> and run a training loop for a few Epochs. The model looks at our instructions and adjusts its weights to learn the pattern of being helpful.
            </p>
            <CodeBlock language="python">{`# 1. Check initial loss
train_loss = calc_loss_loader(train_loader, model, device, num_batches=5)

# 2. Setup Optimizer
optimizer = torch.optim.AdamW(model.parameters(), lr=0.00005, weight_decay=0.1)

# 3. Train!
train_losses, val_losses, tokens_seen = train_model_simple(
    model, train_loader, val_loader, optimizer, device,
    num_epochs=2, eval_freq=5, eval_iter=5
)`}</CodeBlock>


            <h2 id="step-4" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "2rem", marginBottom: "1rem" }}>
              Step 4: Testing & Saving
            </h2>
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              Once training is done, we pass it prompts from our <strong style={{ color: "var(--accent-color)" }}>Test Set</strong> (data the model has NEVER seen before). We print the model's response to verify that it's now acting like a helpful assistant!
            </p>
            <CodeBlock language="python">{`# Let's see how it answers!
for entry in test_data[:3]:
    input_text = format_input(entry)
    generated_text = generate_text(model, tokenizer, prompt=input_text, ...)
    
    print(f"Instruction:\\n>> {input_text}")
    print(f"Model response:\\n>> {generated_text}")

# Save our shiny new Assistant model!
torch.save(model.state_dict(), "gpt2-medium355M-sft.pth")`}</CodeBlock>
            
            <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "#fff" }}>
              And there you have it! You have successfully built, pre-trained, and fine-tuned a Large Language Model from scratch!
            </p>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 11.3 - The Collate Function (Padding & Masking)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 12.1 - Activation Functions (ReLU vs. GELU vs. SwiGLU)" />
            </div>
          </>
        ),
      }
    ],
  },
  {
    title: "Chapter 12 Optional Alternatives",
    topics: [
      {
        title: "Chapter 12.1 - Activation Functions (ReLU vs. GELU vs. SwiGLU)",
        summary: "Exploring alternative activation functions in Transformer Feed-Forward Networks",
        content: (
          <>
            <h2 id="activation-variants" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              ⚡ Chapter 12.1: Activation Functions (ReLU vs. GELU vs. SwiGLU)
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
              <NavButton direction="next" targetTopic="Chapter 12.2 - Normalization Alternatives (LayerNorm vs. RMSNorm)" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 12.2 - Normalization Alternatives (LayerNorm vs. RMSNorm)",
        summary: "Comparing standard Layer Normalization with Root Mean Square Normalization (RMSNorm)",
        content: (
          <>
            <h2 id="norm-variants" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🧪 Chapter 12.2: Normalization Alternatives (LayerNorm vs. RMSNorm)
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
              <NavButton direction="prev" targetTopic="Chapter 12.1 - Activation Functions (ReLU vs. GELU vs. SwiGLU)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 12.3 - Positional Encoding Variants (Absolute vs. RoPE vs. ALiBi)" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 12.3 - Positional Encoding Variants (Absolute vs. RoPE vs. ALiBi)",
        summary: "Understanding modern relative position encodings like Rotary Position Embeddings (RoPE)",
        content: (
          <>
            <h2 id="positional-variants" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              📍 Chapter 12.3: Positional Encoding Variants (Absolute vs. RoPE vs. ALiBi)
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
              <NavButton direction="prev" targetTopic="Chapter 12.2 - Normalization Alternatives (LayerNorm vs. RMSNorm)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 12.4 - Attention Variants (MHA vs. MQA vs. GQA & FlashAttention)" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 12.4 - Attention Variants (MHA vs. MQA vs. GQA & FlashAttention)",
        summary: "Exploring Multi-Query Attention (MQA), Grouped-Query Attention (GQA), and memory-efficient FlashAttention",
        content: (
          <>
            <h2 id="attention-variants" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🧠 Chapter 12.4: Attention Variants (MHA vs. MQA vs. GQA & FlashAttention)
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
              <NavButton direction="prev" targetTopic="Chapter 12.3 - Positional Encoding Variants (Absolute vs. RoPE vs. ALiBi)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 12.5 - Scaling & Efficiency (Mixture of Experts - MoE & KV Caching)" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 12.5 - Scaling & Efficiency (Mixture of Experts - MoE & KV Caching)",
        summary: "Understanding Mixture of Experts (MoE) routing networks and Key-Value (KV) Caching for fast inference",
        content: (
          <>
            <h2 id="scaling-variants" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🚀 Chapter 12.5: Scaling & Efficiency (Mixture of Experts - MoE & KV Caching)
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
              <NavButton direction="prev" targetTopic="Chapter 12.4 - Attention Variants (MHA vs. MQA vs. GQA & FlashAttention)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="None" />
            </div>
          </>
        ),
      },
    ],
  },
];
