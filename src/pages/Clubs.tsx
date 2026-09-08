import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { ClubCard } from '../components/club/ClubCard';
import { mockClubs } from '../mock';

export function Clubs() {
  return (
    <PageContainer size="lg">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-[var(--color-text-primary)] mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Campus Clubs & Societies
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Join student organizations and connect with like-minded peers
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockClubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </PageContainer>
  );
}
