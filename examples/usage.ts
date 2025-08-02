import * as dotenv from "dotenv";
import {
  GenerativeUI,
  GenerateUIParams,
  GenerateUIModelsConfig,
} from "@generative-ui/core";

// Load environment variables
dotenv.config();

async function example() {
  // Configure models for the two-phase process
  const modelsConfig: GenerateUIModelsConfig = {
    designModel: {
      apiKey: process.env.ANTHROPIC_API_KEY!,
      model: "claude-3-5-sonnet-latest",
    },
    uiModel: {
      apiKey: process.env.GOOGLE_API_KEY!,
      model: "gemini-2.5-pro",
    },
  };

  // Initialize the GenerativeUI engine
  const generativeUI = new GenerativeUI();

  // Define the content and design context
  const params: GenerateUIParams = {
    content: `
      Welcome to TaskFlow Pro
      
      TaskFlow Pro is a comprehensive project management solution designed for modern teams. 
      
      Features:
      - Real-time collaboration
      - Advanced analytics dashboard
      - Customizable workflows
      - Integration with 50+ tools
      
      Get started with our free trial today!
    `,
    design: `
      Modern, professional design with a focus on productivity. 
      Use a clean color scheme with blues and whites. 
      Emphasize the call-to-action for the free trial. 
      Include space for feature highlights and testimonials.
    `,
    modelsConfig,
  };

  try {
    console.log("🚀 Starting UI generation...");

    // Method 1: Standard sequential execution
    const result = await generativeUI.generateUI(params);

    if (result.success) {
      console.log("✅ UI generated successfully!");
      console.log(`⏱️  Execution time: ${result.executionTime}ms`);
      console.log("🎨 Design System:", result.data?.design);
      console.log("🏗️  Layout Structure:", result.data?.layout);
    } else {
      console.error("❌ Generation failed:", result.error);
    }

    // Method 2: Using LangChain sequential chain (alternative approach)
    // console.log("\n🔗 Using LangChain sequential chain...");
    // const chainResult = await generativeUI.generateUIWithSequentialChain(
    //   params
    // );

    // if (chainResult.success) {
    //   console.log("✅ Chain execution completed!");
    //   console.log(`⏱️  Total time: ${chainResult.executionTime}ms`);
    // }

    // Method 3: Streaming generation (for real-time updates)
    console.log("\n📡 Starting streaming generation...");
    // const stream = await generativeUI.generateUIStream(params);

    // for await (const chunk of stream) {
    //   console.log("📦 Received chunk:", chunk);
    // }

    // // Get intermediate results for debugging
    // const context = generativeUI.getExecutionContext();
    // console.log("📊 Execution context:", context);

    const intermediateResults = generativeUI.getIntermediateResults();
    console.log("🔍 Intermediate results:", intermediateResults);
  } catch (error) {
    console.error("💥 Fatal error:", error);
  }
}

// Example with different model configurations
async function differentModelsExample() {
  const modelsConfig: GenerateUIModelsConfig = {
    // Use Anthropic for design analysis (better at understanding context)
    designModel: {
      apiKey: process.env.ANTHROPIC_API_KEY!,
      model: "claude-sonnet-4-20250514",
    },
    // Use Google for UI generation (better at structured output)
    uiModel: {
      apiKey: process.env.GOOGLE_API_KEY!,
      model: "gemini-2.5-flash",
    },
  };

  const generativeUI = new GenerativeUI();

  const params: GenerateUIParams = {
    content: "Create a dashboard for an e-commerce analytics platform",
    design: "Dark theme with data visualization focus, use charts and metrics",
    modelsConfig,
  };

  const result = await generativeUI.generateUI(params);
  console.log("Dashboard generation result:", result);
}

// Run examples
if (require.main === module) {
  example().catch(console.error);
}
