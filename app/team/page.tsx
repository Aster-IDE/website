import { Instrument_Serif } from "next/font/google";
import CherryBlossom from "@/components/CherryBlossom";
import { FaGithub, FaCode, FaHeart, FaStar } from "react-icons/fa";
import Image from "next/image";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const teamMembers = [
  {
    github: "playfairs",
    role: "Founder & Primary Maintainer",
    founder: true,
    contributions: ["Core Architecture", "Rust Implementation", "UI/UX Design", "Web Development"],
    bio: "Founded AsterIDE with the initial plan to make a silly text editor, which led to an actual project."
  },
  {
    github: "invra",
    role: "Maintainer",
    contributions: ["GitHub Workflows", "Nix Flake", "CI/CD"],
    bio: "Helps maintain the project infrastructure and helps with build systems and nix related stuff."
  },
  {
    github: "tazldied",
    role: "Web Maintainer",
    contributions: ["Windows Testing", "Quality Assurance", "UI/UX Deign", "Web Development"],
    bio: "Assured that the Windows version of AsterIDE did in fact compile, and created the blog page, and redesigned parts of the main website."
  }
];

export default function Team() {
  return (
    <div className="flex flex-col flex-1 relative">
      <CherryBlossom count={25} />
      <section className="px-4 py-20 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <FaHeart className="text-[#FF82B4] text-xl" />
              <span className="text-sm font-mono uppercase tracking-wider text-muted-foreground">The Team</span>
              <FaHeart className="text-[#FF82B4] text-xl" />
            </div>
            <h1
              className={`${instrumentSerif.className} mb-4 text-5xl font-[900] text-primary not-italic`}
              style={{ fontWeight: 900, fontStyle: "normal" }}
            >
              Meet the Team.
            </h1>
            <p className={`${instrumentSerif.className} mb-12 mx-auto max-w-2xl text-xl text-muted-foreground`}>
              The main developers of AsterIDE.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
            {teamMembers.map((member, index) => (
              <div key={index} className="group relative">
                <div className="relative bg-gradient-to-br from-card via-card to-card/50 border border-border/50 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#FF82B4] to-primary rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative">
                        <Image
                          src={`https://github.com/${member.github}.png`}
                          alt={`${member.github}'s avatar`}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-full border-4 border-background"
                        />
                        {member.founder && (
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#FF82B4] to-[#FF6B9D] rounded-full flex items-center justify-center shadow-lg">
                            <FaStar className="text-white text-sm" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
                        {member.github}
                      </h3>
                      <p className="text-sm text-[#FF82B4] font-medium">{member.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
                    {member.bio}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                      <FaCode className="text-[#FF82B4]" />
                      Contributions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.contributions.map((contribution, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gradient-to-r from-accent/50 to-accent/30 text-xs rounded-full text-muted-foreground border border-border/30">
                          {contribution}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <a
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group/link"
                  >
                    <FaGithub className="text-base group-hover/link:text-[#FF82B4] transition-colors" />
                    <span className="font-mono">@{member.github}</span>
                  </a>
                </div>
              </div>
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
