import React, { useState, useMemo } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { SearchBar } from '../components/common/SearchBar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { StudentCard } from '../components/student/StudentCard';
import { mockStudents } from '../mock';
import { Filter, X } from 'lucide-react';

export function Students() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique values for filters
  const allSkills = useMemo(() => {
    const skillSet = new Set<string>();
    mockStudents.forEach(s => s.skills.forEach(sk => skillSet.add(sk.name)));
    return Array.from(skillSet).sort().slice(0, 20); // Top 20 skills
  }, []);

  const allDepartments = useMemo(() => {
    const deptSet = new Set<string>();
    mockStudents.forEach(s => deptSet.add(s.major));
    return Array.from(deptSet).sort();
  }, []);

  const allAvailabilityOptions = [
    'Available for Projects',
    'Hackathon Team Seeking',
    'Open to Collaborate',
    'Busy'
  ];

  // Filter students
  const filteredStudents = useMemo(() => {
    return mockStudents.filter(student => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          student.name.toLowerCase().includes(query) ||
          student.tagline.toLowerCase().includes(query) ||
          student.major.toLowerCase().includes(query) ||
          student.skills.some(s => s.name.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Skills filter
      if (selectedSkills.length > 0) {
        const hasSkill = selectedSkills.some(skill =>
          student.skills.some(s => s.name === skill)
        );
        if (!hasSkill) return false;
      }

      // Department filter
      if (selectedDepartments.length > 0) {
        if (!selectedDepartments.includes(student.major)) return false;
      }

      // Availability filter
      if (selectedAvailability.length > 0) {
        if (!selectedAvailability.includes(student.availabilityStatus)) return false;
      }

      return true;
    });
  }, [searchQuery, selectedSkills, selectedDepartments, selectedAvailability]);

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleDepartmentFilter = (dept: string) => {
    setSelectedDepartments(prev =>
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
    );
  };

  const toggleAvailabilityFilter = (status: string) => {
    setSelectedAvailability(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedSkills([]);
    setSelectedDepartments([]);
    setSelectedAvailability([]);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedSkills.length > 0 ||
    selectedDepartments.length > 0 ||
    selectedAvailability.length > 0;

  return (
    <PageContainer size="lg">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-[var(--color-text-primary)] mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Discover Students
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Connect with talented students across campus
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChangeValue={setSearchQuery}
              placeholder="Search by name, skill, or department..."
            />
          </div>
          <Button
            variant={showFilters ? 'primary' : 'outline'}
            leftIcon={<Filter size={16} />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
            {hasActiveFilters && !showFilters && (
              <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-[var(--color-accent)] text-[var(--color-text-on-accent)]">
                {[selectedSkills.length, selectedDepartments.length, selectedAvailability.length].reduce((a, b) => a + b, 0)}
              </span>
            )}
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Skills Filter */}
              <div>
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                  {allSkills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkillFilter(skill)}
                      className={`text-xs px-2.5 py-1.5 rounded-[var(--radius-md)] border transition-colors ${
                        selectedSkills.includes(skill)
                          ? 'bg-[var(--color-accent-subtle)] border-[var(--color-accent)] text-[var(--color-accent)]'
                          : 'bg-[var(--color-bg-elevated)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)]'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Department Filter */}
              <div>
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">
                  Department
                </h4>
                <div className="space-y-2">
                  {allDepartments.map(dept => (
                    <label
                      key={dept}
                      className="flex items-center gap-2 cursor-pointer text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDepartments.includes(dept)}
                        onChange={() => toggleDepartmentFilter(dept)}
                        className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                      />
                      <span className="truncate">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">
                  Availability
                </h4>
                <div className="space-y-2">
                  {allAvailabilityOptions.map(status => (
                    <label
                      key={status}
                      className="flex items-center gap-2 cursor-pointer text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAvailability.includes(status)}
                        onChange={() => toggleAvailabilityFilter(status)}
                        className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'} found
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<X size={14} />}
                  onClick={clearAllFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && !showFilters && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[var(--color-text-muted)]">
              Active filters:
            </span>
            {selectedSkills.map(skill => (
              <Badge
                key={skill}
                variant="accent"
                size="sm"
                className="cursor-pointer"
                onClick={() => toggleSkillFilter(skill)}
              >
                {skill} <X size={12} className="ml-1" />
              </Badge>
            ))}
            {selectedDepartments.map(dept => (
              <Badge
                key={dept}
                variant="accent"
                size="sm"
                className="cursor-pointer"
                onClick={() => toggleDepartmentFilter(dept)}
              >
                {dept} <X size={12} className="ml-1" />
              </Badge>
            ))}
            {selectedAvailability.map(status => (
              <Badge
                key={status}
                variant="accent"
                size="sm"
                className="cursor-pointer"
                onClick={() => toggleAvailabilityFilter(status)}
              >
                {status} <X size={12} className="ml-1" />
              </Badge>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredStudents.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-[var(--color-text-secondary)] mb-4">
            No students found matching your filters
          </p>
          <Button variant="outline" onClick={clearAllFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </PageContainer>
  );
}
