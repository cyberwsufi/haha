import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';

export function Dashboard() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
        Dashboard
      </h1>
      <p className="text-[var(--color-text-secondary)] mt-2">Your personal student workspace (Coming soon)</p>
    </PageContainer>
  );
}
