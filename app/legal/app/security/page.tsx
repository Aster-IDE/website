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
  title: "AsterIDE::Legal - App Security",
  description: "Security information for AsterIDE application.",
  other: {
    "theme-color": "#c33769",
  },
};

export default function AppSecurity() {
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
            Application Security
          </h1>
          <p className={`${instrumentSerif.className} mb-12 text-xl text-muted-foreground`}>
            Page last updated: June 7, 2026 21:09 CDT
          </p>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. No Network Communication</h2>
            <p className="text-muted-foreground mb-6">
              AsterIDE does not communicate with external servers by default. All operations are performed locally on your machine, eliminating network-based security risks.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">2. No Telemetry</h2>
            <p className="text-muted-foreground mb-6">
              The application does not collect or transmit any telemetry data, ensuring your usage patterns remain private.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Local File Access</h2>
            <p className="text-muted-foreground mb-6">
              AsterIDE only accesses files that you explicitly open or save. The application does not scan or access other files on your system.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Memory Safety</h2>
            <p className="text-muted-foreground mb-6">
              Written in Rust, AsterIDE benefits from memory safety guarantees that prevent common vulnerabilities like buffer overflows and null pointer dereferences.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Open Source Auditing</h2>
            <p className="text-muted-foreground mb-6">
              As open source software, AsterIDE can be audited by anyone. Security researchers can review the code and report vulnerabilities.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Dependency Management</h2>
            <p className="text-muted-foreground mb-6">
              We carefully select and audit dependencies to ensure they meet security standards. Dependencies are regularly updated to address known vulnerabilities.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Reporting Vulnerabilities</h2>
            <p className="text-muted-foreground mb-6">
              If you discover a security vulnerability in AsterIDE, please report it responsibly through our{" "}
              <a href="https://github.com/Aster-IDE/AsterIDE/security/advisories" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                GitHub Security Advisories
              </a>
              {" "}or{" "}
              <a href="https://github.com/Aster-IDE/AsterIDE/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                GitHub issues
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact</h2>
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
