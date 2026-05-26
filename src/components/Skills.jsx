const Skills = () => {
  const skillCategories = [
    {
      category: 'AI & Machine Learning',
      skills: ['PyTorch', 'Hugging Face Transformers', 'LLMs', 'RAG Systems', 'NLP', 'Tokenization', 'Embeddings', 'Semantic Search', 'Similarity Search', 'Vector Search Concepts']
    },
    {
      category: 'Languages & Frameworks',
      skills: ['Python', 'Java', 'JavaScript', 'Spring Boot', 'REST APIs', 'SQL', 'ReactJS', 'Flutter']
    },
    {
      category: 'Tools & Infrastructure',
      skills: ['Docker', 'Git', 'Linux', 'AWS', 'Data Pipelines', 'MongoDB']
    }
  ];

  return (
    <section id="skills" className="section container">
      <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>Technical Skills</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: '2rem' }}>
        {skillCategories.map((group, index) => (
          <div key={index} className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', textAlign: 'center', color: 'var(--text-primary)' }}>
              {group.category}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              {group.skills.map(skill => (
                <span key={skill} className="glass-pill" style={{ 
                  background: 'linear-gradient(135deg, var(--glass-bg), rgba(255,255,255,0.05))'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
