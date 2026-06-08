import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import Link from "next/link";
import CherryBlossom from "@/components/CherryBlossom";
import { FaGlobe, FaCode } from "react-icons/fa";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "AsterIDE::Legal",
  description: "Legal information for AsterIDE.",
  other: {
    "theme-color": "#c33769",
  },
};

export default function Legal() {
  return (
    <div className="flex flex-col flex-1 relative">
      <CherryBlossom count={20} />
      <section className="px-4 py-16 md:py-20 relative z-10 bg-accent/20">
        <div className="mx-auto max-w-5xl">
          <h1
            className={`${instrumentSerif.className} mb-4 text-center text-5xl md:text-6xl font-[900] text-primary not-italic`}
            style={{ fontWeight: 900, fontStyle: "normal" }}
          >
            Legal
          </h1>
          <p className={`${instrumentSerif.className} mb-12 mx-auto max-w-2xl text-center text-xl text-muted-foreground`}>
            Legal information and policies for AsterIDE.
          </p>
          
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <Link
              href="/legal/website"
              className="group rounded-2xl border border-border bg-card p-10 hover:border-[#FF82B4]/50 hover:bg-accent/40 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="text-5xl text-[#FF82B4]"><FaGlobe /></div>
                <div>
                  <h2 className="text-3xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">ASTERIDE.DEV</h2>
                  <p className="text-muted-foreground">
                    Legal information for the website
                  </p>
                </div>
              </div>
            </Link>
            <Link
              href="/legal/app"
              className="group rounded-2xl border border-border bg-card p-10 hover:border-[#FF82B4]/50 hover:bg-accent/40 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="text-5xl text-[#FF82B4]"><FaCode /></div>
                <div>
                  <h2 className="text-3xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">ASTERIDE</h2>
                  <p className="text-muted-foreground">
                    Legal information for the application
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
