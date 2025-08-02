import { RunnableSequence } from "@langchain/core/runnables";

import { createModel } from "../config/model";
import { DesignAnalysisEngine } from "./designAnalysis";
import { GenUIEngine } from "./generateLayout";
import {
  GenerateUIParams,
  GenerateUIResult,
  ChainExecutionContext,
  ChainExecutionPhase,
} from "../types/engine.types";
import {
  DesignAnalysisInput,
  GenUIInput,
  ChainResult,
} from "../types/chain.types";
import { defaultModelsConfig } from "../config/config";
import { AIMessageChunk } from "@langchain/core/messages";
import { IterableReadableStream } from "@langchain/core/dist/utils/stream";

export class GenerativeUI {
  private designAnalysisEngine?: DesignAnalysisEngine;
  private genUIEngine?: GenUIEngine;
  private executionContext: ChainExecutionContext;

  constructor() {
    this.executionContext = {
      startTime: Date.now(),
      currentPhase: ChainExecutionPhase.DESIGN_ANALYSIS,
      intermediateResults: {},
    };
  }

  async generateUI(options: GenerateUIParams): Promise<GenerateUIResult> {
    const startTime = Date.now();

    try {
      this.initializeEngines(options.modelsConfig);

      this.executionContext.currentPhase = ChainExecutionPhase.DESIGN_ANALYSIS;
      const designAnalysisInput: DesignAnalysisInput = {
        content: options.content,
        designContext: options.design,
      };

      const designAnalysisResult =
        await this.designAnalysisEngine!.analyzeDesign(designAnalysisInput);
      this.executionContext.intermediateResults.designAnalysis =
        designAnalysisResult;

      this.executionContext.currentPhase = ChainExecutionPhase.GEN_UI;
      const genUIInput: GenUIInput = {
        content: options.content,
        design: designAnalysisResult.design,
      };

      const genUIResult = await this.genUIEngine!.generateUI(genUIInput);
      this.executionContext.intermediateResults.genUI = genUIResult;

      this.executionContext.currentPhase = ChainExecutionPhase.COMPLETED;
      const executionTime = Date.now() - startTime;

      return {
        success: true,
        data: genUIResult,
        executionTime,
      };
    } catch (error) {
      const executionTime = Date.now() - startTime;

      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        executionTime,
      };
    }
  }

  async generateUIWithSequentialChain(
    options: GenerateUIParams
  ): Promise<GenerateUIResult> {
    const startTime = Date.now();

    try {
      this.initializeEngines(options.modelsConfig);

      const sequentialChain = RunnableSequence.from([
        // Step 1: Design Analysis
        {
          analyzeDesign: async (input: {
            content: string;
            designContext?: string;
          }) => {
            const designAnalysisInput: DesignAnalysisInput = {
              content: input.content,
              designContext: input.designContext,
            };
            return await this.designAnalysisEngine!.analyzeDesign(
              designAnalysisInput
            );
          },
        },
        // Step 2: UI Generation
        {
          generateUI: async (input: {
            content: string;
            designAnalysis: any;
          }) => {
            const genUIInput: GenUIInput = {
              content: input.content,
              design: input.designAnalysis.design,
            };
            return await this.genUIEngine!.generateUI(genUIInput);
          },
        },
      ]);

      const chainInput = {
        content: options.content,
        designContext: options.design,
      };

      const result = await sequentialChain.invoke(chainInput);
      const executionTime = Date.now() - startTime;

      return {
        success: true,
        data: result.generateUI,
        executionTime,
      };
    } catch (error) {
      const executionTime = Date.now() - startTime;

      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        executionTime,
      };
    }
  }

  async generateUIStream(
    options: GenerateUIParams
  ): Promise<IterableReadableStream<AIMessageChunk>> {
    try {
      this.initializeEngines(options.modelsConfig);

      const designAnalysisInput: DesignAnalysisInput = {
        content: options.content,
        designContext: options.design,
      };

      const designAnalysisResult =
        await this.designAnalysisEngine!.analyzeDesign(designAnalysisInput);

      const genUIInput: GenUIInput = {
        content: options.content,
        design: designAnalysisResult.design,
      };

      return await this.genUIEngine!.generateUIStream(genUIInput);
    } catch (error) {
      throw new Error(
        `Streaming generation failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  getExecutionContext(): ChainExecutionContext {
    return { ...this.executionContext };
  }

  getIntermediateResults(): Partial<ChainResult> {
    return { ...this.executionContext.intermediateResults };
  }

  private initializeEngines(modelsConfig: any): void {
    const configs = { ...defaultModelsConfig, ...modelsConfig };

    const designModel = createModel(configs.designModel);
    this.designAnalysisEngine = new DesignAnalysisEngine(designModel);

    const uiModel = createModel(configs.uiModel);
    this.genUIEngine = new GenUIEngine(uiModel);
  }
}
