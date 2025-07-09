import React from 'react';
import { cn } from './utils';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = React.forwardRef(
  (
    {
      className,
      children,
      separator = <ChevronRight className="h-4 w-4" />,
      ...props
    },
    ref
  ) => (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn(
        'flex items-center space-x-1 text-sm text-muted-foreground',
        className
      )}
      {...props}
    >
      {children}
    </nav>
  )
);
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbItem = React.forwardRef(
  ({ className, children, href, isCurrent = false, ...props }, ref) => {
    const Component = href ? 'a' : 'span';

    return (
      <li ref={ref} className={cn('flex items-center', className)} {...props}>
        <Component
          href={href}
          className={cn(
            'hover:text-foreground transition-colors',
            isCurrent && 'text-foreground font-medium',
            href && 'cursor-pointer'
          )}
          aria-current={isCurrent ? 'page' : undefined}
        >
          {children}
        </Component>
      </li>
    );
  }
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbSeparator = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <li ref={ref} className={cn('text-muted-foreground', className)} {...props}>
      {children}
    </li>
  )
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbHome = React.forwardRef(
  ({ className, href = '/', ...props }, ref) => (
    <BreadcrumbItem ref={ref} href={href} className={className} {...props}>
      <Home className="h-4 w-4" />
      <span className="sr-only">Home</span>
    </BreadcrumbItem>
  )
);
BreadcrumbHome.displayName = 'BreadcrumbHome';

export { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbHome };
