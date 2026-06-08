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
  title: "AsterIDE::Legal - Website Privacy",
  description: "Privacy Policy for asteride.dev website.",
  other: {
    "theme-color": "#c33769",
  },
};

export default function WebsitePrivacy() {
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
            Website Privacy Policy
          </h1>
          <p className={`${instrumentSerif.className} mb-12 text-xl text-muted-foreground`}>
            Page last updated: June 7, 2026 21:04 CDT
          </p>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-6">
              The asteride.dev website does not collect personal information.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Cookies</h2>
            <p className="text-muted-foreground mb-6">
              We use minimal cookies for essential functionality specifically for the Dark Mode Light Mode switcher, <b>that is it.</b>
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Third-Party Services</h2>
            <p className="text-muted-foreground mb-6">
              The website embeds content specifically from GitHub&apos;s API, this is used for Releases, and loading GitHub profiles and certain files which are displayed across the website.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Storage</h2>
            <p className="text-muted-foreground mb-6">
              We don&apos;t collect any data from you, <b>we don&apos;t want your information.</b>
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground mb-6">
              You have the right to access, correct, or delete any personal information we may have about you. <a href="mailto:contact@asteride.dev" className="text-primary hover:underline"><b>Email us.</b></a>
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Changes to Privacy Policy</h2>
            <p className="text-muted-foreground mb-6">
              We reserve the right to modify this privacy policy at any time. Changes will be posted on this page with an updated revision date.
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
