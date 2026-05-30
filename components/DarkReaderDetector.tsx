"use client";

import { useEffect, useState } from "react";

export default function DarkReaderDetector() {
  const [hasDarkReader, setHasDarkReader] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const checkDarkReader = () => {
      const svgs = document.querySelectorAll('svg');
      for (const svg of svgs) {
        if (svg.hasAttribute('data-darkreader-inline-stroke') ||
            svg.style.getPropertyValue('--darkreader-inline-stroke')) {
          return true;
        }
      }
      return false;
    };

    const calculatePosition = () => {
      const themeButton = document.querySelector('[data-theme-toggle="true"]') as HTMLElement;
      if (themeButton) {
        const rect = themeButton.getBoundingClientRect();
        setPosition({
          top: rect.bottom + 20,
          left: rect.left + rect.width / 2,
        });
      }
    };

    const timeout = setTimeout(() => {
      if (checkDarkReader()) {
        setHasDarkReader(true);
        calculatePosition();
      }
    }, 100);

    const handleResize = () => {
      if (hasDarkReader && !dismissed) {
        calculatePosition();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [hasDarkReader, dismissed]);

  if (!hasDarkReader || dismissed) {
    return null;
  }

  return (
    <div
      className="fixed z-[100] max-w-xs"
      style={{ top: `${position.top}px`, left: `${position.left}px`, transform: 'translateX(-50%)' }}
    >
      <div className="relative">
        <div className="rounded-lg border-2 border-[#c33769] bg-background/95 backdrop-blur-sm p-4 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Dark Reader Detected
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                We suspect you currently have Dark Reader enabled. This may cause hydration warnings and visual inconsistencies. For the best experience, please disable it while using this site.
              </p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-background/95 backdrop-blur-sm border-2 border-[#c33769] transform rotate-45"></div>
      </div>
    </div>
  );
}
