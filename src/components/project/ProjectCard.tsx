import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Heart, ArrowUpRight } from 'lucide-react';
import type { Project } from '../../types/project';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';
import { useProjects } from '../../context/ProjectContext';

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { toggleBookmark, toggleLike, isBookmarked, isLiked } = useProjects();
  const bookmarked = isBookmarked(project.id);
  const liked = isLiked(project.id);

  const stageBadgeVariants: Record<string, 'accent' | 'default' | 'success' | 'warning'> = {
    'Idea': 'default',
    'Prototype': 'warning',
    'In Development': 'accent',
    'Launched': 'success',
  };

  const openRolesCount = project.openRoles.reduce(
    (sum, role) => sum + (role.spotsTotal - role.spotsFilled),
    0
  );

  return (
    <Card interactive className="flex flex-col justify-between overflow-hidden">
      <div className="p-5 pb-3">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge size="sm" variant="outline">
            {project.category}
          </Badge>
          <div className="flex items-center gap-1.5">
            <Badge size="sm" variant={stageBadgeVariants[project.stage] || 'default'} dot>
              {project.stage}
            </Badge>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleBookmark(project.id);
              }}
              className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
              aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark project'}
            >
              <Bookmark
                size={16}
                className={bookmarked ? 'fill-[var(--color-accent)] text-[var(--color-accent)]' : ''}
              />
            </button>
          </div>
        </div>

        {/* Title & Tagline */}
        <Link to={`/projects/${project.id}`} className="group">
          <h4
            className="text-base font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors flex items-center justify-between"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="line-clamp-1">{project.title}</span>
            <ArrowUpRight size={15} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-accent)]" />
          </h4>
        </Link>
        <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2 py-0.5 rounded-[var(--radius-sm)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] font-mono"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="text-[11px] px-1.5 py-0.5 rounded-[var(--radius-sm)] text-[var(--color-text-muted)] font-mono">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Open Roles Callout */}
      {openRolesCount > 0 && (
        <div className="mx-5 my-1 p-2.5 rounded-[var(--radius-md)] bg-[var(--color-accent-subtle)] border border-[var(--color-border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            <span className="text-xs font-semibold text-[var(--color-text-primary)]">
              {openRolesCount} Open {openRolesCount === 1 ? 'Role' : 'Roles'}
            </span>
          </div>
          <span className="text-[11px] text-[var(--color-accent)] font-medium">
            Join Team →
          </span>
        </div>
      )}

      {/* Footer: Team Stack & Likes */}
      <div className="p-5 pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
        {/* Team Avatars */}
        <div className="flex items-center -space-x-2">
          {project.teamMembers.slice(0, 4).map((member) => (
            <Avatar
              key={member.studentId}
              src={member.avatar}
              name={member.name}
              size="xs"
              className="ring-2 ring-[var(--color-bg-surface)]"
            />
          ))}
          {project.teamMembers.length > 4 && (
            <span className="text-[10px] pl-3 font-semibold text-[var(--color-text-muted)]">
              +{project.teamMembers.length - 4}
            </span>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleLike(project.id);
          }}
          className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent-alt)] transition-colors"
        >
          <Heart
            size={14}
            className={liked ? 'fill-[var(--color-accent-alt)] text-[var(--color-accent-alt)]' : ''}
          />
          <span>{project.likesCount}</span>
        </button>
      </div>
    </Card>
  );
}
