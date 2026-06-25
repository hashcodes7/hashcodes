import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  // Dynamically load all project JSON files from the projects folder
  const projectFiles = import.meta.glob('../projects/*.json', { eager: true });
  const projects = Object.values(projectFiles).map((mod) => mod.default || mod);

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
