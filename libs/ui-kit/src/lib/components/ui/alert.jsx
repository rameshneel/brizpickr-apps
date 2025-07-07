import React from 'react';
import { cn } from './utils';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

const Alert = React.forwardRef(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
        {
          'bg-destructive/15 text-destructive border-destructive/50':
            variant === 'destructive',
          'bg-warning/15 text-warning border-warning/50': variant === 'warning',
          'bg-success/15 text-success border-success/50': variant === 'success',
          'bg-info/15 text-info border-info/50': variant === 'info',
          'bg-background text-foreground': variant === 'default',
        },
        className
      )}
      {...props}
    />
  )
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

// Alert with icons
const AlertWithIcon = ({
  variant = 'default',
  title,
  children,
  onClose,
  ...props
}) => {
  const icons = {
    default: Info,
    destructive: AlertCircle,
    warning: AlertTriangle,
    success: CheckCircle,
    info: Info,
  };

  const Icon = icons[variant];

  return (
    <Alert variant={variant} {...props}>
      <Icon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
    </Alert>
  );
};

export { Alert, AlertTitle, AlertDescription, AlertWithIcon };
