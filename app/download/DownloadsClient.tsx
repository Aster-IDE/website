"use client";

import { FaLinux, FaApple, FaWindows, FaCodeBranch, FaFreebsd } from "react-icons/fa";
import { SiNixos } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Copy } from "lucide-react";
import Image from "next/image";
import { Instrument_Serif } from "next/font/google";
import DownloadOption from "@/components/DownloadOption";

type NixOption = "flake" | "configuration";

type DownloadReleaseInfo = {
  version: string;
  macosUrl: string | null;
  windowsUrl: string | null;
  linuxUrl: string | null;
  freebsdUrl: string | null;
  sourceTarballUrl: string | null;
};

interface DownloadsClientProps {
  latestRelease: DownloadReleaseInfo | null;
  latestDevRelease: DownloadReleaseInfo | null;
  isDevSynced: boolean;
}

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

export default function DownloadsClient({
  latestRelease,
  latestDevRelease,
  isDevSynced,
}: DownloadsClientProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [xattrCopied, setXattrCopied] = useState(false);
  const [sourceCodeOpen, setSourceCodeOpen] = useState(false);
  const [selectedNixOption, setSelectedNixOption] = useState<NixOption>("flake");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const copyTimeout = useRef<NodeJS.Timeout | null>(null);
  const xattrTimeout = useRef<NodeJS.Timeout | null>(null);
  const sectionTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSectionCopy = (text: string, section: string) => {
    if (copiedSection === section) return;

    navigator.clipboard.writeText(text);
    setCopiedSection(section);

    if (sectionTimeout.current) {
      clearTimeout(sectionTimeout.current);
    }

    sectionTimeout.current = setTimeout(() => {
      setCopiedSection(null);
      sectionTimeout.current = null;
    }, 1500);
  };

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
      if (sectionTimeout.current) {
        clearTimeout(sectionTimeout.current);
      }
    };
  }, []);

  const linuxUrl = latestRelease?.linuxUrl ?? null;
  const macosUrl = latestRelease?.macosUrl ?? null;
  const windowsUrl = latestRelease?.windowsUrl ?? null;
  const freebsdUrl = latestRelease?.freebsdUrl ?? null;
  const sourceTarballUrl =
    latestRelease?.sourceTarballUrl ?? "https://github.com/Aster-IDE/AsterIDE/releases/latest";
  const releaseLabel = latestRelease?.version ?? "latest stable";
  const devReleaseLabel = latestDevRelease?.version ?? "dev";

  const renderReleaseLinks = (release: DownloadReleaseInfo | null, prefix: string) => {
    if (!release) {
      return (
        <p className="text-sm text-muted-foreground">
          No release data is currently available.
        </p>
      );
    }

    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Tag: <span className="text-foreground font-medium">{release.version}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {release.linuxUrl && (
            <a
              href={release.linuxUrl}
              className="btn-ide gap-2 px-3 py-2 text-xs"
            >
              {prefix} Linux (.appimage)
            </a>
          )}
          {release.macosUrl && (
            <a
              href={release.macosUrl}
              className="btn-ide gap-2 px-3 py-2 text-xs"
            >
              {prefix} macOS (.dmg)
            </a>
          )}
          {release.windowsUrl && (
            <a
              href={release.windowsUrl}
              className="btn-ide gap-2 px-3 py-2 text-xs"
            >
              {prefix} Windows (.exe)
            </a>
          )}
          {release.sourceTarballUrl && (
            <a
              href={release.sourceTarballUrl}
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent/30"
            >
              {prefix} source (.tar.gz)
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-4">
        <h2
          className={`${instrumentSerif.className} mb-1 text-sm font-[900] uppercase tracking-wider text-foreground/95`}
          style={{ fontWeight: 900 }}
        >
          Download for
        </h2>
        <div className="space-y-3">
              <DownloadOption
              title="Nix"
              description="A Nix flake output and overlay"
              instructions={(
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-foreground text-lg font-semibold">
                      Run directly via Flake
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Quick test run without installing
                    </p>

                    <div className="relative mt-2">
                      <div className="bg-accent/30 rounded-md pr-9 font-mono text-sm overflow-x-auto text-foreground/90 border border-border">
                        <div className="absolute top-2.5 right-2">
                          <button
                            onClick={handleCopy}
                            disabled={isCopied}
                            className={`transition-colors cursor-pointer ${
                              isCopied
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            title={isCopied ? "Copied!" : "Copy to clipboard"}
                          >
                            {isCopied ? "Copied!" : <Copy className="w-4 h-4" />}
                          </button>
                        </div>

                        <pre className="text-[14px] p-3 font-medium text-foreground overflow-x-auto">
                          <code>nix run github:Aster-IDE/AsterIDE</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-foreground text-lg font-semibold">
                      Add as a Flake input
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Use this if you want to integrate it into your own flake
                    </p>

                    <div className="mt-3 rounded-md border border-border bg-card overflow-hidden">
                      <div className="flex border-b border-border">
                        <button
                          onClick={() => setSelectedNixOption("flake")}
                          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                            selectedNixOption === "flake"
                              ? "bg-accent/50 text-foreground border-b-2 border-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                          }`}
                        >
                          Proper Flake
                        </button>
                        <button
                          onClick={() => setSelectedNixOption("configuration")}
                          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                            selectedNixOption === "configuration"
                              ? "bg-accent/50 text-foreground border-b-2 border-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                          }`}
                        >
                          configuration.nix
                        </button>
                      </div>

                      <div className="p-4">
                        {selectedNixOption === "flake" ? (
                          <div className="space-y-4">
                            <div>
                              <div className="text-xs text-muted-foreground mb-1 font-mono">~/.nix/flake.nix</div>
                              <div className="relative">
                                <div className="bg-accent/30 rounded-md pr-9 font-mono text-sm overflow-x-auto text-foreground/90 border border-border">
                                  <div className="absolute top-2 right-2">
                                    <button
                                      onClick={() => handleSectionCopy(`{
  inputs.asteride.url = "github:Aster-IDE/AsterIDE";

  outputs = { self, nixpkgs, asteride, ... }@inputs:
    let
      system = "x86_64-linux";
    in
    {
      nixosConfigurations.default = nixpkgs.lib.nixosSystem {
        inherit system;
        modules = [
          ./modules
          { nixpkgs.overlays = [ asteride.overlay ]; }
        ];
      };
    };
}`, "flake")}
                                      className={`transition-colors cursor-pointer ${
                                        copiedSection === "flake"
                                          ? "text-primary"
                                          : "text-muted-foreground hover:text-foreground"
                                      }`}
                                      title={copiedSection === "flake" ? "Copied!" : "Copy to clipboard"}
                                    >
                                      {copiedSection === "flake" ? "Copied!" : <Copy className="w-4 h-4" />}
                                    </button>
                                  </div>
                                  <pre className="text-[13px] p-3 font-medium text-foreground overflow-x-auto">
                                    <code>{`{
  inputs.asteride.url = "github:Aster-IDE/AsterIDE";

  outputs = { self, nixpkgs, asteride, ... }@inputs:
    let
      system = "x86_64-linux";
    in
    {
      nixosConfigurations.default = nixpkgs.lib.nixosSystem {
        inherit system;
        modules = [
          ./modules
          { nixpkgs.overlays = [ asteride.overlay ]; }
        ];
      };
    };
}`}</code>
                                  </pre>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="text-xs text-muted-foreground mb-1 font-mono">~/.nix/modules/default.nix</div>
                              <div className="relative">
                                <div className="bg-accent/30 rounded-md pr-9 font-mono text-sm overflow-x-auto text-foreground/90 border border-border">
                                  <div className="absolute top-2 right-2">
                                    <button
                                      onClick={() => handleSectionCopy(`{ config, pkgs, ... }: {
  imports = [
    ./home
  ];
}`, "modules")}
                                      className={`transition-colors cursor-pointer ${
                                        copiedSection === "modules"
                                          ? "text-primary"
                                          : "text-muted-foreground hover:text-foreground"
                                      }`}
                                      title={copiedSection === "modules" ? "Copied!" : "Copy to clipboard"}
                                    >
                                      {copiedSection === "modules" ? "Copied!" : <Copy className="w-4 h-4" />}
                                    </button>
                                  </div>
                                  <pre className="text-[13px] p-3 font-medium text-foreground overflow-x-auto">
                                    <code>{`{ config, pkgs, ... }: {
  imports = [
    ./home
  ];
}`}</code>
                                  </pre>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="text-xs text-muted-foreground mb-1 font-mono">~/.nix/modules/home/packages.nix</div>
                              <div className="relative">
                                <div className="bg-accent/30 rounded-md pr-9 font-mono text-sm overflow-x-auto text-foreground/90 border border-border">
                                  <div className="absolute top-2 right-2">
                                    <button
                                      onClick={() => handleSectionCopy(`{ config, pkgs, ... }: {
  environment.systemPackages = with pkgs; [
    asteride
  ];
}`, "packages")}
                                      className={`transition-colors cursor-pointer ${
                                        copiedSection === "packages"
                                          ? "text-primary"
                                          : "text-muted-foreground hover:text-foreground"
                                      }`}
                                      title={copiedSection === "packages" ? "Copied!" : "Copy to clipboard"}
                                    >
                                      {copiedSection === "packages" ? "Copied!" : <Copy className="w-4 h-4" />}
                                    </button>
                                  </div>
                                  <pre className="text-[13px] p-3 font-medium text-foreground overflow-x-auto">
                                    <code>{`{ config, pkgs, ... }: {
  environment.systemPackages = with pkgs; [
    asteride
  ];
}`}</code>
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div>
                              <div className="text-xs text-muted-foreground mb-1 font-mono">/etc/nixos/configuration.nix</div>
                              <div className="relative">
                                <div className="bg-accent/30 rounded-md pr-9 font-mono text-sm overflow-x-auto text-foreground/90 border border-border">
                                  <div className="absolute top-2 right-2">
                                    <button
                                      onClick={() => handleSectionCopy(`{ config, pkgs, ... }: {
  # Add to your existing imports
  imports = [
    # ... your other imports
  ];

  nix.settings.experimental-features = [ "nix-command" "flakes" ];

  nixpkgs.overlays = [
    (final: prev: {
      asteride = pkgs.callPackage (pkgs.fetchFromGitHub {
        owner = "Aster-IDE";
        repo = "AsterIDE";
        rev = "main";
        hash = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
      }) {};
    })
  ];

  environment.systemPackages = with pkgs; [
    asteride
  ];
}`, "configuration")}
                                      className={`transition-colors cursor-pointer ${
                                        copiedSection === "configuration"
                                          ? "text-primary"
                                          : "text-muted-foreground hover:text-foreground"
                                      }`}
                                      title={copiedSection === "configuration" ? "Copied!" : "Copy to clipboard"}
                                    >
                                      {copiedSection === "configuration" ? "Copied!" : <Copy className="w-4 h-4" />}
                                    </button>
                                  </div>
                                  <pre className="text-[13px] p-3 font-medium text-foreground overflow-x-auto">
                                    <code>{`{ config, pkgs, ... }: {
  imports = [
    # ... your other imports
  ];

  nix.settings.experimental-features = [ "nix-command" "flakes" ];

  nixpkgs.overlays = [
    (final: prev: {
      asteride = pkgs.callPackage (pkgs.fetchFromGitHub {
        owner = "Aster-IDE";
        repo = "AsterIDE";
        rev = "main";
        hash = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
      }) {};
    })
  ];

  environment.systemPackages = with pkgs; [
    asteride
  ];
}`}</code>
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
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
            downloadUrl={linuxUrl ?? undefined}
            disabled={!linuxUrl}
          />

          <DownloadOption
            title="macOS"
            description="Universal DMG"
            icon={<FaApple className="text-foreground/70 w-5 h-5" />}
            type="file"
            fileType="DMG"
            downloadUrl={macosUrl ?? undefined}
            disabled={!macosUrl}
            disabledLabel="Building"
          />

          <DownloadOption
            title="Windows"
            description="Windows executable"
            icon={<FaWindows className="text-foreground/70 w-5 h-5" />}
            type="file"
            fileType="EXE"
            downloadUrl={windowsUrl ?? undefined}
            disabled={!windowsUrl}
            disabledLabel="Building"
          />

          <DownloadOption
            title="FreeBSD"
            description="FreeBSD binary"
            icon={<FaFreebsd className="text-foreground/70 w-5 h-5" />}
            type="file"
            fileType="Binary"
            downloadUrl={freebsdUrl ?? undefined}
            disabled={!freebsdUrl}
            disabledLabel="Building"
          />

          <p className="px-1 text-xs text-muted-foreground">
            <span className="text-foreground/90">{releaseLabel}</span>
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2
          className={`${instrumentSerif.className} mb-1 text-sm font-[900] uppercase tracking-wider text-foreground/95`}
          style={{ fontWeight: 900 }}
        >
          Additional info
        </h2>
        <div className="space-y-3">
          <DownloadOption
            title="Development Build"
            description={
              isDevSynced
                ? `${devReleaseLabel} (synced with stable)`
                : `${devReleaseLabel}`
            }
            icon={<FaCodeBranch className="text-foreground/70 w-5 h-5" />}
            type="commands"
            disabled={!latestDevRelease}
            instructions={(
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {isDevSynced
                    ? "Dev branch is synced with the latest release."
                    : "This is a dev build and may be unstable."}
                </p>
                {renderReleaseLinks(latestDevRelease, "Dev")}
              </div>
            )}
          />
          <div className="border border-border bg-card rounded-md overflow-hidden">
            <button
              className="w-full cursor-pointer px-4 py-3 text-center text-base font-semibold transition-colors hover:bg-accent/30"
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
                      The source code for {releaseLabel} can be found on GitHub.
                    </p>
                    <a
                      className="btn-ide mt-4 px-5 py-2 text-center text-sm"
                      href={sourceTarballUrl}
                    >
                      Download .tar.gz
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
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
