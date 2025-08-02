import React from 'react';

export interface GridLayoutProps {
  children: React.ReactNode;
  columns: number; // 1-12 for simple grid
  className?: string;
}

export interface GridItemProps {
  children: React.ReactNode;
  span?: number; // column span 1-12
  className?: string;
}

export const GridItem: React.FC<GridItemProps> = ({
  children,
  span,
  className = '',
}) => {
  const getSpanClasses = () => {
    if (!span || span < 1 || span > 12) return '';
    
    const spanMap: Record<number, string> = {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      5: 'col-span-5',
      6: 'col-span-6',
      7: 'col-span-7',
      8: 'col-span-8',
      9: 'col-span-9',
      10: 'col-span-10',
      11: 'col-span-11',
      12: 'col-span-12',
    };
    
    return spanMap[span] || '';
  };

  const combinedClasses = `${getSpanClasses()} ${className}`.trim();

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  columns,
  className = '',
}) => {
  const getGridClasses = () => {
    const baseClasses = 'grid';
    
    if (columns < 1 || columns > 12) {
      console.warn(`GridLayout: columns should be between 1 and 12, received ${columns}`);
      return `${baseClasses} grid-cols-1`;
    }
    
    const colsMap: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
    };
    
    return `${baseClasses} ${colsMap[columns] || 'grid-cols-1'}`;
  };

  const combinedClasses = `${getGridClasses()} ${className}`.trim();

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};

GridLayout.displayName = 'GridLayout';
GridItem.displayName = 'GridItem';