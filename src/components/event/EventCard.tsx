import React, { useState } from 'react';
import { MapPin, Trophy, Check, Plus } from 'lucide-react';
import type { Event } from '../../types/event';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

export interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [isRsvpd, setIsRsvpd] = useState(false);
  const [rsvpCount, setRsvpCount] = useState(event.rsvpCount);

  const toggleRsvp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isRsvpd) {
      setIsRsvpd(false);
      setRsvpCount((prev) => prev - 1);
    } else {
      setIsRsvpd(true);
      setRsvpCount((prev) => prev + 1);
    }
  };

  const [month, day] = event.date.split(' ');

  return (
    <Card interactive className="flex flex-col justify-between overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Date Tile */}
          <div className="w-12 h-14 rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex flex-col items-center justify-center flex-shrink-0 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
              {month}
            </span>
            <span
              className="text-lg font-bold text-[var(--color-text-primary)] leading-none mt-0.5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {day}
            </span>
          </div>

          {/* Header Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge size="sm" variant="accent">
                {event.category}
              </Badge>
              {event.isVirtual && (
                <Badge size="sm" variant="outline">
                  Virtual
                </Badge>
              )}
            </div>
            <h4
              className="text-base font-bold text-[var(--color-text-primary)] line-clamp-1"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {event.title}
            </h4>
            <p className="text-xs text-[var(--color-text-muted)]">
              By {event.organizerName}
            </p>
          </div>
        </div>

        <p className="text-xs text-[var(--color-text-secondary)] mt-3 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {event.prizes && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-[var(--color-warning)] font-semibold">
            <Trophy size={13} />
            <span>{event.prizes}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-5 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
        <div className="flex items-center gap-1 truncate">
          <MapPin size={13} />
          <span className="truncate">{event.venue}</span>
        </div>

        <Button
          size="sm"
          variant={isRsvpd ? 'secondary' : 'primary'}
          leftIcon={isRsvpd ? <Check size={13} /> : <Plus size={13} />}
          onClick={toggleRsvp}
        >
          {isRsvpd ? "RSVP'd" : `RSVP (${rsvpCount})`}
        </Button>
      </div>
    </Card>
  );
}
