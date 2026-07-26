import { source } from "@/lib/source";
import { notFound, redirect } from "next/navigation";
import { DocsPage, DocsBody } from "fumadocs-ui/page";

// Import our custom visualizers and markdown helpers
import Callout from "@/components/Callout";
import CausalMaskVisualizer from "@/components/CausalMaskVisualizer";
import GeluVisualizer from "@/components/GeluVisualizer";
import SoftmaxVisualizer from "@/components/SoftmaxVisualizer";
import MatrixMultiplicationVisualizer from "@/components/MatrixMultiplicationVisualizer";
import ReluVisualizer from "@/components/ReluVisualizer";
import TocProgressBar from "@/components/TocProgressBar";

import defaultMdxComponents from "fumadocs-ui/mdx";

const customComponents = {
  ...defaultMdxComponents,
  Callout,
  CausalMaskVisualizer,
  GeluVisualizer,
  SoftmaxVisualizer,
  MatrixMultiplicationVisualizer,
  ReluVisualizer,
};

// Recursively decode a URI component until it's fully decoded to clean raw text
function fullyDecode(str) {
  if (!str) return "";
  let decoded = str;
  while (decoded.includes("%")) {
    const prev = decoded;
    try {
      decoded = decodeURIComponent(decoded);
    } catch (e) {
      break;
    }
    if (decoded === prev) break;
  }
  return decoded;
}

// Find any page by comparing fully decoded slug arrays
function findPageByDecodedSlug(pages, targetSlug) {
  const targetDecoded = targetSlug.map(s => fullyDecode(s).toLowerCase()).join("/");
  for (const page of pages) {
    if (page.slugs) {
      const pageDecoded = page.slugs.map(s => fullyDecode(s).toLowerCase()).join("/");
      if (pageDecoded === targetDecoded) {
        return page;
      }
    }
  }
  return null;
}

// Recursively find a folder node matching the target slug
function findFolderNodeBySlug(nodes, slug) {
  if (!nodes) return null;
  const targetPath = slug.map(s => fullyDecode(s).toLowerCase()).join("/");
  for (const node of nodes) {
    if (node.type === "folder") {
      const folderPath = (node.$id || (node.$ref && node.$ref.folder) || "")
        .split("/")
        .map(s => fullyDecode(s).toLowerCase())
        .join("/");
      
      if (folderPath === targetPath) {
        return node;
      }
      const childMatch = findFolderNodeBySlug(node.children, slug);
      if (childMatch) return childMatch;
    }
  }
  return null;
}

// Find any page node in the tree whose URL ends with the target slug segment (for flat URL fallback)
function findPageBySlug(nodes, slugSegment) {
  if (!nodes) return null;
  const decodedSegment = fullyDecode(slugSegment).toLowerCase();
  for (const node of nodes) {
    if (node.type === "page" && node.url) {
      const pageName = fullyDecode(node.url.split("/").pop() || "").toLowerCase();
      if (pageName === decodedSegment) {
        return node;
      }
    }
    if (node.type === "folder") {
      const match = findPageBySlug(node.children, slugSegment);
      if (match) return match;
    }
  }
  return null;
}

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

export default async function LearnPage(props) {
  const params = await props.params;
  
  if (!params.slug || params.slug.length === 0) {
    notFound();
  }

  // 1. Try standard lookup
  let page = source.getPage(params.slug);
  
  // 2. Fallback to decoded slug matching to handle encoding/double-encoding discrepancies
  if (!page) {
    page = findPageByDecodedSlug(source.getPages(), params.slug);
  }

  if (!page) {
    // 3. Check if it's a folder path (e.g. course root `/learn/courses/ai/rag-architecture`),
    // find the folder node matching the slug and redirect to its first child page
    const node = findFolderNodeBySlug(source.pageTree.children, params.slug);
    if (node) {
      const firstPage = findFirstPage(node.children);
      if (firstPage && firstPage.url) {
        redirect(firstPage.url);
      }
    }

    // 4. Check if it's a legacy flat URL (e.g. `/learn/courses/ai/rag-architecture/Chapter 0 Index & Architecture Blueprint`),
    // search for the page node by its last segment and redirect to the new nested path
    if (params.slug.length > 0) {
      const lastSegment = params.slug[params.slug.length - 1];
      const foundPage = findPageBySlug(source.pageTree.children, lastSegment);
      if (foundPage && foundPage.url) {
        const currentRequestUrl = "/learn/" + params.slug.map(s => encodeURIComponent(s)).join("/");
        const decodedCurrent = fullyDecode(currentRequestUrl).toLowerCase();
        const decodedTarget = fullyDecode(foundPage.url).toLowerCase();
        if (decodedCurrent !== decodedTarget) {
          redirect(foundPage.url);
        }
      }
    }

    notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      breadcrumb={{ enabled: false }}
      tableOfContent={{ header: <TocProgressBar /> }}
    >
      <DocsBody>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, marginTop: "4rem", marginBottom: "2rem", textAlign: "center" }}>
          {page.data.title}
        </h1>
        <MDX components={customComponents} />
      </DocsBody>
    </DocsPage>
  );
}

import catalog from "../../../../learn.json";

export async function generateStaticParams() {
  const params = source.generateParams();
  
  // Also include the folder paths from the catalog so Next.js statically generates the redirect pages for course roots!
  catalog.learn.forEach(category => {
    category.courses.forEach(course => {
      const folderSlug = course.folder.split('/').filter(Boolean);
      params.push({ slug: folderSlug });
    });
  });
  
  return params;
}

export async function generateMetadata(props) {
  const params = await props.params;
  if (!params.slug || params.slug.length === 0) return {};
  
  // Try standard page lookup, then decoded lookup for metadata
  let page = source.getPage(params.slug);
  if (!page) {
    page = findPageByDecodedSlug(source.getPages(), params.slug);
  }
  
  if (!page) return {};
  
  return {
    title: `${page.data.title} | Verma's AI Notebooks`,
    description: page.data.description,
  };
}
