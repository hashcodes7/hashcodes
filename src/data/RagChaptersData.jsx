/* eslint-disable react-refresh/only-export-components */
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
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
    warning: { border: 'rgba(239, 68, 68, 0.4)', bg: 'rgba(239, 68, 68, 0.05)', color: '#ef4444' },
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

export const ragChaptersData = [
  {
    title: "Chapter 0 Index & Architecture Blueprint",
    topics: [
      {
        title: "Chapter 0.1 - Course Index & RAG Pipeline Blueprint",
        summary: "Comprehensive architectural roadmap of the SourceIQ Production Closed-Context RAG System",
        content: (
          <>
            <h2 id="rag-blueprint" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🚀 SourceIQ Production RAG Architecture Blueprint
            </h2>
            Welcome to the <strong>Enterprise RAG Architecture Course</strong> based on the production-grade <strong>SourceIQ Closed-Context QA Engine</strong>. This course dives deep into building a secure, multi-document retrieval system that combines dense vector search, lexical keyword search, re-ranking models, context budgeting, and local LLM inference.
            <br /><br />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginTop: "1.5rem", marginBottom: "2rem" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 1.1 - Multi-Format Parsing (.pdf, .docx, .html, .txt)" isChapterHeader={true}>Chapter 1: Multi-Format Document Ingestion</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 1.1 - Multi-Format Parsing (.pdf, .docx, .html, .txt)">1.1 Multi-Format Text Extraction</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 1.2 - Structured Excel Spreadsheet Extraction">1.2 Structured Excel Parsing</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 2.1 - Recursive Overlapping Text Chunking" isChapterHeader={true}>Chapter 2: Chunking Strategies</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 2.1 - Recursive Overlapping Text Chunking">2.1 Recursive Overlapping Chunking</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 2.2 - Semantic Sentence Boundary Chunking">2.2 Semantic Cosine Chunking</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 3.1 - Dense Vector Indexing (FAISS HNSW Flat)" isChapterHeader={true}>Chapter 3: Dual-Stage Hybrid Indexing</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 3.1 - Dense Vector Indexing (FAISS HNSW Flat)">3.1 FAISS HNSW Vector Database</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 3.2 - Sparse Lexical Search with BM25">3.2 BM25 Keyword Search</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 4.1 - Reciprocal Rank Fusion (RRF) & HyDE Query Expansion" isChapterHeader={true}>Chapter 4: Advanced Retrieval Fusion & Reranking</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 4.1 - Reciprocal Rank Fusion (RRF) & HyDE Query Expansion">4.1 RRF Fusion & HyDE Expansion</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 4.2 - Cross-Encoder Deep Reranking & Namespace Boosting">4.2 Cross-Encoder Reranking</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 5.1 - Context Budgeting & Token Window Management" isChapterHeader={true}>Chapter 5: Context Budgeting & Guardrails</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 5.1 - Context Budgeting & Token Window Management">5.1 Context Budgeting & Truncation</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 5.2 - Corporate Prompt Guardrails & Hallucination Prevention">5.2 Corporate Prompt Guardrails</TopicLink></li>
                </ul>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ marginBottom: "0.75rem", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "0.5rem" }}>
                  <TopicLink targetTopic="Chapter 6.1 - Persistent Vector Cache & Hot Reloading" isChapterHeader={true}>Chapter 6: Persistence & Multi-User Architecture</TopicLink>
                </div>
                <ul style={{ paddingLeft: "1.25rem", margin: 0, lineHeight: "1.8", listStyleType: "circle", color: "var(--text-secondary)" }}>
                  <li><TopicLink targetTopic="Chapter 6.1 - Persistent Vector Cache & Hot Reloading">6.1 Persistent Vector Cache</TopicLink></li>
                  <li><TopicLink targetTopic="Chapter 6.2 - SQLite Persistent DB & PBKDF2 Password Auth">6.2 SQLite DB & PBKDF2 Auth</TopicLink></li>
                </ul>
              </div>
            </div>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="None" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 0.2 - Tech Stack & Core Engine Ingredients" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 0.2 - Tech Stack & Core Engine Ingredients",
        summary: "Overview of libraries, embedding models, cross-encoders, and vector indices used in SourceIQ",
        content: (
          <>
            <h2 id="tech-stack-ingredients" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🛠️ SourceIQ Tech Stack & Core Engine Ingredients
            </h2>
            The SourceIQ engine is built around a hybrid Python pipeline designed for low-latency, privacy-first corporate execution:
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.8", color: "var(--text-secondary)", marginTop: "1rem" }}>
              <li><strong style={{ color: "#fff" }}>Vector Database (FAISS HNSW):</strong> Uses <code>faiss.IndexHNSWFlat</code> for ultra-fast Hierarchical Navigable Small World graph search with inner product cosine distance (<InlineMath math={String.raw`M=32, \text{efConstruction}=200, \text{efSearch}=64`} />).</li>
              <li><strong style={{ color: "#fff" }}>Bi-Encoder Embedding Model:</strong> Powered by <code>sentence-transformers</code> (e.g., <code>all-MiniLM-L6-v2</code> or <code>bge-small-en-v1.5</code>) producing 384-dimensional dense semantic vectors normalized via L2 norm.</li>
              <li><strong style={{ color: "#fff" }}>Cross-Encoder Reranker:</strong> Uses <code>cross-encoder/ms-marco-MiniLM-L-6-v2</code> to perform full attention scoring over query-chunk pairs, overcoming Bi-Encoder representation bottlenecks.</li>
              <li><strong style={{ color: "#fff" }}>Lexical Search (SimpleBM25):</strong> Custom Python implementation calculating Inverse Document Frequency (IDF) and term saturation ($k_1=1.5, b=0.75$).</li>
              <li><strong style={{ color: "#fff" }}>Local LLM Inference Engine:</strong> Supports HuggingFace Transformers (with 4-bit/8-bit BitsAndBytes quantization) and CPU-optimized <code>llama.cpp</code> GGUF models (Qwen, Llama 3.2, Phi-3.5). Also integrates Google Gemini API for cloud mode.</li>
            </ul>

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 0.1 - Course Index & RAG Pipeline Blueprint" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 1.1 - Multi-Format Parsing (.pdf, .docx, .html, .txt)" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 1 Multi-Format Document Ingestion & Extraction",
    topics: [
      {
        title: "Chapter 1.1 - Multi-Format Parsing (.pdf, .docx, .html, .txt)",
        summary: "Extracting clean plain text across PDF, Word, HTML, and Text documents",
        content: (
          <>
            <h2 id="multiformat-ingestion" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              📄 Multi-Format Text Extraction Mechanics
            </h2>
            Enterprise knowledge bases contain heterogeneous document types. The <code>extract_text_from_file()</code> function routes each extension to specialized extractors:
            <CodeBlock language="python">{`def extract_text_from_file(filepath):
    ext = os.path.splitext(filepath)[1].lower()
    if ext == ".txt":
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()
    elif ext == ".pdf":
        text = ""
        doc = fitz.open(filepath) # PyMuPDF
        for page in doc:
            text += page.get_text() + "\\n"
        return text
    elif ext == ".docx":
        doc = docx.Document(filepath) # python-docx
        return "\\n".join([para.text for para in doc.paragraphs])
    elif ext == ".html":
        from bs4 import BeautifulSoup
        with open(filepath, "r", encoding="utf-8") as f:
            soup = BeautifulSoup(f.read(), "html.parser")
            return soup.get_text(separator="\\n", strip=True)`}</CodeBlock>
            <Callout type="tip" title="Why PyMuPDF (fitz) Outperforms standard PDF Parsers">
              PyMuPDF operates directly on native PDF C-bindings, extracting multi-column text blocks up to 10x faster than pure-Python parsers while maintaining accurate reading orders.
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 0.2 - Tech Stack & Core Engine Ingredients" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 1.2 - Structured Excel Spreadsheet Extraction" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 1.2 - Structured Excel Spreadsheet Extraction",
        summary: "Converting tabular rows into semantically rich key-value pairs for LLM comprehension",
        content: (
          <>
            <h2 id="excel-extraction" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              📊 Structured Excel Parsing (`extract_text_from_excel`)
            </h2>
            Raw tabular data in <code>.xlsx</code> spreadsheets loses meaning when flattened blindly. SourceIQ parses Excel worksheets using <code>openpyxl</code>, automatically identifying header rows and formatting each cell as a structured record:
            <CodeBlock language="python">{`# Formats every row into explicit key-value pairings:
# Output sample: "Sheet: Financials | Row 14: Department: FMC Kidney Care | Budget: $4.2M | Year: 2026"
for row_idx, r in enumerate(rows[header_idx + 1:], start=header_idx + 2):
    row_parts = []
    for col_idx, cell in enumerate(r):
        val = str(cell).strip() if cell is not None else ""
        if val:
            row_parts.append(f"{headers[col_idx]}: {val}")
    if row_parts:
        sheet_text.append(f"Sheet: {sheet_name} | Row {row_idx}: " + " | ".join(row_parts))`}</CodeBlock>
            <Callout type="success" title="Semantic Table Grounding">
              By prefixing every single row with column headers and sheet titles, embedding models capture table semantics flawlessly without hallucinating column alignments.
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 1.1 - Multi-Format Parsing (.pdf, .docx, .html, .txt)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 2.1 - Recursive Overlapping Text Chunking" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 2 Chunking Strategies & Boundary Optimization",
    topics: [
      {
        title: "Chapter 2.1 - Recursive Overlapping Text Chunking",
        summary: "Hierarchical text splitting with sliding character overlap to preserve context across boundaries",
        content: (
          <>
            <h2 id="recursive-chunking" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              ✂️ Recursive Overlapping Chunking (`recursive_chunk_text`)
            </h2>
            To ensure chunks fit within embedding model context windows, SourceIQ uses a hierarchical list of separators (<code>["\n\n", "\n", ". ", " "]</code>).
            <br /><br />
            <strong style={{ color: "#fff", fontSize: "1.1rem" }}>Sliding Window Overlap Mechanics</strong><br />
            When a chunk reaches maximum size (e.g., 1000 characters), an overlap (e.g., 200 characters) is appended to the start of the next chunk:
            <CodeBlock language="python">{`if chunks and overlap > 0:
    last = chunks[-1]
    overlap_text = last[-overlap:].strip()
    current = (overlap_text + " " + part.strip()).strip()`}</CodeBlock>
            <Callout type="info" title="Why Overlap Matters">
              Without overlap, sentences split precisely across chunk boundaries lose critical semantic references (e.g., "The project manager..." in chunk 1 and "...approved the budget" in chunk 2). Overlap preserves boundary cohesion.
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 1.2 - Structured Excel Spreadsheet Extraction" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 2.2 - Semantic Sentence Boundary Chunking" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 2.2 - Semantic Sentence Boundary Chunking",
        summary: "Splitting document text based on dynamic sentence embedding cosine similarity drops",
        content: (
          <>
            <h2 id="semantic-chunking" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🧠 Semantic Sentence Boundary Chunking (`semantic_chunk_text`)
            </h2>
            Instead of splitting by fixed character length, SourceIQ&apos;s semantic chunker calculates cosine similarity between consecutive sentences using embedding vectors:
            <BlockMath math={String.raw`\text{Sim}(s_i, s_{i-1}) = \frac{e_i \cdot e_{i-1}}{\|e_i\| \|e_{i-1}\|}`} />
            <CodeBlock language="python">{`sim = np.dot(embeddings[i], embeddings[i-1]) / (np.linalg.norm(embeddings[i]) * np.linalg.norm(embeddings[i-1]) + 1e-9)
if sim < threshold or (len(current_text) + len(sentences[i])) > max_chunk_size:
    chunks.append(current_text)
    current_chunk = [sentences[i]]`} `</CodeBlock>
            <Callout type="success" title="Adaptive Document Segmentation">
              When a document transitions to a new subtopic, consecutive sentence similarity drops significantly below threshold (e.g., 0.5), triggering a natural chunk boundary that aligns with true semantic topic shifts!
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 2.1 - Recursive Overlapping Text Chunking" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 3.1 - Dense Vector Indexing (FAISS HNSW Flat)" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 3 Dual-Stage Hybrid Indexing (FAISS + BM25)",
    topics: [
      {
        title: "Chapter 3.1 - Dense Vector Indexing (FAISS HNSW Flat)",
        summary: "Building scalable Hierarchical Navigable Small World graphs for sub-millisecond similarity search",
        content: (
          <>
            <h2 id="faiss-hnsw" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              ⚡ Dense Vector Database Indexing (`faiss.IndexHNSWFlat`)
            </h2>
            SourceIQ uses FAISS HNSW (Hierarchical Navigable Small World) for dense retrieval. Embeddings are L2-normalized so that inner product equals cosine similarity:
            <CodeBlock language="python">{`faiss.normalize_L2(embeddings_np)
dim = embeddings_np.shape[1]
self.faiss_index = faiss.IndexHNSWFlat(dim, 32, faiss.METRIC_INNER_PRODUCT)
self.faiss_index.hnsw.efConstruction = 200
self.faiss_index.add(embeddings_np)`}</CodeBlock>
            <Callout type="info" title="HNSW Graph Architecture">
              HNSW builds a multi-layer graph where top layers contain long-range skip links and bottom layers contain dense local connections. Search traverses from top to bottom in logarithmic time <InlineMath math={String.raw`O(\log N)`} />, achieving sub-millisecond search across millions of chunks!
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 2.2 - Semantic Sentence Boundary Chunking" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 3.2 - Sparse Lexical Search with BM25" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 3.2 - Sparse Lexical Search with BM25",
        summary: "Implementing Okapi BM25 keyword matching to catch exact part numbers, acronyms, and codes",
        content: (
          <>
            <h2 id="bm25-search" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🔍 Lexical BM25 Search (`SimpleBM25`)
            </h2>
            Vector embeddings sometimes miss exact alphanumeric codes (e.g., product IDs like `FMC-9082`). SourceIQ integrates a lexical BM25 engine calculating term frequency-inverse document frequency (TF-IDF) with term saturation:
            <BlockMath math={String.raw`\text{IDF}(q_i) = \ln \left( \frac{N - n(q_i) + 0.5}{n(q_i) + 0.5} + 1 \right)`} />
            <BlockMath math={String.raw`\text{Score}(D, Q) = \sum_{i=1}^n \text{IDF}(q_i) \cdot \frac{f(q_i, D) \cdot (k_1 + 1)}{f(q_i, D) + k_1 \cdot \left( 1 - b + b \cdot \frac{|D|}{\text{avgdl}} \right)}`} />
            <Callout type="success" title="Complementary Search Strengths">
              Dense vector search captures conceptual meaning ("renal healthcare") while BM25 catches exact keyword tokens ("Dialyzer FX-80"). Combining both guarantees high recall!
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 3.1 - Dense Vector Indexing (FAISS HNSW Flat)" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 4.1 - Reciprocal Rank Fusion (RRF) & HyDE Query Expansion" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 4 Advanced Retrieval Fusion & Reranking",
    topics: [
      {
        title: "Chapter 4.1 - Reciprocal Rank Fusion (RRF) & HyDE Query Expansion",
        summary: "Merging vector and keyword search ranks via RRF and generating hypothetical documents for retrieval",
        content: (
          <>
            <h2 id="rrf-hyde" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🔀 Reciprocal Rank Fusion (RRF) & HyDE Query Expansion
            </h2>
            <strong style={{ color: "#fff", fontSize: "1.1rem" }}>1. Reciprocal Rank Fusion (RRF)</strong><br />
            To combine dense FAISS ranks and sparse BM25 ranks without needing score normalization, SourceIQ applies RRF with constant <InlineMath math={String.raw`k=60`} />:
            <BlockMath math={String.raw`\text{RRF Score}(d) = \sum_{m \in M} \frac{1}{k + r_m(d)}`} />
            <CodeBlock language="python">{`def reciprocal_rank_fusion(results_list, k=60):
    fused_scores = {}
    for results in results_list:
        for rank, idx in enumerate(results):
            fused_scores[idx] = fused_scores.get(idx, 0) + 1 / (k + rank)
    return sorted(fused_scores.keys(), key=lambda x: fused_scores[x], reverse=True)`}</CodeBlock>

            <strong style={{ color: "#fff", fontSize: "1.1rem", marginTop: "1.5rem", display: "block" }}>2. Hypothetical Document Embeddings (HyDE)</strong><br />
            When enabled, the LLM first generates a hypothetical answer to the query. Embedding this hypothetical answer bridges the semantic gap between short questions and long document passages!

            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 3.2 - Sparse Lexical Search with BM25" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 4.2 - Cross-Encoder Deep Reranking & Namespace Boosting" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 4.2 - Cross-Encoder Deep Reranking & Namespace Boosting",
        summary: "Evaluating full cross-attention over candidate passages and applying domain namespace boosts",
        content: (
          <>
            <h2 id="cross-encoder" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🎯 Cross-Encoder Reranking & Namespace Boosting
            </h2>
            Bi-Encoders encode queries and chunks independently. SourceIQ feeds top candidate chunks through a <strong>Cross-Encoder model</strong> (`ms-marco-MiniLM-L-6-v2`) which processes query and document text together, performing full token-to-token attention:
            <CodeBlock language="python">{`cross_inp = [[question, item["text"]] for item in candidates]
cross_scores = self.cross_encoder.predict(cross_inp)
for i in range(len(candidates)):
    candidates[i]["score"] = float(cross_scores[i])
    # Namespace boost: nudge score if query mentions folder domain
    ns = candidates[i].get("namespace", "").lower()
    if ns and ns in question.lower():
        candidates[i]["score"] += 0.25`} `</CodeBlock>
            <Callout type="tip" title="Parent-Document Expansion">
              After reranking small child chunks (400 chars), SourceIQ expands the retrieved item back to its full parent chunk (1500 chars). This guarantees the LLM receives comprehensive context while retrieval precision remains surgical!
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 4.1 - Reciprocal Rank Fusion (RRF) & HyDE Query Expansion" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 5.1 - Context Budgeting & Token Window Management" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 5 Context Budgeting & Guardrails",
    topics: [
      {
        title: "Chapter 5.1 - Context Budgeting & Token Window Management",
        summary: "Dynamically calculating token headroom to prevent context window overflow during streaming generation",
        content: (
          <>
            <h2 id="context-budgeting" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              📐 Context Window Budgeting Mechanics
            </h2>
            Passing excessive retrieved text into local LLMs risks context truncation or crash. SourceIQ calculates exact token headroom dynamically before calling generation:
            <CodeBlock language="python">{`# Dynamically measure system prompt + chat history token overhead
skeleton_tokens = count_tokens(str(skeleton_messages))
safety_headroom = max_tokens + 128
max_context_tokens = max(512, limit_n_ctx - skeleton_tokens - safety_headroom)

if context_tokens > max_context_tokens:
    # Safely truncate context at line boundaries to fit exact budget
    truncated_context = truncate_context_lines(context, max_context_tokens)`}</CodeBlock>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 4.2 - Cross-Encoder Deep Reranking & Namespace Boosting" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 5.2 - Corporate Prompt Guardrails & Hallucination Prevention" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 5.2 - Corporate Prompt Guardrails & Hallucination Prevention",
        summary: "Enforcing strict corporate identity rules and out-of-domain fallback responses",
        content: (
          <>
            <h2 id="corporate-guardrails" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🛡️ Corporate System Guardrails & Hallucination Prevention
            </h2>
            SourceIQ enforces strict corporate prompt instructions for corporate compliance:
            <CodeBlock language="text">{`IDENTITY AND CREATOR RULES:
- Your name is SourceIQ. Developed for Fresenius Medical Care (FMC) by Cognizant.
- Answer identity/creator questions directly.

GENERAL QA RULES:
- Answer general/technical questions using ONLY the provided context below.
- If context is completely unrelated, reply EXACTLY with:
  "I think this info isn't yet added to my knowledge base."`}</CodeBlock>
            <Callout type="warning" title="Zero-Hallucination Strict Fallback">
              By enforcing a strict verbatim fallback output when retrieval confidence is zero, the bot eliminates speculative AI hallucinations in enterprise medical/corporate environments.
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 5.1 - Context Budgeting & Token Window Management" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 6.1 - Persistent Vector Cache & Hot Reloading" />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Chapter 6 Persistence & Multi-User Architecture",
    topics: [
      {
        title: "Chapter 6.1 - Persistent Vector Cache & Hot Reloading",
        summary: "Tracking document file modification timestamps for instantaneous incremental indexing",
        content: (
          <>
            <h2 id="vector-cache" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              💾 Persistent Cache & Incremental Hot-Reloading (`file_registry.json`)
            </h2>
            Re-indexing large document repositories on startup is slow. SourceIQ maintains a `file_registry.json` tracking file modification timestamps (`mtime`).
            <CodeBlock language="python">{`# Compare disk mtimes against cached registry
for relpath, mtime in current_files.items():
    if relpath not in registry or mtime > registry.get(relpath, 0):
        new_or_modified.append(relpath)

# Only process and embed newly added or modified documents!
if new_chunks_added:
    new_embeds = self.embedder.encode(new_texts)
    embeddings_np = np.concatenate([remaining_embeddings, new_embeds], axis=0)`}</CodeBlock>
            <Callout type="success" title="Sub-Second System Startup">
              If no files have changed on disk, SourceIQ loads `faiss_index.bin` and `vector_cache.pt` instantly, bypassing document extraction and embedding generation!
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 5.2 - Corporate Prompt Guardrails & Hallucination Prevention" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="Chapter 6.2 - SQLite Persistent DB & PBKDF2 Password Auth" />
            </div>
          </>
        ),
      },
      {
        title: "Chapter 6.2 - SQLite Persistent DB & PBKDF2 Password Auth",
        summary: "Storing user sessions, chat history, and securing accounts via PBKDF2-HMAC-SHA256 hashing",
        content: (
          <>
            <h2 id="sqlite-auth" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 600, marginTop: "1rem", marginBottom: "1rem" }}>
              🔐 SQLite Database & PBKDF2 Password Security
            </h2>
            SourceIQ persists chat history, source citations, and telemetry metrics per user session in an SQLite database (`rag_history.db`).
            <br /><br />
            <strong style={{ color: "#fff", fontSize: "1.1rem" }}>Cryptographic Password Protection</strong><br />
            User authentication utilizes PBKDF2 with HMAC-SHA256 and 100,000 key stretching iterations:
            <CodeBlock language="python">{`def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    hash_val = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
    return f"{salt}$" + hash_val.hex()`}</CodeBlock>
            <Callout type="success" title="Enterprise Multi-User Security">
              The database isolates user message history by `session_id`, grants corporate admin roles based on email domain verification, and supports custom theme preferences!
            </Callout>
            <div className="nav-container" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "3rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
              <NavButton direction="prev" targetTopic="Chapter 6.1 - Persistent Vector Cache & Hot Reloading" />
              <span style={{ color: "var(--text-secondary)" }}>|</span>
              <NavButton direction="next" targetTopic="None" />
            </div>
          </>
        ),
      },
    ],
  },
];
