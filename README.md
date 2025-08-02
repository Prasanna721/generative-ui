# Generative UI

A system that uses LLMs to analyze content and generate appropriate UI designs automatically.

## Architecture

- **@generative-ui/core**: Core UI generation logic and content analysis
- **@generative-ui/react**: React component wrapper
- **@generative-ui/mcp-server**: MCP (Model Context Protocol) server implementation

## Quick Start

### React Usage

```tsx
import { GenerativeUI } from '@generative-ui/react';

function App() {
  return (
    <GenerativeUI 
      content="Create a contact form with name, email, and message fields"
      design={{
        theme: {
          colors: { primary: '#3b82f6', background: '#ffffff' }
        },
        components: { type: 'tailwind' }
      }}
    />
  );
}
```

### MCP Server

```bash
# Start the MCP server
npm run start -w packages/mcp-server
```

### Core API

```javascript
import { UIGenerator } from '@generative-ui/core';

const generator = new UIGenerator();
const result = await generator.generate({
  content: 'Your content here',
  apiKey: 'your-anthropic-api-key' // optional
});
```

## Features

- Content analysis and UI type detection
- LLM-powered UI generation (optional)
- Template-based fallback generation
- React component integration
- MCP server for external integrations
- Tailwind CSS styling
- Responsive design support

## Development

```bash
npm install
npm run build
npm run dev  # Watch mode
```