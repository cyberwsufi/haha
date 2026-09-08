export type SkillCategory = 'Engineering' | 'Design' | 'Hardware' | 'Business' | 'Content';
export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type AvailabilityStatus = 'Available for Projects' | 'Busy' | 'Hackathon Team Seeking' | 'Open to Collaborate';
export type ConnectionStatus = 'none' | 'pending_sent' | 'pending_received' | 'connected';

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  portfolio?: string;
  dribbble?: string;
  devpost?: string;
}

export interface StudentStats {
  projectsCount: number;
  connectionsCount: number;
  reputationScore: number;
}

export interface Student {
  id: string;
  name: string;
  tagline: string;
  avatar: string;
  bannerColor: string;
  college: string;
  major: string;
  graduationYear: number;
  bio: string;
  location: string;
  skills: Skill[];
  interests: string[];
  socialLinks: SocialLinks;
  stats: StudentStats;
  availabilityStatus: AvailabilityStatus;
  featuredProjectId?: string;
  joinedDate: string;
}
