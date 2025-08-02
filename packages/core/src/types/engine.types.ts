import { GenerateUIModelsConfig } from "./config.types";
import { ChainResult, GenUIOutput } from "./chain.types";

export interface GenerateUIParams {
  content: string;
  design?: string;
  modelsConfig?: GenerateUIModelsConfig;
}

export interface GenerateUIResult {
  success: boolean;
  data?: GenUIOutput;
  error?: string;
  executionTime?: number;
}

export enum ChainExecutionPhase {
  DESIGN_ANALYSIS = "design-analysis",
  GEN_UI = "gen-ui",
  COMPLETED = "completed",
}
export interface ChainExecutionContext {
  startTime: number;
  currentPhase: ChainExecutionPhase;
  intermediateResults: Partial<ChainResult>;
}
