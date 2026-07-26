"use client";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { source } from "@/lib/source";
import { usePathname } from "next/navigation";
import { useMemo } from "react";



export default function LearnLayout({ children }) {
  const pathname = usePathname() || "";
  const isLanding = pathname === "/learn" || pathname === "/learn/";

  // Memoize tree computation so it only re-runs when pathname changes
  const { filteredTree, navTitle } = useMemo(() => {
    // Find the course-level node to display the course name and populate the sidebar with the entire course structure
    let rootCourseNode = null;
    const pathWithoutLearn = decodeURIComponent(pathname)
      .replace(/^\/learn\/?/, "")
      .replace(/\/$/, "")
      .toLowerCase();

    function findCourseLevelNode(nodes) {
      if (!nodes) return null;
      for (const node of nodes) {
        if (node.type === "folder") {
          const folderPath = (node.$id || (node.$ref && node.$ref.folder) || "").replace(/\/$/, "").toLowerCase();
          
          if (folderPath && (pathWithoutLearn === folderPath || pathWithoutLearn.startsWith(folderPath + "/"))) {
            // Courses are stored at depth 3 (e.g., courses/ai/gpt2-architecture-end-to-end)
            if (folderPath.split('/').length === 3) {
              return node;
            }
            // Keep digging
            const childMatch = findCourseLevelNode(node.children);
            if (childMatch) return childMatch;
          }
        }
      }
      return null;
    }

    rootCourseNode = findCourseLevelNode(source.pageTree.children);
    const titleText = rootCourseNode ? rootCourseNode.name : "AI Notebooks";

    return {
      filteredTree: rootCourseNode
        ? { ...source.pageTree, children: rootCourseNode.children }
        : source.pageTree,
      navTitle: <span style={{ color: "#38bdf8", fontWeight: 700 }}>{titleText}</span>,
    };
  }, [pathname]);

  if (isLanding) {
    return <>{children}</>;
  }

  return (
    <DocsLayout tree={filteredTree} nav={{ title: navTitle }}>
      {children}
    </DocsLayout>
  );
}
