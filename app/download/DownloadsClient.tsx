"use client";

import { FaLinux, FaApple, FaWindows } from "react-icons/fa";
import { SiNixos } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Copy } from "lucide-react";
import Image from "next/image";
import DownloadOption from "@/components/DownloadOption";

export default function DownloadsClient() {
  const [isCopied, setIsCopied] = useState(false);
  const [xattrCopied, setXattrCopied] = useState(false);
  const [sourceCodeOpen, setSourceCodeOpen] = useState(false);
  const copyTimeout = useRef<NodeJS.Timeout | null>(null);
  const xattrTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = () => {
    if (isCopied) return;

    navigator.clipboard.writeText("nix run github:Aster-IDE/AsterIDE");
    setIsCopied(true);

    if (copyTimeout.current) {
      clearTimeout(copyTimeout.current);
    }

    copyTimeout.current = setTimeout(() => {
      setIsCopied(false);
      copyTimeout.current = null;
    }, 1500);
  };

  const handleXattrCopy = () => {
    if (xattrCopied) return;

    navigator.clipboard.writeText("xattr -c /Applications/AsterIDE.app");
    setXattrCopied(true);

    if (xattrTimeout.current) {
      clearTimeout(xattrTimeout.current);
    }

    xattrTimeout.current = setTimeout(() => {
      setXattrCopied(false);
      xattrTimeout.current = null;
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (copyTimeout.current) {
        clearTimeout(copyTimeout.current);
      }
      if (xattrTimeout.current) {
        clearTimeout(xattrTimeout.current);
      }
    };
  }, []);

  return (
    <>
      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-4">
        <h2 className="mb-1 uppercase font-bold text-white/95 text-sm tracking-wider">
          Download for
        </h2>
        <div className="space-y-3">
          <DownloadOption
            title="Nix"
            description="A Nix flake output and overlay"
            instructions={(
              <div className="flex flex-col">
                <h3 className="text-foreground text-lg font-semibold">Installing via Flake</h3>
                <p className="text-muted-foreground text-sm mt-1">Running the flake is as simple as</p>
                <div className="relative mt-2">
                  <div className="bg-accent/30 rounded-md pr-9 font-mono text-sm overflow-x-auto text-foreground/90 border border-border">
                    <div className="absolute top-2.5 right-2">
                      <button
                        onClick={handleCopy}
                        disabled={isCopied}
                        className={`transition-colors cursor-pointer ${isCopied ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        title={isCopied ? 'Copied!' : 'Copy to clipboard'}
                      >
                        {isCopied ? 'Copied!' : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <pre className="text-[14px] p-3 font-medium text-foreground overflow-x-auto"><code>nix run github:Aster-IDE/AsterIDE</code></pre>
                  </div>
                </div>
              </div>
            )}
            icon={<SiNixos className="text-foreground/70 w-5 h-5" />}
            type="commands"
            disabled={false}
          />

          <DownloadOption
            title="Linux"
            description="FUSE2 (AppImage)"
            icon={<FaLinux className="text-foreground/70 w-5 h-5" />}
            type="file"
            fileType="AppImage"
            disabled={true}
          />

          <DownloadOption
            title="macOS"
            description="Universal DMG"
            icon={<FaApple className="text-foreground/70 w-5 h-5" />}
            type="file"
            fileType="DMG"
            downloadUrl="https://github.com/Aster-IDE/AsterIDE/releases/download/v0.1.0-stable/AsterIDE.dmg"
            disabled={false}
          />

          <DownloadOption
            title="Windows"
            description="Windows executable"
            icon={<FaWindows className="text-foreground/70 w-5 h-5" />}
            type="file"
            fileType="EXE"
            disabled={true}
          />
        </div>
      </div>

      <div>
        <h2 className="mb-3 uppercase font-bold text-white/95 text-sm tracking-wider">
          Additional info
        </h2>
        <div className="border border-border bg-card rounded-md overflow-hidden pb-1">
          <button
            className="text-base font-semibold text-center cursor-pointer w-full pt-3 pb-2 hover:bg-accent/30 transition-colors"
            onClick={() => setSourceCodeOpen(!sourceCodeOpen)}
          >
            Source Code
          </button>

          <AnimatePresence initial={false}>
            {sourceCodeOpen && (
              <motion.div
                key="source"
                initial={{ height: 0, opacity: 0, y: -10 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="flex flex-col p-3 pb-2 pt-0">
                  <p className="text-sm text-muted-foreground">
                    The source code can be found simply on its GitHub.
                  </p>
                  <a
                    className="bg-foreground font-semibold hover:brightness-95 py-2 px-5 mt-4 rounded text-background text-center text-sm"
                    href="https://github.com/Aster-IDE/AsterIDE/archive/refs/tags/v0.1.0-stable.tar.gz"
                  >
                    Download .tar.gz (main)
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>

    <section className="mt-12 border-t border-border pt-8">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          macOS Installation Help
        </h2>
        
        <div className="space-y-6">
          <div className="border border-border rounded-md overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer p-4 bg-card hover:bg-accent/30 transition-colors">
                <span className="font-semibold text-foreground">
                  &ldquo;Apple could not verify &#39;AsterIDE&#39; is free of malware that may harm your Mac or compromise your privacy.&rdquo; warning?
                </span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div className="p-4 border-t border-border text-muted-foreground">
                <p className="mb-4">
                  Because we don&apos;t have $100/A$150 dollars to spend to become a recognized developer for Apple—especially for a side project, this application is not (and will not be) signed.
                </p>
                
                <div className="my-4 rounded-md overflow-hidden border border-border relative">
                  <Image 
                    src="https://github.com/Aster-IDE/AsterIDE/blob/master/assets/docs/mac-install-fails/error-example.png?raw=true" 
                    alt="Gatekeeper warning example" 
                    width={600}
                    height={400}
                    className="w-full max-w-md h-auto"
                    unoptimized
                  />
                </div>

                <p className="font-medium text-foreground mb-2">To bypass this Gatekeeper mechanism:</p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>Open System Settings (formerly System Preferences)</li>
                  <li>Go to Privacy & Security</li>
                  <li>Scroll all the way to the bottom</li>
                  <li>Re-open the app</li>
                  <li>Select &ldquo;Open anyway&rdquo;</li>
                </ol>

                <div className="my-4 rounded-md overflow-hidden border border-border relative">
                  <Image 
                    src="https://github.com/Aster-IDE/AsterIDE/blob/master/assets/docs/mac-install-fails/todo.png?raw=true" 
                    alt="Privacy settings to allow app" 
                    width={600}
                    height={400}
                    className="w-full max-w-md h-auto"
                    unoptimized
                  />
                </div>

                <div className="mt-4 p-4 bg-accent/30 rounded-md border border-border">
                  <p className="text-sm mb-2">
                    If the above doesn&apos;t help (e.g. you can&apos;t follow the steps as the prompts aren&apos;t showing), there might be some xattrs stuck on the app which need to be wiped for Gatekeeper to be happy.
                  </p>
                  <p className="text-sm mb-2">Run this command, substituting with your app location:</p>
                  <div className="relative">
                    <div className="bg-background rounded pr-10 font-mono text-sm border border-border">
                      <div className="absolute top-1/2 right-2 -translate-y-1/2">
                        <button
                          onClick={handleXattrCopy}
                          disabled={xattrCopied}
                          className={`transition-colors cursor-pointer ${xattrCopied ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                          title={xattrCopied ? 'Copied!' : 'Copy to clipboard'}
                        >
                          {xattrCopied ? 'Copied!' : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <code className="block p-3 text-sm text-foreground">xattr -c /Applications/AsterIDE.app</code>
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
