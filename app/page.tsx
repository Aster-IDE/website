import Link from "next/link";
import CherryBlossom from "@/components/CherryBlossom";
import PronunciationButton from "@/components/PronunciationButton";
import { FaBolt, FaPalette, FaDesktop, FaKeyboard } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 relative">
      <CherryBlossom count={25} />
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center relative z-10">
        <div className="flex items-center gap-3">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            AsterIDE
          </h1>
          <PronunciationButton />
        </div>
        <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          A Simple Text Editor written in Rust.
          Built for Simplicity and Ease on the eyes.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/download"
            className="btn-ide btn-ide-pill px-6 py-3"
          >
            Download
          </Link>
          <Link
            href="https://github.com/Aster-IDE/AsterIDE"
            className="rounded-full border border-zinc-300 px-6 py-3 font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            GitHub
          </Link>
        </div>
      </section>

      <section className="px-4 py-20 relative z-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center text-3xl font-semibold">Features</h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            Built with performance and developer experience in mind
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-card/50 p-6 hover:bg-accent/30 transition-colors">
              <div className="mb-3 text-2xl text-[#FF82B4]"><FaBolt /></div>
              <h3 className="mb-2 font-semibold">Blazing Fast</h3>
              <p className="text-sm text-muted-foreground">
                Native performance thanks to Rust. Instant file loading and smooth editing even with large files.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-6 hover:bg-accent/30 transition-colors">
              <div className="mb-3 text-2xl text-[#FF82B4]"><FaPalette /></div>
              <h3 className="mb-2 font-semibold">Beautiful Themes</h3>
              <p className="text-sm text-muted-foreground">
                Cherry Blossom inspired default theme, with other themes coming slowly, and soon support for OpenCSS.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-6 hover:bg-accent/30 transition-colors">
              <div className="mb-3 text-2xl text-[#FF82B4]"><FaDesktop /></div>
              <h3 className="mb-2 font-semibold">Cross Platform</h3>
              <p className="text-sm text-muted-foreground">
                Available for macOS, Windows, Nix, and coming to Linux soon.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-6 hover:bg-accent/30 transition-colors">
              <div className="mb-3 text-2xl text-[#FF82B4]"><FaKeyboard /></div>
              <h3 className="mb-2 font-semibold">Vim-like Bindings</h3>
              <p className="text-sm text-muted-foreground">
                Familiar modal editing support with customizable keybindings for your workflow in the works.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 relative z-10 bg-accent/20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-semibold">Why Rust?</h2>
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#553746] flex items-center justify-center text-[#FFEBF5] font-bold text-sm">1</div>
                <div>
                  <h4 className="font-semibold">Memory Safety</h4>
                  <p className="text-sm text-muted-foreground">Zero-cost abstractions with compile-time memory safety guarantees.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#553746] flex items-center justify-center text-[#FFEBF5] font-bold text-sm">2</div>
                <div>
                  <h4 className="font-semibold">Zero-Cost Abstractions</h4>
                  <p className="text-sm text-muted-foreground">High-level ergonomics with the performance of hand-written C.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#553746] flex items-center justify-center text-[#FFEBF5] font-bold text-sm">3</div>
                <div>
                  <h4 className="font-semibold">Fearless Concurrency</h4>
                  <p className="text-sm text-muted-foreground">Parallel processing made safe and easy with the borrow checker.</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 font-mono text-sm">
              <div className="text-muted-foreground mb-2">{"// Rust in action"}</div>
              <pre className="text-foreground/90">
{`fn main() {
    println!("Hello, AsterIDE!");
    
    // Memory safe by default
    let text = String::from("Edit freely");
    println!("{}", text);
    
    // Zero-cost abstractions
    let lines: Vec<&str> = text
        .lines()
        .filter(|l| !l.is_empty())
        .collect();
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 relative z-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-3xl font-semibold">Coming Soon</h2>
          <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
            The <Link href="/roadmap" className="text-[#FF82B4] hover:underline">roadmap</Link> ahead for AsterIDE
          </p>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card/50 p-6 hover:border-[#553746]/50 transition-colors">
              <h3 className="mb-2 text-lg font-semibold">Source Control Management</h3>
              <p className="text-sm text-muted-foreground">
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
              <p className="text-sm text-muted-foreground">
                Tree-sitter powered highlighting for 30+ programming languages with accurate parsing.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-6 hover:border-[#553746]/50 transition-colors">
              <h3 className="mb-2 text-lg font-semibold">Extensibility</h3>
              <p className="text-sm text-muted-foreground">
                Plugin system for themes, language servers, and custom keybindings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 relative z-10 bg-accent/20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-semibold">Open Source</h2>
          <p className="mb-8 text-muted-foreground">
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

