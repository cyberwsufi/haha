import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';

export function Messages() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
        Messages
      </h1>
      <p className="text-[var(--color-text-secondary)] mt-2">Direct messaging system (Coming soon)</p>
    </PageContainer>
  );
}
