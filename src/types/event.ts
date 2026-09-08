export type EventCategory = 'Hackathon' | 'Workshop' | 'Tech Talk' | 'Networking' | 'Demo Day' | 'Competition';
export type RsvpStatus = 'none' | 'going' | 'interested' | 'not_going';

export interface Event {
  id: string;
  title: string;
  tagline: string;
  description: string;
  organizerClubId: string;
  organizerName: string;
  organizerLogo: string;
  category: EventCategory;
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  isVirtual: boolean;
  coverImage: string;
  rsvpCount: number;
  maxCapacity: number;
  tags: string[];
  prizes?: string;
  registrationUrl?: string;
}
