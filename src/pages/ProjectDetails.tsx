import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, Heart, Share2, Users, ExternalLink, Link as LinkIcon, Code, CheckCircle, AlertCircle } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';
import { useProjects } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import { getProjectById } from '../mock';

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { toggleBookmark, toggleLike, isBookmarked, isLiked, applyForRole, hasAppliedForRole } = useProjects();

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [applicationPitch, setApplicationPitch] = useState('');
  const [portfolioLinks, setPortfolioLinks] = useState('');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const project = id ? getProjectById(id) : null;

  if (!project) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <p className="text-lg text-[var(--color-text-secondary)] mb-4">Project not found</p>
          <Button variant="outline" onClick={() => navigate('/projects')}>
            Back to Projects
          </Button>
        </div>
      </PageContainer>
    );
  }

  const bookmarked = isBookmarked(project.id);
  const liked = isLiked(project.id);

  const stageBadgeVariants: Record<string, 'accent' | 'default' | 'success' | 'warning'> = {
    'Idea': 'default',
    'Prototype': 'warning',
    'In Development': 'accent',
    'Launched': 'success',
  };

  const openRolesCount = project.openRoles.reduce(
    (sum, role) => sum + (role.spotsTotal - role.spotsFilled),
    0
  );

  const handleApplyClick = (roleId: string) => {
    if (hasAppliedForRole(project.id, roleId)) {
      return;
    }
    setSelectedRoleId(roleId);
    setApplyModalOpen(true);
    setApplicationSubmitted(false);
  };

  const handleSubmitApplication = () => {
    if (!applicationPitch.trim()) return;
    applyForRole(project.id, selectedRoleId, applicationPitch, portfolioLinks);
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplyModalOpen(false);
      setApplicationPitch('');
      setPortfolioLinks('');
    }, 2000);
  };

  const selectedRole = project.openRoles.find(r => r.id === selectedRoleId);

  return (
    <PageContainer size="lg">
      {/* Back Button */}
      <button
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to Projects</span>
      </button>

      {/* Project Hero */}
      <Card className="mb-8">
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="outline">{project.category}</Badge>
                <Badge variant={stageBadgeVariants[project.stage]} dot>
                  {project.stage}
                </Badge>
              </div>

              <h1
                className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {project.title}
              </h1>

              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => toggleBookmark(project.id)}
                className="p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-hover)] transition-colors"
                aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark project'}
              >
                <Bookmark
                  size={18}
                  className={bookmarked ? 'fill-[var(--color-accent)] text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}
                />
              </button>
              <button
                onClick={() => toggleLike(project.id)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-hover)] transition-colors"
                aria-label={liked ? 'Unlike' : 'Like project'}
              >
                <Heart
                  size={18}
                  className={liked ? 'fill-[var(--color-accent-alt)] text-[var(--color-accent-alt)]' : 'text-[var(--color-text-muted)]'}
                />
                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                  {project.likesCount}
                </span>
              </button>
              <button
                className="p-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-hover)] transition-colors text-[var(--color-text-muted)]"
                aria-label="Share project"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-[var(--radius-sm)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          {(project.links.github || project.links.liveDemo || project.links.figma) && (
            <div className="flex flex-wrap items-center gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-hover)] transition-colors"
                >
                  <LinkIcon size={16} />
                  <span>View Code</span>
                </a>
              )}
              {project.links.liveDemo && (
                <a
                  href={project.links.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-hover)] transition-colors"
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
              )}
              {project.links.figma && (
                <a
                  href={project.links.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-hover)] transition-colors"
                >
                  <Code size={16} />
                  <span>Design Files</span>
                </a>
              )}
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About This Project</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {project.description}
              </p>
            </CardContent>
          </Card>

          {/* Open Roles */}
          {project.openRoles.length > 0 && (
            <div>
              <h3
                className="text-xl font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <Users size={20} />
                Open Positions ({openRolesCount})
              </h3>
              <div className="space-y-4">
                {project.openRoles.map((role) => {
                  const spotsAvailable = role.spotsTotal - role.spotsFilled;
                  const applied = hasAppliedForRole(project.id, role.id);

                  return (
                    <Card key={role.id} className="hover:border-[var(--color-border-strong)] transition-colors">
                      <CardContent className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="text-base font-bold text-[var(--color-text-primary)] mb-2">
                              {role.title}
                            </h4>
                            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                              {role.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {role.skillsNeeded.map((skill) => (
                                <Badge key={skill} variant="accent" size="sm">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-[var(--color-text-muted)]">
                              {spotsAvailable} {spotsAvailable === 1 ? 'spot' : 'spots'} available
                            </p>
                          </div>

                          <Button
                            variant={applied ? 'secondary' : 'primary'}
                            size="sm"
                            onClick={() => handleApplyClick(role.id)}
                            disabled={applied || spotsAvailable === 0}
                            leftIcon={applied ? <CheckCircle size={14} /> : undefined}
                          >
                            {applied ? 'Applied' : spotsAvailable === 0 ? 'Filled' : 'Apply'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle>Team ({project.teamMembers.length + 1})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Project Owner */}
                <Link
                  to={`/students/${project.ownerId}`}
                  className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] hover:bg-[var(--color-bg-hover)] transition-colors group"
                >
                  <Avatar
                    src={project.owner.avatar}
                    name={project.owner.name}
                    size="sm"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                      {project.owner.name}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Project Lead • {project.owner.major}
                    </p>
                  </div>
                  <Badge variant="accent" size="sm">Lead</Badge>
                </Link>

                {/* Team Members */}
                {project.teamMembers.map((member) => (
                  <Link
                    key={member.studentId}
                    to={`/students/${member.studentId}`}
                    className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] hover:bg-[var(--color-bg-hover)] transition-colors group"
                  >
                    <Avatar
                      src={member.avatar}
                      name={member.name}
                      size="sm"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                        {member.name}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {member.role}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Project Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-text-secondary)]">Team Size</span>
                  <span className="text-lg font-bold text-[var(--color-text-primary)]">
                    {project.teamMembers.length + 1}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-text-secondary)]">Open Roles</span>
                  <span className="text-lg font-bold text-[var(--color-accent)]">
                    {openRolesCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-text-secondary)]">Likes</span>
                  <span className="text-lg font-bold text-[var(--color-text-primary)]">
                    {project.likesCount}
                  </span>
                </div>
                <div className="pt-3 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)]">
                  Started {project.createdAt}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          {openRolesCount > 0 && (
            <Card className="bg-[var(--color-accent-subtle)] border-[var(--color-accent)]">
              <CardContent className="p-5 text-center">
                <AlertCircle size={32} className="mx-auto mb-3 text-[var(--color-accent)]" />
                <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-2">
                  Join the Team!
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)] mb-4">
                  We're actively looking for talented collaborators
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    const firstOpenRole = project.openRoles.find(r =>
                      r.spotsTotal - r.spotsFilled > 0
                    );
                    if (firstOpenRole) handleApplyClick(firstOpenRole.id);
                  }}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      <Modal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title={`Apply for ${selectedRole?.title}`}
        description="Tell the team why you're a great fit for this role"
        footer={
          !applicationSubmitted ? (
            <>
              <Button variant="ghost" onClick={() => setApplyModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmitApplication}
                disabled={!applicationPitch.trim()}
              >
                Submit Application
              </Button>
            </>
          ) : null
        }
      >
        {applicationSubmitted ? (
          <div className="text-center py-8">
            <CheckCircle size={48} className="mx-auto mb-4 text-[var(--color-success)]" />
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
              Application Submitted!
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              The project lead will review your application and get back to you soon.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              label="Why are you interested?"
              placeholder="Share your motivation and what excites you about this project..."
              value={applicationPitch}
              onChange={(e) => setApplicationPitch(e.target.value)}
              helperText="Keep it concise and genuine"
            />
            <Input
              label="Portfolio Links (Optional)"
              placeholder="GitHub, Dribbble, personal site..."
              value={portfolioLinks}
              onChange={(e) => setPortfolioLinks(e.target.value)}
            />
            {selectedRole && (
              <div className="p-3 rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)]">
                <p className="text-xs font-semibold text-[var(--color-text-muted)] mb-2">
                  Required Skills:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRole.skillsNeeded.map((skill) => (
                    <Badge key={skill} variant="accent" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </PageContainer>
  );
}
