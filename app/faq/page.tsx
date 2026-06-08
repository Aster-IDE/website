"use client";

import { Instrument_Serif } from "next/font/google";
import CherryBlossom from "@/components/CherryBlossom";
import { useState } from "react";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const faqs = [
  {
    question: "What is AsterIDE?",
    answer: "AsterIDE is a simple, minimalist text editor written in Rust. It's designed to be fast, lightweight, and easy on the eyes, focusing on the core functionality of text editing without unnecessary complexity."
  },
  {
    question: "What platforms does AsterIDE support?",
    answer: "AsterIDE currently supports Windows, macOS, Linux (.deb, .rpm. .ebuild), and FreeBSD"
  },
  {
    question: "Is AsterIDE free and open source?",
    answer: "Yes, AsterIDE is completely free and open source, licensed under GPLv3. The source code is available on GitHub, and contributions from the community are welcome."
  },
  {
    question: "What makes AsterIDE different from other text editors?",
    answer: "AsterIDE follows a 'simplicity first' philosophy. We believe a text editor should focus on doing one thing well: editing text. No telemetry, no forced updates, no accounts required, just a clean, efficient editing experience, as a text editor should."
  },
  {
    question: "Does AsterIDE have plugins or extensions?",
    answer: "Plugin support is planned for a future release. Our current focus is on perfecting the core editing experience, but we recognize the value of extensibility and will implement it thoughtfully."
  },
  {
    question: "What programming languages does AsterIDE support?",
    answer: "While AsterIDE is a general-purpose text editor, we're working on Tree-sitter powered syntax highlighting for 30+ programming languages. This will provide accurate parsing and highlighting for most popular languages."
  },
  {
    question: "How do I report bugs or request features?",
    answer: "You can report bugs and request features on our GitHub issues page. We appreciate community feedback and use it to prioritize development."
  },
  {
    question: "Does AsterIDE have Git integration?",
    answer: "Built-in Git and Mercurial integration is planned for an upcoming release. This will allow you to manage version control directly within the editor."
  },
  {
    question: "What themes are available?",
    answer: "AsterIDE comes with Cherry Blossom and Rosé Pine themes designed specifically for long coding sessions. These themes are easy on the eyes and help reduce eye strain. We plan on integrating OpenCSS to allow for people to create their own themes."
  },
  {
    question: "How can I contribute to AsterIDE?",
    answer: "There are many ways to contribute. You can report bugs, suggest features, submit pull requests, help with documentation, or test the editor on different platforms. Check our contributing guidelines on GitHub for more details."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col flex-1 relative">
      <CherryBlossom count={20} />
      <section className="px-4 py-20 relative z-10">
        <div className="mx-auto max-w-4xl">
          <h1
            className={`${instrumentSerif.className} mb-4 text-center text-5xl font-[900] text-primary not-italic`}
            style={{ fontWeight: 900, fontStyle: "normal" }}
          >
            Frequently Asked Questions
          </h1>
          <p className={`${instrumentSerif.className} mb-12 mx-auto max-w-2xl text-center text-xl text-muted-foreground`}>
            Got questions about AsterIDE? We&apos;ve got answers.
          </p>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-xl border border-border bg-card/50 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent/30 transition-colors"
                >
                  <h3 className="font-semibold text-lg text-foreground">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-base text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions?
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="https://github.com/Aster-IDE/AsterIDE/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-6 py-3 font-medium transition-colors hover:bg-accent/30"
              >
                Ask on GitHub
              </a>
              <a
                href="https://matrix.to/#/#asteride:matrix.org"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-6 py-3 font-medium transition-colors hover:bg-accent/30"
              >
                Join our Community
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
