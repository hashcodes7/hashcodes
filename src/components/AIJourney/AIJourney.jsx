import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, CornerRightDown, ExternalLink } from 'lucide-react';
import AIJourneyCanvas from './AIJourneyCanvas';
import ProjectModal from './ProjectModal';

const STAGES_DATA = [
  {
    stage: "Ingestion",
    headline: "AI begins with data.",
    sub: "Massive-scale unstructured knowledge ingestion",
    desc: "Every intelligent system starts with raw, disorganized information. Modern pipelines ingest massive streams of unstructured text, source code, internal databases, emails, and PDFs to compile a comprehensive knowledge base.",
    labels: ["PDFs", "Codebases", "Knowledge Bases", "Emails & Logs", "Data Ingestion"]
  },
  {
    stage: "Embeddings",
    headline: "Meaning becomes mathematics.",
    sub: "High-dimensional vector representations",
    desc: "To make data machine-readable, ingestion nodes feed documents into embedding models. Words, paragraphs, and concepts are converted into thousands of floating-point numbers, mapping semantic concepts to mathematical coordinates in a high-dimensional vector space.",
    labels: ["Semantic Search", "Similarity Scores", "Vector Clouds", "Qdrant", "Pinecone", "FAISS"]
  },
  {
    stage: "Transformer",
    headline: "Relationships create understanding.",
    sub: "Multi-head attention & token architectures",
    desc: "At the heart of modern AI lies the Transformer. By using self-attention mechanisms, neural networks evaluate the contextual relationships between tokens. Nodes activate dynamically to capture syntax, intent, and subtle logical structures.",
    labels: ["Tokens", "Self-Attention", "Context Window", "Neural Layers", "Inference"]
  },
  {
    stage: "Models",
    headline: "Foundation models unlock reasoning.",
    sub: "General-purpose cognitive execution cores",
    desc: "Through web-scale pre-training, massive networks collapse into compact foundation models. These models possess emergent capabilities, acting as general-purpose reasoning engines capable of logical deduction, code synthesis, and structured output generation.",
    labels: ["GPT-4o", "Claude 3.5", "Gemini 1.5", "Llama 3", "Emergent Reasoning"]
  },
  {
    stage: "RAG",
    headline: "Intelligence enhanced by knowledge.",
    sub: "Context injection via vector retrieval",
    desc: "Even foundation models have limits. Retrieval-Augmented Generation (RAG) queries high-performance vector databases to inject verified, real-time documents directly into the prompt context. This grounds response logic and prevents hallucinations.",
    labels: ["Semantic Retrieval", "Chunking", "Re-ranking", "Context Injection", "Fact Grounding"]
  },
  {
    stage: "Agentic AI",
    headline: "Intelligence becomes action.",
    sub: "Autonomous tool usage & multi-agent loops",
    desc: "AI evolves from static QA into active agents. Networks distribute tasks among specialized roles—Planners, Researchers, and Evaluators—who collaborate in loops, using databases, web search, and custom APIs to perform complex real-world tasks.",
    labels: ["Agentic AI", "Tool Calling", "Memory Systems", "Model Context Protocol", "Task Loops"]
  },
  {
    stage: "Projects",
    headline: "Building real-world AI systems.",
    sub: "Interactive Portfolio Projects",
    desc: "I specialize in building these advanced systems. Hover and click on the 3D project nodes floating in the scene to explore details of my local RAG systems, Transformer language models, and high-performance canvas frameworks.",
    labels: ["SourceIQ RAG", "MintFrame LLM", "Inficanvas Canvas"]
  },
  {
    stage: "Ecosystem",
    headline: "Harsh Verma",
    sub: "AI Development Engineer",
    desc: "Designing and scaling the next generation of intelligent systems. Let's collaborate to build autonomous agents, semantic pipelines, and high-performance applications.",
    labels: ["LLMs", "RAG Pipelines", "Agentic Workflows", "Full Stack Development"]
  }
];

const PROJECTS_DETAILS = [
  {
    title: 'SourceIQ - Local Multi-Document RAG Chatbot',
    description: 'An offline-first AI Chatbot designed to answer complex queries on private knowledge sources. Built using Python, Hugging Face Transformers, and the Qwen2.5-0.5B-Instruct Model, it implements semantic retrieval, custom vector storage, and context-aware answers to handle confidential enterprise data locally without cloud dependency.',
    tags: ['Python', 'Hugging Face', 'RAG', 'Vector DB', 'Semantic Search', 'Qwen2.5'],
    github: 'https://github.com/hashcodes7/hashcodes',
    live: '#'
  },
  {
    title: 'MintFrame – Transformer-Based Language Model',
    description: 'A custom, GPT-style Transformer architecture built from scratch in PyTorch and Python. Implements standard GPT-2 tokenization, embeddings, multi-head self-attention networks, causal masking, and autoregressive text generation. Initialized with pre-trained GPT-2 weight mapping to allow functional localized text output execution.',
    tags: ['PyTorch', 'Transformers', 'LLM', 'Python', 'Tokenization', 'Machine Learning'],
    github: 'https://github.com/hashcodes7/hashcodes',
    live: '#'
  },
  {
    title: 'Inficanvas – Infinite Collaborative Canvas',
    description: 'A collaborative, infinite design canvas featuring high-performance hybrid rendering (HTML5 Canvas element + responsive DOM layout). Supports advanced graph-based logic node connections, collaborative cursor synchronizations, offline-first persistence using IndexedDB, and high FPS pan-and-zoom actions.',
    tags: ['HTML5 Canvas', 'JavaScript', 'IndexedDB', 'Web Sockets', 'High Performance'],
    github: 'https://github.com/hashcodes7/hashcodes',
    live: '#'
  }
];

const AIJourney = () => {
  const containerRef = useRef(null);
  const scrollProgress = useRef(0);
  const targetProgress = useRef(0);
  const [activeStage, setActiveStage] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalHeight));
      targetProgress.current = p;

      if (scrolled > 100) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    let animFrameId;
    const update = () => {
      const diff = targetProgress.current - scrollProgress.current;
      if (Math.abs(diff) > 0.0001) {
        scrollProgress.current += diff * 0.075; // smooth damping factor
        const p = scrollProgress.current * 7;
        const currentStage = Math.min(Math.floor(p), 7);
        setActiveStage(currentStage);
        setProgressPercent(scrollProgress.current * 100);
      }
      animFrameId = requestAnimationFrame(update);
    };

    animFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  const currentStageData = STAGES_DATA[activeStage];

  const handleProjectClick = (index) => {
    setSelectedProject(PROJECTS_DETAILS[index]);
  };

  return (
    <section 
      ref={containerRef} 
      id="journey" 
      style={{ 
        position: 'relative', 
        height: '6200px', 
        background: '#050505',
        overflow: 'visible'
      }}
    >
      {/* Sticky viewport frame */}
      <div 
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Futuristic background design tokens */}
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.03) 0%, rgba(139, 92, 246, 0.02) 50%, rgba(0,0,0,0) 100%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* 3D Canvas */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
          <AIJourneyCanvas
            scrollProgress={scrollProgress}
            activeStage={activeStage}
            hoveredProject={hoveredProject}
            setHoveredProject={setHoveredProject}
            onProjectClick={handleProjectClick}
          />
        </div>

        {/* UI Overlay Content */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            padding: '2rem 5%',
            pointerEvents: 'none'
          }}
        >
          {/* Main info card */}
          <div 
            style={{ 
              maxWidth: '460px', 
              width: '100%', 
              pointerEvents: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'rgba(15, 15, 15, 0.65)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '20px',
                  padding: '2.25rem',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* Stage Indicator Pill */}
                <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="glass-pill" style={{ borderColor: 'rgba(255, 255, 255, 0.25)', color: '#a855f7', fontSize: '0.7rem', fontWeight: '800' }}>
                    Stage {activeStage + 1} of 8
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
                    {currentStageData.stage}
                  </div>
                </div>

                {/* Headline */}
                <h2 
                  style={{ 
                    fontSize: activeStage === 7 ? '3.2rem' : '2.1rem', 
                    fontWeight: 800, 
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    marginBottom: '0.75rem',
                    color: '#ffffff'
                  }}
                >
                  {currentStageData.headline}
                </h2>

                {/* Subheadline */}
                <h3 
                  style={{ 
                    fontSize: '1rem', 
                    fontWeight: '600', 
                    color: 'var(--accent-color)',
                    marginBottom: '1.25rem',
                    lineHeight: 1.4
                  }}
                >
                  {currentStageData.sub}
                </h3>

                {/* Description */}
                <p 
                  style={{ 
                    fontSize: '0.92rem', 
                    lineHeight: 1.6, 
                    color: 'var(--text-secondary)',
                    margin: 0
                  }}
                >
                  {currentStageData.desc}
                </p>

                {/* Extra layout features for stage 7 (interactive projects list) */}
                {activeStage === 6 && (
                  <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#a855f7', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <CornerRightDown size={14} /> Click project in 3D scene to open
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                      {PROJECTS_DETAILS.map((proj, idx) => (
                        <div 
                          key={idx}
                          onClick={() => handleProjectClick(idx)}
                          onMouseEnter={() => setHoveredProject(idx)}
                          onMouseLeave={() => setHoveredProject(null)}
                          style={{
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            background: hoveredProject === idx ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                            border: `1px solid ${hoveredProject === idx ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.05)'}`,
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.2s',
                          }}
                        >
                          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: hoveredProject === idx ? '#fff' : 'var(--text-secondary)' }}>
                            {proj.title.split(' - ')[0]}
                          </span>
                          <ExternalLink size={14} color={hoveredProject === idx ? 'var(--accent-color)' : 'var(--text-secondary)'} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags stack */}
                {activeStage !== 6 && currentStageData.labels.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.75rem' }}>
                    {currentStageData.labels.map((lbl) => (
                      <span 
                        key={lbl} 
                        style={{ 
                          fontSize: '0.7rem', 
                          fontWeight: '700',
                          padding: '0.2rem 0.55rem', 
                          borderRadius: '4px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: '#e5e7eb'
                        }}
                      >
                        {lbl}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll Progress indicator bar (right side) */}
        <div 
          style={{
            position: 'absolute',
            right: '2.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            height: '240px',
            width: '2px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px 0'
          }}
        >
          {/* Animated active progress tracker */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${progressPercent}%`,
              background: 'linear-gradient(to bottom, #a855f7, var(--accent-color))',
              borderRadius: '2px',
              transition: 'height 0.1s linear'
            }}
          />
          {STAGES_DATA.map((stg, idx) => (
            <div 
              key={idx}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: activeStage === idx ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.3)',
                boxShadow: activeStage === idx ? '0 0 8px var(--accent-color)' : 'none',
                zIndex: 11,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => {
                // Scroll page to the correct stage height
                if (containerRef.current) {
                  const rect = containerRef.current.getBoundingClientRect();
                  const totalHeight = rect.height - window.innerHeight;
                  const stageFraction = idx / 7;
                  const absoluteTop = window.scrollY + rect.top + (stageFraction * totalHeight);
                  window.scrollTo({ top: absoluteTop, behavior: 'smooth' });
                }
              }}
              title={stg.stage}
            />
          ))}
        </div>

        {/* Hint to scroll down (initially visible, fades out) */}
        <AnimatePresence>
          {!hasScrolled && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 1 }}
              style={{
                position: 'absolute',
                bottom: '2.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                pointerEvents: 'none'
              }}
            >
              <span>Scroll to start journey</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <ArrowDown size={16} color="var(--accent-color)" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Details Modal for Stage 7 Projects */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default AIJourney;
