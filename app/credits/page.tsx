import type { Metadata } from "next";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import creditsData from "./credits.json";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "AsterIDE::Credits",
 description: "Credits to the Developers of AsterIDE and it's Products.",
  other: {
    "theme-color": "#c33769",
  },
};

interface Contributor {
  github: string;
  role: string;
  contributions: string[];
  founder?: boolean;
}

interface Project {
  name: string;
  description: string;
  contributors: Contributor[];
  repo?: string;
  website?: string;
  source?: string;
}

export default function CreditsPage() {
  const { projects } = creditsData;

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

          <h1
            className={`${instrumentSerif.className} text-5xl font-[900] tracking-tight text-primary italic mb-4 sm:text-6xl`}
            style={{ fontWeight: 900 }}
          >
            Credits
          </h1>
          <p className={`${instrumentSerif.className} mb-12 text-xl text-muted-foreground`}>
            The people behind AsterIDE and its ecosystem.
          </p>

          <div className="space-y-12">
            {projects.map((project: Project) => (
              <section key={project.name}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                  {project.website ? (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${instrumentSerif.className} text-lg font-[900] uppercase tracking-wider text-foreground/95 hover:text-primary transition-colors`}
                    >
                      {project.name}
                    </a>
                  ) : project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${instrumentSerif.className} text-lg font-[900] uppercase tracking-wider text-foreground/95 hover:text-primary transition-colors`}
                    >
                      {project.name}
                    </a>
                  ) : (
                    <h2 className={`${instrumentSerif.className} text-lg font-[900] uppercase tracking-wider text-foreground/95`}>
                      {project.name}
                    </h2>
                  )}
                  {project.source && (
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono uppercase tracking-[0.09em] text-muted-foreground hover:text-primary transition-colors"
                    >
                      (source)
                    </a>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mb-6">
                  {project.description}
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {project.contributors.map((contributor: Contributor, i: number) => (
                    <a
                      key={i}
                      href={`https://github.com/${contributor.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 rounded-xl border border-border bg-card/50 p-4 transition-all hover:border-primary/30 hover:bg-accent/20"
                    >
                      <Image
                        src={`https://github.com/${contributor.github}.png`}
                        alt={`@${contributor.github}`}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full ring-2 ring-border group-hover:ring-primary/30 transition-all flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground truncate">
                            {contributor.github}
                          </span>
                          {contributor.founder && (
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                              Founder
                            </span>
                          )}
                          <FaGithub size={14} className="text-muted-foreground flex-shrink-0" />
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{contributor.role}</p>
                        <div className="text-xs text-muted-foreground space-y-1">
                          {contributor.contributions.map((contribution: string, j: number) => (
                            <span key={j} className="block">• {contribution}</span>
                          ))}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              Wanna see your name here?{" "}
              <a
                href="https://github.com/Aster-IDE/AsterIDE/blob/master/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Contribute to AsterIDE
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
