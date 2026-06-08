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
  title: "AsterIDE::Legal - App Terms",
  description: "Terms of Service for AsterIDE application.",
  other: {
    "theme-color": "#c33769",
  },
};

export default function AppTerms() {
  return (
    <div className="flex flex-col flex-1 relative">
      <CherryBlossom count={20} />
      <section className="px-4 py-16 md:py-20 relative z-10">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/legal/app"
            className="text-sm text-muted-foreground hover:text-primary transition-colors mb-6 inline-block"
          >
            ← Back to App Legal
          </Link>
          <h1
            className={`${instrumentSerif.className} mb-4 text-5xl font-[900] text-primary not-italic`}
            style={{ fontWeight: 900, fontStyle: "normal" }}
          >
            Application Terms of Service
          </h1>
          <p className={`${instrumentSerif.className} mb-12 text-xl text-muted-foreground`}>
            Page last updated: June 7, 2026 21:09 CDT
          </p>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-6">
              By downloading, installing, or using AsterIDE, you agree to be bound by these Terms of Service and the GPLv3 license.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">2. GPLv3 License</h2>
            <p className="text-muted-foreground mb-6">
              AsterIDE is licensed under the GNU General Public License v3.0. This license grants you the freedom to use, modify, and distribute the software, with certain conditions.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Use of Software</h2>
            <p className="text-muted-foreground mb-6">
              You may use AsterIDE for any lawful purpose. The software is provided as-is without warranty of any kind.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Distribution</h2>
            <p className="text-muted-foreground mb-6">
              You are free to distribute copies of the software, provided you include the source code and the GPLv3 license with your distribution.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Modifications</h2>
            <p className="text-muted-foreground mb-6">
              You may modify the software and distribute your modifications, provided you clearly mark your changes and license them under GPLv3.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">6. No Warranty</h2>
            <p className="text-muted-foreground mb-6">
              AsterIDE is provided &ldquo;as is&rdquo; without warranty of any kind, express or implied, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Liability</h2>
            <p className="text-muted-foreground mb-6">
              In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising from the use of the software.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact</h2>
            <p className="text-muted-foreground mb-6">
              If you have any questions about these Terms of Service, please contact us through our{" "}
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
