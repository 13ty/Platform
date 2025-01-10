import { useCallback } from 'react';
import { CookieStorage } from '../utils/storage/cookieStorage';
import { useSettingsStore } from '../store/settingsStore';
import { logStore } from '../store/logStore';
import type { ProviderSettings } from '../utils/storage/types';

export function useSettingsStorage() {
  const {
    providers,
    updateProviderSettings,
    setDebugMode,
    setEventLogs,
    setLocalModels,
    setPromptId,
    setLatestBranch,
    setAutoSelectTemplate,
    setContextOptimization
  } = useSettingsStore();

  const loadSettings = useCallback(() => {
    const config = CookieStorage.getConfig();

    if (config.providers) {
      Object.entries(config.providers).forEach(([provider, settings]) => {
        updateProviderSettings(provider, settings as ProviderSettings);
      });
    }

    if (config.debug !== undefined) setDebugMode(config.debug);
    if (config.eventLogs !== undefined) setEventLogs(config.eventLogs);
    if (config.localModels !== undefined) setLocalModels(config.localModels);
    if (config.promptId) setPromptId(config.promptId);
    if (config.latestBranch !== undefined) setLatestBranch(config.latestBranch);
    if (config.autoSelectTemplate !== undefined) setAutoSelectTemplate(config.autoSelectTemplate);
    if (config.contextOptimization !== undefined) setContextOptimization(config.contextOptimization);
  }, []);

  const saveProviderSettings = useCallback(() => {
    const providerSettings: Record<string, ProviderSettings> = {};
    Object.entries(providers).forEach(([provider, config]) => {
      providerSettings[provider] = config.settings;
    });
    CookieStorage.set('providers', providerSettings);
  }, [providers]);

  const toggleSetting = useCallback((key: string, value: boolean, label: string) => {
    CookieStorage.set(key, String(value));
    logStore.logSystem(`${label} ${value ? 'enabled' : 'disabled'}`);
  }, []);

  return {
    loadSettings,
    saveProviderSettings,
    toggleSetting
  };
}
