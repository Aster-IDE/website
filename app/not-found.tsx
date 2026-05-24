import type { Metadata } from "next";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import CherryBlossom from "@/components/CherryBlossom";
import { FaHome, FaGithub, FaQuestionCircle } from "react-icons/fa";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "AsterIDE::404",
  description: "Sorry, but this page doesn't exist.",
  other: {
    "theme-color": "#c33769",
  },
};

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 relative">
      <CherryBlossom count={25} />
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center relative z-10 min-h-[70vh]">
        <div className="space-y-8 max-w-2xl">
          <div>
            <h1
              className={`${instrumentSerif.className} text-6xl font-[900] tracking-tight text-primary italic sm:text-7xl`}
              style={{ fontWeight: 900 }}
            >
              404
            </h1>
            <h2
              className={`${instrumentSerif.className} mt-4 text-2xl font-[800] text-muted-foreground sm:text-3xl`}
              style={{ fontWeight: 800 }}
            >
              Page Not Found
            </h2>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Oops! The page you&apos;re looking for seems to have vanished.
            <br />
            It&apos;s likely that it was moved, deleted, or never existed in the first place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/"
              className="btn-ide btn-ide-pill px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <FaHome className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/team"
              className="rounded-lg border border-zinc-300 px-6 py-3 font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 flex items-center gap-2"
            >
              Meet the Team
            </Link>
            <Link
              href="https://github.com/Aster-IDE/AsterIDE"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-zinc-300 px-6 py-3 font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 flex items-center gap-2"
            >
              <FaGithub className="w-4 h-4" />
              GitHub
            </Link>
          </div>

          <div className="mt-8 p-6 bg-accent/30 rounded-lg border border-border">
            <div className="flex items-center justify-center gap-3 text-muted-foreground mb-3">
              <FaQuestionCircle className="text-[#FF82B4]" />
              <span className="font-semibold">Looking for something specific?</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Check out our <Link href="/download" className="text-primary hover:underline">downloads</Link> page</p>
              <p>Read our <Link href="/faq" className="text-primary hover:underline">FAQ</Link> for common questions</p>
              <p>Browse the <Link href="/team" className="text-primary hover:underline">team</Link> to meet the contributors</p>
              <p>Visit our <Link href="https://docs.asteride.dev" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">documentation</Link> for detailed guides</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
