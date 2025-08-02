import { GenerateUIModelsConfig } from "./config.types";

export interface DesignAnalysisInput {
  content: string;
  designContext?: string;
}

export interface DesignAnalysisOutput {
  design: string;
}

export interface GenUIInput {
  content: string;
  design: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export interface Typography {
  fontFamily: string;
  headingScale: string;
  bodySize: string;
}

export interface Spacing {
  unit: number;
  scale: number[];
}

export interface Breakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface DesignTokens {
  borderRadius: string;
  shadows: string[];
  transitions: Record<string, string>;
}

export interface Theme {
  colors: ThemeColors;
  typography: Typography;
  spacing: Spacing;
  breakpoints: Breakpoints;
}

export interface DesignSystem {
  theme: Theme;
  tokens: DesignTokens;
}

export interface ComponentProps {
  [key: string]: any;
}

export interface UIComponent {
  id: string;
  type: string;
  props: ComponentProps;
  content?: string | object;
  children?: UIComponent[];
}

export interface LayoutSection {
  id: string;
  type: string;
  props: ComponentProps;
  components: UIComponent[];
}

export interface ResponsiveOverrides {
  mobile?: Partial<LayoutSection>;
  tablet?: Partial<LayoutSection>;
  desktop?: Partial<LayoutSection>;
}

export interface LayoutStructure {
  structure: string;
  sections: LayoutSection[];
  responsive: ResponsiveOverrides;
}

export interface GenUIOutput {
  design: DesignSystem;
  layout: LayoutStructure;
}

export interface ChainResult {
  designAnalysis: DesignAnalysisOutput;
  genUI: GenUIOutput;
}
