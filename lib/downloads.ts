export type DownloadAsset = {
  name: string;
  url: string;
};

type GitHubReleaseAsset = {
  name: string;
  browser_download_url: string;
};

type GitHubRelease = {
  tag_name: string;
  draft: boolean;
  prerelease: boolean;
  tarball_url: string;
  zipball_url: string;
  assets: GitHubReleaseAsset[];
};

export type DownloadReleaseInfo = {
  version: string;
  macosUrl: string | null;
  windowsUrl: string | null;
  linuxUrl: string | null;
  freebsdUrl: string | null;
  sourceTarballUrl: string | null;
  sourceZipUrl: string | null;
  assets: DownloadAsset[];
};

export type DownloadPlatform = "windows" | "macos" | "linux" | "freebsd" | "nix";

export const platformAliases: Record<string, DownloadPlatform> = {
  windows: "windows",
  win: "windows",
  macos: "macos",
  mac: "macos",
  darwin: "macos",
  linux: "linux",
  freebsd: "freebsd",
  bsd: "freebsd",
  nix: "nix",
  nixos: "nix",
};

export const platformLabels: Record<DownloadPlatform, string> = {
  windows: "Windows",
  macos: "macOS",
  linux: "Linux",
  freebsd: "FreeBSD",
  nix: "Nix",
};

function pickAssetUrl(assets: GitHubReleaseAsset[], patterns: RegExp[]) {
  const asset = assets.find((candidate) =>
    patterns.some((pattern) => pattern.test(candidate.name))
  );

  return asset?.browser_download_url ?? null;
}

function mapRelease(release: GitHubRelease): DownloadReleaseInfo {
  return {
    version: release.tag_name,
    macosUrl: pickAssetUrl(release.assets, [/\.pkg$/i]),
    windowsUrl: pickAssetUrl(release.assets, [/\.exe$/i]),
    linuxUrl: null,
    freebsdUrl: pickAssetUrl(release.assets, [/asteride-freebsd/i]),
    sourceTarballUrl: release.tarball_url || null,
    sourceZipUrl: release.zipball_url || null,
    assets: release.assets.map((asset) => ({
      name: asset.name,
      url: asset.browser_download_url,
    })),
  };
}

export async function getLatestStableRelease(): Promise<DownloadReleaseInfo | null> {
  try {
    const response = await fetch("https://api.github.com/repos/Aster-IDE/AsterIDE/releases/latest", {
      headers: {
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const latestStableRelease = (await response.json()) as GitHubRelease;
    return mapRelease(latestStableRelease);
  } catch {
    return null;
  }
}

export async function getMostRecentRelease(): Promise<DownloadReleaseInfo | null> {
  try {
    const response = await fetch("https://api.github.com/repos/Aster-IDE/AsterIDE/releases?per_page=10", {
      headers: {
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const releases = (await response.json()) as GitHubRelease[];
    const mostRecentRelease = releases.find((release) => !release.draft);

    if (!mostRecentRelease) {
      return null;
    }

    return mapRelease(mostRecentRelease);
  } catch {
    return null;
  }
}

export function getPlatformAssets(
  release: DownloadReleaseInfo | null,
  platform: DownloadPlatform,
) {
  if (!release) {
    return [];
  }

  const patterns: Record<DownloadPlatform, RegExp[]> = {
    windows: [/\.exe$/i, /\.msi$/i],
    macos: [/\.pkg$/i],
    linux: [],
    freebsd: [/freebsd/i],
    nix: [],
  };

  return release.assets.filter((asset) =>
    patterns[platform].some((pattern) => pattern.test(asset.name))
  );
}

export function formatAssetTitle(assetName: string, platform: DownloadPlatform) {
  const lowerName = assetName.toLowerCase();

  if (platform === "windows") {
    if (lowerName.endsWith(".msi")) return "Windows MSI installer";
    return "Windows executable";
  }

  if (platform === "macos") {
    return "macOS package";
  }

  if (platform === "linux") {
    if (lowerName.endsWith(".deb")) return "Debian package";
    if (lowerName.endsWith(".rpm")) return "RPM package";
    if (lowerName.endsWith(".tar.gz") || lowerName.endsWith(".tar.xz") || lowerName.endsWith(".tar.zst")) {
      return "Linux tarball";
    }
    return "Linux package";
  }

  if (platform === "freebsd") {
    return "FreeBSD binary";
  }

  return assetName;
}

export function formatAssetKind(assetName: string) {
  const match = assetName.match(/(\.tar\.(?:gz|xz|zst)|\.[a-z0-9]+)$/i);
  return match?.[1].replace(/^\./, "").toUpperCase() ?? "FILE";
}
