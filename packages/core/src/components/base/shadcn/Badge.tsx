import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const badgeVariants = cva(
  "inline-flex items-center rounded-md border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        success: "border-transparent bg-green-500 text-white shadow hover:bg-green-500/80",
        warning: "border-transparent bg-yellow-500 text-white shadow hover:bg-yellow-500/80",
        error: "border-transparent bg-red-500 text-white shadow hover:bg-red-500/80", 
        info: "border-transparent bg-blue-500 text-white shadow hover:bg-blue-500/80",
        neutral: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base"
      }
    },
    defaultVariants: {
      variant: "neutral",
      size: "md"
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Badge.displayName = "Badge";