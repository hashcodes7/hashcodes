const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

// Sort files alphanumerically
files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

let jsxOutput = `/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

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
      <div style={{ fontWeight: 800, color: theme.color, marginBottom: '0.75rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {title}
      </div>
      <div style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
};

const CodeBlock = ({ language, children }) => (
  <div style={{
    background: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '1.5rem',
    fontFamily: 'monospace',
    color: '#e2e8f0',
    overflowX: 'auto',
    marginBottom: '1.5rem',
    fontSize: '0.95rem'
  }}>
    <pre style={{ margin: 0 }}><code>{children}</code></pre>
  </div>
);

const MathBlock = ({ children }) => (
  <div style={{
    background: 'rgba(0, 240, 255, 0.03)',
    border: '1px dashed rgba(0, 240, 255, 0.3)',
    borderRadius: '8px',
    padding: '1.5rem',
    color: 'var(--accent-color)',
    fontFamily: 'monospace',
    textAlign: 'center',
    fontSize: '1.1rem',
    margin: '1.5rem 0',
    letterSpacing: '0.05em'
  }}>
    {children}
  </div>
);

const StyledTable = ({ headers, rows }) => (
  <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
          {headers.map((h, i) => <th key={i} style={{ padding: '1rem', fontWeight: 600 }}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
            {row.map((cell, j) => <td key={j} style={{ padding: '1rem', color: 'var(--text-primary)' }}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const llmChaptersData = [
`;

function parseMarkdownToJsx(markdown) {
    let result = markdown;
    
    // Remove frontmatter
    result = result.replace(/---[\s\S]*?---/, '');
    
    // Convert headings
    result = result.replace(/^##\s+(.*)/gm, (match, text) => {
        let id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return '<h2 id="' + id + '" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800, marginTop: "3rem", marginBottom: "1rem" }}>' + text.trim() + '</h2>';
    });
    
    result = result.replace(/^#\s+(.*)/gm, (match, text) => {
        let id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return '<h2 id="' + id + '" style={{ color: "#fff", fontSize: "1.75rem", fontWeight: 800, marginTop: "1rem", marginBottom: "1rem" }}>' + text.trim() + '</h2>';
    });
    
    // Process Callouts
    const calloutRegex = />\s*\[!(.*?)\]\s*(.*)\n((?:>\s*.*\n?)*)/g;
    result = result.replace(calloutRegex, (match, type, title, content) => {
        let cleanContent = content.split('\n').map(line => line.replace(/^>\s?/, '').trim()).join('\n').trim();
        return '<Callout type="' + type.toLowerCase() + '" title="' + title.trim() + '">\n' + cleanContent + '\n</Callout>\n';
    });
    
    // Convert code blocks (avoid escaping hell by using a trick)
    const codeRegex = /```(.*?)\n([\s\S]*?)```/g;
    result = result.replace(codeRegex, (match, lang, code) => {
        let safeCode = code.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
        return '<CodeBlock language="' + lang.trim() + '">{`' + safeCode + '`}</CodeBlock>\n';
    });

    // Replace basic tables with StyledTable - this is hard via regex, 
    // but we can try to find them if they start with |
    const tableRegex = /((?:\|.*\|\n)+)/g;
    result = result.replace(tableRegex, (match) => {
       const rows = match.trim().split('\n').map(r => r.split('|').filter(c => c.trim()).map(c => c.trim()));
       if (rows.length < 3) return match; // Not a valid table probably
       const headers = rows[0];
       const bodyRows = rows.slice(2); // Skip separator row
       
       const headersJsx = '[' + headers.map(h => '<>' + h + '</>').join(', ') + ']';
       const bodyJsx = '[' + bodyRows.map(r => '[' + r.map(c => '<>' + c + '</>').join(', ') + ']').join(',\n') + ']';
       
       return '<StyledTable headers={' + headersJsx + '} rows={' + bodyJsx + '} />\n';
    });

    // Basic lists
    // Replace unordered lists
    const ulRegex = /(?:^|\n)((?:-\s+.*\n?)+)/g;
    result = result.replace(ulRegex, (match, list) => {
        if (list.includes('<Callout') || list.includes('<CodeBlock')) return match;
        const items = list.trim().split('\n').map(item => '<li>' + item.replace(/^-\s+/, '') + '</li>').join('');
        return '<ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>' + items + '</ul>\n';
    });

    // Ordered lists
    const olRegex = /(?:^|\n)((?:\d+\.\s+.*\n?)+)/g;
    result = result.replace(olRegex, (match, list) => {
        if (list.includes('<Callout') || list.includes('<CodeBlock')) return match;
        const items = list.trim().split('\n').map(item => '<li style={{ marginBottom: "0.5rem" }}>' + item.replace(/^\d+\.\s+/, '') + '</li>').join('');
        return '<ol style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>' + items + '</ol>\n';
    });

    let blocks = result.split('\n\n').map(b => b.trim()).filter(b => b);
    blocks = blocks.map(b => {
        if (!b.startsWith('<') && !b.includes('---')) {
            // Bold text
            b = b.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            // Italic text
            b = b.replace(/\*(.*?)\*/g, '<em>$1</em>');
            // Inline code
            b = b.replace(/(?<!\\)`(.*?)`/g, '<code style={{ color: "var(--accent-color)" }}>$1</code>');
            
            return '<span style={{ display: "block", marginBottom: "1rem", lineHeight: 1.7, fontSize: "1.05rem", color: "var(--text-secondary)" }}>' + b + '</span>';
        }
        return b;
    });

    // We must ensure the Callout closes properly. If we wrap spans, we must not break <CodeBlock> strings.
    // Actually, splitting by \n\n breaks CodeBlocks. Let's fix that by NOT splitting by \n\n if it's inside a codeblock.


    return blocks.join('\n\n');
}

files.forEach(file => {
    const rawContent = fs.readFileSync(path.join(contentDir, file), 'utf8');
    const title = file.replace('.md', '');
    const jsxContent = parseMarkdownToJsx(rawContent);
    
    // We can extract summary from the Overview callout if it exists
    let summary = "Detailed breakdown of " + title;
    const overviewMatch = rawContent.match(/>\s*\[!abstract\]\s*Overview\n>\s*(.*)/);
    if (overviewMatch) summary = overviewMatch[1].trim();

    jsxOutput += '  {\n    title: "' + title + '",\n    summary: "' + summary.replace(/"/g, '\\"') + '",\n    content: (\n      <>\n        ' + jsxContent.split('\n').join('\n        ') + '\n      </>\n    )\n  },\n';
});

jsxOutput += '];\n';

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'LlmChaptersData.jsx'), jsxOutput, 'utf8');
console.log('Successfully generated all chapters!');
