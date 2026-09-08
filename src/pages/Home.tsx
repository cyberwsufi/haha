import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, FolderGit2, Calendar, ArrowRight, Zap, Network, Rocket } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { StudentCard } from '../components/student/StudentCard';
import { ProjectCard } from '../components/project/ProjectCard';
import { EventCard } from '../components/event/EventCard';
import { getFeaturedStudents, getFeaturedProjects, getUpcomingEvents, mockStudents, mockProjects, mockEvents } from '../mock';

export function Home() {
  const featuredStudents = getFeaturedStudents();
  const featuredProjects = getFeaturedProjects();
  const upcomingEvents = getUpcomingEvents();

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-[var(--color-border)] bg-gradient-to-b from-[var(--color-bg-surface)] to-[var(--color-bg-base)]">
        <PageContainer size="lg" className="py-16 sm:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-full)] bg-[var(--color-accent-subtle)] border border-[var(--color-border)] mb-6">
              <Sparkles size={14} className="text-[var(--color-accent)]" />
              <span className="text-xs font-semibold text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-body)' }}>
                The Campus Network for Builders & Creators
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[var(--leading-tight)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="text-[var(--color-text-primary)]">Discover Students.</span>
              <br />
              <span className="text-[var(--color-accent)]">Collaborate. Build.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect with engineers, designers, hackers, and entrepreneurs. Find teammates, join projects, and build the next big thing together.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
              <Link to="/explore">
                <Button size="lg" variant="primary" leftIcon={<Zap size={18} />}>
                  Explore Platform
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="lg" variant="outline" leftIcon={<FolderGit2 size={18} />}>
                  Browse Projects
                </Button>
              </Link>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { label: 'Active Students', value: mockStudents.length.toString(), icon: <Users size={18} /> },
                { label: 'Live Projects', value: mockProjects.length.toString(), icon: <FolderGit2 size={18} /> },
                { label: 'Campus Events', value: mockEvents.length.toString(), icon: <Calendar size={18} /> },
                { label: 'Open Roles', value: '24+', icon: <Network size={18} /> },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-bg-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-center"
                >
                  <div className="flex items-center justify-center mb-2 text-[var(--color-accent)]">
                    {stat.icon}
                  </div>
                  <p
                    className="text-2xl font-bold text-[var(--color-text-primary)] mb-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </div>

      {/* Featured Students */}
      <PageContainer size="lg" className="py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="text-2xl font-bold text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Featured Students
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              Connect with talented builders on campus
            </p>
          </div>
          <Link to="/explore?tab=students">
            <Button variant="ghost" rightIcon={<ArrowRight size={16} />}>
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      </PageContainer>

      {/* Featured Projects */}
      <div className="bg-[var(--color-bg-surface)] border-y border-[var(--color-border)]">
        <PageContainer size="lg" className="py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                className="text-2xl font-bold text-[var(--color-text-primary)]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Open Collaboration Opportunities
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                Join teams building the next generation of student projects
              </p>
            </div>
            <Link to="/projects">
              <Button variant="ghost" rightIcon={<ArrowRight size={16} />}>
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </PageContainer>
      </div>

      {/* Upcoming Events */}
      <PageContainer size="lg" className="py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="text-2xl font-bold text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Upcoming Campus Events
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              Hackathons, workshops, and networking opportunities
            </p>
          </div>
          <Link to="/events">
            <Button variant="ghost" rightIcon={<ArrowRight size={16} />}>
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
