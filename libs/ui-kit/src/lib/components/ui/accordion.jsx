import React, { createContext, useContext, useState } from 'react';
import { cn } from './utils';
import { ChevronDown } from 'lucide-react';

const AccordionContext = createContext();

const Accordion = React.forwardRef(
  (
    {
      className,
      type = 'single',
      collapsible = true,
      value,
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = useState(value);

    const handleValueChange = newValue => {
      if (type === 'single') {
        const finalValue =
          collapsible && selectedValue === newValue ? '' : newValue;
        setSelectedValue(finalValue);
        onValueChange?.(finalValue);
      } else {
        // Multiple selection logic can be added here
        setSelectedValue(newValue);
        onValueChange?.(newValue);
      }
    };

    return (
      <AccordionContext.Provider
        value={{
          type,
          selectedValue,
          onValueChange: handleValueChange,
        }}
      >
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = 'Accordion';

const AccordionItem = React.forwardRef(
  ({ className, value, children, ...props }, ref) => {
    const { selectedValue } = useContext(AccordionContext);
    const isOpen = selectedValue === value;

    return (
      <div
        ref={ref}
        className={cn('border-b', className)}
        data-state={isOpen ? 'open' : 'closed'}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { selectedValue, onValueChange } = useContext(AccordionContext);
    const itemValue = props['data-value'];
    const isOpen = selectedValue === itemValue;

    return (
      <button
        ref={ref}
        className={cn(
          'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
          className
        )}
        onClick={() => onValueChange?.(itemValue)}
        data-state={isOpen ? 'open' : 'closed'}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </button>
    );
  }
);
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { selectedValue } = useContext(AccordionContext);
    const itemValue = props['data-value'];
    const isOpen = selectedValue === itemValue;

    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          className
        )}
        data-state={isOpen ? 'open' : 'closed'}
        {...props}
      >
        <div className="pb-4 pt-0">{children}</div>
      </div>
    );
  }
);
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
