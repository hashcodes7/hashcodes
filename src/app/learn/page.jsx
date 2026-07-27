import LearnLandingClient from "./[...slug]/LearnLandingClient";
import catalogRaw from "../../../learn.json";
import { source } from "@/lib/source";

// Recursively find the first page node in a subtree
function findFirstPage(nodes) {
  if (!nodes) return null;
  for (const node of nodes) {
    if (node.type === "page") {
      return node;
    }
    if (node.type === "folder") {
      const p = findFirstPage(node.children);
      if (p) return p;
    }
  }
  return null;
}

export default function LearnLandingPage() {
  // Deep clone catalog to safely mutate it
  const catalog = JSON.parse(JSON.stringify(catalogRaw));
  catalog.learn = (catalog.learn || []).filter(category => !category.id.startsWith("."));
  
  // Replace the raw folder paths with the actual statically generated first-page URLs
  catalog.learn.forEach(category => {
    category.courses.forEach(course => {
      // Find the folder node in Fumadocs source tree
      const coursePathName = course.folder.split('/').pop().toLowerCase(); // e.g., "gpt2-architecture-end-to-end"
      
      const findNode = (nodes) => {
        for (const node of nodes) {
          if (node.type === "folder") {
            const folderName = (node.$id || (node.$ref && node.$ref.folder) || "").split('/').pop().toLowerCase();
            if (folderName === coursePathName) return node;
            const childMatch = findNode(node.children);
            if (childMatch) return childMatch;
          }
        }
        return null;
      };
      
      const courseNode = findNode(source.pageTree.children);
      if (courseNode) {
        const firstPage = findFirstPage(courseNode.children);
        if (firstPage && firstPage.url) {
          // Store the exact URL resolved by Fumadocs
          course.resolvedUrl = firstPage.url;
        }
      }
    });
  });

  return <LearnLandingClient catalog={catalog} />;
}

export const metadata = {
  title: "Verma's AI Notebooks | Learn & Explore",
  description: "Interactive notebooks on AI engineering, LLMs, computer vision, systems architecture, and core algorithms.",
};
