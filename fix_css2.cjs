const fs = require('fs');
const lines = fs.readFileSync('src/index.css', 'utf8').split('\n');

// Find the line where .projects-capabilities-grid starts
let startIdx = -1;
for(let i=0; i<lines.length; i++) {
  if (lines[i].includes('.projects-capabilities-grid {')) {
    startIdx = i;
    break;
  }
}

if (startIdx !== -1) {
  lines.length = startIdx; // keep everything before it
  lines.push('.projects-capabilities-grid {');
  lines.push('  display: grid;');
  lines.push('  grid-template-columns: 1fr;');
  lines.push('  gap: 1rem;');
  lines.push('}');
  lines.push('');
  lines.push('@media (min-width: 768px) {');
  lines.push('  .projects-capabilities-grid {');
  lines.push('    grid-template-columns: repeat(2, 1fr);');
  lines.push('  }');
  lines.push('}');
  fs.writeFileSync('src/index.css', lines.join('\n'), 'utf8');
  console.log('Fixed index.css fully!');
} else {
  console.log('Could not find start index');
}
