'use client';

import React, { useState } from 'react';

// Style configuration based on M3 Expressive sizes
const styleConfig = {
  xs: { trackHeight: 4, thumbSize: 20, thumbWidth: 4, trackGap: 6 },
  s: { trackHeight: 6, thumbSize: 24, thumbWidth: 6, trackGap: 6 },
  m: { trackHeight: 8, thumbSize: 28, thumbWidth: 8, trackGap: 6 },
  l: { trackHeight: 12, thumbSize: 32, thumbWidth: 12, trackGap: 6 },
  xl: { trackHeight: 16, thumbSize: 40, thumbWidth: 16, trackGap: 6 },
};

export interface SliderProps {
  value?: number | number[];
  onChange?: (value: number | number[]) => void;
  min?: number;
  max?: number;  
  step?: number;
  orientation?: 'horizontal' | 'vertical';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  trackColorInactive?: string;
  trackColorActive?: string;
  thumbColor?: string;
  showStops?: boolean;
  trackGap?: number;
  className?: string;
}

const Slider = ({
  value: controlledValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  orientation = 'horizontal',
  size = 'xs',
  trackColorInactive = '#E7E0EC',
  trackColorActive = '#6750A4',
  thumbColor = '#6750A4',
  showStops = false,
  trackGap = 4,
  className = '',
}: SliderProps) => {
  const isRange = Array.isArray(controlledValue);
  const initialValue = isRange ? controlledValue : [min, controlledValue];
  const [values, setValues] = useState(initialValue);
  const [activeThumb, setActiveThumb] = useState<number | null>(null);

  const sliderRef = React.useRef<HTMLDivElement>(null);
  const styles = styleConfig[size] || styleConfig.xs;
  const isVertical = orientation === 'vertical';

  const getPercentage = React.useCallback((val: number) => ((val - min) / (max - min)) * 100, [min, max]);

  const getValueFromPosition = React.useCallback((pos: number) => {
    if (!sliderRef.current) return min;
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = isVertical
      ? (rect.bottom - pos) / rect.height
      : (pos - rect.left) / rect.width;
    let value = min + percentage * (max - min);
    
    // Snap to step
    value = Math.round(value / step) * step;

    // Clamp between min and max
    return Math.max(min, Math.min(max, value));
  }, [min, max, step, isVertical]);

  const handleMouseDown = (e: React.MouseEvent, thumbIndex: number) => {
    e.preventDefault();
    setActiveThumb(thumbIndex);
  };
  
  const handleTouchStart = (e: React.TouchEvent, thumbIndex: number) => {
    setActiveThumb(thumbIndex);
  };

  const handleMouseMove = React.useCallback((e: MouseEvent | TouchEvent) => {
    if (activeThumb === null || !sliderRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const pos = clientX;
    const verticalPos = clientY;
    const newValue = getValueFromPosition(isVertical ? verticalPos : pos);

    let newValues = [...values];
    if (isRange) {
        if (activeThumb === 0) { // Left thumb
            newValues[0] = Math.min(newValue, newValues[1] || max);
        } else { // Right thumb
            newValues[1] = Math.max(newValue, newValues[0] || min);
        }
    } else {
        newValues[1] = newValue;
    }

    setValues(newValues);
    if (onChange) {
      onChange(isRange ? newValues as number[] : (newValues[1] || min));
    }
  }, [activeThumb, getValueFromPosition, isRange, onChange, values, isVertical]);

  const handleMouseUp = React.useCallback(() => {
    setActiveThumb(null);
  }, []);

  React.useEffect(() => {
    const currentSlider = sliderRef.current;
    if (activeThumb !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [activeThumb, handleMouseMove, handleMouseUp]);
  
  React.useEffect(() => {
    setValues(isRange ? controlledValue : [min, controlledValue]);
  }, [controlledValue, isRange, min]);

  const startValue = isRange ? (values[0] || min) : min;
  const endValue = values[1] || min;

  const startPercent = getPercentage(startValue);
  const endPercent = getPercentage(endValue);
  
  // Calculate track dimensions with gaps
  const thumbWidth = 4;
  const thumbWidthActive = 8;
  const getThumbWidth = (thumbIndex: number) => activeThumb === thumbIndex ? thumbWidthActive : thumbWidth;
  
  const trackWrapperStyle: React.CSSProperties = {
    position: 'relative',
    ...(isVertical ? {
        width: styles.trackHeight,
        height: '250px'
    } : {
        height: styles.trackHeight,
        width: '100%'
    })
  };

  let activeTrackStyle: React.CSSProperties, inactiveTrackStyle: React.CSSProperties, inactiveTrackStyle2: React.CSSProperties | undefined;

  if (isRange) {
    // Range slider: [Inactive] → [Gap] → [Thumb] → [Active] → [Gap] → [Thumb] → [Gap] → [Inactive]
    const leftThumbWidth = getThumbWidth(0);
    const rightThumbWidth = getThumbWidth(1);
    
    if (isVertical) {
      // Inactive track from bottom to first thumb
      inactiveTrackStyle = {
        position: 'absolute',
        background: trackColorInactive,
        borderRadius: styles.trackHeight / 2,
        width: '100%',
        left: 0,
        bottom: 0,
        height: `calc(${startPercent}% - ${leftThumbWidth / 2 + trackGap}px * 100 / 250)`,
      };
      
      // Active track between thumbs
      activeTrackStyle = {
        position: 'absolute',
        background: trackColorActive,
        borderRadius: styles.trackHeight / 2,
        width: '100%',
        left: 0,
        bottom: `calc(${startPercent}% + ${leftThumbWidth / 2 + trackGap}px * 100 / 250)`,
        height: `calc(${endPercent - startPercent}% - ${(leftThumbWidth + rightThumbWidth) / 2 + trackGap * 2}px * 100 / 250)`,
      };
      
      // Inactive track from second thumb to top
      inactiveTrackStyle2 = {
        position: 'absolute',
        background: trackColorInactive,
        borderRadius: styles.trackHeight / 2,
        width: '100%',
        left: 0,
        bottom: `calc(${endPercent}% + ${rightThumbWidth / 2 + trackGap}px * 100 / 250)`,
        height: `calc(${100 - endPercent}% - ${rightThumbWidth / 2 + trackGap}px * 100 / 250)`,
      };
    } else {
      // Inactive track from start to first thumb
      inactiveTrackStyle = {
        position: 'absolute',
        background: trackColorInactive,
        borderRadius: styles.trackHeight / 2,
        height: '100%',
        top: 0,
        left: 0,
        width: `calc(${startPercent}% - ${leftThumbWidth / 2 + trackGap}px)`,
      };
      
      // Active track between thumbs
      activeTrackStyle = {
        position: 'absolute',
        background: trackColorActive,
        borderRadius: styles.trackHeight / 2,
        height: '100%',
        top: 0,
        left: `calc(${startPercent}% + ${leftThumbWidth / 2 + trackGap}px)`,
        width: `calc(${endPercent - startPercent}% - ${(leftThumbWidth + rightThumbWidth) / 2 + trackGap * 2}px)`,
      };
      
      // Inactive track from second thumb to end
      inactiveTrackStyle2 = {
        position: 'absolute',
        background: trackColorInactive,
        borderRadius: styles.trackHeight / 2,
        height: '100%',
        top: 0,
        left: `calc(${endPercent}% + ${rightThumbWidth / 2 + trackGap}px)`,
        width: `calc(${100 - endPercent}% - ${rightThumbWidth / 2 + trackGap}px)`,
      };
    }
  } else {
    // Single slider: [Active Track] → [Gap] → [Thumb] → [Gap] → [Inactive Track]
    const currentThumbWidth = getThumbWidth(1);
    
    if (isVertical) {
      // Active track from bottom to thumb
      activeTrackStyle = {
        position: 'absolute',
        background: trackColorActive,
        borderRadius: styles.trackHeight / 2,
        width: '100%',
        left: 0,
        bottom: `calc(${endPercent}% + ${currentThumbWidth / 2 + trackGap}px * 100 / 250)`,
        height: `calc(${endPercent}% - ${currentThumbWidth / 2 + trackGap}px * 100 / 250)`,
      };
      
      // Inactive track from thumb to top
      inactiveTrackStyle = {
        position: 'absolute',
        background: trackColorInactive,
        borderRadius: styles.trackHeight / 2,
        width: '100%',
        left: 0,
        bottom: 0,
        height: `calc(${100 - endPercent}% - ${currentThumbWidth / 2 + trackGap}px * 100 / 250)`,
      };
    } else {
      // Active track from start to thumb
      activeTrackStyle = {
        position: 'absolute',
        background: trackColorActive,
        borderRadius: styles.trackHeight / 2,
        height: '100%',
        top: 0,
        left: 0,
        width: `calc(${endPercent}% - ${currentThumbWidth / 2 + trackGap}px)`,
      };
      
      // Inactive track from thumb to end
      inactiveTrackStyle = {
        position: 'absolute',
        background: trackColorInactive,
        borderRadius: styles.trackHeight / 2,
        height: '100%',
        top: 0,
        left: `calc(${endPercent}% + ${currentThumbWidth / 2 + trackGap}px)`,
        width: `calc(${100 - endPercent}% - ${currentThumbWidth / 2 + trackGap}px)`,
      };
    }
  }
  
  const renderThumb = (thumbValue: number, index: number) => {
    const percent = getPercentage(thumbValue);
    const isActive = activeThumb === index;
    const currentThumbWidth = isActive ? thumbWidthActive : thumbWidth;
    
    const thumbStyle: React.CSSProperties = {
        position: 'absolute',
        width: currentThumbWidth,
        height: styles.thumbSize,
        background: thumbColor,
        borderRadius: '3px', // Slight corner radius
        cursor: 'pointer',
        transition: 'width 150ms ease-out',
        ...(isVertical ? {
            left: '50%',
            bottom: `${percent}%`,
            transform: `translate(-50%, 50%)`
        } : {
            top: '50%',
            left: `${percent}%`,
            transform: `translate(-50%, -50%)`
        })
    };
    return (
      <div 
        key={index}
        style={thumbStyle}
        onMouseDown={(e) => handleMouseDown(e, index)}
        onTouchStart={(e) => handleTouchStart(e, index)}
        role="slider"
        aria-valuenow={thumbValue}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-orientation={orientation}
      />
    );
  };

  const renderStops = () => {
    if (!showStops || step <= 0) return null;
    const stopElements = [];
    for (let i = min; i <= max; i += step) {
        const percent = getPercentage(i);
        const isActive = i >= (startValue || min) && i <= (endValue || min);
        const stopStyle: React.CSSProperties = {
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: isActive ? 'white' : 'rgba(0,0,0,0.5)',
            borderRadius: '50%',
             ...(isVertical ? {
                left: '50%',
                bottom: `${percent}%`,
                transform: `translate(-50%, 0)`
            } : {
                top: '50%',
                left: `${percent}%`,
                transform: `translate(-50%, -50%)`
            })
        };
       stopElements.push(<div key={i} style={stopStyle} />);
    }
    return stopElements;
  }
  
  const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${styles.thumbSize / 2}px`,
      ...(isVertical && { height: '300px' })
  };

  return (
    <div style={containerStyle} className={className}>
      <div ref={sliderRef} style={trackWrapperStyle}>
        <div style={activeTrackStyle} />
        <div style={inactiveTrackStyle} />
        {inactiveTrackStyle2 && <div style={inactiveTrackStyle2} />}
        {renderStops()}
        {isRange && renderThumb(values[0] || min, 0)}
        {renderThumb(values[1] || min, 1)}
      </div>
    </div>
  );
};

export { Slider };