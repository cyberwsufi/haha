import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent-alt';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none',
      'focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'
    );

    const variants = {
      primary: cn(
        'bg-[var(--color-accent)] text-[var(--color-text-on-accent)] font-semibold',
        'hover:bg-[var(--color-accent-hover)] shadow-[var(--shadow-sm)] active:scale-[0.98]'
      ),
      secondary: cn(
        'bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] border border-[var(--color-border)]',
        'hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-strong)] active:scale-[0.98]'
      ),
      outline: cn(
        'bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-strong)]',
        'hover:bg-[var(--color-accent-subtle)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] active:scale-[0.98]'
      ),
      ghost: cn(
        'bg-transparent text-[var(--color-text-secondary)]',
        'hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)] active:scale-[0.98]'
      ),
      danger: cn(
        'bg-[var(--color-error)] text-white font-semibold',
        'hover:opacity-90 shadow-[var(--shadow-sm)] active:scale-[0.98]'
      ),
      'accent-alt': cn(
        'bg-[var(--color-accent-alt)] text-white font-semibold',
        'hover:bg-[var(--color-accent-alt-hover)] shadow-[var(--shadow-sm)] active:scale-[0.98]'
      ),
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 rounded-[var(--radius-sm)] gap-1.5',
      md: 'text-sm px-4 py-2 rounded-[var(--radius-md)] gap-2',
      lg: 'text-base px-6 py-3 rounded-[var(--radius-lg)] gap-2.5 font-semibold',
      icon: 'p-2 rounded-[var(--radius-md)] aspect-square',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        style={{ fontFamily: 'var(--font-body)' }}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);
Button.displayName = 'Button';
