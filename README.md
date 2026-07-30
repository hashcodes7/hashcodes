# Technical Portfolio & Interactive AI Learning Platform

A modern, high-performance portfolio and documentation platform showcasing AI engineering, Retrieval-Augmented Generation (RAG), and interactive WebGL tensor visualizers.

## Tech Stack

- **Core Framework**: Next.js 16 (App Router) & React 19
- **Content & Documentation**: Fumadocs UI & MDX (`fumadocs-core`, `fumadocs-mdx`)
- **3D & Visualizations**: Three.js & React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Math Rendering**: KaTeX (`katex`, `rehype-katex`, `remark-math`)
- **Styling & Animations**: Glassmorphic Vanilla CSS & Framer Motion

## Project Structure

- `src/app/`: Next.js App Router pages (Articles, Papers, Learn, Resume, TechStack, Consulting)
- `src/components/`: Modular UI components & interactive ML visualizers (`CausalMaskVisualizer`, `GeluVisualizer`, `MatrixMultiplicationVisualizer`, `SoftmaxVisualizer`)
- `src/data/`: Structured static datasets (`articlesData`, `papersData`, `techStackData`)
- `content/`: MDX learning modules and technical documentation

## Development

```bash
# Start development server
npm run dev

# Build production bundle
npm run build

# Run linter
npm run lint
```
