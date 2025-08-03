'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';

export interface ButtonProps {
  children?: React.ReactNode;
  iconName?: string;
  iconPosition?: 'start' | 'end';
  variant?: 'elevated' | 'filled' | 'filledTonal' | 'outlined' | 'text';
  shape?: 'round' | 'square';
  size?: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
  paddingWidth?: '16dp' | '24dp';
  isToggleButton?: boolean;
  isSelected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  colors?: {
    primary?: string;
    onPrimary?: string;
    primaryContainer?: string;
    onPrimaryContainer?: string;
    surfaceVariant?: string;
    onSurfaceVariant?: string;
    outline?: string;
  };
  disabled?: boolean;
  className?: string;
}

// M3 Expressive Button Component
const M3ExpressiveButton = ({
  children,
  iconName,
  iconPosition = 'start',
  variant = 'elevated',
  shape = 'round',
  size = 'medium',
  paddingWidth = '16dp',
  isToggleButton = false,
  isSelected = false,
  onClick,
  colors = {},
  disabled = false,
  className = '',
  ...props
}: ButtonProps) => {
  const IconComponent = iconName ? (LucideIcons as any)[iconName] : null;
  const hasLabel = React.Children.count(children) > 0;

  // Default color configurations
  const defaultColors = {
    primary: '#6200EE',
    onPrimary: '#FFFFFF',
    primaryContainer: '#BB86FC',
    onPrimaryContainer: '#000000',
    surfaceVariant: '#E0E0E0',
    onSurfaceVariant: '#424242',
    outline: '#757575',
  };

  const themeColors = { ...defaultColors, ...colors };

  // Get icon size based on button size
  const getIconSize = () => {
    const sizes = {
      extraSmall: 16,
      small: 18,
      medium: 20,
      large: 22,
      extraLarge: 32
    };
    return sizes[size] || 20;
  };

  // Get padding classes based on size and paddingWidth
  const getPaddingClasses = () => {
    const paddingMap = {
      extraSmall: paddingWidth === '24dp' ? 'px-4 py-1.5' : 'px-3 py-1.5',
      small: paddingWidth === '24dp' ? 'px-5 py-2' : 'px-4 py-2',
      medium: 'px-6 py-2.5',
      large: 'px-7 py-3',
      extraLarge: 'px-8 py-4'
    };
    return paddingMap[size] || 'px-6 py-2.5';
  };

  // Get variant-specific classes
  const getVariantClasses = () => {
    const baseClasses = 'border transition-all duration-200 font-medium uppercase tracking-wide text-sm';
    
    switch (variant) {
      case 'filled':
        return `${baseClasses} bg-purple-600 text-white border-purple-600 hover:bg-purple-700 active:bg-purple-800 shadow-sm`;
      case 'filledTonal':
        return `${baseClasses} bg-purple-200 text-purple-900 border-purple-200 hover:bg-purple-300 active:bg-purple-400`;
      case 'outlined':
        return `${baseClasses} bg-transparent text-purple-600 border-gray-400 hover:bg-purple-50 active:bg-purple-100`;
      case 'text':
        return `${baseClasses} bg-transparent text-purple-600 border-transparent hover:bg-purple-50 active:bg-purple-100`;
      case 'elevated':
      default:
        return `${baseClasses} bg-gray-200 text-purple-900 border-transparent hover:bg-gray-300 active:bg-gray-400 shadow-md hover:shadow-lg active:shadow-sm`;
    }
  };

  // Get shape classes with morphing for toggle buttons
  const getShapeClasses = () => {
    if (isToggleButton && isSelected && shape === 'round') {
      return 'rounded-none'; // Morph to square when selected
    }
    return shape === 'round' ? 'rounded-full' : 'rounded-none';
  };

  // Get selected state classes for toggle buttons
  const getSelectedClasses = () => {
    if (!isToggleButton || !isSelected) return '';
    
    switch (variant) {
      case 'filled':
        return 'bg-purple-800 border-purple-800';
      case 'filledTonal':
        return 'bg-purple-400 text-purple-950';
      case 'outlined':
        return 'bg-purple-100 border-purple-600';
      case 'text':
        return 'bg-purple-100';
      case 'elevated':
      default:
        return 'bg-gray-400 shadow-inner';
    }
  };

  // Handle click
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  const buttonClasses = `
    inline-flex items-center justify-center cursor-pointer relative
    ${getPaddingClasses()}
    ${getVariantClasses()}
    ${getShapeClasses()}
    ${getSelectedClasses()}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {iconPosition === 'start' && IconComponent && (
        <span className={hasLabel ? 'mr-2' : ''}>
          <IconComponent size={getIconSize()} />
        </span>
      )}
      
      {children && <span>{children}</span>}
      
      {iconPosition === 'end' && IconComponent && (
        <span className={hasLabel ? 'ml-2' : ''}>
          <IconComponent size={getIconSize()} />
        </span>
      )}
    </button>
  );
};

export { M3ExpressiveButton as Button };