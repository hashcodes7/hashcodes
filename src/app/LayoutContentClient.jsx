"use client";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Load ParticlesBackground dynamically on the client side only
const ParticlesBackground = dynamic(
  () => import("@/components/ParticlesBackground"),
  { ssr: false }
);

export default function LayoutContentClient({ children }) {
  const pathname = usePathname() || "/";
  const isAboutPage = pathname === "/";
  
  // Hide main portfolio navbar and footer on individual chapters/docs paths under /learn/
  const isInsideLearningChapter = pathname.startsWith("/learn/") && pathname.replace(/\/$/, "").split("/").length >= 3;

  return (
    <>
      {!isAboutPage && !isInsideLearningChapter && <ParticlesBackground />}
      <Navbar />
      {children}
      {!isAboutPage && !isInsideLearningChapter && <Footer />}
    </>
  );
}
