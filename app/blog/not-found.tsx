import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import CherryBlossom from "@/components/CherryBlossom";
import { FaExternalLinkAlt, FaHome, FaRss } from "react-icons/fa";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export default function BlogNotFound() {
  return (
    <div className="flex flex-col flex-1 relative">
      <CherryBlossom count={25} />
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center relative z-10 min-h-[70vh]">
        <div className="space-y-8 max-w-2xl">
          <div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaRss className="text-4xl text-[#FF82B4]" />
              <h1
                className={`${instrumentSerif.className} text-6xl font-[900] tracking-tight text-primary italic sm:text-7xl`}
                style={{ fontWeight: 900 }}
              >
                Blog
              </h1>
            </div>
            <h2
              className={`${instrumentSerif.className} text-2xl font-[800] text-muted-foreground sm:text-3xl`}
              style={{ fontWeight: 800 }}
            >
              Located on Subdomain
            </h2>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            The AsterIDE blog is hosted on its own dedicated subdomain for better organization and performance.
            <br />
            You can find all our blog posts at <strong>blog.asteride.dev</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="https://blog.asteride.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ide btn-ide-pill px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
              Visit Blog
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-zinc-300 px-6 py-3 font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 flex items-center gap-2"
            >
              <FaHome className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          <div className="mt-8 p-6 bg-accent/30 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold text-foreground mb-3">Why a separate domain?</p>
              <p>Better performance for blog content and faster loading</p>
              <p>Dedicated space focused purely on articles and updates</p>
              <p>Improved SEO for blog posts and better discoverability</p>
              <p>Convenience for management and maintenance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
