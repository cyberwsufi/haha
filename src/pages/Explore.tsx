import React, { useState, useMemo } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { SearchBar } from '../components/common/SearchBar';
import { Tabs } from '../components/common/Tabs';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { StudentCard } from '../components/student/StudentCard';
import { ProjectCard } from '../components/project/ProjectCard';
import { ClubCard } from '../components/club/ClubCard';
import { EventCard } from '../components/event/EventCard';
import { mockStudents, mockProjects, mockClubs, mockEvents } from '../mock';
import { Filter, X, SlidersHorizontal } from 'lucide-react';

export function Explore() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Student filters
  const [studentSkillFilter, setStudentSkillFilter] = useState<string[]>([]);
  const [studentDeptFilter, setStudentDeptFilter] = useState<string[]>([]);

  // Project filters
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string[]>([]);
  const [projectStageFilter, setProjectStageFilter] = useState<string[]>([]);
  const [projectTechFilter, setProjectTechFilter] = useState<string[]>([]);

  // Club filters
  const [clubCategoryFilter, setClubCategoryFilter] = useState<string[]>([]);

  // Event filters
  const [eventCategoryFilter, setEventCategoryFilter] = useState<string[]>([]);
  const [eventFormatFilter, setEventFormatFilter] = useState<'all' | 'virtual' | 'in-person'>('all');

  // Extract unique filter values
  const uniqueSkills = useMemo(() => {
    const skills = new Set<string>();
    mockStudents.forEach(s => s.skills.forEach(sk => skills.add(sk.name)));
    return Array.from(skills).sort().slice(0, 15);
  }, []);

  const uniqueDepts = useMemo(() => {
    const depts = new Set<string>();
    mockStudents.forEach(s => depts.add(s.major));
    return Array.from(depts).sort();
  }, []);

  const uniqueProjectCategories = useMemo(() => {
    const cats = new Set<string>();
    mockProjects.forEach(p => cats.add(p.category));
    return Array.from(cats).sort();
  }, []);

  const uniqueProjectStages = ['Idea', 'Prototype', 'In Development', 'Launched'];

  const uniqueTech = useMemo(() => {
    const tech = new Set<string>();
    mockProjects.forEach(p => p.techStack.forEach(t => tech.add(t)));
    return Array.from(tech).sort().slice(0, 20);
  }, []);

  const uniqueClubCategories = useMemo(() => {
    const cats = new Set<string>();
    mockClubs.forEach(c => cats.add(c.category));
    return Array.from(cats).sort();
  }, []);

  const uniqueEventCategories = useMemo(() => {
    const cats = new Set<string>();
    mockEvents.forEach(e => cats.add(e.category));
    return Array.from(cats).sort();
  }, []);

  // Filter logic
  const filteredStudents = useMemo(() => {
    return mockStudents.filter(student => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          student.name.toLowerCase().includes(q) ||
          student.tagline.toLowerCase().includes(q) ||
          student.major.toLowerCase().includes(q) ||
          student.skills.some(s => s.name.toLowerCase().includes(q));
        if (!matches) return false;
      }
      if (studentSkillFilter.length > 0) {
        const hasSkill = studentSkillFilter.some(skill =>
          student.skills.some(s => s.name === skill)
        );
        if (!hasSkill) return false;
      }
      if (studentDeptFilter.length > 0 && !studentDeptFilter.includes(student.major)) {
        return false;
      }
      return true;
    });
  }, [searchQuery, studentSkillFilter, studentDeptFilter]);

  const filteredProjects = useMemo(() => {
    return mockProjects.filter(project => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          project.title.toLowerCase().includes(q) ||
          project.tagline.toLowerCase().includes(q) ||
          project.category.toLowerCase().includes(q) ||
          project.techStack.some(t => t.toLowerCase().includes(q));
        if (!matches) return false;
      }
      if (projectCategoryFilter.length > 0 && !projectCategoryFilter.includes(project.category)) {
        return false;
      }
      if (projectStageFilter.length > 0 && !projectStageFilter.includes(project.stage)) {
        return false;
      }
      if (projectTechFilter.length > 0) {
        const hasTech = projectTechFilter.some(tech =>
          project.techStack.includes(tech)
        );
        if (!hasTech) return false;
      }
      return true;
    });
  }, [searchQuery, projectCategoryFilter, projectStageFilter, projectTechFilter]);

  const filteredClubs = useMemo(() => {
    return mockClubs.filter(club => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          club.name.toLowerCase().includes(q) ||
          club.tagline.toLowerCase().includes(q) ||
          club.category.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (clubCategoryFilter.length > 0 && !clubCategoryFilter.includes(club.category)) {
        return false;
      }
      return true;
    });
  }, [searchQuery, clubCategoryFilter]);

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          event.title.toLowerCase().includes(q) ||
          event.tagline.toLowerCase().includes(q) ||
          event.category.toLowerCase().includes(q) ||
          event.tags.some(t => t.toLowerCase().includes(q));
        if (!matches) return false;
      }
      if (eventCategoryFilter.length > 0 && !eventCategoryFilter.includes(event.category)) {
        return false;
      }
      if (eventFormatFilter === 'virtual' && !event.isVirtual) return false;
      if (eventFormatFilter === 'in-person' && event.isVirtual) return false;
      return true;
    });
  }, [searchQuery, eventCategoryFilter, eventFormatFilter]);

  const tabs = [
    { id: 'all', label: 'All', count: filteredStudents.length + filteredProjects.length + filteredClubs.length + filteredEvents.length },
    { id: 'students', label: 'Students', count: filteredStudents.length },
    { id: 'projects', label: 'Projects', count: filteredProjects.length },
    { id: 'clubs', label: 'Clubs', count: filteredClubs.length },
    { id: 'events', label: 'Events', count: filteredEvents.length },
  ];

  const clearAllFilters = () => {
    setSearchQuery('');
    setStudentSkillFilter([]);
    setStudentDeptFilter([]);
    setProjectCategoryFilter([]);
    setProjectStageFilter([]);
    setProjectTechFilter([]);
    setClubCategoryFilter([]);
    setEventCategoryFilter([]);
    setEventFormatFilter('all');
  };

  const hasActiveFilters =
    searchQuery ||
    studentSkillFilter.length > 0 ||
    studentDeptFilter.length > 0 ||
    projectCategoryFilter.length > 0 ||
    projectStageFilter.length > 0 ||
    projectTechFilter.length > 0 ||
    clubCategoryFilter.length > 0 ||
    eventCategoryFilter.length > 0 ||
    eventFormatFilter !== 'all';

  return (
    <PageContainer size="lg">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-[var(--color-text-primary)] mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Explore SkillShift
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Discover students, projects, clubs, and events across campus
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChangeValue={setSearchQuery}
              placeholder="Search by name, skill, tech stack, or keyword..."
            />
          </div>
          <Button
            variant={showFilters ? 'primary' : 'outline'}
            leftIcon={<SlidersHorizontal size={16} />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
            {activeTab === 'all' && (
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Select a specific tab to see category filters
              </p>
            )}

            {(activeTab === 'students' || activeTab === 'all') && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                  <Filter size={14} />
                  Student Filters
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {uniqueSkills.slice(0, 10).map(skill => (
                        <button
                          key={skill}
                          onClick={() =>
                            setStudentSkillFilter(prev =>
                              prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
                            )
                          }
                          className={`text-xs px-2.5 py-1 rounded-[var(--radius-sm)] border transition-colors ${
                            studentSkillFilter.includes(skill)
                              ? 'bg-[var(--color-accent-subtle)] border-[var(--color-accent)] text-[var(--color-accent)]'
                              : 'bg-[var(--color-bg-elevated)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] mb-2">Department</p>
                    <div className="flex flex-wrap gap-2">
                      {uniqueDepts.slice(0, 6).map(dept => (
                        <button
                          key={dept}
                          onClick={() =>
                            setStudentDeptFilter(prev =>
                              prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
                            )
                          }
                          className={`text-xs px-2.5 py-1 rounded-[var(--radius-sm)] border transition-colors ${
                            studentDeptFilter.includes(dept)
                              ? 'bg-[var(--color-accent-subtle)] border-[var(--color-accent)] text-[var(--color-accent)]'
                              : 'bg-[var(--color-bg-elevated)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]'
                          }`}
                        >
                          {dept.split(' ').slice(0, 2).join(' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                  <Filter size={14} />
                  Project Filters
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] mb-2">Category</p>
                    <div className="flex flex-wrap gap-2">
                      {uniqueProjectCategories.map(cat => (
                        <button
                          key={cat}
                          onClick={() =>
                            setProjectCategoryFilter(prev =>
                              prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                            )
                          }
                          className={`text-xs px-2.5 py-1 rounded-[var(--radius-sm)] border transition-colors ${
                            projectCategoryFilter.includes(cat)
                              ? 'bg-[var(--color-accent-subtle)] border-[var(--color-accent)] text-[var(--color-accent)]'
                              : 'bg-[var(--color-bg-elevated)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]'
                          }`}
                        >
                          {cat.split(' ').slice(0, 2).join(' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] mb-2">Stage</p>
                    <div className="flex flex-wrap gap-2">
                      {uniqueProjectStages.map(stage => (
                        <button
                          key={stage}
                          onClick={() =>
                            setProjectStageFilter(prev =>
                              prev.includes(stage) ? prev.filter(s => s !== stage) : [...prev, stage]
                            )
                          }
                          className={`text-xs px-2.5 py-1 rounded-[var(--radius-sm)] border transition-colors ${
                            projectStageFilter.includes(stage)
                              ? 'bg-[var(--color-accent-subtle)] border-[var(--color-accent)] text-[var(--color-accent)]'
                              : 'bg-[var(--color-bg-elevated)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]'
                          }`}
                        >
                          {stage}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] mb-2">Technology</p>
                    <div className="flex flex-wrap gap-2">
                      {uniqueTech.slice(0, 8).map(tech => (
                        <button
                          key={tech}
                          onClick={() =>
                            setProjectTechFilter(prev =>
                              prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
                            )
                          }
                          className={`text-xs px-2.5 py-1 rounded-[var(--radius-sm)] border transition-colors font-mono ${
                            projectTechFilter.includes(tech)
                              ? 'bg-[var(--color-accent-subtle)] border-[var(--color-accent)] text-[var(--color-accent)]'
                              : 'bg-[var(--color-bg-elevated)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]'
                          }`}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'clubs' && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                  <Filter size={14} />
                  Club Filters
                </h4>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] mb-2">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {uniqueClubCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() =>
                          setClubCategoryFilter(prev =>
                            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                          )
                        }
                        className={`text-xs px-2.5 py-1 rounded-[var(--radius-sm)] border transition-colors ${
                          clubCategoryFilter.includes(cat)
                            ? 'bg-[var(--color-accent-subtle)] border-[var(--color-accent)] text-[var(--color-accent)]'
                            : 'bg-[var(--color-bg-elevated)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                  <Filter size={14} />
                  Event Filters
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] mb-2">Category</p>
                    <div className="flex flex-wrap gap-2">
                      {uniqueEventCategories.map(cat => (
                        <button
                          key={cat}
                          onClick={() =>
                            setEventCategoryFilter(prev =>
                              prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                            )
                          }
                          className={`text-xs px-2.5 py-1 rounded-[var(--radius-sm)] border transition-colors ${
                            eventCategoryFilter.includes(cat)
                              ? 'bg-[var(--color-accent-subtle)] border-[var(--color-accent)] text-[var(--color-accent)]'
                              : 'bg-[var(--color-bg-elevated)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] mb-2">Format</p>
                    <div className="flex gap-2">
                      {['all', 'virtual', 'in-person'].map(format => (
                        <button
                          key={format}
                          onClick={() => setEventFormatFilter(format as any)}
                          className={`text-xs px-2.5 py-1 rounded-[var(--radius-sm)] border transition-colors capitalize ${
                            eventFormatFilter === format
                              ? 'bg-[var(--color-accent-subtle)] border-[var(--color-accent)] text-[var(--color-accent)]'
                              : 'bg-[var(--color-bg-elevated)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]'
                          }`}
                        >
                          {format}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {hasActiveFilters && (
              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {tabs.find(t => t.id === activeTab)?.count || 0} results
                </p>
                <Button variant="ghost" size="sm" leftIcon={<X size={14} />} onClick={clearAllFilters}>
                  Clear All
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-8" />

      {(activeTab === 'all' || activeTab === 'students') && (
        <div className="mb-12">
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Students
          </h3>
          {filteredStudents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredStudents.slice(0, activeTab === 'all' ? 4 : undefined).map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[var(--color-text-secondary)]">
              No students found
            </div>
          )}
        </div>
      )}

      {(activeTab === 'all' || activeTab === 'projects') && (
        <div className="mb-12">
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Projects
          </h3>
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.slice(0, activeTab === 'all' ? 3 : undefined).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[var(--color-text-secondary)]">
              No projects found
            </div>
          )}
        </div>
      )}

      {(activeTab === 'all' || activeTab === 'clubs') && (
        <div className="mb-12">
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Clubs
          </h3>
          {filteredClubs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredClubs.slice(0, activeTab === 'all' ? 3 : undefined).map((club) => (
                <ClubCard key={club.id} club={club} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[var(--color-text-secondary)]">
              No clubs found
            </div>
          )}
        </div>
      )}

      {(activeTab === 'all' || activeTab === 'events') && (
        <div className="mb-12">
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Events
          </h3>
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEvents.slice(0, activeTab === 'all' ? 3 : undefined).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[var(--color-text-secondary)]">
              No events found
            </div>
          )}
        </div>
      )}
    </PageContainer>
  );
}
