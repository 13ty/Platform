export interface ProviderSettings {
  enabled: boolean;
  url: string;
  apiKey?: string;
  models: string[];
}

export interface StorageConfig {
  providers: Record<string, ProviderSettings>;
  debug: boolean;
  eventLogs: boolean;
  localModels: boolean;
  promptId?: string;
  latestBranch: boolean;
  autoSelectTemplate: boolean;
  contextOptimization: boolean;
}
