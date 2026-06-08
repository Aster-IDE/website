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
  title: "AsterIDE::Legal - App License",
  description: "License for AsterIDE application.",
  other: {
    "theme-color": "#c33769",
  },
};

export default function AppLicense() {
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
            Application License
          </h1>
          <p className={`${instrumentSerif.className} mb-12 text-xl text-muted-foreground`}>
            Page last updated: June 7, 2026 21:08 CDT
          </p>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mb-4">GNU General Public License v3.0</h2>
            <p className="text-muted-foreground mb-6">
              AsterIDE is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
            <p className="text-muted-foreground mb-6">
              Under GPLv3, you have the freedom to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Use the software for any purpose</li>
              <li>Study how the software works and modify it</li>
              <li>Redistribute copies of the software</li>
              <li>Distribute copies of your modified versions to others</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mb-4">Your Responsibilities</h2>
            <p className="text-muted-foreground mb-6">
              When you redistribute or modify AsterIDE, you must:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Include the original copyright notice</li>
              <li>Include the GPLv3 license text</li>
              <li>Provide the source code if you distribute the software</li>
              <li>License your modifications under GPLv3</li>
              <li>Indicate any changes you made to the original software</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mb-4">Source Code</h2>
            <p className="text-muted-foreground mb-6">
              The source code for AsterIDE is available on GitHub at{" "}
              <a href="https://github.com/Aster-IDE/AsterIDE" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                github.com/Aster-IDE/AsterIDE
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">No Warranty</h2>
            <p className="text-muted-foreground mb-6">
              AsterIDE is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">Full License Text</h2>
            <p className="text-muted-foreground mb-6">
              For the full text of the GPLv3 license, please visit the{" "}
              <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                official GNU website
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact</h2>
            <p className="text-muted-foreground mb-6">
              If you have any questions about the license, please contact us through our{" "}
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
