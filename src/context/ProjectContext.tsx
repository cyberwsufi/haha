import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Project, ProjectRole } from '../types/project';
import { mockProjects } from '../mock/projects';

export interface ProjectApplication {
  id: string;
  projectId: string;
  projectTitle: string;
  roleId: string;
  roleTitle: string;
  applicantId: string;
  pitch: string;
  portfolioLinks: string;
  appliedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface ProjectContextValue {
  projects: Project[];
  bookmarkedProjectIds: string[];
  likedProjectIds: string[];
  myApplications: ProjectApplication[];
  createProject: (newProject: Omit<Project, 'id' | 'createdAt' | 'likesCount'>) => Project;
  toggleBookmark: (projectId: string) => void;
  toggleLike: (projectId: string) => void;
  applyForRole: (projectId: string, roleId: string, pitch: string, portfolioLinks: string) => void;
  isBookmarked: (projectId: string) => boolean;
  isLiked: (projectId: string) => boolean;
  hasAppliedForRole: (projectId: string, roleId: string) => boolean;
}

const ProjectContext = createContext<ProjectContextValue | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [bookmarkedProjectIds, setBookmarkedProjectIds] = useState<string[]>(['proj-2', 'proj-7']);
  const [likedProjectIds, setLikedProjectIds] = useState<string[]>(['proj-1', 'proj-5']);
  const [myApplications, setMyApplications] = useState<ProjectApplication[]>([
    {
      id: 'app-1',
      projectId: 'proj-3',
      projectTitle: 'ScribeAI — Research Paper Digest',
      roleId: 'role-5',
      roleTitle: 'NLP & Prompt Engineer',
      applicantId: 'std-1',
      pitch: 'I have experience building RAG pipelines with LangChain and FastAPI.',
      portfolioLinks: 'github.com/aryan/rag-engine',
      appliedAt: '2 days ago',
      status: 'pending',
    },
  ]);

  const createProject = (newProjectData: Omit<Project, 'id' | 'createdAt' | 'likesCount'>): Project => {
    const created: Project = {
      ...newProjectData,
      id: `proj-${Date.now()}`,
      createdAt: 'Just now',
      likesCount: 0,
    };
    setProjects((prev) => [created, ...prev]);
    return created;
  };

  const toggleBookmark = (projectId: string) => {
    setBookmarkedProjectIds((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]
    );
  };

  const toggleLike = (projectId: string) => {
    const isCurrentlyLiked = likedProjectIds.includes(projectId);
    setLikedProjectIds((prev) =>
      isCurrentlyLiked ? prev.filter((id) => id !== projectId) : [...prev, projectId]
    );
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, likesCount: isCurrentlyLiked ? p.likesCount - 1 : p.likesCount + 1 }
          : p
      )
    );
  };

  const applyForRole = (projectId: string, roleId: string, pitch: string, portfolioLinks: string) => {
    const project = projects.find((p) => p.id === projectId);
    const role = project?.openRoles.find((r) => r.id === roleId);
    if (!project || !role) return;

    const newApp: ProjectApplication = {
      id: `app-${Date.now()}`,
      projectId,
      projectTitle: project.title,
      roleId,
      roleTitle: role.title,
      applicantId: 'std-1',
      pitch,
      portfolioLinks,
      appliedAt: 'Just now',
      status: 'pending',
    };
    setMyApplications((prev) => [newApp, ...prev]);
  };

  const isBookmarked = (projectId: string) => bookmarkedProjectIds.includes(projectId);
  const isLiked = (projectId: string) => likedProjectIds.includes(projectId);
  const hasAppliedForRole = (projectId: string, roleId: string) =>
    myApplications.some((a) => a.projectId === projectId && a.roleId === roleId);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        bookmarkedProjectIds,
        likedProjectIds,
        myApplications,
        createProject,
        toggleBookmark,
        toggleLike,
        applyForRole,
        isBookmarked,
        isLiked,
        hasAppliedForRole,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}
