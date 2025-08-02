import React from 'react';

// Import shadcn components
import * as ShadcnComponents from './base/shadcn';

export type DesignSystem = 'shadcn' | 'mui' | 'antd' | 'm3';

export type ComponentType = 'Text' | 'Button' | 'Card' | 'Badge' | 'Input';

export interface ComponentDefinition {
  component: React.ComponentType<any>;
  name: string;
  description: string;
  designSystem: DesignSystem;
  propsSchema: Record<string, any>;
  category: 'typography' | 'form' | 'layout' | 'feedback' | 'display';
}

export class ComponentRegistry {
  private static instance: ComponentRegistry;
  private components: Map<string, ComponentDefinition> = new Map();
  private currentDesignSystem: DesignSystem = 'shadcn';

  private constructor() {
    this.registerShadcnComponents();
  }

  public static getInstance(): ComponentRegistry {
    if (!ComponentRegistry.instance) {
      ComponentRegistry.instance = new ComponentRegistry();
    }
    return ComponentRegistry.instance;
  }

  private registerShadcnComponents(): void {
    // Register Text component
    this.register({
      name: 'Text',
      component: ShadcnComponents.Text,
      description: 'Typography component with size, weight, and color variants',
      designSystem: 'shadcn',
      category: 'typography',
      propsSchema: {
        size: {
          type: 'string',
          enum: ['sm', 'md', 'lg', 'xl'],
          default: 'md',
          description: 'Text size variant'
        },
        weight: {
          type: 'string', 
          enum: ['normal', 'medium', 'bold'],
          default: 'normal',
          description: 'Font weight'
        },
        color: {
          type: 'string',
          enum: ['default', 'muted', 'accent'],
          default: 'default',
          description: 'Text color variant'
        }
      }
    });

    // Register Button component
    this.register({
      name: 'Button',
      component: ShadcnComponents.Button,
      description: 'Interactive button with variant and size options',
      designSystem: 'shadcn',
      category: 'form',
      propsSchema: {
        variant: {
          type: 'string',
          enum: ['primary', 'secondary', 'outline', 'ghost'],
          default: 'primary',
          description: 'Button style variant'
        },
        size: {
          type: 'string',
          enum: ['sm', 'md', 'lg'],
          default: 'md',
          description: 'Button size'
        },
        disabled: {
          type: 'boolean',
          default: false,
          description: 'Whether button is disabled'
        }
      }
    });

    // Register Card component
    this.register({
      name: 'Card',
      component: ShadcnComponents.Card,
      description: 'Container component with padding and shadow options',
      designSystem: 'shadcn',
      category: 'layout',
      propsSchema: {
        padding: {
          type: 'string',
          enum: ['sm', 'md', 'lg'],
          default: 'md',
          description: 'Internal padding size'
        },
        shadow: {
          type: 'string',
          enum: ['none', 'sm', 'md', 'lg'],
          default: 'sm',
          description: 'Shadow intensity'
        }
      }
    });

    // Register Badge component  
    this.register({
      name: 'Badge',
      component: ShadcnComponents.Badge,
      description: 'Status indicator with variant and size options',
      designSystem: 'shadcn',
      category: 'feedback',
      propsSchema: {
        variant: {
          type: 'string',
          enum: ['success', 'warning', 'error', 'info', 'neutral'],
          default: 'neutral',
          description: 'Badge status variant'
        },
        size: {
          type: 'string',
          enum: ['sm', 'md', 'lg'],
          default: 'md',
          description: 'Badge size'
        }
      }
    });

    // Register Input component
    this.register({
      name: 'Input',
      component: ShadcnComponents.Input,
      description: 'Form input with type and size variants',
      designSystem: 'shadcn',
      category: 'form',
      propsSchema: {
        type: {
          type: 'string',
          enum: ['text', 'email', 'password', 'textarea'],
          default: 'text',
          description: 'Input type'
        },
        size: {
          type: 'string',
          enum: ['sm', 'md', 'lg'],
          default: 'md',
          description: 'Input size'
        },
        placeholder: {
          type: 'string',
          description: 'Placeholder text'
        }
      }
    });
  }

  public register(definition: ComponentDefinition): void {
    const key = `${definition.designSystem}:${definition.name}`;
    this.components.set(key, definition);
  }

  public getComponent(name: ComponentType): React.ComponentType<any> | undefined {
    const key = `${this.currentDesignSystem}:${name}`;
    const definition = this.components.get(key);
    return definition?.component;
  }

  public getComponentDefinition(name: ComponentType): ComponentDefinition | undefined {
    const key = `${this.currentDesignSystem}:${name}`;
    return this.components.get(key);
  }

  public setDesignSystem(designSystem: DesignSystem): void {
    this.currentDesignSystem = designSystem;
  }

  public getCurrentDesignSystem(): DesignSystem {
    return this.currentDesignSystem;
  }

  public getAllComponents(): ComponentDefinition[] {
    return Array.from(this.components.values()).filter(
      component => component.designSystem === this.currentDesignSystem
    );
  }

  public getComponentsByCategory(category: ComponentDefinition['category']): ComponentDefinition[] {
    return this.getAllComponents().filter(component => component.category === category);
  }

  public getAIDocumentation(): string {
    let documentation = `# ${this.currentDesignSystem.toUpperCase()} Components\n\n`;
    
    const categories = ['typography', 'form', 'layout', 'feedback', 'display'] as const;
    
    categories.forEach(category => {
      const components = this.getComponentsByCategory(category);
      if (components.length === 0) return;
      
      documentation += `## ${category.charAt(0).toUpperCase() + category.slice(1)} Components\n\n`;
      
      components.forEach(component => {
        documentation += `### ${component.name}\n`;
        documentation += `${component.description}\n\n`;
        documentation += `**Props:**\n`;
        
        Object.entries(component.propsSchema).forEach(([prop, schema]: [string, any]) => {
          documentation += `- \`${prop}\`: ${schema.description}`;
          if (schema.enum) {
            documentation += ` (options: ${schema.enum.join(', ')})`;
          }
          if (schema.default) {
            documentation += ` (default: ${schema.default})`;
          }
          documentation += `\n`;
        });
        documentation += `\n`;
      });
    });
    
    return documentation;
  }

  // Utility method to create a component dynamically
  public createComponent(
    name: ComponentType,
    props: any,
    children?: React.ReactNode
  ): React.ReactElement | null {
    const Component = this.getComponent(name);
    if (!Component) {
      console.warn(`Component '${name}' not found for design system '${this.currentDesignSystem}'`);
      return null;
    }

    return React.createElement(Component, props, children);
  }
}

// Export singleton instance
export const componentRegistry = ComponentRegistry.getInstance();