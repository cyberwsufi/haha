import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-[var(--tracking-wide)] text-[var(--color-text-secondary)]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-[var(--color-text-muted)] flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full text-sm px-3.5 py-2.5 rounded-[var(--radius-md)] transition-all duration-150',
              'bg-[var(--color-bg-input)] text-[var(--color-text-primary)]',
              'border border-[var(--color-border-input)]',
              'placeholder:text-[var(--color-text-muted)]',
              'focus:outline-none focus:border-[var(--color-border-input-focus)] focus:ring-1 focus:ring-[var(--color-border-input-focus)]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]',
              className
            )}
            style={{ fontFamily: 'var(--font-body)' }}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 text-[var(--color-text-muted)] flex items-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="text-xs text-[var(--color-error)] font-medium">{error}</p>
        )}
        {!error && helperText && (
          <p className="text-xs text-[var(--color-text-muted)]">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
