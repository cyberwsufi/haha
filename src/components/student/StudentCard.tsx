import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Check, Clock } from 'lucide-react';
import type { Student } from '../../types/student';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useNetwork } from '../../context/NetworkContext';

export interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  const { getConnectionStatus, sendConnectionRequest } = useNetwork();
  const status = getConnectionStatus(student.id);

  const availabilityBadgeVariants: Record<string, 'accent' | 'default' | 'success' | 'warning'> = {
    'Available for Projects': 'accent',
    'Hackathon Team Seeking': 'warning',
    'Open to Collaborate': 'success',
    'Busy': 'default',
  };

  return (
    <Card interactive className="flex flex-col justify-between overflow-hidden group">
      {/* Top Banner Accent */}
      <div
        className="h-16 w-full relative"
        style={{
          background: `linear-gradient(135deg, ${student.bannerColor || 'var(--color-accent)'} 0%, var(--color-bg-elevated) 100%)`,
        }}
      >
        <div className="absolute top-2.5 right-2.5">
          <Badge
            size="sm"
            variant={availabilityBadgeVariants[student.availabilityStatus] || 'default'}
            dot
          >
            {student.availabilityStatus}
          </Badge>
        </div>
      </div>

      <div className="p-5 pt-0 flex-1 flex flex-col justify-between">
        {/* Profile Info */}
        <div>
          <div className="-mt-8 mb-3 flex items-end justify-between">
            <Link to={`/students/${student.id}`}>
              <Avatar
                src={student.avatar}
                name={student.name}
                size="lg"
                status="online"
                className="ring-4 ring-[var(--color-bg-surface)] hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          <Link to={`/students/${student.id}`} className="group/name">
            <h4
              className="text-base font-bold text-[var(--color-text-primary)] group-hover/name:text-[var(--color-accent)] transition-colors line-clamp-1"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {student.name}
            </h4>
          </Link>
          <p className="text-xs text-[var(--color-text-muted)] font-medium">
            {student.major} • Class of {student.graduationYear}
          </p>

          <p className="text-xs text-[var(--color-text-secondary)] mt-2 line-clamp-2 leading-relaxed">
            {student.tagline}
          </p>

          {/* Skill Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {student.skills.slice(0, 3).map((skill) => (
              <Badge key={skill.name} size="sm" variant="default">
                {skill.name}
              </Badge>
            ))}
            {student.skills.length > 3 && (
              <Badge size="sm" variant="outline">
                +{student.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Footer Actions & Stats */}
        <div className="mt-5 pt-3.5 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-[11px] text-[var(--color-text-muted)]">
            <span>
              <strong className="text-[var(--color-text-primary)]">{student.stats.projectsCount}</strong> Projects
            </span>
            <span>
              <strong className="text-[var(--color-text-primary)]">{student.stats.connectionsCount}</strong> Network
            </span>
          </div>

          <div>
            {status === 'connected' ? (
              <Button size="sm" variant="secondary" leftIcon={<Check size={13} />} disabled>
                Connected
              </Button>
            ) : status === 'pending_sent' ? (
              <Button size="sm" variant="secondary" leftIcon={<Clock size={13} />} disabled>
                Pending
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                leftIcon={<UserPlus size={13} />}
                onClick={(e) => {
                  e.preventDefault();
                  sendConnectionRequest(student.id);
                }}
              >
                Connect
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
