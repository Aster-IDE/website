import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import Link from "next/link";
import CherryBlossom from "@/components/CherryBlossom";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "AsterIDE::Legal - Website License",
  description: "License for asteride.dev website.",
  other: {
    "theme-color": "#c33769",
  },
};

export default function WebsiteLicense() {
  return (
    <div className="flex flex-col flex-1 relative">
      <CherryBlossom count={20} />
      <section className="px-4 py-16 md:py-20 relative z-10">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/legal/website"
            className="text-sm text-muted-foreground hover:text-primary transition-colors mb-6 inline-block"
          >
            ← Back to Website Legal
          </Link>
          <h1
            className={`${instrumentSerif.className} mb-4 text-5xl font-[900] text-primary not-italic`}
            style={{ fontWeight: 900, fontStyle: "normal" }}
          >
            Website License
          </h1>
          <p className={`${instrumentSerif.className} mb-12 text-xl text-muted-foreground`}>
            Page last updated: June 7, 2026 21:07 CDT
          </p>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mb-4">License</h2>
            <p className="text-muted-foreground mb-6">
              The asteride.dev website source code is licensed under the Apache License. You are free to use, modify, and distribute the code for any purpose.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">Source Code</h2>
            <p className="text-muted-foreground mb-6">
              The source code for this website is available on GitHub at{" "}
              <a href="https://github.com/Aster-IDE/website" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                github.com/Aster-IDE/website
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">Permissions</h2>
            <p className="text-muted-foreground mb-6">
              Under the Apache License, you have the freedom to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Use the code for commercial purposes</li>
              <li>Modify the code</li>
              <li>Distribute the code</li>
              <li>Sublicense the code</li>
              <li>Use the code privately</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mb-4">Conditions</h2>
            <p className="text-muted-foreground mb-6">
              The Apache License requires that you include the original copyright and license notice in any copies or substantial portions of the software, and state any significant changes made to the files.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">Disclaimer</h2>
            <p className="text-muted-foreground mb-6">
              The software is provided &ldquo;as is&rdquo;, without warranty of any kind, express or implied.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact</h2>
            <p className="text-muted-foreground mb-6">
              If you have any questions about the website license, please contact us through our{" "}
              <a href="https://github.com/Aster-IDE/AsterIDE/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                GitHub issues
              </a>
              {" "}or join our{" "}
              <a href="https://discord.gg/C4d2khr8dC" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Discord community
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
