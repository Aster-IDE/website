import type { Metadata } from "next";
import BlogNotFound from "./not-found";

export default function BlogPage() {
  return <BlogNotFound />;
}

export const metadata: Metadata = {
  title: "AsterIDE::Blog",
  description: "Technically the Blog Page? No, this is just a redirection to the actual Blog Page.",
  other: {
    "theme-color": "#c33769",
  },
};
