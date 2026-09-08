import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { ProjectCard } from '../components/project/ProjectCard';
import { mockProjects } from '../mock';

export function Projects() {
  return (
    <PageContainer size="lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-3xl font-bold text-[var(--color-text-primary)] mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Student Projects
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            Discover open collaboration opportunities and join innovative teams
          </p>
        </div>
        <Link to="/projects/new">
          <Button variant="primary" leftIcon={<Plus size={18} />}>
            Create Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </PageContainer>
  );
}
