'use client';

import React from 'react';

export interface TextProps {
  variant?: 'display' | 'headline' | 'title' | 'body' | 'label';
  size?: 'large' | 'medium' | 'small';
  as?: React.ElementType;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const defaultTagMap = {
  display: 'h1',
  headline: 'h2',
  title: 'h3',
  body: 'p',
  label: 'span',
};

const Text: React.FC<TextProps> = ({
  variant = 'body',
  size = 'medium',
  as,
  color,
  className = '',
  style,
  children,
  ...rest
}) => {
  const Component = as || defaultTagMap[variant] || 'p';
  
  // Tailwind class mappings for typography
  const typographyClasses = {
    display: {
      large: 'text-[57px] font-normal leading-[64px] tracking-[-0.25px]',
      medium: 'text-[45px] font-normal leading-[52px] tracking-[0px]',
      small: 'text-[36px] font-normal leading-[44px] tracking-[0px]',
    },
    headline: {
      large: 'text-[32px] font-normal leading-[40px] tracking-[0px]',
      medium: 'text-[28px] font-normal leading-[36px] tracking-[0px]',
      small: 'text-2xl font-normal leading-[32px] tracking-[0px]',
    },
    title: {
      large: 'text-[22px] font-normal leading-[28px] tracking-[0px]',
      medium: 'text-base font-medium leading-[24px] tracking-[0.15px]',
      small: 'text-sm font-medium leading-[20px] tracking-[0.1px]',
    },
    body: {
      large: 'text-base font-normal leading-[24px] tracking-[0.5px]',
      medium: 'text-sm font-normal leading-[20px] tracking-[0.25px]',
      small: 'text-xs font-normal leading-[16px] tracking-[0.4px]',
    },
    label: {
      large: 'text-sm font-medium leading-[20px] tracking-[0.1px]',
      medium: 'text-xs font-medium leading-[16px] tracking-[0.5px]',
      small: 'text-[11px] font-medium leading-[16px] tracking-[0.5px]',
    },
  };
  
  const baseClasses = typographyClasses[variant]?.[size] || typographyClasses.body.medium;
  const fontFamily = "font-['Roboto','Helvetica','Arial',sans-serif]";
  
  const combinedClasses = `${fontFamily} ${baseClasses} ${className}`.trim();
  
  const combinedStyle = {
    ...(color && { color }),
    ...style,
  };
  
  return (
    <Component className={combinedClasses} style={combinedStyle} {...rest}>
      {children}
    </Component>
  );
};

export { Text };