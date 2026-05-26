import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: 'SourceIQ - Local Multi-Document RAG Chatbot',
      description: 'AI Chatbot to answer queries on private data. Developed a Python-based RAG Chatbot application using Hugging Face Transformers and Qwen2.5-0.5B-Instruct Model to retrieve information from knowledge sources and generate context-aware answers.',
      tags: ['Python', 'Hugging Face', 'RAG', 'Vector DB', 'Semantic Search'],
      github: '#',
      live: '#'
    },
    {
      title: 'MintFrame – Transformer-Based Language Model',
      description: 'Implemented a GPT-style Transformer architecture in Python and PyTorch for enabling tokenization, embeddings, multi-head self-attention, and autoregressive text generation. Initialized with pretrained GPT-2 weights.',
      tags: ['PyTorch', 'Transformers', 'LLM', 'Python'],
      github: '#',
      live: '#'
    },
    {
      title: 'Inficanvas – Infinite Collaborative Canvas',
      description: 'Engineered a hybrid rendering architecture (HTML5 Canvas + DOM) for scalable, high-performance visual interactions. Built advanced features including graph-based logic nodes and implemented offline-first persistence using IndexedDB.',
      tags: ['HTML5 Canvas', 'JavaScript', 'IndexedDB'],
      github: '#',
      live: '#'
    }
  ];

  return (
    <section id="projects" className="section container">
      <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>Featured Projects</h2>
      
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {projects.map((project, index) => (
          <div key={index} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>{project.title}</h3>
            <p style={{ color: 'var(--text-secondary)', flexGrow: 1, marginBottom: '1.5rem' }}>
              {project.description}
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {project.tags.map(tag => (
                <span key={tag} className="glass-pill" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
              <a href={project.github} className="btn-icon glass-panel" aria-label="GitHub Repository">
                <FaGithub size={20} />
              </a>
              <a href={project.live} className="btn-icon glass-panel" aria-label="Live Demo">
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
