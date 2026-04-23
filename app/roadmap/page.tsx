import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getRoadmapContent() {
  try {
    const response = await fetch(
      "https://github.com/Aster-IDE/AsterIDE/blob/master/ROADMAP.md",
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

function formatMarkdown(content: string): string {
  return content
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mt-8 mb-4 text-[#FF82B4]">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-6">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-accent/50 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#FF82B4] hover:underline">$1</a>')
    .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="mb-4">$&</ul>')
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^(?!<[hlu])(.*$)/gim, '<p class="mb-4">$1</p>');
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
            <h1 className="text-4xl font-bold">Roadmap</h1>
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
              <div
                className="prose prose-invert max-w-none prose-headings:font-semibold prose-a:text-[#FF82B4] hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
              />
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
              className="inline-flex items-center gap-2 rounded-full bg-[#553746] px-6 py-3 text-[#FFEBF5] font-medium transition-colors hover:brightness-95"
            >
              Download AsterIDE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
