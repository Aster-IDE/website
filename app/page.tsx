import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import CherryBlossom from "@/components/CherryBlossom";
import PronunciationButton from "@/components/PronunciationButton";
import { miscIcons } from "./icons/icons";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export default function Home() {
  return (
    <div className="flex flex-col flex-1 relative">
      <CherryBlossom count={25} />
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center relative z-10">
        <div className="flex items-center gap-3">
          <h1
            className={`${instrumentSerif.className} text-7xl font-[900] tracking-tight text-primary italic sm:text-8xl`}
            style={{ fontWeight: 900 }}
          >
            AsterIDE
          </h1>
          <PronunciationButton />
        </div>
        <p
          className={`${instrumentSerif.className} mt-6 max-w-4xl text-2xl leading-tight font-[800] text-muted-foreground sm:text-3xl`}
          style={{ fontWeight: 800 }}
        >
          <span
            className={`${instrumentSerif.className} text-primary italic sm:whitespace-nowrap`}
            style={{ fontWeight: 900 }}
          >
            A Simple Text Editor
          </span>{" "}
          <span className="sm:whitespace-nowrap">written in </span>
          <span
            className={`${instrumentSerif.className} text-primary italic sm:whitespace-nowrap`}
            style={{ fontWeight: 900 }}
          >
            Rust
          </span>
          .{" "}
          <span className="sm:whitespace-nowrap">
            Built for Simplicity and Ease on the eyes.
          </span>
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-center">
          <Link
            href="/download"
            className="btn-ide btn-ide-pill px-8 py-3 w-full sm:w-auto min-w-[140px] rounded-lg"
          >
            Download
          </Link>
          <Link
            href="https://github.com/Aster-IDE/AsterIDE"
            className="rounded-lg border border-zinc-300 px-8 py-3 font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 w-full sm:w-auto min-w-[140px]"
          >
            GitHub
          </Link>
          <a
            href="https://matrix.to/#/#asteride:matrix.org"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-300 px-8 py-3 font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 w-full sm:w-auto min-w-[140px]"
          >
            Community
          </a>
        </div>
      </section>

      <section className="px-4 py-20 relative z-10">
        <div className="mx-auto max-w-6xl">
          <h2
            className={`${instrumentSerif.className} mb-4 text-center text-5xl font-[900] text-primary not-italic`}
            style={{ fontWeight: 900, fontStyle: "normal" }}
          >
            What Sets Us Apart
          </h2>
          <p className={`${instrumentSerif.className} mb-12 mx-auto max-w-2xl text-center text-xl text-muted-foreground`}>
            A Text Editor that respects both your time and your eyes.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-card/50 p-6 hover:bg-accent/30 transition-colors">
              <div className="mb-3 text-2xl text-[#FF82B4]">{miscIcons.bolt}</div>
              <h3 className="mb-2 font-semibold">Responsive</h3>
              <p className="text-base text-muted-foreground">
                Open files in milliseconds. Edit large files without lag. Your time is valuable.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-6 hover:bg-accent/30 transition-colors">
              <div className="mb-3 text-2xl text-[#FF82B4]">{miscIcons.palette}</div>
              <h3 className="mb-2 font-semibold">Eye Candy</h3>
              <p className="text-base text-muted-foreground">
                Cherry Blossom and Rosé Pine themes designed for long coding sessions. No eye strain, just focus.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-6 hover:bg-accent/30 transition-colors">
              <div className="mb-3 text-2xl text-[#FF82B4]">{miscIcons.desktop}</div>
              <h3 className="mb-2 font-semibold">Cross Platform</h3>
              <p className="text-base text-muted-foreground">
                AsterIDE supports macOS, Windows, FreeBSD, and Nix. Soon coming to Linux.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-6 hover:bg-accent/30 transition-colors">
              <div className="mb-3 text-2xl text-[#FF82B4]">{miscIcons.keyboard}</div>
              <h3 className="mb-2 font-semibold">Optimized</h3>
              <p className="text-base text-muted-foreground">
                Because AsterIDE is made in Rust, it makes it easy to opitimize memory usage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-border/60 bg-accent/35 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2
            className={`${instrumentSerif.className} mb-8 text-center text-5xl font-[900] text-primary not-italic`}
            style={{ fontWeight: 900, fontStyle: "normal" }}
          >
            OUR Philosophy
          </h2>
          <div className="grid gap-6 md:grid-cols-2 items-start">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#553746] flex items-center justify-center text-[#FFEBF5] font-bold text-sm flex-shrink-0 mt-0.5">1</div>
                <div>
                  <h4 className="font-semibold text-base mb-1">Simplicity First, Features Second</h4>
                  <p className="text-sm text-muted-foreground">
                    Every feature must be able to justify its existence. If it doesn&apos;t make editing better or easier, it doesn&apos;t belong.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#553746] flex items-center justify-center text-[#FFEBF5] font-bold text-sm flex-shrink-0 mt-0.5">2</div>
                <div>
                  <h4 className="font-semibold text-base mb-1">Built to Last</h4>
                  <p className="text-sm text-muted-foreground">
                    No telemetry. No forced updates. No Accounts. Just a minimal application built for long term use.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#553746] flex items-center justify-center text-[#FFEBF5] font-bold text-sm flex-shrink-0 mt-0.5">3</div>
                <div>
                  <h4 className="font-semibold text-base mb-1">Easy on the Eyes</h4>
                  <p className="text-sm text-muted-foreground">
                    A Text Editor shouldn&apos;t strain your eyes, when you&apos;re sitting there coding for hours, you don&apos;t want your eyes to hurt, so we made sure that wouldn&apos;t happen.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#553746] flex items-center justify-center text-[#FFEBF5] font-bold text-sm flex-shrink-0 mt-0.5">4</div>
                <div>
                  <h4 className="font-semibold text-base mb-1">Community Driven</h4>
                  <p className="text-sm text-muted-foreground">
                    Because AsterIDE is Open Source, you&apos;re part of the project. The code is Public.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="text-muted-foreground mb-2 text-xs font-mono">What we believe.</div>
              <blockquote className="text-foreground/90 italic text-sm leading-relaxed border-l-4 border-[#FF82B4] pl-3">
                &ldquo;I feel like a text editor should be exactly what it&apos;s name suggests, it doesn&apos;t need to be overcomplicated, it doesn&apos;t need to be filled with all sorts of random features no one will use, it just needs to be able to edit text, and do so without being too difficult.&rdquo;
              </blockquote>
              <div className="mt-3 text-right text-xs text-muted-foreground">
                — The Founder
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 relative z-10">
        <div className="mx-auto max-w-5xl">
          <h2
            className={`${instrumentSerif.className} mb-4 text-center text-5xl font-[900] text-primary not-italic`}
            style={{ fontWeight: 900, fontStyle: "normal" }}
          >
            Coming Soon
          </h2>
          <p className={`${instrumentSerif.className} mb-12 mx-auto max-w-2xl text-center text-xl text-muted-foreground`}>
            The <Link href="/roadmap" className="text-[#FF82B4] hover:underline">roadmap</Link> ahead for AsterIDE
          </p>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card/50 p-6 hover:border-[#553746]/50 transition-colors">
              <h3 className="mb-2 text-lg font-semibold">Source Control Management</h3>
              <p className="text-base text-muted-foreground">
                Built-in{" "}
                <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                  Git
                </a>{" "}
                and{" "}
                <a href="https://www.mercurial-scm.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                  Mercurial
                </a>{" "}
                integration for version control.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-6 hover:border-[#553746]/50 transition-colors">
              <h3 className="mb-2 text-lg font-semibold">Syntax Highlighting</h3>
              <p className="text-base text-muted-foreground">
                Tree-sitter powered highlighting for 30+ programming languages with accurate parsing.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-6 hover:border-[#553746]/50 transition-colors">
              <h3 className="mb-2 text-lg font-semibold">Extensibility</h3>
              <p className="text-base text-muted-foreground">
                Plugin system for themes, language servers, and custom keybindings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-primary/20 bg-primary/8 px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className={`${instrumentSerif.className} mb-4 text-5xl font-[900] text-primary not-italic`}
            style={{ fontWeight: 900, fontStyle: "normal" }}
          >
            Open Source
          </h2>
          <p className={`${instrumentSerif.className} mb-8 text-xl text-muted-foreground`}>
            AsterIDE is and will always be free and open source. Built by the community, for the community.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="https://github.com/Aster-IDE/AsterIDE"
              className="btn-ide btn-ide-pill px-6 py-3"
            >
              Star on GitHub
            </Link>
            <Link
              href="https://github.com/Aster-IDE/AsterIDE/issues"
              className="rounded-full border border-border px-6 py-3 font-medium transition-colors hover:bg-accent/30"
            >
              Report Issues
            </Link>
            <Link
              href="https://github.com/Aster-IDE/AsterIDE/blob/master/CONTRIBUTING.md"
              className="rounded-full border border-border px-6 py-3 font-medium transition-colors hover:bg-accent/30"
            >
              Contribute
            </Link>
          </div>
          <div className="mt-8 flex justify-center gap-8 text-sm text-muted-foreground">
            <div>
              <div className="text-2xl font-bold text-foreground">Rust</div>
              <div>Language</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">egui</div>
              <div>UI Framework</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">GPLv3</div>
              <div>License</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
