import React from 'react';

export interface LinearLayoutProps {
  children: React.ReactNode;
  orientation: 'horizontal' | 'vertical';
  className?: string;
}

export const LinearLayout: React.FC<LinearLayoutProps> = ({
  children,
  orientation,
  className = '',
}) => {
  const baseClasses = 'flex';
  const orientationClasses = orientation === 'horizontal' ? 'flex-row' : 'flex-col';
  const combinedClasses = `${baseClasses} ${orientationClasses} ${className}`.trim();

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};

LinearLayout.displayName = 'LinearLayout';