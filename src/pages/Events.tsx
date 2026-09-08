import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { EventCard } from '../components/event/EventCard';
import { mockEvents } from '../mock';

export function Events() {
  return (
    <PageContainer size="lg">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-[var(--color-text-primary)] mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Campus Events
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Hackathons, workshops, tech talks, and networking opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </PageContainer>
  );
}
