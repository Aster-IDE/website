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
  title: "AsterIDE::Legal - Website Terms",
  description: "Terms of Service for asteride.dev website.",
  other: {
    "theme-color": "#c33769",
  },
};

export default function WebsiteTerms() {
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
            Website Terms of Service
          </h1>
          <p className={`${instrumentSerif.className} mb-12 text-xl text-muted-foreground`}>
            Page last updated: June 7, 2026 21:06 CDT
          </p>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-6">
              By accessing or using the asteride.dev website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the website.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Website Content</h2>
            <p className="text-muted-foreground mb-6">
              The content on this website is provided for informational purposes only. We reserve the right to modify, update, or remove content at any time without notice.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Conduct</h2>
            <p className="text-muted-foreground mb-6">
              You agree not to use the website for any illegal or unauthorized purpose. You may not attempt to gain unauthorized access to any part of the website or its servers.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
            <p className="text-muted-foreground mb-6">
              All content on this website, including text, graphics, logos, and software, is the property of AsterIDE or its content suppliers and is protected by intellectual property laws.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground mb-6">
              The website is provided &ldquo;as is&rdquo; without warranty of any kind, express or implied. We do not warrant that the website will be uninterrupted or error-free.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-6">
              In no event shall AsterIDE be liable for any damages arising from the use of this website.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Changes to Terms</h2>
            <p className="text-muted-foreground mb-6">
              We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms.
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
