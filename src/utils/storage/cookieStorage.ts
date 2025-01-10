import Cookies from 'js-cookie';
import type { StorageConfig } from './types';

export class CookieStorage {
  static get<T>(key: string): T | null {
    const value = Cookies.get(key);
    if (!value) return null;
    
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  static set(key: string, value: any): void {
    Cookies.set(key, JSON.stringify(value));
  }

  static getConfig(): Partial<StorageConfig> {
    return {
      providers: this.get('providers'),
      debug: this.get('isDebugEnabled') === 'true',
      eventLogs: this.get('isEventLogsEnabled') === 'true',
      localModels: this.get('isLocalModelsEnabled') === 'true',
      promptId: this.get('promptId'),
      latestBranch: this.get('isLatestBranch') === 'true',
      autoSelectTemplate: this.get('autoSelectTemplate') === 'true',
      contextOptimization: this.get('contextOptimizationEnabled') === 'true'
    };
  }
}
