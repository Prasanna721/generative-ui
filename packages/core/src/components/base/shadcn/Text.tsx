import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const textVariants = cva(
  "text-foreground", // base classes
  {
    variants: {
      size: {
        sm: "text-sm leading-5",
        md: "text-base leading-6", 
        lg: "text-lg leading-7",
        xl: "text-xl leading-8"
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium", 
        bold: "font-bold"
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        accent: "text-accent-foreground"
      }
    },
    defaultVariants: {
      size: "md",
      weight: "normal",
      color: "default"
    }
  }
)

export interface TextProps 
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof textVariants> {
  children: React.ReactNode;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, size, weight, color, as, children, ...props }, ref) => {
    // Auto-map sizes to semantic HTML elements when 'as' is not specified
    const getDefaultElement = (): keyof JSX.IntrinsicElements => {
      if (as) return as;
      
      switch (size) {
        case 'xl': return 'h1';
        case 'lg': return 'h2'; 
        case 'md': return 'h3';
        case 'sm': return 'p';
        default: return 'p';
      }
    };

    const Component = getDefaultElement();
    
    return React.createElement(
      Component,
      {
        className: cn(textVariants({ size, weight, color: color as any, className })),
        ref,
        ...props
      },
      children
    );
  }
);

Text.displayName = "Text";