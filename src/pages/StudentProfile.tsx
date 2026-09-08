import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Mail, Globe, MapPin, Calendar, Award, Users, FolderGit2, Link as LinkIcon } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { ProjectCard } from '../components/project/ProjectCard';
import { useNetwork } from '../context/NetworkContext';
import { useAuth } from '../context/AuthContext';
import { getStudentById, mockProjects, mockClubs } from '../mock';

export function StudentProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { getConnectionStatus, sendConnectionRequest } = useNetwork();

  const student = id ? getStudentById(id) : null;

  if (!student) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <p className="text-lg text-[var(--color-text-secondary)] mb-4">Student not found</p>
          <Button variant="outline" onClick={() => navigate('/explore')}>
            Back to Explore
          </Button>
        </div>
      </PageContainer>
    );
  }

  const connectionStatus = getConnectionStatus(student.id);
  const isOwnProfile = currentUser.id === student.id;

  // Find projects this student is in
  const studentProjects = mockProjects.filter(p =>
    p.ownerId === student.id || p.teamMembers.some(m => m.studentId === student.id)
  ).slice(0, 3);

  // Sample clubs (since mock data might not have club memberships)
  const studentClubs = mockClubs.slice(0, 2);

  return (
    <PageContainer size="lg">
      {/* Profile Header */}
      <Card className="mb-8">
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <Avatar
              src={student.avatar}
              name={student.name}
              size="xl"
              status="online"
              className="flex-shrink-0"
            />

            {/* Main Info */}
            <div className="flex-1 min-w-0">
              <h1
                className="text-3xl font-bold text-[var(--color-text-primary)] mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {student.name}
              </h1>
              <p className="text-lg text-[var(--color-text-secondary)] mb-3">
                {student.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-muted)] mb-4">
                <span className="flex items-center gap-1">
                  <Award size={14} />
                  {student.major}
                </span>
                <span>•</span>
                <span>Class of {student.graduationYear}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {student.location}
                </span>
              </div>

              <div className="mb-4">
                <Badge variant="accent" size="md" dot>
                  {student.availabilityStatus}
                </Badge>
              </div>

              {/* Action Buttons */}
              {!isOwnProfile && (
                <div className="flex flex-wrap gap-3">
                  {connectionStatus === 'connected' ? (
                    <Button variant="secondary" disabled leftIcon={<Users size={16} />}>
                      Connected
                    </Button>
                  ) : connectionStatus === 'pending_sent' ? (
                    <Button variant="secondary" disabled>
                      Request Sent
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      leftIcon={<Users size={16} />}
                      onClick={() => sendConnectionRequest(student.id)}
                    >
                      Connect
                    </Button>
                  )}
                  <Button variant="outline" leftIcon={<Mail size={16} />} onClick={() => navigate('/messages')}>
                    Message
                  </Button>
                </div>
              )}

              {/* Social Links */}
              {(student.socialLinks.github || student.socialLinks.linkedin || student.socialLinks.twitter || student.socialLinks.portfolio) && (
                <div className="flex items-center gap-2 mt-4">
                  {student.socialLinks.github && (
                    <a
                      href={student.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-hover)] transition-colors text-xs"
                      title="GitHub"
                    >
                      <LinkIcon size={16} />
                    </a>
                  )}
                  {student.socialLinks.linkedin && (
                    <a
                      href={student.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-hover)] transition-colors text-xs"
                      title="LinkedIn"
                    >
                      <LinkIcon size={16} />
                    </a>
                  )}
                  {student.socialLinks.twitter && (
                    <a
                      href={student.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-hover)] transition-colors text-xs"
                      title="Twitter"
                    >
                      <LinkIcon size={16} />
                    </a>
                  )}
                  {student.socialLinks.portfolio && (
                    <a
                      href={student.socialLinks.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-hover)] transition-colors"
                      title="Portfolio"
                    >
                      <Globe size={16} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                {student.bio}
              </p>
              {student.interests.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                    Interests
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {student.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" size="sm">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Engineering', 'Design', 'Hardware', 'Business', 'Content'].map((category) => {
                  const categorySkills = student.skills.filter(s => s.category === category);
                  if (categorySkills.length === 0) return null;

                  return (
                    <div key={category}>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => {
                          const proficiencyVariant =
                            skill.proficiency === 'Expert' ? 'accent' :
                            skill.proficiency === 'Advanced' ? 'success' :
                            skill.proficiency === 'Intermediate' ? 'warning' : 'default';

                          return (
                            <Badge key={skill.name} variant={proficiencyVariant}>
                              {skill.name}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <div>
            <h3
              className="text-xl font-bold text-[var(--color-text-primary)] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Projects
            </h3>
            {studentProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-5">
                {studentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <FolderGit2 size={48} className="mx-auto mb-4 text-[var(--color-text-muted)]" />
                  <p className="text-[var(--color-text-secondary)]">No projects yet</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-text-secondary)]">Projects</span>
                  <span className="text-lg font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {student.stats.projectsCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-text-secondary)]">Connections</span>
                  <span className="text-lg font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {student.stats.connectionsCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-text-secondary)]">Reputation</span>
                  <span className="text-lg font-bold text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {student.stats.reputationScore}
                  </span>
                </div>
                <div className="pt-3 border-t border-[var(--color-border)] flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                  <Calendar size={14} />
                  <span>Joined {student.joinedDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clubs */}
          {studentClubs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Clubs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentClubs.map((club) => (
                    <Link
                      key={club.id}
                      to={`/clubs/${club.id}`}
                      className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] hover:bg-[var(--color-bg-hover)] transition-colors group"
                    >
                      <div
                        className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: club.bannerColor }}
                      >
                        {club.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate group-hover:text-[var(--color-accent)] transition-colors">
                          {club.name}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)] truncate">
                          {club.memberCount} members
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
