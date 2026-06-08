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
  title: "AsterIDE::Legal - App Privacy",
  description: "Privacy Policy for AsterIDE application.",
  other: {
    "theme-color": "#c33769",
  },
};

export default function AppPrivacy() {
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
            Application Privacy Policy
          </h1>
          <p className={`${instrumentSerif.className} mb-12 text-xl text-muted-foreground`}>
            Page last updated: June 7, 2026 20:47 CDT
          </p>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. No Telemetry</h2>
            <p className="text-muted-foreground mb-6">
              AsterIDE does not collect, transmit, or store any telemetry data. The application runs entirely on your local machine without any data being sent to external servers.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">2. No User Accounts</h2>
            <p className="text-muted-foreground mb-6">
              AsterIDE does not require user accounts, authentication, or any personal information to function. You can use the software anonymously. (We don&apos;t plan on making an Accounts system.)
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">3. No Forced Updates</h2>
            <p className="text-muted-foreground mb-6">
              AsterIDE does not force automatic updates. You have full control over when and if you update the software. (No, I just don&apos;t know how to make an updater, you quite literally have to download the latest version from the website, or update via nix flakes)
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Local Data Only</h2>
            <p className="text-muted-foreground mb-6">
              All data created, edited, or stored in AsterIDE remains on your local machine. We do not have access to your files, settings, or any other data.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Open Source Transparency</h2>
            <p className="text-muted-foreground mb-6">
              AsterIDE is open source under GPLv3. The source code is publicly available on GitHub, allowing anyone to audit the code and verify our privacy claims.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Third-Party Integrations</h2>
            <p className="text-muted-foreground mb-6">
              AsterIDE may integrate with third-party services (e.g., Git for version control) only when you explicitly choose to use them. We do not collect data from these integrations.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact</h2>
            <p className="text-muted-foreground mb-6">
              If you have any questions about our privacy practices, please contact us through our{" "}
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
