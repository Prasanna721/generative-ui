import React from "react";

import * as M3Components from "./base/m3";

export type DesignSystem = "m3";

export type ComponentType = "ProgressBar" | "Slider" | "Button" | "Text";

export interface ComponentDefinition {
  component: React.ComponentType<any>;
  name: string;
  description: string;
  designSystem: DesignSystem;
  propsSchema: Record<string, any>;
  category: "typography" | "form" | "layout" | "feedback" | "display";
}

export class ComponentRegistry {
  private static instance: ComponentRegistry;
  private components: Map<string, ComponentDefinition> = new Map();
  private currentDesignSystem: DesignSystem = "m3";

  private constructor() {
    this.registerM3Components();
  }

  public static getInstance(): ComponentRegistry {
    if (!ComponentRegistry.instance) {
      ComponentRegistry.instance = new ComponentRegistry();
    }
    return ComponentRegistry.instance;
  }

  private registerM3Components(): void {
    // Register ProgressBar component
    this.register({
      name: "ProgressBar",
      component: M3Components.ProgressBar,
      description: "Animated wavy progress bar with customizable appearance",
      designSystem: "m3",
      category: "feedback",
      propsSchema: {
        progress: {
          type: "number",
          description: "Progress value (0-100)",
          default: 0,
        },
        trackColor: {
          type: "string",
          description: "Color of the inactive track",
          default: "#E0E0E0",
        },
        indicatorColor: {
          type: "string",
          description: "Color of the progress indicator",
          default: "#6200EE",
        },
        width: {
          type: "number",
          description: "Width of the progress bar",
          default: 300,
        },
        flowSpeed: {
          type: "number",
          description: "Speed of the wave animation",
          default: 0.02,
        },
      },
    });

    // Register Slider component
    this.register({
      name: "Slider",
      component: M3Components.Slider,
      description: "M3 design slider with single and range selection support",
      designSystem: "m3",
      category: "form",
      propsSchema: {
        value: {
          type: "number|number[]",
          description: "Current value or range values",
        },
        min: {
          type: "number",
          description: "Minimum value",
          default: 0,
        },
        max: {
          type: "number",
          description: "Maximum value",
          default: 100,
        },
        step: {
          type: "number",
          description: "Step increment",
          default: 1,
        },
        orientation: {
          type: "string",
          enum: ["horizontal", "vertical"],
          default: "horizontal",
          description: "Slider orientation",
        },
        size: {
          type: "string",
          enum: ["xs", "s", "m", "l", "xl"],
          default: "xs",
          description: "Slider size",
        },
        trackColorActive: {
          type: "string",
          description: "Active track color",
          default: "#6750A4",
        },
        trackColorInactive: {
          type: "string",
          description: "Inactive track color",
          default: "#E7E0EC",
        },
        thumbColor: {
          type: "string",
          description: "Thumb color",
          default: "#6750A4",
        },
      },
    });

    // Register Button component
    this.register({
      name: "Button",
      component: M3Components.Button,
      description: "M3 Expressive button with multiple variants, shapes, and icon support",
      designSystem: "m3",
      category: "form",
      propsSchema: {
        children: {
          type: "ReactNode",
          description: "Button text or content",
        },
        iconName: {
          type: "string",
          description: "Lucide icon name (e.g., 'User', 'Heart', 'Search')",
        },
        iconPosition: {
          type: "string",
          enum: ["start", "end"],
          default: "start",
          description: "Position of icon relative to text",
        },
        variant: {
          type: "string",
          enum: ["elevated", "filled", "filledTonal", "outlined", "text"],
          default: "elevated",
          description: "Button style variant",
        },
        shape: {
          type: "string",
          enum: ["round", "square"],
          default: "round",
          description: "Button corner style",
        },
        size: {
          type: "string",
          enum: ["extraSmall", "small", "medium", "large", "extraLarge"],
          default: "medium",
          description: "Button size",
        },
        paddingWidth: {
          type: "string",
          enum: ["16dp", "24dp"],
          default: "16dp",
          description: "Button padding width",
        },
        isToggleButton: {
          type: "boolean",
          default: false,
          description: "Enable toggle behavior",
        },
        isSelected: {
          type: "boolean",
          default: false,
          description: "Toggle selected state",
        },
        disabled: {
          type: "boolean",
          default: false,
          description: "Disable button interaction",
        },
      },
    });

    // Register Text component
    this.register({
      name: "Text",
      component: M3Components.Text,
      description: "M3 Typography component with multiple variants and sizes",
      designSystem: "m3",
      category: "typography",
      propsSchema: {
        children: {
          type: "ReactNode",
          description: "Text content to display",
        },
        variant: {
          type: "string",
          enum: ["display", "headline", "title", "body", "label"],
          default: "body",
          description: "Typography style variant",
        },
        size: {
          type: "string",
          enum: ["large", "medium", "small"],
          default: "medium",
          description: "Text size within the variant",
        },
        as: {
          type: "ElementType",
          description: "HTML element to render (overrides default tag mapping)",
        },
        color: {
          type: "string",
          description: "Text color (CSS color value)",
        },
        className: {
          type: "string",
          description: "Additional CSS classes",
        },
      },
    });
  }

  public register(definition: ComponentDefinition): void {
    const key = `${definition.designSystem}:${definition.name}`;
    this.components.set(key, definition);
  }

  public getComponent(
    name: ComponentType
  ): React.ComponentType<any> | undefined {
    const key = `${this.currentDesignSystem}:${name}`;
    const definition = this.components.get(key);
    return definition?.component;
  }

  public getComponentDefinition(
    name: ComponentType
  ): ComponentDefinition | undefined {
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
      (component) => component.designSystem === this.currentDesignSystem
    );
  }

  public getComponentsByCategory(
    category: ComponentDefinition["category"]
  ): ComponentDefinition[] {
    return this.getAllComponents().filter(
      (component) => component.category === category
    );
  }

  public getAIDocumentation(): string {
    let documentation = `# ${this.currentDesignSystem.toUpperCase()} Components\n\n`;

    const categories = [
      "typography",
      "form",
      "layout",
      "feedback",
      "display",
    ] as const;

    categories.forEach((category) => {
      const components = this.getComponentsByCategory(category);
      if (components.length === 0) return;

      documentation += `## ${
        category.charAt(0).toUpperCase() + category.slice(1)
      } Components\n\n`;

      components.forEach((component) => {
        documentation += `### ${component.name}\n`;
        documentation += `${component.description}\n\n`;
        documentation += `**Props:**\n`;

        Object.entries(component.propsSchema).forEach(
          ([prop, schema]: [string, any]) => {
            documentation += `- \`${prop}\`: ${schema.description}`;
            if (schema.enum) {
              documentation += ` (options: ${schema.enum.join(", ")})`;
            }
            if (schema.default) {
              documentation += ` (default: ${schema.default})`;
            }
            documentation += `\n`;
          }
        );
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
      console.warn(
        `Component '${name}' not found for design system '${this.currentDesignSystem}'`
      );
      return null;
    }

    return React.createElement(Component, props, children);
  }
}

// Export singleton instance
export const componentRegistry = ComponentRegistry.getInstance();
