import React from 'react';
import { cn } from './utils';

const Switch = React.forwardRef(
  (
    { className, checked, onCheckedChange, disabled = false, id, ...props },
    ref
  ) => (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={id ? `${id}-label` : undefined}
      data-state={checked ? 'checked' : 'unchecked'}
      className={cn(
        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        className
      )}
      onClick={() => !disabled && onCheckedChange?.(!checked)}
      disabled={disabled}
      id={id}
      {...props}
    >
      <span
        className={cn(
          'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
        )}
      />
    </button>
  )
);
Switch.displayName = 'Switch';

const SwitchWithLabel = ({
  id,
  label,
  checked,
  onCheckedChange,
  disabled = false,
  className,
  description,
  ...props
}) => {
  const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
  const labelId = `${switchId}-label`;
  const descriptionId = description ? `${switchId}-description` : undefined;

  return (
    <div className={cn('flex items-start space-x-3', className)}>
      <Switch
        id={switchId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        {...props}
      />
      <div className="flex-1 space-y-1">
        <label
          id={labelId}
          htmlFor={switchId}
          className={cn(
            'text-sm font-medium leading-none cursor-pointer',
            disabled && 'cursor-not-allowed opacity-70'
          )}
        >
          {label}
        </label>
        {description && (
          <p
            id={descriptionId}
            className={cn(
              'text-sm text-muted-foreground',
              disabled && 'opacity-70'
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
SwitchWithLabel.displayName = 'SwitchWithLabel';

// Switch Group for multiple switches
const SwitchGroup = React.forwardRef(
  ({ className, children, orientation = 'vertical', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'space-y-3',
        orientation === 'horizontal' && 'flex flex-wrap gap-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
SwitchGroup.displayName = 'SwitchGroup';

export { Switch, SwitchWithLabel, SwitchGroup };
