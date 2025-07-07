import React, { createContext, useContext } from 'react';
import { cn } from './utils';
import { Circle } from 'lucide-react';

const RadioGroupContext = createContext();

const RadioGroup = React.forwardRef(
  ({ className, value, onValueChange, children, ...props }, ref) => (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div ref={ref} className={cn('grid gap-2', className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
);
RadioGroup.displayName = 'RadioGroup';

const RadioGroupItem = React.forwardRef(
  ({ className, value, disabled = false, ...props }, ref) => {
    const { value: selectedValue, onValueChange } =
      useContext(RadioGroupContext);
    const isSelected = selectedValue === value;

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={isSelected}
        data-state={isSelected ? 'checked' : 'unchecked'}
        className={cn(
          'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        onClick={() => !disabled && onValueChange?.(value)}
        disabled={disabled}
        {...props}
      >
        <Circle className="h-2.5 w-2.5 fill-current text-current opacity-0 data-[state=checked]:opacity-100" />
      </button>
    );
  }
);
RadioGroupItem.displayName = 'RadioGroupItem';

const RadioGroupItemWithLabel = ({
  id,
  value,
  label,
  disabled = false,
  className,
  ...props
}) => (
  <div className={cn('flex items-center space-x-2', className)}>
    <RadioGroupItem id={id} value={value} disabled={disabled} {...props} />
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

export { RadioGroup, RadioGroupItem, RadioGroupItemWithLabel };
