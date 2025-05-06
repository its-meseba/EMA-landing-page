'use client';

import React from 'react';

import { cn } from '@/lib/utils';

/**
 * VisuallyHidden component for accessibility
 * Hides content visually but keeps it accessible to screen readers
 */
const VisuallyHidden = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    ({ className, ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={cn(
                    'absolute -m-px h-px w-px overflow-hidden border-0 p-0 whitespace-nowrap',
                    'clip-[rect(0,0,0,0)]',
                    className
                )}
                {...props}
            />
        );
    }
);

VisuallyHidden.displayName = 'VisuallyHidden';

export { VisuallyHidden };
