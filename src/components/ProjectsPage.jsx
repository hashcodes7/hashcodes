import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ProjectDiagram from './ProjectDiagram';

export default function ProjectsPage() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [activeMainTab, setActiveMainTab] = useState('');
  const [activeArchSubTab, setActiveArchSubTab] = useState('');

  // Dynamically load all project JSON files from the projects folder
  const projectFiles = import.meta.glob('../projects/*.json', { eager: true });
  const projects = Object.values(projectFiles).map((mod) => mod.default || mod);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const handleOpenProject = (project) => {
    setSelectedProjectId(project.id);
    if (project.documentation && project.documentation.sections && project.documentation.sections.length > 0) {
      const firstSection = project.documentation.sections[0];
      setActiveMainTab(firstSection.id);
      if (firstSection.subtabs && firstSection.subtabs.length > 0) {
        setActiveArchSubTab(firstSection.subtabs[0].id);
      } else {
        setActiveArchSubTab('');
      }
    } else {
      setActiveMainTab('');
      setActiveArchSubTab('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedProjectId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderIcon = (iconName, size = 14) => {
    const IconComponent = LucideIcons[iconName];
    return IconComponent ? <IconComponent size={size} /> : null;
  };

  const renderBlock = (block, idx) => {
    switch (block.type) {
      case 'text':
        return (
          <div key={idx}>
            <h3 style={{ fontSize: '1.6rem', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '4px', height: '1.6rem', background: 'var(--accent-color)', borderRadius: '2px' }} />
              {block.title}
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-secondary)', textAlign: 'justify', margin: 0, whiteSpace: 'pre-line' }}>
              {block.value}
            </p>
          </div>
        );
      case 'grid':
        return (
          <div key={idx}>
            <h4 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1rem' }}>{block.title}</h4>
            <div className="projects-capabilities-grid">
              {block.items.map((item, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '1.25rem' }}>
                  <h5 style={{ color: 'var(--accent-color)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</h5>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'tags':
        return (
          <div key={idx}>
            <h4 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1rem' }}>{block.title}</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {block.items.map((tech, i) => (
                <span key={i} className="glass-pill" style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem', color: '#fff', borderColor: 'rgba(255, 255, 255, 0.08)', background: 'rgba(255,255,255,0.03)' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        );
      case 'code':
        return (
          <div key={idx}>
            <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.75rem' }}>{block.title}</h4>
            <pre style={{ 
              margin: 0, 
              background: '#070708', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              borderRadius: '12px', 
              padding: '1.25rem', 
              overflowX: 'auto',
              fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
              fontSize: '0.85rem',
              lineHeight: 1.5,
              color: '#eceff4',
              textAlign: 'left'
            }}>
              <code>{block.value}</code>
            </pre>
          </div>
        );
      case 'diagram':
        return (
          <div key={idx} style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', padding: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <ProjectDiagram name={block.name} />
          </div>
        );
      case 'details':
        return (
          <div key={idx}>
            {block.items.map((item, i) => (
              <div key={i} style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5, textAlign: 'justify', margin: 0, whiteSpace: 'pre-line' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const renderSectionContent = (section) => {
    if (!section) return null;

    if (section.subtabs && section.subtabs.length > 0) {
      const activeSub = section.subtabs.find((st) => st.id === activeArchSubTab) || section.subtabs[0];
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Secondary Horizontal Sub-Tabs */}
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)', 
            paddingBottom: '0.5rem',
            overflowX: 'auto',
            scrollbarWidth: 'none'
          }}>
            {section.subtabs.map((subTab) => (
              <button
                key={subTab.id}
                onClick={() => setActiveArchSubTab(subTab.id)}
                style={{
                  background: activeArchSubTab === subTab.id ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
                  border: 'none',
                  borderBottom: activeArchSubTab === subTab.id ? '2px solid var(--accent-color)' : '2px solid transparent',
                  color: activeArchSubTab === subTab.id ? 'var(--accent-color)' : 'var(--text-secondary)',
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                {subTab.label}
              </button>
            ))}
          </div>

          <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {activeSub.blocks.map((block, idx) => renderBlock(block, idx))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {section.blocks.map((block, idx) => renderBlock(block, idx))}
        </div>
      );
    }
  };

  const activeSection = selectedProject?.documentation?.sections?.find((s) => s.id === activeMainTab);

  return (
    <section id="projects-page" className="section container" style={{ paddingTop: '8rem', minHeight: '90vh' }}>
      {!selectedProjectId ? (
        <>
          {/* Main Portfolio Header */}
          <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, var(--accent-color), #2563eb)' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem', color: '#fff' }}>Technical Projects Showcase</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '0', maxWidth: '750px' }}>
              A collection of architectural designs, deep learning implementations, and frontend interfaces. Deep dive into the source files, design documents, and operational components of each system.
            </p>
          </div>

          {/* Projects Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {projects.map((project) => (
              <div 
                key={project.id}
                style={{ 
                  padding: '2.5rem', 
                  borderRadius: '20px',
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '1.5rem',
                  border: project.featured ? '1px solid rgba(0, 240, 255, 0.25)' : '1px solid var(--glass-border)',
                  background: project.featured ? 'rgba(0, 240, 255, 0.01)' : 'var(--glass-bg)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease'
                }}
                className={`glass-card ${project.featured ? 'featured-glow' : ''}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    {project.featured && (
                      <span className="glass-pill" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem', marginBottom: '0.75rem', display: 'inline-flex' }}>
                        ★ Featured Implementation
                      </span>
                    )}
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0.25rem 0 0.5rem 0', color: '#fff' }}>
                      {project.title}
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {project.tags.length} Technologies
                  </span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, margin: 0, textAlign: 'justify' }}>
                  {project.description}
                </p>

                {/* Tech Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="glass-pill" 
                      style={{ 
                        fontSize: '0.72rem', 
                        padding: '0.2rem 0.6rem',
                        borderColor: 'rgba(255, 255, 255, 0.08)',
                        background: 'rgba(255, 255, 255, 0.02)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
                  paddingTop: '1.25rem', 
                  marginTop: '0.5rem' 
                }}>
                  <a href={project.github} className="btn-icon glass-panel" style={{ width: '40px', height: '40px', borderRadius: '10px' }} aria-label="GitHub Repository">
                    <FaGithub size={18} />
                  </a>
                  
                  {project.documentation && project.documentation.sections && project.documentation.sections.length > 0 ? (
                    <button 
                      onClick={() => handleOpenProject(project)}
                      className="btn-primary" 
                      style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}
                    >
                      Open Deep-Dive Documentation <ArrowRight size={14} />
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                      Documentation upcoming
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Detailed View of selected project */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Top Return Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <button 
              onClick={handleBack}
              style={{
                background: 'transparent',
                border: '1px solid var(--glass-border)',
                padding: '0.5rem 1.2rem',
                borderRadius: '9999px',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-color)';
                e.currentTarget.style.color = 'var(--accent-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              <ArrowLeft size={14} /> Back to Projects
            </button>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Project: <strong style={{ color: 'var(--accent-color)' }}>{selectedProject.title}</strong>
            </span>
          </div>

          {/* Project Title Block */}
          <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '1.5rem' }}>
            <span className="glass-pill" style={{ fontSize: '0.65rem', marginBottom: '0.5rem' }}>
              {selectedProject.category || 'PROJECT DOCUMENTATION'}
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.5rem 0 0.5rem 0', color: '#fff', textAlign: 'left' }}>
              {selectedProject.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 }}>
              {selectedProject.description}
            </p>
          </div>

          {/* Layout Grid: Left Sticky Nav + Right Content Area */}
          <div className="projects-details-grid">
            {/* Sticky Sidebar Navigation */}
            <div className="projects-sidebar">
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.25rem 0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '0.5rem' }}>
                System Sections
              </span>
              {selectedProject.documentation.sections.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveMainTab(tab.id);
                    if (tab.subtabs && tab.subtabs.length > 0) {
                      setActiveArchSubTab(tab.subtabs[0].id);
                    } else {
                      setActiveArchSubTab('');
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                    background: activeMainTab === tab.id ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                    color: activeMainTab === tab.id ? 'var(--accent-color)' : 'var(--text-secondary)',
                    fontWeight: activeMainTab === tab.id ? '700' : '500',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (activeMainTab !== tab.id) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      e.currentTarget.style.color = '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeMainTab !== tab.id) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  {renderIcon(tab.icon, 14)}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right-hand Main Content Display Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {renderSectionContent(activeSection)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
