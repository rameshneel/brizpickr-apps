import React, { useState, useEffect, useRef } from 'react';
import { cn } from './utils';
import { X } from 'lucide-react';

const Modal = React.forwardRef(
  (
    {
      className,
      children,
      isOpen,
      onClose,
      title,
      size = 'default',
      showCloseButton = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      ...props
    },
    ref
  ) => {
    const modalRef = useRef(null);

    useEffect(() => {
      const handleEscape = event => {
        if (event.key === 'Escape' && closeOnEscape) {
          onClose?.();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }, [isOpen, closeOnEscape, onClose]);

    const handleBackdropClick = event => {
      if (event.target === event.currentTarget && closeOnBackdropClick) {
        onClose?.();
      }
    };

    const sizes = {
      sm: 'max-w-sm',
      default: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'max-w-full mx-4',
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={handleBackdropClick}
        />

        {/* Modal */}
        <div
          ref={ref}
          className={cn(
            'relative z-50 w-full rounded-lg bg-background p-6 shadow-lg transition-all',
            sizes[size],
            className
          )}
          {...props}
        >
          {/* Header */}
          {title && (
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold leading-none tracking-tight">
                {title}
              </h2>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="relative">{children}</div>
        </div>
      </div>
    );
  }
);
Modal.displayName = 'Modal';

// Modal Header component
const ModalHeader = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-1.5 text-center sm:text-left',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
ModalHeader.displayName = 'ModalHeader';

// Modal Title component
const ModalTitle = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
);
ModalTitle.displayName = 'ModalTitle';

// Modal Description component
const ModalDescription = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  )
);
ModalDescription.displayName = 'ModalDescription';

// Modal Content component
const ModalContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('mt-2', className)} {...props}>
      {children}
    </div>
  )
);
ModalContent.displayName = 'ModalContent';

// Modal Footer component
const ModalFooter = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
ModalFooter.displayName = 'ModalFooter';

// Hook for managing modal state
const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};

export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  useModal,
};
