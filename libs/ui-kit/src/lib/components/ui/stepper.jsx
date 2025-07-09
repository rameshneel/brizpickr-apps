import React from 'react';
import { cn } from './utils';
import { Check } from 'lucide-react';

const Stepper = React.forwardRef(
  ({ className, children, orientation = 'horizontal', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
Stepper.displayName = 'Stepper';

const StepperItem = React.forwardRef(
  ({ className, children, status = 'pending', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center', className)}
      data-status={status}
      {...props}
    >
      {children}
    </div>
  )
);
StepperItem.displayName = 'StepperItem';

const StepperIndicator = React.forwardRef(
  ({ className, status = 'pending', ...props }, ref) => {
    const statusStyles = {
      pending: 'border-muted-foreground/20 bg-muted text-muted-foreground',
      current: 'border-primary bg-primary text-primary-foreground',
      completed: 'border-primary bg-primary text-primary-foreground',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium',
          statusStyles[status],
          className
        )}
        {...props}
      >
        {status === 'completed' ? (
          <Check className="h-4 w-4" />
        ) : (
          <span className="text-xs">{props['data-step'] || 1}</span>
        )}
      </div>
    );
  }
);
StepperIndicator.displayName = 'StepperIndicator';

const StepperContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('ml-4 flex-1', className)} {...props}>
      {children}
    </div>
  )
);
StepperContent.displayName = 'StepperContent';

const StepperTitle = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-sm font-medium leading-none', className)}
      {...props}
    >
      {children}
    </h3>
  )
);
StepperTitle.displayName = 'StepperTitle';

const StepperDescription = React.forwardRef(
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
StepperDescription.displayName = 'StepperDescription';

const StepperSeparator = React.forwardRef(
  ({ className, orientation = 'horizontal', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex-1 border-t-2 border-muted',
        orientation === 'vertical' && 'border-l-2 border-t-0 h-8 w-0.5',
        className
      )}
      {...props}
    />
  )
);
StepperSeparator.displayName = 'StepperSeparator';

// Hook for managing stepper state
const useStepper = (initialStep = 1, totalSteps = 1) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = step => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep,
    isLastStep,
  };
};

export {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperContent,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
  useStepper,
};
