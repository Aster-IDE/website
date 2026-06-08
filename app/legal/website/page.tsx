import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import Link from "next/link";
import CherryBlossom from "@/components/CherryBlossom";
import { FaScroll, FaShieldAlt, FaFileContract, FaLock } from "react-icons/fa";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "AsterIDE::Legal - Website",
  description: "Legal information for asteride.dev website.",
  other: {
    "theme-color": "#c33769",
  },
};

export default function WebsiteLegal() {
  return (
    <div className="flex flex-col flex-1 relative">
      <CherryBlossom count={20} />
      <section className="px-4 py-16 md:py-20 relative z-10 bg-accent/20">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/legal"
            className="text-sm text-muted-foreground hover:text-primary transition-colors mb-6 inline-block"
          >
            ← Back to Legal
          </Link>
          <h1
            className={`${instrumentSerif.className} mb-4 text-5xl md:text-6xl font-[900] text-primary not-italic`}
            style={{ fontWeight: 900, fontStyle: "normal" }}
          >
            ASTERIDE.DEV
          </h1>
          <p className={`${instrumentSerif.className} mb-12 text-xl text-muted-foreground`}>
            Legal information for the asteride.dev website
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <Link
              href="/legal/website/terms"
              className="group rounded-2xl border border-border bg-card p-8 hover:border-[#FF82B4]/50 hover:bg-accent/40 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl text-[#FF82B4]"><FaScroll /></div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">Terms of Service</h2>
                  <p className="text-muted-foreground">
                    Terms for using the asteride.dev website
                  </p>
                </div>
              </div>
            </Link>
            <Link
              href="/legal/website/privacy"
              className="group rounded-2xl border border-border bg-card p-8 hover:border-[#FF82B4]/50 hover:bg-accent/40 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl text-[#FF82B4]"><FaShieldAlt /></div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">Privacy Policy</h2>
                  <p className="text-muted-foreground">
                    How we handle your data on the website
                  </p>
                </div>
              </div>
            </Link>
            <Link
              href="/legal/website/license"
              className="group rounded-2xl border border-border bg-card p-8 hover:border-[#FF82B4]/50 hover:bg-accent/40 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl text-[#FF82B4]"><FaFileContract /></div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">License</h2>
                  <p className="text-muted-foreground">
                    License for the website code
                  </p>
                </div>
              </div>
            </Link>
            <Link
              href="/legal/website/security"
              className="group rounded-2xl border border-border bg-card p-8 hover:border-[#FF82B4]/50 hover:bg-accent/40 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl text-[#FF82B4]"><FaLock /></div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">Security</h2>
                  <p className="text-muted-foreground">
                    Security practices and policies
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
