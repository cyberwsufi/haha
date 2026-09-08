import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, ArrowRight } from 'lucide-react';
import type { Club } from '../../types/club';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';

export interface ClubCardProps {
  club: Club;
}

export function ClubCard({ club }: ClubCardProps) {
  return (
    <Card interactive className="flex flex-col justify-between overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-[var(--radius-md)] border border-[var(--color-border)] flex items-center justify-center font-bold text-lg text-white"
            style={{ backgroundColor: club.bannerColor || 'var(--color-accent)' }}
          >
            {club.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge size="sm" variant="default">
              {club.category}
            </Badge>
            {club.recruitmentOpen && (
              <Badge size="sm" variant="accent" dot>
                Recruiting
              </Badge>
            )}
          </div>
        </div>

        <Link to={`/clubs/${club.id}`} className="group">
          <h4
            className="text-base font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {club.name}
          </h4>
        </Link>
        <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2 leading-relaxed">
          {club.tagline}
        </p>
      </div>

      <div className="p-5 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Users size={13} />
            <strong>{club.memberCount}</strong> members
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={13} />
            <strong>{club.upcomingEventsCount}</strong> events
          </span>
        </div>
        <Link
          to={`/clubs/${club.id}`}
          className="text-[var(--color-accent)] font-medium flex items-center gap-1 hover:underline"
        >
          <span>View</span>
          <ArrowRight size={12} />
        </Link>
      </div>
    </Card>
  );
}
