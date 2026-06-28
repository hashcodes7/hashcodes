const fs = require('fs');
const path = 'c:/Users/Harsh/HiHarsh/Coding/React/harsh_portfolio/src/components/ExtraSections.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove ReactMarkdown imports
content = content.replace("import ReactMarkdown from 'react-markdown';\nimport remarkGfm from 'remark-gfm';", "");

// 2. Add LlmChaptersData import if not present
if (!content.includes("import { llmChaptersData } from '../data/LlmChaptersData';")) {
  content = content.replace(
    "import { AlgorithmsExplorer } from './AlgorithmsExplorer';",
    "import { AlgorithmsExplorer } from './AlgorithmsExplorer';\nimport { llmChaptersData } from '../data/LlmChaptersData';"
  );
}

// 3. Remove the dynamic md loader
const mdLoaderPattern = /\/\/ Load all markdown files[\s\S]*?\.sort\(\(a, b\) => a\.title\.localeCompare\(b\.title, undefined, \{ numeric: true, sensitivity: 'base' \}\)\);/;
content = content.replace(mdLoaderPattern, "");

// 4. Update the llm-from-scratch subCategory's topics
content = content.replace(
  "topics: llmChapters.length > 0 ? llmChapters : [{ title: \"Loading...\", content: \"Content not found.\" }]",
  "topics: llmChaptersData"
);

// 5. Update the ReactMarkdown rendering in LearnPage
const markdownRenderPattern = /<div className="markdown-content"[\s\S]*?<\/div>/;
content = content.replace(markdownRenderPattern, `
                <div className="custom-chapter-content" style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'var(--text-primary)',
                  paddingBottom: '4rem'
                }}>
                  {activeTopic.content}
                </div>
`);

// 6. Update conceptsCount since llmChapters no longer exists
content = content.replace("conceptsCount: 42 + llmChapters.length,", "conceptsCount: 42 + llmChaptersData.length,");

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated ExtraSections.jsx to use LlmChaptersData');
