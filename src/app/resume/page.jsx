import Experience from "@/components/Experience";
import Education from "@/components/Education";

export const metadata = {
  title: "Resume | Harsh Portfolio",
  description: "Work history, professional experience, and educational background.",
};

export default function Resume() {
  return (
    <div
      style={{
        paddingTop: "6rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Experience />
      <Education />
    </div>
  );
}
