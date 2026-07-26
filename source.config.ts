import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import fs from "fs";
import path from "path";

// Helper to recursively find the relative path of a document inside a course directory
function resolveRelativePath(courseDir: string, childName: string): string | null {
  function search(dir: string): string | null {
    if (!fs.existsSync(dir)) return null;
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const found = search(fullPath);
        if (found) return found;
      } else if (item.endsWith(".md") || item.endsWith(".mdx")) {
        const baseName = item.replace(/\.(md|mdx)$/, "");
        if (baseName === childName) {
          return path.relative(courseDir, fullPath)
            .replace(/\.(md|mdx)$/, "")
            .replace(/\\/g, "/");
        }
      }
    }
    return null;
  }
  return search(courseDir);
}

// Dynamically generate meta.json files based on learn.json to maintain a single source of truth
try {
  const learnJsonPath = path.resolve("learn.json");
  if (fs.existsSync(learnJsonPath)) {
    const catalog = JSON.parse(fs.readFileSync(learnJsonPath, "utf8"));
    const contentDir = path.resolve("content");

    // 1. Generate content/meta.json
    const rootMeta = {
      pages: ["courses"]
    };
    fs.writeFileSync(path.join(contentDir, "meta.json"), JSON.stringify(rootMeta, null, 2));

    // 2. Generate content/courses/meta.json
    const coursesMeta = {
      pages: catalog.learn.map((cat: any) => cat.id)
    };
    const coursesDir = path.join(contentDir, "courses");
    if (!fs.existsSync(coursesDir)) fs.mkdirSync(coursesDir, { recursive: true });
    fs.writeFileSync(path.join(coursesDir, "meta.json"), JSON.stringify(coursesMeta, null, 2));

    // 3. Loop categories
    catalog.learn.forEach((cat: any) => {
      const catDir = path.join(contentDir, "courses", cat.id);
      if (!fs.existsSync(catDir)) {
        fs.mkdirSync(catDir, { recursive: true });
      }

      const catMeta = {
        title: cat.title,
        pages: cat.courses ? cat.courses.map((c: any) => c.id) : []
      };
      fs.writeFileSync(path.join(catDir, "meta.json"), JSON.stringify(catMeta, null, 2));

      // 4. Loop courses
      if (cat.courses) {
        cat.courses.forEach((course: any) => {
          const courseDir = path.join(contentDir, course.folder);
          if (!fs.existsSync(courseDir)) {
            fs.mkdirSync(courseDir, { recursive: true });
          }

          // We will build the pages list for the course meta.json (the chapter folder names)
          const coursePages: string[] = [];

          course.chapters.forEach((chapter: any) => {
            if (!chapter.children || chapter.children.length === 0) return;

            // Find the folder name on disk for this chapter by checking its first child
            const firstChild = chapter.children[0];
            const resolvedPath = resolveRelativePath(courseDir, firstChild);
            if (!resolvedPath) return;

            const pathParts = resolvedPath.split("/");
            if (pathParts.length > 1) {
              const chapterFolderName = pathParts[0]; // e.g. "Chapter 1- Input Processing & Tokenization"
              if (!coursePages.includes(chapterFolderName)) {
                coursePages.push(chapterFolderName);
              }

              // Now generate the meta.json inside the chapter folder listing its children filenames
              const chapterDir = path.join(courseDir, chapterFolderName);
              const chapterPages = chapter.children.map((child: string) => {
                const childPath = resolveRelativePath(courseDir, child);
                if (childPath) {
                  // Pages inside chapter meta.json are relative to the chapter folder, so just the filename
                  return childPath.split("/").pop() || child;
                }
                return child;
              });

              const chapterMeta = {
                title: chapter.name,
                pages: chapterPages
              };
              fs.writeFileSync(path.join(chapterDir, "meta.json"), JSON.stringify(chapterMeta, null, 2));
            } else {
              // If there is no subdirectory (files are flat), add the file directly to coursePages
              const childFilename = pathParts[0];
              coursePages.push(childFilename);
            }
          });

          // Write course-level meta.json
          const courseMeta = {
            title: course.title,
            pages: coursePages
          };
          fs.writeFileSync(path.join(courseDir, "meta.json"), JSON.stringify(courseMeta, null, 2));
        });
      }
    });
    console.log("[Fumadocs Compiler] Successfully generated meta.json configurations from learn.json!");
  }
} catch (error) {
  console.error("Error generating meta.json from learn.json:", error);
}

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export const { docs, meta } = defineDocs({
  dir: "content",
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  }
});
