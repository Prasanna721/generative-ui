'use client';

import React, { useState, useRef, useCallback } from 'react';
import { generateUIAction } from '@/utils/generateUI';

export default function GenUIPage() {
  const [leftWidth, setLeftWidth] = useState(50); // Percentage
  const [design, setDesign] = useState('');
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamOutput, setStreamOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const handleMouseDown = useCallback(() => {
    isDraggingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.userSelect = 'none';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Constrain between 20% and 80%
    const constrainedWidth = Math.max(20, Math.min(80, newLeftWidth));
    setLeftWidth(constrainedWidth);
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.style.userSelect = '';
  }, [handleMouseMove]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    setIsGenerating(true);
    setStreamOutput([]);
    setError(null);

    try {
      setStreamOutput(prev => [...prev, '🚀 Starting UI generation...']);
      
      // Call server action
      const response = await generateUIAction(content, design);
      
      if (response.success) {
        setStreamOutput(prev => [...prev, '✅ UI generated successfully!']);
        setStreamOutput(prev => [...prev, `⏱️ Execution time: ${response.result?.executionTime}ms`]);
        setStreamOutput(prev => [...prev, `🎨 Design System: ${JSON.stringify(response.result?.data?.design, null, 2)}`]);
        setStreamOutput(prev => [...prev, `🏗️ Layout Structure: ${JSON.stringify(response.result?.data?.layout, null, 2)}`]);
        setStreamOutput(prev => [...prev, `📊 Execution context: ${JSON.stringify(response.context, null, 2)}`]);
        setStreamOutput(prev => [...prev, `🔍 Intermediate results: ${JSON.stringify(response.intermediateResults, null, 2)}`]);
      } else {
        setError(response.error || 'Unknown error occurred');
        setStreamOutput(prev => [...prev, `❌ Error: ${response.error}`]);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setStreamOutput(prev => [...prev, `❌ Error: ${errorMessage}`]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div ref={containerRef} className="h-screen w-full flex relative">
      {/* Left Panel */}
      <div 
        className="bg-white border-r border-gray-300 flex flex-col"
        style={{ width: `${leftWidth}%` }}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Generative UI</h1>
          <p className="text-gray-600 text-sm mt-1">Generate UI from content and design context</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-6 gap-4">
          {/* Design Input (1/3) */}
          <div className="flex flex-col" style={{ height: '30%' }}>
            <label htmlFor="design" className="text-sm font-medium text-gray-700 mb-2">
              Design Context <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              id="design"
              value={design}
              onChange={(e) => setDesign(e.target.value)}
              placeholder="Describe the design style, colors, layout preferences..."
              className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Content Input (2/3) */}
          <div className="flex flex-col" style={{ height: '60%' }}>
            <label htmlFor="content" className="text-sm font-medium text-gray-700 mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the content you want to generate UI for..."
              className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col gap-2">
            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded border border-red-200">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isGenerating ? 'Generating...' : 'Generate UI'}
            </button>
          </div>
        </form>
      </div>

      {/* Resizable Divider */}
      <div
        className="w-1 bg-gray-300 hover:bg-gray-400 cursor-col-resize active:bg-blue-500 transition-colors"
        onMouseDown={handleMouseDown}
      />

      {/* Right Panel */}
      <div 
        className="bg-gray-900 text-green-400 font-mono flex flex-col"
        style={{ width: `${100 - leftWidth}%` }}
      >
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Stream Output</h2>
          <p className="text-gray-400 text-sm">Real-time generation results</p>
        </div>
        
        <div className="flex-1 p-4 overflow-auto">
          {isGenerating && streamOutput.length === 0 && (
            <div className="flex items-center gap-2 text-yellow-400">
              <div className="animate-spin w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
              Initializing generation...
            </div>
          )}
          
          {streamOutput.length > 0 && (
            <div className="space-y-2">
              {streamOutput.map((output, index) => (
                <div key={index} className="text-sm whitespace-pre-wrap break-words">
                  {output}
                </div>
              ))}
            </div>
          )}
          
          {!isGenerating && streamOutput.length === 0 && (
            <div className="text-gray-500 text-center mt-8">
              Enter content and click "Generate UI" to see streaming output
            </div>
          )}
        </div>
      </div>
    </div>
  );
}