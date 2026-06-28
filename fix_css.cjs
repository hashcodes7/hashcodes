const fs = require('fs');
const lines = fs.readFileSync('src/index.css', 'utf8').split('\n');
let cutIdx = -1;
for(let i=0; i<lines.length; i++) {
  if (lines[i].includes('@ i m p o r t')) {
    cutIdx = i;
    break;
  }
}

if (cutIdx === -1) {
   // Wait, if @ i m p o r t is missing, I need to cut at the duplicate .slider block
   // Let's find the FIRST occurrence of `.projects-capabilities-grid` ending.
   let count = 0;
   for(let i=0; i<lines.length; i++) {
     if (lines[i].includes('projects-capabilities-grid')) count++;
     if (count === 2 && lines[i].trim() === '}') {
        cutIdx = i + 1;
        break;
     }
   }
}

if (cutIdx !== -1) {
  lines.length = cutIdx;
  fs.writeFileSync('src/index.css', lines.join('\n'), 'utf8');
  console.log('Fixed index.css');
} else {
  console.log('Could not find cut index');
}
