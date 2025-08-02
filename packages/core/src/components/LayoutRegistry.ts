import React from 'react';
import { LinearLayout, LinearLayoutProps } from './layouts/LinearLayout';
import { RelativeLayout, RelativeItem, RelativeLayoutProps, RelativeItemProps } from './layouts/RelativeLayout';
import { GridLayout, GridItem, GridLayoutProps, GridItemProps } from './layouts/GridLayout';

export type LayoutComponent = React.ComponentType<any>;

export interface LayoutDefinition {
  component: LayoutComponent;
  name: string;
  description: string;
  propsSchema: any; // Simplified prop schema for AI generation
  category: 'layout' | 'item';
  supportedChildren?: string[];
  requiredProps: string[];
  optionalProps: string[];
}

export class LayoutRegistry {
  private static instance: LayoutRegistry;
  private layouts: Map<string, LayoutDefinition> = new Map();

  private constructor() {
    this.registerDefaultLayouts();
  }

  public static getInstance(): LayoutRegistry {
    if (!LayoutRegistry.instance) {
      LayoutRegistry.instance = new LayoutRegistry();
    }
    return LayoutRegistry.instance;
  }

  private registerDefaultLayouts(): void {
    // Register Linear Layout
    this.register({
      name: 'LinearLayout',
      component: LinearLayout,
      description: 'Sequential arrangement layout with horizontal or vertical orientation',
      category: 'layout',
      supportedChildren: ['any'],
      requiredProps: ['orientation'],
      optionalProps: ['className'],
      propsSchema: {
        orientation: {
          type: 'string',
          enum: ['horizontal', 'vertical'],
          description: 'Direction of child arrangement'
        },
        className: {
          type: 'string',
          description: 'Tailwind CSS classes for styling'
        }
      }
    });

    // Register Relative Layout
    this.register({
      name: 'RelativeLayout',
      component: RelativeLayout,
      description: 'Position-based layout container for absolutely positioned items',
      category: 'layout',
      supportedChildren: ['RelativeItem'],
      requiredProps: [],
      optionalProps: ['className'],
      propsSchema: {
        className: {
          type: 'string',
          description: 'Tailwind CSS classes for styling'
        }
      }
    });

    this.register({
      name: 'RelativeItem',
      component: RelativeItem,
      description: 'Absolutely positioned item with preset position options',
      category: 'item',
      requiredProps: ['position'],
      optionalProps: ['className'],
      propsSchema: {
        position: {
          type: 'string',
          enum: ['top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'],
          description: 'Preset position within RelativeLayout'
        },
        className: {
          type: 'string',
          description: 'Tailwind CSS classes for styling'
        }
      }
    });

    // Register Grid Layout
    this.register({
      name: 'GridLayout',
      component: GridLayout,
      description: 'CSS Grid layout with configurable columns (1-12)',
      category: 'layout',
      supportedChildren: ['GridItem', 'any'],
      requiredProps: ['columns'],
      optionalProps: ['className'],
      propsSchema: {
        columns: {
          type: 'number',
          minimum: 1,
          maximum: 12,
          description: 'Number of grid columns (1-12)'
        },
        className: {
          type: 'string',
          description: 'Tailwind CSS classes for styling'
        }
      }
    });

    this.register({
      name: 'GridItem',
      component: GridItem,
      description: 'Grid item with column span configuration',
      category: 'item',
      requiredProps: [],
      optionalProps: ['span', 'className'],
      propsSchema: {
        span: {
          type: 'number',
          minimum: 1,
          maximum: 12,
          description: 'Number of columns to span (1-12)'
        },
        className: {
          type: 'string',
          description: 'Tailwind CSS classes for styling'
        }
      }
    });
  }

  public register(definition: LayoutDefinition): void {
    this.layouts.set(definition.name, definition);
  }

  public get(name: string): LayoutDefinition | undefined {
    return this.layouts.get(name);
  }

  public getComponent(name: string): LayoutComponent | undefined {
    const definition = this.layouts.get(name);
    return definition?.component;
  }

  public getAllLayouts(): LayoutDefinition[] {
    return Array.from(this.layouts.values());
  }

  public getLayoutsByCategory(category: 'layout' | 'item'): LayoutDefinition[] {
    return Array.from(this.layouts.values()).filter(
      layout => layout.category === category
    );
  }

  public isValidChild(parentLayout: string, childType: string): boolean {
    const parent = this.layouts.get(parentLayout);
    if (!parent || !parent.supportedChildren) return true;
    
    return parent.supportedChildren.includes('any') || 
           parent.supportedChildren.includes(childType);
  }

  public getLayoutNames(): string[] {
    return Array.from(this.layouts.keys());
  }

  public hasLayout(name: string): boolean {
    return this.layouts.has(name);
  }

  public unregister(name: string): boolean {
    return this.layouts.delete(name);
  }

  public clear(): void {
    this.layouts.clear();
    this.registerDefaultLayouts();
  }

  // Utility method to create a component dynamically
  public createComponent(
    layoutName: string, 
    props: any, 
    children?: React.ReactNode
  ): React.ReactElement | null {
    const Component = this.getComponent(layoutName);
    if (!Component) {
      console.warn(`Layout component '${layoutName}' not found in registry`);
      return null;
    }

    return React.createElement(Component, props, children);
  }

  // Method to get layout metadata for AI generation
  public getLayoutMetadata(): Record<string, any> {
    const metadata: Record<string, any> = {};
    
    this.layouts.forEach((definition, name) => {
      metadata[name] = {
        name: definition.name,
        description: definition.description,
        category: definition.category,
        supportedChildren: definition.supportedChildren,
        requiredProps: definition.requiredProps,
        optionalProps: definition.optionalProps,
        propsSchema: definition.propsSchema,
      };
    });

    return metadata;
  }

  // Method to get AI-friendly layout documentation
  public getAIDocumentation(): string {
    let documentation = "# Available Layout Primitives\n\n";
    
    const layouts = this.getLayoutsByCategory('layout');
    const items = this.getLayoutsByCategory('item');
    
    documentation += "## Layout Components:\n";
    layouts.forEach(layout => {
      documentation += `### ${layout.name}\n`;
      documentation += `${layout.description}\n\n`;
      documentation += `**Required Props:** ${layout.requiredProps.join(', ') || 'none'}\n`;
      documentation += `**Optional Props:** ${layout.optionalProps.join(', ') || 'none'}\n`;
      
      if (layout.propsSchema) {
        documentation += `**Props Schema:**\n`;
        Object.entries(layout.propsSchema).forEach(([prop, schema]: [string, any]) => {
          documentation += `- \`${prop}\`: ${schema.description}`;
          if (schema.enum) {
            documentation += ` (options: ${schema.enum.join(', ')})`;
          }
          if (schema.minimum && schema.maximum) {
            documentation += ` (range: ${schema.minimum}-${schema.maximum})`;
          }
          documentation += `\n`;
        });
      }
      documentation += `\n`;
    });
    
    documentation += "## Item Components:\n";
    items.forEach(item => {
      documentation += `### ${item.name}\n`;
      documentation += `${item.description}\n\n`;
      documentation += `**Required Props:** ${item.requiredProps.join(', ') || 'none'}\n`;
      documentation += `**Optional Props:** ${item.optionalProps.join(', ') || 'none'}\n`;
      
      if (item.propsSchema) {
        documentation += `**Props Schema:**\n`;
        Object.entries(item.propsSchema).forEach(([prop, schema]: [string, any]) => {
          documentation += `- \`${prop}\`: ${schema.description}`;
          if (schema.enum) {
            documentation += ` (options: ${schema.enum.join(', ')})`;
          }
          if (schema.minimum && schema.maximum) {
            documentation += ` (range: ${schema.minimum}-${schema.maximum})`;
          }
          documentation += `\n`;
        });
      }
      documentation += `\n`;
    });
    
    return documentation;
  }
}

// Export singleton instance
export const layoutRegistry = LayoutRegistry.getInstance();

// Export types for external use
export type {
  LinearLayoutProps,
  RelativeLayoutProps,
  RelativeItemProps,
  GridLayoutProps,
  GridItemProps,
};