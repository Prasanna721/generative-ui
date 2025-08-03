'use client';

import React, { useState, useEffect, useRef } from 'react';

export interface ProgressBarProps {
  progress?: number;
  trackColor?: string;
  indicatorColor?: string;
  trackThickness?: number;
  indicatorThickness?: number;
  trackCornerRadius?: number;
  wavelength?: number;
  amplitude?: number;
  width?: number;
  className?: string;
  flowSpeed?: number;
}

const WavyProgressBar = ({
  progress = 0,
  trackColor = '#E0E0E0',
  indicatorColor = '#6200EE',
  trackThickness = 6,
  indicatorThickness = 6,
  trackCornerRadius = 3,
  wavelength = 45,
  amplitude = 3,
  width = 300,
  className = '',
  flowSpeed = 0.12, // Speed of the wave animation
}: ProgressBarProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);
  const animationRef = useRef<number>(0);

  // Animate progress changes
  useEffect(() => {
    const animation = requestAnimationFrame(() => setAnimatedProgress(progress));
    return () => cancelAnimationFrame(animation);
  }, [progress]);

  // Continuous wave animation
  useEffect(() => {
    const animate = () => {
      setWaveOffset(prev => prev + flowSpeed);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [flowSpeed]);

  const height = Math.max(trackThickness, indicatorThickness) + amplitude * 2;
  const progressWidth = (animatedProgress / 100) * width;
  const remainingWidth = width - progressWidth;

  const generateWavePath = (width: number, amp: number, wl: number, height: number, offset: number) => {
    if (width <= 0) return '';
    let path = '';
    const steps = Math.max(width, wl * 4); // More steps for smoother curve
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width;
      const angle = ((x / wl) * 2 * Math.PI) + offset;
      const y = (height / 2) + amp * Math.sin(angle);
      if (i === 0) {
        path = `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    }
    return path;
  };

  const wavePath = generateWavePath(progressWidth, amplitude, wavelength, height, waveOffset);

  return (
    <svg
      width={width}
      height={height}
      className={`wavy-progress-bar ${className}`}
      style={{ display: 'block' }}
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      role="progressbar"
    >
      <title>Progress: {progress}%</title>
      {/* Track only shows from progress end to total width */}
      {remainingWidth > 0 && (
        <path
          d={`M ${progressWidth + trackCornerRadius},${height / 2} L ${width - trackCornerRadius},${height / 2
            }`}
          stroke={trackColor}
          strokeWidth={trackThickness}
          strokeLinecap="round"
          fill="none"
        />
      )}
      {progressWidth > 0 && (
        <path
          d={wavePath}
          stroke={indicatorColor}
          strokeWidth={indicatorThickness}
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  );
};

export { WavyProgressBar as ProgressBar };