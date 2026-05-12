import {
    FaApple,
    FaGithub,
    FaStar,
    FaTiktok,
    FaMercury,
    FaGitlab,
    FaMapMarkerAlt,
    FaCalendar,
    FaBuilding,
    FaGlobe,
    FaWindows,
    FaLinux,
    FaUbuntu,
    FaFedora,
    FaAndroid,
    FaChrome,
    FaBolt,
    FaPalette,
    FaDesktop,
    FaKeyboard
} from "react-icons/fa";

import {
    SiMatrix,
    SiMercurial
} from "react-icons/si";

export const socialIcons: Record<string, React.ReactNode> = {
  github: <FaGithub className="text-lg" />,
  matrix: <SiMatrix className="text-lg" />,
  tiktok: <FaTiktok className="text-lg" />,
  gitlab: <FaGitlab className="text-lg" />,
  website: <FaGlobe className="text-lg" />,
  mercurial: <SiMercurial className="text-lg" />
};

export const miscIcons: Record<string, React.ReactNode> = {
    'playfairs.cc': <FaGlobe className="text-lg" />,
    bolt: <FaBolt className="text-lg" />,
    palette: <FaPalette className="text-lg" />,
    desktop: <FaDesktop className="text-lg" />,
    keyboard: <FaKeyboard className="text-lg" />
};

export const osIcons: Record<string, React.ReactNode> = {
    apple: <FaApple className="text-lg" />,
    windows: <FaWindows className="text-lg" />,
    linux: <FaLinux className="text-lg" />,
    ubuntu: <FaUbuntu className="text-lg" />,
    fedora: <FaFedora className="text-lg" />,
    android: <FaAndroid className="text-lg" />,
    chromeos: <FaChrome className="text-lg" />
}

export const FaGithubIcon = FaGithub;
export const FaStarIcon = FaStar;
export const FaTiktokIcon = FaTiktok;
export const FaMercuryIcon = FaMercury;
export const FaGitlabIcon = FaGitlab;
export const FaMapMarkerAltIcon = FaMapMarkerAlt;
export const FaCalendarIcon = FaCalendar;
export const FaBuildingIcon = FaBuilding;
export const FaGlobeIcon = FaGlobe;
export const SiMatrixIcon = SiMatrix;
