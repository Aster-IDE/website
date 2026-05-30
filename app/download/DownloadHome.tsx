import Link from "next/link";
import { FaApple, FaArrowRight, FaDownload, FaFreebsd, FaWindows } from "react-icons/fa";
import { SiNixos } from "react-icons/si";
import { osIcons } from "../icons/icons";
import type { DownloadPlatform } from "@/lib/downloads";

type PlatformCard = {
  platform: DownloadPlatform;
  title: string;
  description: string;
  status: string;
  icon: React.ReactNode;
};

const platforms: PlatformCard[] = [
  {
    platform: "windows",
    title: "Windows",
    description: "Executable builds for Windows desktops.",
    status: "EXE",
    icon: <FaWindows className="h-6 w-6" />,
  },
  {
    platform: "macos",
    title: "macOS",
    description: "Universal package installer for Mac.",
    status: "PKG",
    icon: <FaApple className="h-6 w-6" />,
  },
  {
    platform: "linux",
    title: "Linux",
    description: "Linux builds are coming soon.",
    status: "SOON",
    icon: osIcons.linux,
  },
  {
    platform: "freebsd",
    title: "FreeBSD",
    description: "Binary builds for FreeBSD.",
    status: "BINARY",
    icon: <FaFreebsd className="h-6 w-6" />,
  },
  {
    platform: "nix",
    title: "Nix",
    description: "Run AsterIDE through flakes or overlays.",
    status: "FLAKE",
    icon: <SiNixos className="h-6 w-6" />,
  },
];

type DownloadHomeProps = {
  releaseLabel: string;
  sourceTarballUrl: string | null;
  sourceZipUrl: string | null;
};

export default function DownloadHome({
  releaseLabel,
  sourceTarballUrl,
  sourceZipUrl,
}: DownloadHomeProps) {
  const sourceOptions = [
    {
      title: "Source tarball",
      description: `${releaseLabel} source archive`,
      kind: "TAR.GZ",
      url: sourceTarballUrl,
    },
    {
      title: "Source zip",
      description: `${releaseLabel} source archive`,
      kind: "ZIP",
      url: sourceZipUrl,
    },
  ];

  return (
    <section className="mt-9">
      <div className="mx-auto max-w-[42rem] text-center">
        <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
          Current version {releaseLabel}
        </p>
        <h2 className="mt-3.5 text-[1.45rem] font-bold tracking-tight text-foreground sm:text-[1.7rem]">
          Choose your operating system
        </h2>
      </div>

      <div className="mx-auto mt-9 grid max-w-[51.75rem] gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((item) => (
          <Link
            key={item.platform}
            href={`/download/${item.platform}`}
            className="group flex min-h-[10.8rem] flex-col justify-between rounded-md border border-border bg-card p-[1.125rem] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary">
                {item.icon}
              </span>
              <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
                {item.status}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1.5 text-[13px] leading-5 text-muted-foreground">
                {item.description}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3.5 text-[13px] font-semibold text-primary">
              <span>View downloads</span>
              <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-[51.75rem] border-t border-border/70 pt-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              Additional info
            </h2>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Source archives for the current release.
            </p>
          </div>
          <a
            href="https://github.com/Aster-IDE/AsterIDE/releases"
            className="text-[13px] font-medium text-primary underline-offset-4 hover:underline"
          >
            View all releases
          </a>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {sourceOptions.map((option) => (
            <div
              key={option.kind}
              className="flex flex-col gap-4 rounded-md border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-base font-semibold text-foreground">{option.title}</h3>
                <p className="mt-1 text-[13px] text-muted-foreground">{option.description}</p>
              </div>
              {option.url ? (
                <a
                  href={option.url}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-3.5 py-2.5 text-[13px] font-semibold text-foreground transition-colors hover:bg-accent/35"
                >
                  <FaDownload className="h-3.5 w-3.5" />
                  Download {option.kind}
                </a>
              ) : (
                <button
                  className="inline-flex cursor-not-allowed items-center justify-center rounded-md border border-border bg-background/70 px-3.5 py-2.5 text-[13px] font-semibold text-muted-foreground"
                  disabled
                >
                  Unavailable
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
