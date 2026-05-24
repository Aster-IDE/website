import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Instrument_Serif } from "next/font/google";
import CherryBlossom from "@/components/CherryBlossom";
import { FaStar, FaMapMarkerAlt, FaCalendar, FaBuilding } from "react-icons/fa";
import { socialIcons, miscIcons } from "../../icons/icons";
import Image from "next/image";
import teamData from "../team.json";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { username } = await params;

  const member = teamData.members.find(
    m => m.github.toLowerCase() === username.toLowerCase()
  );

  return {
    title: `AsterIDE::Team::${member?.github || username}`,
    description: member?.bio || "An AsterIDE team member.",
    other: {
      "theme-color": "#c33769",
    },
  };
}

interface GitHubUserData {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitter_username: string | null;
  followers: number;
  following: number;
  created_at: string;
  avatar_url: string;
  html_url: string;
}

interface PageProps {
  params: Promise<{ username: string }>;
}

async function fetchGitHubData(username: string): Promise<GitHubUserData | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 1800 }
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch {
    return null;
  }
}

interface GitHubRepo {
  id: number | string;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  license: string | null;
  updated_at: string;
}

function getSpdxId(license: string | null): string | null {
  if (!license) return null;
  
  const spdxMap: Record<string, string> = {
    'MIT License': 'MIT',
    'GNU General Public License v3.0': 'GPL-3.0',
    'GNU General Public License v2.0': 'GPL-2.0',
    'Apache License 2.0': 'Apache-2.0',
    'BSD 3-Clause License': 'BSD-3-Clause',
    'BSD 2-Clause License': 'BSD-2-Clause',
    'Boost Software License 1.0': 'BSL-1.0',
    'Mozilla Public License 2.0': 'MPL-2.0',
    'GNU Lesser General Public License v3.0': 'LGPL-3.0',
    'GNU Lesser General Public License v2.1': 'LGPL-2.1',
    'GNU Affero General Public License v3.0': 'AGPL-3.0',
    'Eclipse Public License 2.0': 'EPL-2.0',
    'Creative Commons Zero v1.0 Universal': 'CC0-1.0',
    'Creative Commons Attribution 4.0 International': 'CC-BY-4.0',
    'Creative Commons Attribution-ShareAlike 4.0 International': 'CC-BY-SA-4.0',
    'Creative Commons Attribution-NonCommercial 4.0 International': 'CC-BY-NC-4.0',
    'Creative Commons Attribution-NoDerivatives 4.0 International': 'CC-BY-ND-4.0',
  };
  
  return spdxMap[license] || license;
}

async function fetchRecentRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=6`, {
      next: { revalidate: 300 }
    });
    
    if (!response.ok) {
      return [];
    }
    
    const repos = await response.json();
    
    const reposWithLicense = await Promise.all(
      repos.map(async (repo: { id: number; name: string; description: string | null; html_url: string; stargazers_count: number; language: string | null; license: { name: string } | null; full_name: string; updated_at: string }) => {
        let license = null;
        
        if (repo.license) {
          license = repo.license.name;
        } else {
          try {
            const repoResponse = await fetch(`https://api.github.com/repos/${repo.full_name}`, {
              next: { revalidate: 300 }
            });
            if (repoResponse.ok) {
              const repoData = await repoResponse.json();
              license = repoData.license?.name || null;
            }
          } catch {
          }
        }
        
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          stargazers_count: repo.stargazers_count,
          language: repo.language,
          license,
          updated_at: repo.updated_at
        };
      })
    );
    
    return reposWithLicense;
  } catch {
    return [];
  }
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { username } = await params;
  
  const member = teamData.members.find(m => m.github.toLowerCase() === username.toLowerCase());
  
  if (!member) {
    notFound();
  }

  const githubData = await fetchGitHubData(member.github);
  const repos = await fetchRecentRepos(member.github);

  return (
    <div className="flex flex-col flex-1 relative">
      <CherryBlossom count={25} />
      <section className="px-4 py-12 relative z-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <Link
              href="/team"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Team
            </Link>
          </div>

          <div className={`bg-card/50 border p-8 mb-8 ${
            member.founder 
              ? 'border-[#FF82B4]/50 rounded-3xl shadow-[0_0_30px_rgba(255,130,180,0.15)]' 
              : 'border-border rounded-2xl'
          }`}>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative flex-shrink-0">
                <Image
                  src={githubData?.avatar_url || `https://github.com/${member.github}.png`}
                  alt={`${member.github}'s avatar`}
                  width={120}
                  height={120}
                  className="w-32 h-32 rounded-2xl"
                />
                {member.founder && (
                  <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-br from-[#FF82B4] to-[#FF6B9D] rounded-full flex items-center justify-center shadow-lg">
                    <FaStar className="text-white text-sm" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h1 className={`${instrumentSerif.className} text-4xl font-[900] text-primary italic mb-2`}
                    style={{ fontWeight: 900 }}>
                  {githubData?.name || member.github}
                </h1>
                <a 
                  href={githubData?.html_url || `https://github.com/${member.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors font-mono text-lg mb-4 inline-block"
                >
                  @{member.github}
                </a>
                
                <p className="text-[#FF82B4] font-medium mb-4">{member.role}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <a 
                    href={`https://github.com/${member.github}?tab=repositories`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="font-bold text-primary">{githubData?.public_repos || member.contributions.length}</span>
                    <span>repositories</span>
                  </a>
                  <a 
                    href={`https://github.com/${member.github}?tab=followers`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="font-bold text-primary">{githubData?.followers || 0}</span>
                    <span>followers</span>
                  </a>
                  <a 
                    href={`https://github.com/${member.github}?tab=following`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="font-bold text-primary">{githubData?.following || 0}</span>
                    <span>following</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className={`${instrumentSerif.className} text-lg text-muted-foreground leading-relaxed`}>
                {githubData?.bio || member.bio}
              </p>
            </div>

            {(githubData?.location || githubData?.company || githubData?.blog) && (
              <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-4 text-sm">
                {githubData?.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FaMapMarkerAlt className="text-[#FF82B4]" />
                    <span>{githubData.location}</span>
                  </div>
                )}
                {githubData?.company && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FaBuilding className="text-[#FF82B4]" />
                    <span>{githubData.company}</span>
                  </div>
                )}
                {githubData?.created_at && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FaCalendar className="text-[#FF82B4]" />
                    <span>Joined {new Date(githubData.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-card/50 border border-border rounded-2xl p-8 mb-8">
            <h2 className={`${instrumentSerif.className} text-2xl font-[900] text-primary italic mb-6`}
                style={{ fontWeight: 900 }}>
              Contributions
            </h2>
            <div className="flex flex-wrap gap-3">
              {member.contributions.map((contribution, idx) => (
                <span 
                  key={idx} 
                  className="px-4 py-2 bg-accent/50 rounded-lg text-foreground font-medium"
                >
                  {contribution}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-card/50 border border-border rounded-2xl p-8 mb-8">
            <h2 className={`${instrumentSerif.className} text-2xl font-[900] text-primary italic mb-6`}
                style={{ fontWeight: 900 }}>
              Connect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {member.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent/50 text-muted-foreground hover:text-primary hover:bg-accent transition-all border border-transparent hover:border-border"
                >
                  <span className="text-[#FF82B4] flex-shrink-0">{socialIcons[social.platform.toLowerCase()] || miscIcons[social.platform.toLowerCase()] || <span className="text-lg font-bold">#</span>}</span>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-sm block truncate">{social.username}</span>
                    <span className="text-xs text-muted-foreground/70">{social.platform}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {repos.length > 0 && (
            <div className="bg-card/50 border border-border rounded-2xl p-8">
              <h2 className={`${instrumentSerif.className} text-2xl font-[900] text-primary italic mb-6`}
                  style={{ fontWeight: 900 }}>
                Recent Repositories
              </h2>
              <div className="space-y-4">
                {repos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-lg bg-accent/30 hover:bg-accent/50 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground group-hover:text-[#FF82B4] transition-colors mb-1">
                          {repo.name}
                        </h3>
                        {repo.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {repo.description}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground flex-shrink-0">
                        {repo.stargazers_count > 0 && (
                          <span className="flex items-center gap-1">
                            <FaStar className="text-[#FF82B4]" />
                            {repo.stargazers_count}
                          </span>
                        )}
                        <span className="px-2 py-1 rounded bg-accent/50">
                          {repo.language || "Unknown"}
                        </span>
                        {repo.license && (
                          <span className="px-2 py-1 rounded-full bg-accent/50 text-foreground border border-border/50 font-medium">
                            {getSpdxId(repo.license)}
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
