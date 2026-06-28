const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

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
      <div style={{ color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
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
    let result = markdown.replace(/\r\n/g, '\n');
    
    result = result.replace(/---[\s\S]*?---/, '');
    
    // Save code blocks first so inline styling doesn't touch them
    const codeBlocks = [];
    result = result.replace(/```(.*?)\n([\s\S]*?)```/g, (match, lang, code) => {
        let safeCode = code.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
        codeBlocks.push('<CodeBlock language="' + lang.replace(/"/g, '&quot;').trim() + '">{`' + safeCode + '`}</CodeBlock>');
        return '%%%CODE_BLOCK_' + (codeBlocks.length - 1) + '%%%';
    });

    // Save tables
    const tables = [];
    result = result.replace(/((?:\|.*\|\n)+)/g, (match) => {
       const rows = match.trim().split('\n').map(r => r.split('|').filter(c => c.trim()).map(c => c.trim()));
       if (rows.length < 3) return match; 
       const headers = rows[0];
       const bodyRows = rows.slice(2);
       const headersJsx = '[' + headers.map(h => '<>' + h.replace(/{/g, '&#123;').replace(/}/g, '&#125;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</>').join(', ') + ']';
       const bodyJsx = '[' + bodyRows.map(r => '[' + r.map(c => '<>' + c.replace(/{/g, '&#123;').replace(/}/g, '&#125;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</>').join(', ') + ']').join(',\n') + ']';
       tables.push('<StyledTable headers={' + headersJsx + '} rows={' + bodyJsx + '} />');
       return '%%%TABLE_' + (tables.length - 1) + '%%%';
    });

    // Escape curly braces so JSX doesn't evaluate LaTeX as JS
    result = result.replace(/{/g, '&#123;');
    result = result.replace(/}/g, '&#125;');

    // Inline formatting
    result = result.replace(/(?<!\\)`(.*?)`/g, '<code style={{ color: "var(--accent-color)" }}>$1</code>');

    // Headings
    result = result.replace(/^##\s+(.*)/gm, (match, text) => {
        let id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return '<h2 id="' + id + '" style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800, marginTop: "3rem", marginBottom: "1rem" }}>' + text.trim() + '</h2>';
    });
    
    result = result.replace(/^#\s+(.*)/gm, (match, text) => {
        let id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return '<h2 id="' + id + '" style={{ color: "#fff", fontSize: "1.75rem", fontWeight: 800, marginTop: "1rem", marginBottom: "1rem" }}>' + text.trim() + '</h2>';
    });

    // Callouts
    const calloutRegex = />\s*\[!(.*?)\]\s*(.*)\n((?:>\s*.*\n?)*)/g;
    result = result.replace(calloutRegex, (match, type, title, content) => {
        let cleanContent = content.split('\n').map(line => line.replace(/^>\s?/, '').trim()).join('\n').trim();
        return '<Callout type="' + type.replace(/"/g, '&quot;').toLowerCase() + '" title="' + title.replace(/"/g, '&quot;').trim() + '">\n' + cleanContent + '\n</Callout>\n';
    });

    // Normal Blockquotes
    result = result.replace(/(?:^|\n)(>\s*(?!\[!).*\n?)+/g, (match) => {
        let clean = match.split('\n').map(line => line.replace(/^>\s?/, '')).join('\n').trim();
        return '\n<blockquote style={{ borderLeft: "4px solid rgba(255,255,255,0.2)", paddingLeft: "1rem", margin: "1rem 0", color: "var(--text-secondary)" }}>\n' + clean + '\n</blockquote>\n';
    });

    // Lists
    result = result.replace(/(?:^|\n)((?:-\s+.*\n?)+)/g, (match, list) => {
        if (list.includes('%%%')) return match;
        const items = list.trim().split('\n').map(item => '<li>' + item.replace(/^-\s+/, '') + '</li>').join('');
        return '<ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>' + items + '</ul>\n';
    });

    result = result.replace(/(?:^|\n)((?:\d+\.\s+.*\n?)+)/g, (match, list) => {
        if (list.includes('%%%')) return match;
        const items = list.trim().split('\n').map(item => '<li style={{ marginBottom: "0.5rem" }}>' + item.replace(/^\d+\.\s+/, '') + '</li>').join('');
        return '<ol style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>' + items + '</ol>\n';
    });

    // Self-close img tags for JSX
    result = result.replace(/<img([^>]+)>/g, (match, p1) => {
        if (p1.endsWith('/')) return match; // already self-closing
        return '<img' + p1 + ' />';
    });

    // Escape backslashes for JSX text BEFORE restoring CodeBlocks and Tables
    // In JSX text, '\' is an escape char, so we need '\\' to render '\'
    result = result.replace(/\\/g, '\\\\');

    // Restore tables
    tables.forEach((table, index) => {
        result = result.replace('%%%TABLE_' + index + '%%%', table);
    });

    // Restore code blocks
    codeBlocks.forEach((codeBlock, index) => {
        result = result.replace('%%%CODE_BLOCK_' + index + '%%%', codeBlock);
    });
    
    return result;
}

files.forEach(file => {
    const rawContent = fs.readFileSync(path.join(contentDir, file), 'utf8');
    const title = file.replace('.md', '');
    const jsxContent = parseMarkdownToJsx(rawContent);
    
    let summary = "Detailed breakdown of " + title;
    const overviewMatch = rawContent.match(/>\s*\[!abstract\]\s*Overview\n>\s*(.*)/);
    if (overviewMatch) summary = overviewMatch[1].trim();

    jsxOutput += '  {\n    title: "' + title + '",\n    summary: "' + summary.replace(/"/g, '\\"') + '",\n    content: (\n      <>\n        ' + jsxContent.split('\n').join('\n        ') + '\n      </>\n    )\n  },\n';
});

jsxOutput += '];\n';

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'LlmChaptersData.jsx'), jsxOutput, 'utf8');
console.log('Successfully generated all chapters safely!');
