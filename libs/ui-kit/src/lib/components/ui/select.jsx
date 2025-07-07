import React, { useState, useRef, useEffect } from 'react';
import { cn } from './utils';
import { ChevronDown, Check } from 'lucide-react';

const Select = React.forwardRef(
  (
    {
      className,
      value,
      onValueChange,
      children,
      placeholder = 'Select an option',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const selectRef = useRef(null);

    useEffect(() => {
      setSelectedValue(value);
    }, [value]);

    useEffect(() => {
      const handleClickOutside = event => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = newValue => {
      setSelectedValue(newValue);
      onValueChange?.(newValue);
      setIsOpen(false);
    };

    const selectedOption = React.Children.toArray(children).find(
      child => child.props.value === selectedValue
    );

    return (
      <div ref={selectRef} className="relative">
        <button
          ref={ref}
          type="button"
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          {...props}
        >
          <span
            className={
              selectedValue ? 'text-foreground' : 'text-muted-foreground'
            }
          >
            {selectedOption ? selectedOption.props.children : placeholder}
          </span>
          <ChevronDown
            className={cn(
              'h-4 w-4 opacity-50 transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
            <div className="max-h-60 overflow-auto p-1">
              {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child, {
                    onSelect: () => handleSelect(child.props.value),
                    isSelected: child.props.value === selectedValue,
                  });
                }
                return child;
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

const SelectItem = React.forwardRef(
  (
    {
      className,
      children,
      value,
      onSelect,
      isSelected,
      disabled = false,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        isSelected && 'bg-accent text-accent-foreground',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      onClick={onSelect}
      disabled={disabled}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      {children}
    </button>
  )
);
SelectItem.displayName = 'SelectItem';

const SelectGroup = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-1', className)} {...props}>
      {children}
    </div>
  )
);
SelectGroup.displayName = 'SelectGroup';

const SelectLabel = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
      {...props}
    >
      {children}
    </div>
  )
);
SelectLabel.displayName = 'SelectLabel';

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = 'SelectSeparator';

export { Select, SelectItem, SelectGroup, SelectLabel, SelectSeparator };
