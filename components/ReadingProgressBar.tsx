"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      const scrollProgress = (scrollTop / scrollableHeight) * 100;
      setProgress(Math.min(scrollProgress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    // reset progress when route changes. the setState warning is a false positive here since
    // we're just synchronizing the state with the router.
    // implementing alternatives like key based remount or refs would
    // be more complex, and performance impact is negligible as this only runs on navigation.

    // eslint-disable-next-line
    setProgress(0);
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[150] bg-transparent">
      <div
        className="h-full bg-[#c33769] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
