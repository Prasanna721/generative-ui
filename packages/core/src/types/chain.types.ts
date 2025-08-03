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
  surface: string;
  text: string;
  error: string;
}

export interface Theme {
  colors: ThemeColors;
}

export interface ComponentProps {
  [key: string]: any;
}

export interface UIElement {
  type: string;
  props: ComponentProps;
  children?: UIElement[];
}

export interface GenUIOutput {
  theme: Theme;
  root: UIElement;
}

export interface ChainResult {
  designAnalysis: DesignAnalysisOutput;
  genUI: GenUIOutput;
}
