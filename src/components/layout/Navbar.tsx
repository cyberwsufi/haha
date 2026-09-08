import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Compass,
  FolderGit2,
  Users,
  Calendar,
  MessageSquare,
  PlusCircle,
  Menu,
  X,
  Search,
  Sparkles,
  Layers,
  Settings,
  User,
} from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useAuth } from '../../context/AuthContext';
import { useMessages } from '../../context/MessageContext';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { cn } from '../../utils/cn';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { totalUnreadCount } = useMessages();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Explore', href: '/explore', icon: <Compass size={18} /> },
    { label: 'Projects', href: '/projects', icon: <FolderGit2 size={18} /> },
    { label: 'Clubs', href: '/clubs', icon: <Users size={18} /> },
    { label: 'Events', href: '/events', icon: <Calendar size={18} /> },
    {
      label: 'Messages',
      href: '/messages',
      icon: <MessageSquare size={18} />,
      badge: totalUnreadCount > 0 ? totalUnreadCount : undefined,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-bg-surface)]/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Desktop Nav */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="flex items-center gap-2 group cursor-pointer select-none"
            aria-label="SkillShift Home"
          >
            <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-accent)] text-[var(--color-text-on-accent)] flex items-center justify-center font-bold text-lg shadow-[var(--shadow-sm)] group-hover:scale-105 transition-transform duration-200">
              <Sparkles size={18} />
            </div>
            <span
              className="text-xl font-bold tracking-[var(--tracking-tight)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="text-[var(--color-accent)]">Skill</span>
              <span className="text-[var(--color-text-primary)]">Shift</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] text-sm font-medium transition-all duration-150 relative',
                    active
                      ? 'text-[var(--color-accent)] bg-[var(--color-accent-subtle)] font-semibold'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]'
                  )}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {link.icon}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[var(--color-accent)] text-[var(--color-text-on-accent)]">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Search Shortcut */}
          <button
            onClick={() => navigate('/explore')}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-input)] border border-[var(--color-border-input)] rounded-[var(--radius-md)] hover:border-[var(--color-border-strong)] transition-colors w-44 justify-between"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <span className="flex items-center gap-1.5">
              <Search size={14} />
              <span>Search platform...</span>
            </span>
            <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-[var(--color-bg-elevated)] border border-[var(--color-border)]">
              /
            </kbd>
          </button>

          {/* Create Project CTA Button */}
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/projects/new')}
            leftIcon={<PlusCircle size={15} />}
            className="hidden sm:inline-flex"
          >
            Create Project
          </Button>

          {/* Theme Switcher (Preserved intact!) */}
          <ThemeSwitcher />

          {/* User Profile Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[var(--color-accent)] transition-all cursor-pointer"
              aria-label="User menu"
            >
              <Avatar
                src={currentUser.avatar}
                name={currentUser.name}
                size="sm"
                status="online"
              />
            </button>

            {profileDropdownOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-56 rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-[var(--shadow-lg)] py-1 z-50 animate-in fade-in-0 zoom-in-95"
                onMouseLeave={() => setProfileDropdownOpen(false)}
              >
                <div className="px-4 py-3 border-b border-[var(--color-border)]">
                  <p className="text-sm font-bold text-[var(--color-text-primary)] truncate">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] truncate">
                    {currentUser.major}
                  </p>
                </div>
                <Link
                  to={`/students/${currentUser.id}`}
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]"
                >
                  <User size={16} />
                  <span>My Profile</span>
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]"
                >
                  <Layers size={16} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]"
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 pt-3 pb-6 flex flex-col gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center justify-between px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium',
                  active
                    ? 'text-[var(--color-accent)] bg-[var(--color-accent-subtle)] font-semibold'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]'
                )}
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[var(--color-accent)] text-[var(--color-text-on-accent)]">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-3 mt-2 border-t border-[var(--color-border)] flex flex-col gap-2">
            <Button
              variant="primary"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/projects/new');
              }}
              leftIcon={<PlusCircle size={16} />}
              className="w-full justify-center"
            >
              Create Project
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
