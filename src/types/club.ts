export type ClubCategory = 'Tech & Coding' | 'Robotics & Hardware' | 'Design & Creative' | 'E-Cell & Startups' | 'Media & Content' | 'Academic & Research';

export interface ClubLead {
  name: string;
  role: string;
  avatar: string;
  studentId: string;
}

export interface Club {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ClubCategory;
  logo: string;
  bannerColor: string;
  memberCount: number;
  leads: ClubLead[];
  activeProjectsCount: number;
  upcomingEventsCount: number;
  recruitmentOpen: boolean;
  meetingSchedule: string;
  foundedYear: number;
}
