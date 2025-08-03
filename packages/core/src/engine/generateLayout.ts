import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatAnthropic } from "@langchain/anthropic";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

import { GEN_UI_PROMPT } from "../prompts/genUI";
import { GenUIInput, GenUIOutput } from "../types/chain.types";
import { AIMessageChunk } from "@langchain/core/messages";
import { IterableReadableStream } from "@langchain/core/dist/utils/stream";

export class GenUIEngine {
  private model: ChatGoogleGenerativeAI | ChatAnthropic;
  private outputParser: JsonOutputParser;

  constructor(model: ChatGoogleGenerativeAI | ChatAnthropic) {
    this.model = model;
    this.outputParser = new JsonOutputParser();
  }

  async generateUI(input: GenUIInput): Promise<GenUIOutput> {
    try {
      const promptTemplate = PromptTemplate.fromTemplate(GEN_UI_PROMPT);

      const chain = promptTemplate.pipe(this.model).pipe(this.outputParser);

      const result = await chain.invoke({
        content: input.content,
        design: input.design,
      });

      // Just return the parsed JSON without validation
      return result as GenUIOutput;
    } catch (error) {
      throw new Error(
        `UI generation failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async generateUIStream(
    input: GenUIInput
  ): Promise<IterableReadableStream<AIMessageChunk>> {
    try {
      const promptTemplate = PromptTemplate.fromTemplate(GEN_UI_PROMPT);

      const chain = promptTemplate.pipe(this.model);

      const stream = await chain.stream({
        content: input.content,
        design: input.design,
      });

      return stream;
    } catch (error) {
      throw new Error(
        `UI generation streaming failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

}
