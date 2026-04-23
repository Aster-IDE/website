"use client";

import { ReactElement } from "react";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split("\n");
  const elements: ReactElement[] = [];
  let key = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Horizontal rule / Seperater thingy, idk what it's called but yeah
    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      elements.push(
        <hr key={key++} className="my-6 border-border" />
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1 key={key++} className="text-3xl font-bold mt-8 mb-4 text-[#FF82B4]">
          {parseInline(trimmed.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-2xl font-semibold mt-6 mb-3 text-[#FF82B4]">
          {parseInline(trimmed.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-xl font-semibold mt-5 mb-2">
          {parseInline(trimmed.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("#### ")) {
      elements.push(
        <h4 key={key++} className="text-lg font-semibold mt-4 mb-2">
          {parseInline(trimmed.slice(5))}
        </h4>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre
          key={key++}
          className="bg-accent/50 rounded-lg p-4 my-4 overflow-x-auto font-mono text-sm"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const listItems: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
      ) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="list-disc list-inside my-4 space-y-1 ml-4">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-foreground/90">
              {parseInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <blockquote
          key={key++}
          className="border-l-4 border-[#553746] pl-4 my-4 italic text-muted-foreground"
        >
          {quoteLines.map((q, idx) => (
            <span key={idx}>
              {parseInline(q)}
              {idx < quoteLines.length - 1 && <br />}
            </span>
          ))}
        </blockquote>
      );
      continue;
    }

    elements.push(
      <p key={key++} className="mb-4 text-foreground/90 leading-relaxed">
        {parseInline(trimmed)}
      </p>
    );
    i++;
  }

  return <div className="markdown-content">{elements}</div>;
}

function parseInline(text: string): ReactElement {
  const parts: (string | ReactElement)[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const codeMatch = remaining.match(/`([^`]+)`/);
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    const italicMatch = remaining.match(/\*([^*]+)\*/);
    const strikeMatch = remaining.match(/~~([^~]+)~~/);
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    const matches = [
      { type: "code", match: codeMatch },
      { type: "bold", match: boldMatch },
      { type: "italic", match: italicMatch },
      { type: "strike", match: strikeMatch },
      { type: "link", match: linkMatch },
    ].filter((m) => m.match) as {
      type: string;
      match: RegExpMatchArray;
    }[];

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const earliest = matches.reduce((min, curr) =>
      curr.match.index! < min.match.index! ? curr : min
    );

    if (earliest.match.index! > 0) {
      parts.push(remaining.slice(0, earliest.match.index));
    }

    switch (earliest.type) {
      case "code":
        parts.push(
          <code
            key={key++}
            className="bg-accent/50 px-1.5 py-0.5 rounded text-sm font-mono"
          >
            {earliest.match[1]}
          </code>
        );
        break;
      case "bold":
        parts.push(
          <strong key={key++} className="font-semibold">
            {earliest.match[1]}
          </strong>
        );
        break;
      case "italic":
        parts.push(
          <em key={key++} className="italic">
            {earliest.match[1]}
          </em>
        );
        break;
      case "strike":
        parts.push(
          <del key={key++} className="line-through">
            {earliest.match[1]}
          </del>
        );
        break;
      case "link":
        parts.push(
          <a
            key={key++}
            href={earliest.match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF82B4] hover:underline"
          >
            {earliest.match[1]}
          </a>
        );
        break;
    }

    remaining = remaining.slice(
      earliest.match.index! + earliest.match[0].length
    );
  }

  return <>{parts}</>;
}
