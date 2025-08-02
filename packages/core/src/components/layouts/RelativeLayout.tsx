import React from 'react';

export interface RelativeLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export interface RelativeItemProps {
  children: React.ReactNode;
  position: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  className?: string;
}

export const RelativeItem: React.FC<RelativeItemProps> = ({
  children,
  position,
  className = '',
}) => {
  const getPositionClasses = () => {
    const baseClasses = 'absolute';
    
    switch (position) {
      case 'top-left':
        return `${baseClasses} top-0 left-0`;
      case 'top-center':
        return `${baseClasses} top-0 left-1/2 -translate-x-1/2`;
      case 'top-right':
        return `${baseClasses} top-0 right-0`;
      case 'center-left':
        return `${baseClasses} top-1/2 left-0 -translate-y-1/2`;
      case 'center':
        return `${baseClasses} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`;
      case 'center-right':
        return `${baseClasses} top-1/2 right-0 -translate-y-1/2`;
      case 'bottom-left':
        return `${baseClasses} bottom-0 left-0`;
      case 'bottom-center':
        return `${baseClasses} bottom-0 left-1/2 -translate-x-1/2`;
      case 'bottom-right':
        return `${baseClasses} bottom-0 right-0`;
      default:
        return baseClasses;
    }
  };

  const combinedClasses = `${getPositionClasses()} ${className}`.trim();

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};

export const RelativeLayout: React.FC<RelativeLayoutProps> = ({
  children,
  className = '',
}) => {
  const baseClasses = 'relative';
  const combinedClasses = `${baseClasses} ${className}`.trim();

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};

RelativeLayout.displayName = 'RelativeLayout';
RelativeItem.displayName = 'RelativeItem';