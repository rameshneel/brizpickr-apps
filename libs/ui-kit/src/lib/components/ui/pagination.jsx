import React from 'react';
import { cn } from './utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <nav
      ref={ref}
      role="navigation"
      aria-label="Pagination"
      className={cn('flex items-center justify-center space-x-1', className)}
      {...props}
    >
      {children}
    </nav>
  )
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn('flex items-center space-x-1', className)}
      {...props}
    >
      {children}
    </ul>
  )
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props}>
      {children}
    </li>
  )
);
PaginationItem.displayName = 'PaginationItem';

const PaginationLink = React.forwardRef(
  (
    { className, children, isActive = false, disabled = false, ...props },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
          : 'hover:bg-accent hover:text-accent-foreground',
        'h-10 px-4 py-2',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = React.forwardRef(
  ({ className, children = 'Previous', ...props }, ref) => (
    <PaginationLink
      ref={ref}
      aria-label="Go to previous page"
      size="default"
      className={cn('gap-1 pl-2.5', className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      {children}
    </PaginationLink>
  )
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = React.forwardRef(
  ({ className, children = 'Next', ...props }, ref) => (
    <PaginationLink
      ref={ref}
      aria-label="Go to next page"
      size="default"
      className={cn('gap-1 pr-2.5', className)}
      {...props}
    >
      {children}
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  )
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden
    className={cn('flex h-10 w-10 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
));
PaginationEllipsis.displayName = 'PaginationEllipsis';

// Hook for pagination logic
const usePagination = ({
  currentPage = 1,
  totalPages = 1,
  siblingCount = 1,
  onPageChange,
}) => {
  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const getPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 3; // siblings + current + first + last
    const totalBlocks = totalNumbers + 2; // +2 for ellipsis

    if (totalPages <= totalBlocks) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      return [...range(1, leftItemCount), 'ellipsis', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      return [
        1,
        'ellipsis',
        ...range(totalPages - rightItemCount + 1, totalPages),
      ];
    }

    return [
      1,
      'ellipsis',
      ...range(leftSiblingIndex, rightSiblingIndex),
      'ellipsis',
      totalPages,
    ];
  };

  return {
    currentPage,
    totalPages,
    pageNumbers: getPageNumbers(),
    onPageChange,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
  };
};

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  usePagination,
};
