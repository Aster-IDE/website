import DownloadsClient from "./DownloadsClient";

export const metadata = {
  title: "AsterIDE - Downloads",
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
  assets: GitHubReleaseAsset[];
};

type DownloadReleaseInfo = {
  version: string;
  macosUrl: string | null;
  windowsUrl: string | null;
  linuxUrl: string | null;
  sourceTarballUrl: string | null;
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
    macosUrl: pickAssetUrl(release.assets, [/\.dmg$/i]),
    windowsUrl: pickAssetUrl(release.assets, [/\.exe$/i]),
    linuxUrl: pickAssetUrl(release.assets, [/\.AppImage$/i]),
    sourceTarballUrl: release.tarball_url || null,
  };
}

async function getLatestStableRelease(): Promise<DownloadReleaseInfo | null> {
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

async function getMostRecentRelease(): Promise<DownloadReleaseInfo | null> {
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

export default async function DownloadPage() {
  const latestRelease = await getLatestStableRelease();
  const latestDevRelease = await getMostRecentRelease();
  const isDevSynced = Boolean(
    latestRelease && latestDevRelease && latestRelease.version === latestDevRelease.version
  );

  return (
    <div className="flex flex-col flex-1 px-4 py-12">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Downloads</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Choose your platform below to get the latest builds or installers.
        </p>
        <DownloadsClient
          latestRelease={latestRelease}
          latestDevRelease={latestDevRelease}
          isDevSynced={isDevSynced}
        />
      </div>
    </div>
  );
}
