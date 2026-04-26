import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Instrument_Serif } from "next/font/google";  

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getRoadmapContent() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Aster-IDE/AsterIDE/dev/ROADMAP.md",
      { cache: "no-store" }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch roadmap");
    }
    return await response.text();
  } catch {
    return null;
  }
}


export default async function RoadmapPage() {
  const content = await getRoadmapContent();

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Home
            </Link>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h1 className={`${instrumentSerif.className} text-7xl font-[900] tracking-tight text-primary italic sm:text-8xl`}>Roadmap</h1>
            <a
              href="https://github.com/Aster-IDE/AsterIDE/blob/dev/ROADMAP.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaGithub />
              View on GitHub
            </a>
          </div>

          <p className="text-muted-foreground mb-8">
            Our plans and goals for AsterIDE development. This document is frequently synced from our GitHub repository.
          </p>

          <div className="border border-border rounded-xl bg-card/50 p-8">
            {content ? (
              <MarkdownRenderer content={content} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Failed to load roadmap content. Please check the{" "}
                  <a
                    href="https://github.com/Aster-IDE/AsterIDE/blob/dev/ROADMAP.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF82B4] hover:underline"
                  >
                    GitHub repository
                  </a>{" "}
                  directly.
                </p>
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/download"
              className="btn-ide btn-ide-pill inline-flex items-center gap-2 px-6 py-3"
            >
              Download AsterIDE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
