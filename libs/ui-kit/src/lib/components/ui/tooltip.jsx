import React, { useState, useRef, useEffect } from 'react';
import { cn } from './utils';

const Tooltip = React.forwardRef(
  (
    { className, children, content, side = 'top', delay = 500, ...props },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const triggerRef = useRef(null);
    const tooltipRef = useRef(null);
    const timeoutRef = useRef(null);

    const showTooltip = () => {
      timeoutRef.current = setTimeout(() => {
        if (triggerRef.current) {
          const rect = triggerRef.current.getBoundingClientRect();
          setPosition({ x: rect.left + rect.width / 2, y: rect.top });
          setIsVisible(true);
        }
      }, delay);
    };

    const hideTooltip = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const getTooltipPosition = () => {
      if (!tooltipRef.current) return {};

      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let x = position.x - tooltipRect.width / 2;
      let y = position.y - tooltipRect.height - 8;

      // Adjust for window boundaries
      if (x < 8) x = 8;
      if (x + tooltipRect.width > windowWidth - 8) {
        x = windowWidth - tooltipRect.width - 8;
      }
      if (y < 8) {
        y = position.y + 8;
      }

      return { left: x, top: y };
    };

    return (
      <div
        ref={ref}
        className={cn('relative inline-block', className)}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        {...props}
      >
        <div ref={triggerRef}>{children}</div>

        {isVisible && (
          <div
            ref={tooltipRef}
            className="fixed z-50 px-3 py-2 text-sm text-popover-foreground bg-popover border rounded-md shadow-md pointer-events-none"
            style={getTooltipPosition()}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);
Tooltip.displayName = 'Tooltip';

export { Tooltip };
