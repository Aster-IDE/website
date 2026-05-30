"use client";

import Link from "next/link";
import { useState } from "react";
import { FaApple, FaArrowLeft, FaCheck, FaCopy, FaDownload, FaFreebsd, FaWindows } from "react-icons/fa";
import { SiNixos } from "react-icons/si";
import { osIcons } from "@/app/icons/icons";
import {
  formatAssetKind,
  formatAssetTitle,
  getPlatformAssets,
  platformLabels,
  type DownloadAsset,
  type DownloadPlatform,
  type DownloadReleaseInfo,
} from "@/lib/downloads";

type PlatformDownloadClientProps = {
  platform: DownloadPlatform;
  latestRelease: DownloadReleaseInfo | null;
  latestDevRelease: DownloadReleaseInfo | null;
};

type DownloadChoice = {
  title: string;
  description: string;
  url?: string | null;
  kind?: string;
  recommended?: boolean;
  disabled?: boolean;
};

const platformIcons: Record<DownloadPlatform, React.ReactNode> = {
  windows: <FaWindows className="h-5 w-5" />,
  macos: <FaApple className="h-5 w-5" />,
  linux: osIcons.linux,
  freebsd: <FaFreebsd className="h-5 w-5" />,
  nix: <SiNixos className="h-5 w-5" />,
};

function assetToChoice(asset: DownloadAsset, platform: DownloadPlatform, recommended = false): DownloadChoice {
  return {
    title: formatAssetTitle(asset.name, platform),
    description: asset.name,
    url: asset.url,
    kind: formatAssetKind(asset.name),
    recommended,
  };
}

function getChoices(
  platform: DownloadPlatform,
  latestRelease: DownloadReleaseInfo | null,
  latestDevRelease: DownloadReleaseInfo | null,
) {
  const stableAssets = getPlatformAssets(latestRelease, platform);
  const devAssets = getPlatformAssets(latestDevRelease, platform);
  const stableChoices = stableAssets.map((asset, index) =>
    assetToChoice(asset, platform, index === 0)
  );

  if (devAssets[0]) {
    stableChoices.push({
      ...assetToChoice(devAssets[0], platform),
      title: "Development build",
      description: `${latestDevRelease?.version ?? "dev"} - may be unstable`,
    });
  }

  if (stableChoices.length === 0) {
    stableChoices.push({
      title: `${platformLabels[platform]} build`,
      description: "This build is not available for the current release yet.",
      disabled: true,
    });
  }

  return stableChoices;
}

function DownloadCard({ choice }: { choice: DownloadChoice }) {
  return (
    <div className="rounded-md border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-foreground">{choice.title}</h2>
            {choice.recommended && (
              <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
                Recommended
              </span>
            )}
          </div>
          <p className="mt-1 break-all text-[13px] text-muted-foreground">{choice.description}</p>
        </div>

        {choice.disabled ? (
          <button
            className="inline-flex cursor-not-allowed items-center justify-center rounded-md border border-border bg-background/70 px-3.5 py-2.5 text-[13px] font-semibold text-muted-foreground"
            disabled
          >
            Building
          </button>
        ) : (
          <a
            className={choice.recommended ? "btn-ide gap-2 px-3.5 py-2.5 text-[13px]" : "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-3.5 py-2.5 text-[13px] font-semibold text-foreground transition-colors hover:bg-accent/35"}
            href={choice.url ?? "#"}
          >
            <FaDownload className="h-3.5 w-3.5" />
            Download{choice.kind ? ` ${choice.kind}` : ""}
          </a>
        )}
      </div>
    </div>
  );
}

function CopyCommand({ label, command }: { label: string; command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="rounded-md border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-3.5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">{label}</h2>
          <p className="mt-1 text-[13px] text-muted-foreground">Copy and run this command in your terminal.</p>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-3.5 py-2.5 text-[13px] font-semibold text-foreground transition-colors hover:bg-accent/35"
        >
          {copied ? <FaCheck className="h-3.5 w-3.5" /> : <FaCopy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="mt-4 overflow-x-auto rounded-md border border-border bg-background p-3.5 font-mono text-[13px] text-foreground">
        <code>{command}</code>
      </pre>
    </div>
  );
}

function NixDownloads() {
  return (
    <div className="mx-auto mt-10 max-w-[42rem] space-y-3">
      <CopyCommand
        label="Run directly"
        command="nix run github:Aster-IDE/AsterIDE"
      />
      <CopyCommand
        label="Add flake input"
        command={`{
  inputs.asteride.url = "github:Aster-IDE/AsterIDE";

  outputs = { self, nixpkgs, asteride, ... }@inputs: {
    nixpkgs.overlays = [ asteride.overlay ];
  };
}`}
      />
    </div>
  );
}

export default function PlatformDownloadClient({
  platform,
  latestRelease,
  latestDevRelease,
}: PlatformDownloadClientProps) {
  const label = platformLabels[platform];
  const releaseLabel = latestRelease?.version ?? "latest";
  const choices = getChoices(platform, latestRelease, latestDevRelease);

  return (
    <div className="flex flex-col flex-1 px-4 py-8 sm:px-6">
      <main className="mx-auto w-full max-w-[51.75rem]">
        <Link
          href="/download"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <FaArrowLeft className="h-3.5 w-3.5" />
          All platforms
        </Link>

        <section className="mx-auto mt-7 max-w-[42rem] text-center">
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-md text-primary">
            {platformIcons[platform]}
          </div>
          <h1 className="mt-4 text-[2rem] font-bold tracking-tight text-foreground">
            Download for {label}
          </h1>
          <p className="mt-3.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[15px] text-muted-foreground">
            <span>Current version {releaseLabel}</span>
            <span className="text-border">|</span>
            <a
              href="https://github.com/Aster-IDE/AsterIDE/releases"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              View changelog
            </a>
          </p>
        </section>

        {platform === "nix" ? (
          <NixDownloads />
        ) : (
          <section className="mx-auto mt-10 max-w-[42rem] space-y-3">
            {choices.map((choice) => (
              <DownloadCard
                key={`${choice.title}-${choice.description}`}
                choice={choice}
              />
            ))}
          </section>
        )}

        {platform === "macos" && (
          <section className="mx-auto mt-9 max-w-[42rem] space-y-3">
            <div className="text-[13px] text-muted-foreground">
              <h2 className="text-base font-bold text-foreground">macOS install note</h2>
              <p className="mt-2">
                AsterIDE builds are not signed. If macOS blocks the app, open Privacy & Security in System Settings and choose Open Anyway.
              </p>
            </div>
            <CopyCommand
              label="Clear Gatekeeper attributes"
              command="xattr -c /Applications/AsterIDE.app"
            />
          </section>
        )}
      </main>
    </div>
  );
}
