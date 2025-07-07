import React from 'react';
import { cn } from './utils';
import { Check } from 'lucide-react';

const Checkbox = React.forwardRef(
  (
    { className, checked, onCheckedChange, disabled = false, ...props },
    ref
  ) => (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={checked}
      data-state={checked ? 'checked' : 'unchecked'}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        className
      )}
      onClick={() => !disabled && onCheckedChange?.(!checked)}
      disabled={disabled}
      {...props}
    >
      <Check className="h-4 w-4 opacity-0 data-[state=checked]:opacity-100" />
    </button>
  )
);
Checkbox.displayName = 'Checkbox';

const CheckboxWithLabel = ({
  id,
  label,
  checked,
  onCheckedChange,
  disabled = false,
  className,
  ...props
}) => (
  <div className={cn('flex items-center space-x-2', className)}>
    <Checkbox
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      {...props}
    />
    <label
      htmlFor={id}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        disabled && 'cursor-not-allowed opacity-70'
      )}
    >
      {label}
    </label>
  </div>
);

export { Checkbox, CheckboxWithLabel };
