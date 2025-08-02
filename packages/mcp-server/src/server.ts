import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "generative-ui-server",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "generate_ui",
        description: "Generate UI from content description",
        inputSchema: {
          type: "object",
          properties: {
            content: {
              type: "string",
              description: "Content to generate UI for",
            },
            design: {
              type: "object",
              description: "Design preferences (optional)",
              properties: {
                theme: {
                  type: "object",
                  properties: {
                    colors: { type: "object" },
                    typography: { type: "object" },
                  },
                },
                components: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                      enum: ["tailwind", "mui", "chakra", "custom"],
                    },
                  },
                },
              },
            },
            llmProvider: {
              type: "string",
              enum: ["anthropic", "openai"],
              description: "LLM provider to use (optional)",
            },
            apiKey: {
              type: "string",
              description: "API key for LLM provider (optional)",
            },
          },
          required: ["content"],
        },
      },
      {
        name: "analyze_content",
        description: "Analyze content structure and extract key elements",
        inputSchema: {
          type: "object",
          properties: {
            content: {
              type: "string",
              description: "Content to analyze",
            },
          },
          required: ["content"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "generate_ui") {
    try {
      return {
        content: [
          {
            type: "text",
            text: {},
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error generating UI: ${(error as Error).message}`,
          },
        ],
        isError: true,
      };
    }
  }

  if (name === "analyze_content") {
    try {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({}, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error analyzing content: ${(error as Error).message}`,
          },
        ],
        isError: true,
      };
    }
  }

  throw new Error(`Unknown tool: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("Generative UI MCP Server running on stdio");
}

main().catch(console.error);
