import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy';
}

export function Avatar({
  src,
  name,
  size = 'md',
  status,
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const getInitials = (str: string) => {
    return str
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-bold',
    xl: 'w-20 h-20 text-xl font-bold',
  };

  const statusSizes = {
    xs: 'w-1.5 h-1.5 ring-1',
    sm: 'w-2 h-2 ring-1',
    md: 'w-2.5 h-2.5 ring-2',
    lg: 'w-3.5 h-3.5 ring-2',
    xl: 'w-4 h-4 ring-2',
  };

  const statusColors = {
    online: 'bg-[var(--color-success)]',
    offline: 'bg-[var(--color-text-muted)]',
    busy: 'bg-[var(--color-error)]',
  };

  return (
    <div
      className={cn(
        'relative inline-flex flex-shrink-0 items-center justify-center rounded-full overflow-visible select-none',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'w-full h-full rounded-full overflow-hidden border border-[var(--color-border)] flex items-center justify-center bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)]',
          sizes[size]
        )}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span
            className="font-semibold tracking-wider"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {getInitials(name)}
          </span>
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-[var(--color-bg-base)]',
            statusSizes[size],
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}
