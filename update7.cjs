const fs = require('fs');
const path = 'src/components/ExtraSections.jsx';
const lines = fs.readFileSync(path, 'utf8').split('\n');

let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("import remarkMath from 'remark-math';")) {
    startIndex = i;
  }
  if (lines[i].includes("const LEARN_CATEGORIES = [")) {
    endIndex = i;
    break; // Break since we found the start of LEARN_CATEGORIES
  }
}

if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
  // Remove the lines in between
  lines.splice(startIndex, endIndex - startIndex);
  fs.writeFileSync(path, lines.join('\n'), 'utf8');
  console.log('Successfully removed old markdown components.');
} else {
  console.log('Could not find the range to delete.', startIndex, endIndex);
}
