import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function Footer() {
  const { theme, themes } = useTheme();
  const currentTheme = themes.find((t) => t.id === theme);

  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-bg-surface)] transition-colors duration-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-[var(--radius-md)] bg-[var(--color-accent)] text-[var(--color-text-on-accent)] flex items-center justify-center font-bold text-base shadow-[var(--shadow-sm)]">
                <Sparkles size={16} />
              </div>
              <span
                className="text-lg font-bold"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <span className="text-[var(--color-accent)]">Skill</span>
                <span className="text-[var(--color-text-primary)]">Shift</span>
              </span>
            </Link>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              The student collaboration and discovery network for university engineers, designers, hackers, and creators.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
              <span>Campus network active</span>
            </div>
          </div>

          {/* Links Column 1: Platform */}
          <div className="flex flex-col gap-3">
            <h4
              className="text-xs font-bold uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Platform
            </h4>
            <div className="flex flex-col gap-2 text-xs text-[var(--color-text-secondary)]">
              <Link to="/explore" className="hover:text-[var(--color-accent)] transition-colors">Explore All</Link>
              <Link to="/projects" className="hover:text-[var(--color-accent)] transition-colors">Browse Projects</Link>
              <Link to="/clubs" className="hover:text-[var(--color-accent)] transition-colors">Student Clubs</Link>
              <Link to="/events" className="hover:text-[var(--color-accent)] transition-colors">Campus Events</Link>
              <Link to="/dashboard" className="hover:text-[var(--color-accent)] transition-colors">Student Dashboard</Link>
            </div>
          </div>

          {/* Links Column 2: Collaborate */}
          <div className="flex flex-col gap-3">
            <h4
              className="text-xs font-bold uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Collaborate
            </h4>
            <div className="flex flex-col gap-2 text-xs text-[var(--color-text-secondary)]">
              <Link to="/projects/new" className="hover:text-[var(--color-accent)] transition-colors">Post Open Role</Link>
              <Link to="/profile/edit" className="hover:text-[var(--color-accent)] transition-colors">Build Profile</Link>
              <Link to="/messages" className="hover:text-[var(--color-accent)] transition-colors">Direct Messages</Link>
              <Link to="/settings" className="hover:text-[var(--color-accent)] transition-colors">Theme Showcase</Link>
            </div>
          </div>

          {/* Links Column 3: Active Theme Info */}
          <div className="flex flex-col gap-3">
            <h4
              className="text-xs font-bold uppercase tracking-[var(--tracking-wider)] text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Theme Engine
            </h4>
            <div className="p-3 rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: currentTheme?.preview.accentColor }}
                />
                <span className="text-xs font-bold text-[var(--color-text-primary)]">
                  {currentTheme?.name}
                </span>
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)]">
                {currentTheme?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]">
          <p>© 2026 SkillShift. Built for university innovators and creators.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered with <Heart size={12} className="text-[var(--color-accent)] fill-[var(--color-accent)] inline" /> for Hackathons
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
