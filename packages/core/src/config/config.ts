import { GenerateUIModelsConfig } from "../types/config.types";

export const defaultModelsConfig: Partial<GenerateUIModelsConfig> = {
  designModel: {
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY || "",
  },
  uiModel: {
    model: "claude-3-5-sonnet-20241022",
    apiKey: process.env.ANTHROPIC_API_KEY || "",
  },
};
