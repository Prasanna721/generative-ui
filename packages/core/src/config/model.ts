import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatAnthropic } from "@langchain/anthropic";

import { ModelConfig } from "../types/config.types";

const SUPPORTED_MODELS = {
  Google: ["gemini-2.5-flash", "gemini-2.5-pro"],
  Anthropic: [
    "claude-opus-4-20250514",
    "claude-sonnet-4-20250514",
    "claude-3-7-sonnet-latest",
    "claude-3-5-haiku-latest",
    "claude-3-5-sonnet-latest",
  ],
};

function isModelSupported(model: string): boolean {
  const allSupportedModels = [...SUPPORTED_MODELS.Google, ...SUPPORTED_MODELS.Anthropic];
  return allSupportedModels.includes(model);
}

export function createModel(modelConfig: ModelConfig): ChatGoogleGenerativeAI | ChatAnthropic {
  const { apiKey, model } = modelConfig;

  if (!apiKey) {
    throw new Error("API key is required to create a model.");
  }

  if (!isModelSupported(model)) {
    throw new Error(
      `Unsupported model: ${model}. Supported models: ${Object.values(SUPPORTED_MODELS).flat().join(", ")}`
    );
  }

  if (SUPPORTED_MODELS.Google.includes(model)) {
    return new ChatGoogleGenerativeAI({
      model: model,
      apiKey: apiKey,
      temperature: 0.1,
    });
  }

  if (SUPPORTED_MODELS.Anthropic.includes(model)) {
    return new ChatAnthropic({
      model: model,
      apiKey: apiKey,
      temperature: 0.1,
    });
  }

  throw new Error(
    `Unsupported model: ${model}. Please use a supported Claude or Gemini model.`
  );
}
