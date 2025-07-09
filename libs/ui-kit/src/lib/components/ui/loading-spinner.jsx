import React from 'react';
import { cn } from './utils';

const LoadingSpinner = React.forwardRef(
  ({ className, size = 'default', variant = 'default', ...props }, ref) => {
    const sizes = {
      sm: 'h-4 w-4',
      default: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    };

    const variants = {
      default: 'border-primary',
      secondary: 'border-secondary-foreground',
      white: 'border-white',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'animate-spin rounded-full border-2 border-transparent border-t-current',
          sizes[size],
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
LoadingSpinner.displayName = 'LoadingSpinner';

// Loading overlay for full page or container
const LoadingOverlay = React.forwardRef(
  (
    {
      className,
      children,
      loading = false,
      text = 'Loading...',
      backdrop = true,
      ...props
    },
    ref
  ) => {
    if (!loading) return children;

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        {children}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-all duration-200',
            backdrop ? 'bg-background/80 backdrop-blur-sm' : 'bg-transparent'
          )}
        >
          <div className="flex flex-col items-center space-y-3 p-4 rounded-lg bg-background/90 shadow-lg border">
            <LoadingSpinner size="lg" />
            {text && (
              <p className="text-sm text-muted-foreground font-medium">
                {text}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);
LoadingOverlay.displayName = 'LoadingOverlay';

// Skeleton loading component
const Skeleton = React.forwardRef(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-muted',
      primary: 'bg-primary/10',
      secondary: 'bg-secondary',
    };

    return (
      <div
        ref={ref}
        className={cn('animate-pulse rounded-md', variants[variant], className)}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';

// Skeleton components for common use cases
const SkeletonText = React.forwardRef(
  ({ className, lines = 1, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4', i === lines - 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  )
);
SkeletonText.displayName = 'SkeletonText';

const SkeletonAvatar = React.forwardRef(
  ({ className, size = 'default', ...props }, ref) => {
    const sizes = {
      sm: 'h-8 w-8',
      default: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    };

    return (
      <Skeleton
        ref={ref}
        className={cn('rounded-full', sizes[size], className)}
        {...props}
      />
    );
  }
);
SkeletonAvatar.displayName = 'SkeletonAvatar';

const SkeletonButton = React.forwardRef(
  ({ className, size = 'default', ...props }, ref) => {
    const sizes = {
      sm: 'h-8 px-3',
      default: 'h-10 px-4',
      lg: 'h-12 px-6',
    };

    return (
      <Skeleton
        ref={ref}
        className={cn('rounded-md', sizes[size], className)}
        {...props}
      />
    );
  }
);
SkeletonButton.displayName = 'SkeletonButton';

export {
  LoadingSpinner,
  LoadingOverlay,
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
};
