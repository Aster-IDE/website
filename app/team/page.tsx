import type { Metadata } from "next";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import CherryBlossom from "@/components/CherryBlossom";
import { FaCode, FaStar, FaMapMarkerAlt, FaGithub } from "react-icons/fa";
import { socialIcons, miscIcons } from "../icons/icons";
import Image from "next/image";
import teamData from "./team.json";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "AsterIDE::Team",
  description: "The main developers of AsterIDE.",
  other: {
    "theme-color": "#c33769",
  },
};

interface GitHubUserData {
  name: string | null;
  public_repos: number;
  location: string | null;
  followers: number;
  following: number;
}

async function fetchGitHubData(username: string): Promise<GitHubUserData | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 1800 }
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return {
      name: data.name || null,
      public_repos: data.public_repos || 0,
      location: data.location || null,
      followers: data.followers || 0,
      following: data.following || 0
    };
  } catch {
    return null;
  }
}

export default async function Team() {
  const membersWithGitHubData = await Promise.all(
    teamData.members.map(async (member) => {
      const githubData = await fetchGitHubData(member.github);
      return {
        ...member,
        githubData
      };
    })
  );

  return (
    <div className="flex flex-col flex-1 relative">
      <CherryBlossom count={25} />
      <section className="px-4 py-12 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Home
            </Link>
          </div>

          <h1
            className={`${instrumentSerif.className} text-5xl font-[900] tracking-tight text-primary italic mb-4 sm:text-6xl`}
            style={{ fontWeight: 900 }}
          >
            Meet the Team
          </h1>
          <p className={`${instrumentSerif.className} mb-12 text-xl text-muted-foreground`}>
            The main developers of AsterIDE.
          </p>
          
          <div className="space-y-6 mb-20">
            {membersWithGitHubData.map((member, index) => (
              <Link 
                key={index} 
                href={`/team/${member.github}`}
                className={`group block bg-card/50 border p-6 hover:bg-accent/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${
                  member.founder 
                    ? 'border-[#FF82B4]/50 rounded-2xl shadow-[0_0_20px_rgba(255,130,180,0.1)]' 
                    : 'border-border rounded-xl'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={`https://github.com/${member.github}.png`}
                        alt={`${member.github}'s avatar`}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full transition-transform duration-300 group-hover:scale-105"
                      />
                      {member.founder && (
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#FF82B4] to-[#FF6B9D] rounded-full flex items-center justify-center shadow-lg">
                          <FaStar className="text-white text-sm" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-[#FF82B4] transition-colors duration-300">
                        {member.github}
                        {member.githubData?.name && member.githubData.name !== member.github && (
                          <span className="text-muted-foreground font-normal"> ({member.githubData.name})</span>
                        )}
                      </h3>
                      <p className="text-sm text-[#FF82B4] font-medium mb-3">{member.role}</p>
                      
                      {member.githubData && (
                        <div className="flex items-center gap-4 mb-4 text-xs">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <span className="font-bold text-primary">{member.githubData.public_repos}</span>
                            <span>repos</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <span className="font-bold text-primary">{member.githubData.followers}</span>
                            <span>followers</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <span className="font-bold text-primary">{member.githubData.following}</span>
                            <span>following</span>
                          </div>
                          {member.githubData.location && (
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <FaMapMarkerAlt className="text-[#FF82B4] text-xs" />
                              <span>{member.githubData.location}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {member.bio}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {member.contributions.map((contribution, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-1 bg-accent/50 text-xs rounded-md text-muted-foreground font-medium"
                          >
                            {contribution}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 md:pl-8 md:border-l border-border md:min-w-[140px]">
                    {member.socials.slice(0, 3).map((social, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground"
                        title={`${social.platform}: ${social.username}`}
                      >
                        <span className="text-[#FF82B4]">{socialIcons[social.platform.toLowerCase()] || miscIcons[social.platform.toLowerCase()] || <span className="text-lg font-bold">#</span>}</span>
                        <span className="text-sm font-mono">{social.username}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF82B4]/10 to-primary/10 rounded-3xl"></div>
            <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur border border-border/50 rounded-3xl p-8 text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <FaCode className="text-[#FF82B4] text-xl" />
                <span className="text-sm font-mono uppercase tracking-wider text-muted-foreground">Join Us</span>
                <FaCode className="text-[#FF82B4] text-xl" />
              </div>
              <h2 className={`${instrumentSerif.className} mb-4 text-3xl font-[900] text-primary not-italic`}
                  style={{ fontWeight: 900, fontStyle: "normal" }}>
                Want to Contribute?
              </h2>
              <p className={`${instrumentSerif.className} mb-8 max-w-2xl mx-auto text-lg text-muted-foreground`}>
                We&apos;re always looking for more devs who believe in simplicity and good software design. 
                Whether you&apos;re a developer, or designer or whatever else, there&apos;s a place for you.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <a
                  href="https://github.com/Aster-IDE/AsterIDE/blob/master/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-[#FF82B4] text-white px-6 py-3 font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <FaGithub />
                  Contributing Guidelines
                </a>
                <a
                  href="https://github.com/Aster-IDE/AsterIDE/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-primary text-primary px-6 py-3 font-medium transition-all duration-300 hover:bg-primary hover:text-background"
                >
                  <FaStar />
                  Find Issues
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
