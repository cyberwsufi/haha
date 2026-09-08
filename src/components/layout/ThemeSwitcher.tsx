import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)]',
          'border border-[var(--color-border)] bg-[var(--color-bg-surface)]',
          'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
          'hover:border-[var(--color-border-strong)] transition-all duration-200',
          'text-sm font-[var(--font-body)]'
        )}
        aria-label="Switch theme"
        aria-expanded={isOpen}
      >
        <Palette size={16} />
        <span className="hidden sm:inline">Theme</span>
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 top-full mt-2 z-50 w-72',
            'bg-[var(--color-bg-elevated)] border border-[var(--color-border)]',
            'rounded-[var(--radius-lg)] overflow-hidden',
            'shadow-[var(--shadow-lg)]'
          )}
          role="listbox"
          aria-label="Available themes"
        >
          <div className="p-3 border-b border-[var(--color-border)]">
            <p
              className="text-xs font-semibold tracking-[var(--tracking-wider)] uppercase text-[var(--color-text-muted)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Select Theme
            </p>
          </div>
          <div className="p-2 flex flex-col gap-1">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)]',
                  'text-left transition-colors duration-150',
                  theme === t.id
                    ? 'bg-[var(--color-accent-subtle)] text-[var(--color-text-primary)]'
                    : 'hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]'
                )}
                role="option"
                aria-selected={theme === t.id}
              >
                {/* Theme color preview swatch */}
                <div
                  className="w-8 h-8 rounded-[var(--radius-sm)] border border-[var(--color-border)] flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: t.preview.bgColor }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: t.preview.accentColor }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-semibold truncate"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {t.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] truncate">
                    {t.tagline}
                  </p>
                </div>

                {theme === t.id && (
                  <Check size={16} className="text-[var(--color-accent)] flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
