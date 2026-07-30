import LayoutContentClient from "./LayoutContentClient";
import { FumadocsProvider } from "./FumadocsProvider";
import "katex/dist/katex.min.css";
import "fumadocs-ui/style.css";
import "../index.css";
import "../App.css";

export const metadata = {
  title: "Harsh Portfolio",
  description: "Technical portfolio showcasing artificial intelligence engineering, RAG, and WebGL architectures.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <FumadocsProvider>
          <LayoutContentClient>
            <main style={{ minHeight: "82vh" }}>{children}</main>
          </LayoutContentClient>
        </FumadocsProvider>
      </body>
    </html>
  );
}
