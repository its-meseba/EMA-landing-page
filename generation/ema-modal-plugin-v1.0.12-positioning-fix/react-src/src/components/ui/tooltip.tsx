import React, { useState, useRef, useEffect } from 'react';

interface TooltipProviderProps {
    children: React.ReactNode;
    delayDuration?: number;
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({
    children
}) => {
    return <>{children}</>;
};

interface TooltipProps {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export const Tooltip: React.FC<TooltipProps> = ({
    children,
    open,
    onOpenChange
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
        onOpenChange?.(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
            onOpenChange?.(false);
        }, 100);
    };

    useEffect(() => {
        if (typeof open === 'boolean') {
            setIsOpen(open);
        }
    }, [open]);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    if (child.type === TooltipContent) {
                        return isOpen ? child : null;
                    }
                    return child;
                }
                return child;
            })}
        </div>
    );
};

interface TooltipTriggerProps {
    children: React.ReactNode;
    asChild?: boolean;
}

export const TooltipTrigger: React.FC<TooltipTriggerProps> = ({
    children,
    asChild = false
}) => {
    if (asChild && React.isValidElement(children)) {
        return children;
    }

    return <>{children}</>;
};

interface TooltipContentProps {
    children: React.ReactNode;
    className?: string;
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
}

export const TooltipContent: React.FC<TooltipContentProps> = ({
    children,
    className = '',
    side = 'top',
    align = 'center'
}) => {
    const sideClasses = {
        top: 'bottom-full mb-2',
        bottom: 'top-full mt-2',
        left: 'right-full mr-3',
        right: 'left-full ml-3',
    };

    const alignClasses = {
        start: 'top-0',
        center: 'top-1/2 transform -translate-y-1/2',
        end: 'bottom-0',
    };

    // Create arrow/pointer for speech bubble effect
    const arrowClasses = {
        top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-white',
        bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-white',
        left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-white',
        right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-white',
    };

    return (
        <div
            className={`absolute z-50 ${sideClasses[side]} ${alignClasses[align]} ${className}`}
            role="tooltip"
        >
            {children}
            {/* Speech bubble arrow */}
            <div
                className={`absolute w-0 h-0 border-4 ${arrowClasses[side]}`}
                style={{ borderWidth: '6px' }}
            />
        </div>
    );
}; 