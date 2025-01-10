export abstract class BaseProvider {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  abstract testConnection(): Promise<boolean>;
  abstract getModels(): Promise<string[]>;
  abstract getModelInfo(model: string): Promise<any>;
  abstract generateResponse(model: string, messages: any[]): Promise<string>;
}
