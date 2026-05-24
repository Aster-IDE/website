import type { Metadata } from "next";
import DocsNotFound from "./not-found";

export default function DocsPage() {
  return <DocsNotFound />;
}

export const metadata: Metadata = {
  title: "AsterIDE::Docs",
  description: "Technically the Docs? No, this is just a redirection to the actual docs.",
  other: {
    "theme-color": "#c33769",
  },
};
