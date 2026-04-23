import DownloadsClient from "./DownloadsClient";

export const metadata = {
  title: "AsterIDE - Downloads",
};

export default function DownloadPage() {
  return (
    <div className="flex flex-col flex-1 px-4 py-12">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight text-white">Downloads</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Choose your platform below to get the latest builds or installers.
        </p>
        <DownloadsClient />
      </div>
    </div>
  );
}
