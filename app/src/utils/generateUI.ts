'use server';

import { GenerativeUI, GenerateUIParams, GenerateUIModelsConfig } from '@generative-ui/core';

export async function generateUIAction(content: string, design?: string) {
  try {
    // Configure models using server-side environment variables
    const modelsConfig: GenerateUIModelsConfig = {
      designModel: {
        apiKey: process.env.ANTHROPIC_API_KEY || '',
        model: "claude-3-5-sonnet-latest",
      },
      uiModel: {
        apiKey: process.env.GOOGLE_API_KEY || '',
        model: "gemini-2.5-pro",
      },
    };

    const generativeUI = new GenerativeUI();
    
    const params: GenerateUIParams = {
      content: content.trim(),
      design: design?.trim() || 'Modern, clean design with good usability',
      modelsConfig,
    };

    // Use standard generation (streaming doesn't work well with server actions)
    const result = await generativeUI.generateUI(params);
    
    // Get execution context and intermediate results
    const context = generativeUI.getExecutionContext();
    const intermediateResults = generativeUI.getIntermediateResults();

    return {
      success: true,
      result,
      context,
      intermediateResults,
    };

  } catch (error) {
    console.error('Generation failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}