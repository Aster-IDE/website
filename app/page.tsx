import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          AsterIDE
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          A Simple Text Editor written in Rust.
          Built for Simplicity and Ease on the eyes.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/download"
            className="rounded-full bg-foreground px-6 py-3 text-background font-medium transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-200"
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

      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-semibold">Coming Soon</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="mb-2 text-lg font-semibold">Source Control Management</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Future plans are to implement both{" "}
                <a
                  href="https://git-scm.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Git
                </a>
                , and{" "}
                <a
                  href="https://www.mercurial-scm.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Mercurial
                </a>{" "}
                support for SCM.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="mb-2 text-lg font-semibold">Syntax Highlighting</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Planned support for 30+ programming languages with accurate highlighting.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="mb-2 text-lg font-semibold">Extensibility</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Themes, plugins, and keybindings for users who like customizing to the fullest.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
