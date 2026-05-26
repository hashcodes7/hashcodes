const Education = () => {
  return (
    <section id="education" className="section container">
      <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>Education & Certifications</h2>
      
      <div className="grid md:grid-cols-2" style={{ gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Education */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
            <div style={{ fontSize: '2rem' }}>🎓</div>
            <h3 style={{ fontSize: '1.5rem' }}>Education</h3>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-color)', marginBottom: '0.5rem' }}>B.Tech in Computer Science and Information Technology</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              <span>KIET Group of Institutions, India</span>
              <span>2019 – 2023</span>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>CGPA: 8.3 | Ghaziabad, Uttar Pradesh</p>
          </div>
        </div>

        {/* Certifications & Achievements */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
            <div style={{ fontSize: '2rem' }}>🏆</div>
            <h3 style={{ fontSize: '1.5rem' }}>Achievements</h3>
          </div>
          
          <ul style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1.5rem' }}>
            <li style={{ lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--text-primary)' }}>Above & Beyond Award (2025)</strong>
              <br />Cognizant recognition for impactful contributions
            </li>
            <li style={{ lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--text-primary)' }}>AWS Academy Cloud Foundation Certificate</strong>
              <br />Mar' 2023
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Education;
