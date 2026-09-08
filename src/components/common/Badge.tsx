import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' | 'alt';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] border border-[var(--color-border)]',
    accent: 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-border)]',
    secondary: 'bg-[var(--color-bg-hover)] text-[var(--color-text-primary)] border border-transparent',
    success: 'bg-emerald-500/10 text-[var(--color-success)] border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-[var(--color-warning)] border border-amber-500/20',
    error: 'bg-rose-500/10 text-[var(--color-error)] border border-rose-500/20',
    outline: 'bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border-strong)]',
    alt: 'bg-[var(--color-accent-alt-subtle)] text-[var(--color-accent-alt)] border border-[var(--color-border)]',
  };

  const dotColors = {
    default: 'bg-[var(--color-text-muted)]',
    accent: 'bg-[var(--color-accent)]',
    secondary: 'bg-[var(--color-text-secondary)]',
    success: 'bg-[var(--color-success)]',
    warning: 'bg-[var(--color-warning)]',
    error: 'bg-[var(--color-error)]',
    outline: 'bg-[var(--color-text-muted)]',
    alt: 'bg-[var(--color-accent-alt)]',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 rounded-[var(--radius-sm)] gap-1',
    md: 'text-xs px-2.5 py-1 rounded-[var(--radius-md)] gap-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium select-none whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )}
      style={{ fontFamily: 'var(--font-body)' }}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[variant])} />}
      {children}
    </span>
  );
}
