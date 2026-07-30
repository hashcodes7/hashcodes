import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import fs from "fs";
import path from "path";

// Static metadata mapping for Category Badges and Descriptions
const CATEGORY_META: Record<string, { title: string, badge: string, description: string }> = {
  ai: {
    title: "Artificial Intelligence",
    badge: "AI",
    description: "Neural networks, computer vision, and generative models."
  },
  vision: {
    title: "Computer Vision",
    badge: "VISION",
    description: "Image processing, spatial pattern recognition, and CNN architectures."
  },
  flutter: {
    title: "Flutter Mobile Development",
    badge: "FLUTTER",
    description: "Widget trees, state management paradigms, and cross-platform compilation."
  },
  sys: {
    title: "Systems & Architecture",
    badge: "SYS",
    description: "Microservices design, load balancing, databases, and distributed caching."
  },
  algo: {
    title: "Algorithms & Data Structures",
    badge: "ALGO",
    description: "Core algorithms, sorting techniques, and dynamic programming."
  }
};

// Natural sorting helper to order chapter names and lesson numbers correctly (e.g. Chapter 2 before Chapter 10)
function naturalSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

// Helper to write file only if contents have actually changed (prevents triggering file watchers endlessly)
function writeIfChanged(filePath: string, content: string): boolean {
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, "utf-8");
    if (existing === content) {
      return false;
    }
  }
  fs.writeFileSync(filePath, content);
  return true;
}

// Dynamically generate all meta.json configurations and build learn.json from disk structure
try {
  const contentDir = path.resolve("content");
  const coursesDir = path.join(contentDir, "courses");
  let anyFileUpdated = false;

  if (fs.existsSync(coursesDir)) {
    // 1. Generate content/meta.json
    const rootMeta = { pages: ["courses"] };
    if (writeIfChanged(path.join(contentDir, "meta.json"), JSON.stringify(rootMeta, null, 2))) {
      anyFileUpdated = true;
    }

    // 2. Scan and sort category folders
    const categories = fs.readdirSync(coursesDir).filter(item => {
      return !item.startsWith(".") && fs.statSync(path.join(coursesDir, item)).isDirectory();
    });
    categories.sort(naturalSort);

    const coursesMeta = { pages: categories };
    if (writeIfChanged(path.join(coursesDir, "meta.json"), JSON.stringify(coursesMeta, null, 2))) {
      anyFileUpdated = true;
    }

    const learnCatalog: any[] = [];

    // 3. Loop categories
    categories.forEach(cat => {
      const catDir = path.join(coursesDir, cat);
      const courses = fs.readdirSync(catDir).filter(item => {
        return !item.startsWith(".") && fs.statSync(path.join(catDir, item)).isDirectory();
      });
      courses.sort(naturalSort);

      const catMeta = { pages: courses };
      if (writeIfChanged(path.join(catDir, "meta.json"), JSON.stringify(catMeta, null, 2))) {
        anyFileUpdated = true;
      }

      const catMetaInfo = CATEGORY_META[cat.toLowerCase()] || {
        title: cat.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
        badge: cat.toUpperCase(),
        description: `Explore notebooks on ${cat}.`
      };

      const courseCatalogList: any[] = [];

      // 4. Loop courses
      courses.forEach(course => {
        const courseDir = path.join(catDir, course);
        const childItems = fs.readdirSync(courseDir).filter(item => {
          return !item.startsWith(".") && item !== "meta.json";
        });

        let courseTitle = course.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        courseTitle = courseTitle.replace(/Gpt2/g, "GPT 2").replace(/Rag/g, "RAG");

        const chapters: string[] = [];
        const flatFiles: string[] = [];

        childItems.forEach(item => {
          const fullPath = path.join(courseDir, item);
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            if (!item.startsWith(".")) chapters.push(item);
          } else if (item.endsWith(".md") || item.endsWith(".mdx")) {
            if (!item.startsWith(".")) flatFiles.push(item.replace(/\.(md|mdx)$/, ""));
          }
        });

        chapters.sort(naturalSort);
        flatFiles.sort(naturalSort);

        const chaptersList: any[] = [];

        // Generate chapter-level meta.json
        chapters.forEach(chapter => {
          const chapterDir = path.join(courseDir, chapter);
          const files = fs.readdirSync(chapterDir).filter(item => {
            return !item.startsWith(".") && (item.endsWith(".md") || item.endsWith(".mdx")) && item !== "meta.json";
          });

          const pages = files.map(f => f.replace(/\.(md|mdx)$/, ""));
          pages.sort(naturalSort);

          const chapterMeta = { pages: pages };
          if (writeIfChanged(path.join(chapterDir, "meta.json"), JSON.stringify(chapterMeta, null, 2))) {
            anyFileUpdated = true;
          }

          chaptersList.push({
            name: chapter,
            children: pages
          });
        });

        // Write course-level meta.json
        const courseMeta = { pages: [...chapters, ...flatFiles] };
        if (writeIfChanged(path.join(courseDir, "meta.json"), JSON.stringify(courseMeta, null, 2))) {
          anyFileUpdated = true;
        }

        courseCatalogList.push({
          id: course,
          title: courseTitle,
          folder: `courses/${cat}/${course}`,
          chapters: chaptersList
        });
      });

      learnCatalog.push({
        id: cat,
        title: catMetaInfo.title,
        badge: catMetaInfo.badge,
        description: catMetaInfo.description,
        courses: courseCatalogList
      });
    });

    // Write dynamically compiled catalog back to learn.json in the project root
    if (writeIfChanged(path.resolve("learn.json"), JSON.stringify({ learn: learnCatalog }, null, 2))) {
      anyFileUpdated = true;
    }

    if (anyFileUpdated) {
      console.log("[Fumadocs Compiler] Updated meta.json and learn.json (structure changed).");
    }
  }
} catch (error) {
  console.error("Error generating meta.json and learn.json from folder structure:", error);
}

export const { docs, meta } = defineDocs({
  dir: "content",
});

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  mdxOptions: {
    remarkPlugins: (v) => [remarkMath, ...v],
    rehypePlugins: (v) => [rehypeKatex, ...v],
    remarkImageOptions: {
      external: false,
      onError: "ignore",
    },
  }
});
