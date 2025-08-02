export interface ModelConfig {
  apiKey: string;
  model: string;
}

export interface GenerateUIModelsConfig {
  designModel: ModelConfig;
  uiModel: ModelConfig;
}
