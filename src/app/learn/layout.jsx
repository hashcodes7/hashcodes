"use client";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import { usePathname } from "next/navigation";

// Helper to recursively find the deepest folder node that matches the current pathname
function findCourseNode(nodes, currentPath) {
  if (!nodes) return null;
  const pathWithoutLearn = decodeURIComponent(currentPath)
    .replace(/^\/learn\/?/, "")
    .replace(/\/$/, "")
    .toLowerCase();

  for (const node of nodes) {
    if (node.type === "folder") {
      const folderPath = (node.$id || (node.$ref && node.$ref.folder) || "")
        .replace(/\/$/, "")
        .toLowerCase();

      if (folderPath && (pathWithoutLearn === folderPath || pathWithoutLearn.startsWith(folderPath + "/"))) {
        const childMatch = findCourseNode(node.children, currentPath);
        return childMatch || node;
      }
    }
  }
  return null;
}

export default function LearnLayout({ children }) {
  const pathname = usePathname() || "";
  const isLanding = pathname === "/learn" || pathname === "/learn/";

  if (isLanding) {
    return <>{children}</>;
  }

  // Filter the tree to display only the selected course's pages on the sidebar
  const courseNode = findCourseNode(source.pageTree.children, pathname);
  const filteredTree = courseNode ? { ...source.pageTree, children: courseNode.children } : source.pageTree;
  const navTitle = courseNode ? courseNode.name : "Verma's AI Notebooks";

  return (
    <DocsLayout tree={filteredTree} nav={{ title: navTitle }}>
      {children}
    </DocsLayout>
  );
}
