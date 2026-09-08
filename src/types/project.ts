export type ProjectCategory = 'AI / Machine Learning' | 'Web & Mobile' | 'Robotics / IoT' | 'Design Systems' | 'FinTech / Blockchain' | 'Developer Tools' | 'Social Impact';
export type ProjectStage = 'Idea' | 'Prototype' | 'In Development' | 'Launched';

export interface ProjectRole {
  id: string;
  title: string;
  category: string;
  skillsNeeded: string[];
  spotsTotal: number;
  spotsFilled: number;
  description: string;
}

export interface TeamMember {
  studentId: string;
  name: string;
  avatar: string;
  role: string;
}

export interface ProjectLinks {
  github?: string;
  liveDemo?: string;
  figma?: string;
  devpost?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  category: ProjectCategory;
  stage: ProjectStage;
  techStack: string[];
  ownerId: string;
  owner: {
    name: string;
    avatar: string;
    major: string;
  };
  teamMembers: TeamMember[];
  openRoles: ProjectRole[];
  links: ProjectLinks;
  createdAt: string;
  likesCount: number;
}
