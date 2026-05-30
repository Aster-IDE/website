import type { Metadata } from "next";
import DownloadHome from "./DownloadHome";
import { Instrument_Serif } from "next/font/google";
import { getLatestStableRelease } from "@/lib/downloads";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "AsterIDE::Download",
  description: "Download AsterIDE, Currently supported for Windows, macOS, FreeBSD, and NixOS.",
  other: {
    "theme-color": "#c33769",
  },
};

export default async function DownloadPage() {
  const latestRelease = await getLatestStableRelease();
  const releaseLabel = latestRelease?.version ?? "latest";

  return (
    <div className="flex flex-col flex-1 px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-[61rem]">
        <h1
          className={`${instrumentSerif.className} text-[2rem] font-[900] tracking-tight text-primary italic`}
          style={{ fontWeight: 900, fontStyle: "italic" }}
        >
          Downloads
        </h1>
        <p className="mt-1.5 max-w-2xl text-[13px] text-muted-foreground">
          Select your platform first, then choose the package or build you want.
        </p>
        <DownloadHome
          releaseLabel={releaseLabel}
          sourceTarballUrl={latestRelease?.sourceTarballUrl ?? null}
          sourceZipUrl={latestRelease?.sourceZipUrl ?? null}
        />
      </div>
    </div>
  );
}
