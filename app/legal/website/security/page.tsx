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
  title: "AsterIDE::Legal - Website Security",
  description: "Security information for asteride.dev website.",
  other: {
    "theme-color": "#c33769",
  },
};

export default function WebsiteSecurity() {
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
            Website Security
          </h1>
          <p className={`${instrumentSerif.className} mb-12 text-xl text-muted-foreground`}>
            Page last updated: June 7, 2026 21:06 CDT
          </p>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. HTTPS</h2>
            <p className="text-muted-foreground mb-6">
              The asteride.dev website uses HTTPS encryption to secure all data transmitted between your browser and our servers.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">2. No User Accounts</h2>
            <p className="text-muted-foreground mb-6">
              The website does not require user accounts, eliminating the risk of password-related security breaches.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Minimal Data Collection</h2>
            <p className="text-muted-foreground mb-6">
              We collect minimal data, reducing the impact of any potential security incidents.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Open Source</h2>
            <p className="text-muted-foreground mb-6">
              The website code is open source, allowing for security audits by the community. Vulnerabilities can be reported and fixed quickly.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Reporting Vulnerabilities</h2>
            <p className="text-muted-foreground mb-6">
              If you discover a security vulnerability, please report it responsibly through our{" "}
              <a href="https://github.com/Aster-IDE/website/security/advisories" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                GitHub Security Advisories
              </a>
              {" "}or{" "}
              <a href="https://github.com/Aster-IDE/AsterIDE/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                GitHub issues
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Third-Party Services</h2>
            <p className="text-muted-foreground mb-6">
              We carefully evaluate third-party services before integrating them into the website to ensure they meet our security standards.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact</h2>
            <p className="text-muted-foreground mb-6">
              If you have any security concerns, please contact us through our{" "}
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
