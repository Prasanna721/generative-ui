import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatAnthropic } from "@langchain/anthropic";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

import { DESIGN_ANALYSIS_PROMPT } from "../prompts/designAnalysis";
import {
  DesignAnalysisInput,
  DesignAnalysisOutput,
} from "../types/chain.types";
import { AIMessageChunk } from "@langchain/core/messages";
import { IterableReadableStream } from "@langchain/core/dist/utils/stream";

export class DesignAnalysisEngine {
  private model: ChatGoogleGenerativeAI | ChatAnthropic;
  private outputParser: StringOutputParser;

  constructor(model: ChatGoogleGenerativeAI | ChatAnthropic) {
    this.model = model;
    this.outputParser = new StringOutputParser();
  }

  async analyzeDesign(
    input: DesignAnalysisInput
  ): Promise<DesignAnalysisOutput> {
    try {
      const promptTemplate = PromptTemplate.fromTemplate(
        DESIGN_ANALYSIS_PROMPT
      );

      const chain = promptTemplate.pipe(this.model).pipe(this.outputParser);

      const result = await chain.invoke({
        content: input.content,
        designContext:
          input.designContext || "No specific design context provided",
      });

      return {
        design: result.trim(),
      };
    } catch (error) {
      throw new Error(
        `Design analysis failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async analyzeDesignStream(
    input: DesignAnalysisInput
  ): Promise<IterableReadableStream<AIMessageChunk>> {
    try {
      const promptTemplate = PromptTemplate.fromTemplate(
        DESIGN_ANALYSIS_PROMPT
      );

      const chain = promptTemplate.pipe(this.model);

      const stream = await chain.stream({
        content: input.content,
        designContext:
          input.designContext || "No specific design context provided",
      });

      return stream;
    } catch (error) {
      throw new Error(
        `Design analysis streaming failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}
