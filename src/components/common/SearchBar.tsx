import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChangeValue: (val: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeValue,
  onClear,
  placeholder = 'Search students, skills, projects, clubs...',
  className,
  ...props
}: SearchBarProps) {
  return (
    <div className={cn('relative flex items-center w-full', className)}>
      <Search
        size={16}
        className="absolute left-3.5 text-[var(--color-text-muted)] pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full text-sm pl-10 pr-10 py-2.5 rounded-[var(--radius-md)] transition-all duration-150',
          'bg-[var(--color-bg-input)] text-[var(--color-text-primary)]',
          'border border-[var(--color-border-input)]',
          'placeholder:text-[var(--color-text-muted)]',
          'focus:outline-none focus:border-[var(--color-border-input-focus)] focus:ring-1 focus:ring-[var(--color-border-input-focus)]'
        )}
        style={{ fontFamily: 'var(--font-body)' }}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChangeValue('');
            onClear?.();
          }}
          className="absolute right-3 p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] rounded-full transition-colors"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
