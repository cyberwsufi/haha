import { mockStudents } from './students';
import { mockProjects } from './projects';
import { mockClubs } from './clubs';
import { mockEvents } from './events';
import { mockConversations, mockConnectionRequests } from './conversations';

export * from './students';
export * from './projects';
export * from './clubs';
export * from './events';
export * from './conversations';

// Helper query functions
export function getStudentById(id: string) {
  return mockStudents.find((student) => student.id === id);
}

export function getProjectById(id: string) {
  return mockProjects.find((project) => project.id === id);
}

export function getClubById(id: string) {
  return mockClubs.find((club) => club.id === id);
}

export function getEventById(id: string) {
  return mockEvents.find((event) => event.id === id);
}

export function getFeaturedProjects() {
  return mockProjects.slice(0, 3);
}

export function getFeaturedStudents() {
  return mockStudents.slice(0, 4);
}

export function getUpcomingEvents() {
  return mockEvents.slice(0, 3);
}

export function searchAll(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) {
    return {
      students: mockStudents.slice(0, 4),
      projects: mockProjects.slice(0, 4),
      clubs: mockClubs.slice(0, 3),
      events: mockEvents.slice(0, 3),
    };
  }

  const matchingStudents = mockStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.major.toLowerCase().includes(q) ||
      s.skills.some((sk) => sk.name.toLowerCase().includes(q)) ||
      s.tagline.toLowerCase().includes(q)
  );

  const matchingProjects = mockProjects.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.techStack.some((t) => t.toLowerCase().includes(q)) ||
      p.openRoles.some((r) => r.title.toLowerCase().includes(q))
  );

  const matchingClubs = mockClubs.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.tagline.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
  );

  const matchingEvents = mockEvents.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.tagline.toLowerCase().includes(q) ||
      e.tags.some((t) => t.toLowerCase().includes(q)) ||
      e.category.toLowerCase().includes(q)
  );

  return {
    students: matchingStudents,
    projects: matchingProjects,
    clubs: matchingClubs,
    events: matchingEvents,
  };
}
