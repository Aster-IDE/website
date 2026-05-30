import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlatformDownloadClient from "./PlatformDownloadClient";
import {
  getLatestStableRelease,
  getMostRecentRelease,
  platformAliases,
  platformLabels,
  type DownloadPlatform,
} from "@/lib/downloads";

type PlatformPageProps = {
  params: Promise<{
    platform: string;
  }>;
};

function normalizePlatform(platform: string): DownloadPlatform | null {
  return platformAliases[platform.toLowerCase()] ?? null;
}

export async function generateMetadata({ params }: PlatformPageProps): Promise<Metadata> {
  const { platform: platformParam } = await params;
  const platform = normalizePlatform(platformParam);

  if (!platform) {
    return {
      title: "AsterIDE::Download",
    };
  }

  return {
    title: `AsterIDE::Download ${platformLabels[platform]}`,
    description: `Download AsterIDE for ${platformLabels[platform]}.`,
  };
}

export function generateStaticParams() {
  return [
    { platform: "windows" },
    { platform: "macos" },
    { platform: "linux" },
    { platform: "freebsd" },
    { platform: "nix" },
  ];
}

export default async function PlatformPage({ params }: PlatformPageProps) {
  const { platform: platformParam } = await params;
  const platform = normalizePlatform(platformParam);

  if (!platform) {
    notFound();
  }

  const latestRelease = await getLatestStableRelease();
  const latestDevRelease = await getMostRecentRelease();

  return (
    <PlatformDownloadClient
      platform={platform}
      latestRelease={latestRelease}
      latestDevRelease={latestDevRelease}
    />
  );
}
