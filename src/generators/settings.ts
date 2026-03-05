import fse from 'fs-extra'
import { join } from 'path'
import type { AddonBundle, HookEntry } from '../addons/types.js'

interface SettingsJson {
  enabledPlugins: Record<string, boolean>
  extraKnownMarketplaces: string[]
  hooks: {
    PostToolUse: HookEntry[]
    Stop: HookEntry[]
  }
}

const CORE_SETTINGS: SettingsJson = {
  enabledPlugins: {},
  extraKnownMarketplaces: [],
  hooks: {
    PostToolUse: [
      {
        matcher: 'Edit|Write',
        hooks: [{ type: 'command', command: '.claude/hooks/post-edit.sh' }],
      },
    ],
    Stop: [
      {
        matcher: '',
        hooks: [{ type: 'command', command: '.claude/hooks/pre-stop.sh' }],
      },
    ],
  },
}

export async function generateSettings(
  cwd: string,
  addons: AddonBundle[],
  dryRun: boolean,
): Promise<string> {
  const outPath = join(cwd, '.claude', 'settings.json')

  const settings: SettingsJson = {
    enabledPlugins: { ...CORE_SETTINGS.enabledPlugins },
    extraKnownMarketplaces: [...CORE_SETTINGS.extraKnownMarketplaces],
    hooks: {
      PostToolUse: [...CORE_SETTINGS.hooks.PostToolUse],
      Stop: [...CORE_SETTINGS.hooks.Stop],
    },
  }

  for (const addon of addons) {
    if (addon.plugins) {
      Object.assign(settings.enabledPlugins, addon.plugins)
    }

    if (addon.marketplaces) {
      for (const m of addon.marketplaces) {
        if (!settings.extraKnownMarketplaces.includes(m)) {
          settings.extraKnownMarketplaces.push(m)
        }
      }
    }

    if (addon.hooksConfig?.PostToolUse) {
      settings.hooks.PostToolUse.push(...addon.hooksConfig.PostToolUse)
    }

    if (addon.hooksConfig?.Stop) {
      settings.hooks.Stop.push(...addon.hooksConfig.Stop)
    }
  }

  if (!dryRun) {
    await fse.writeJson(outPath, settings, { spaces: 2 })
  }

  return outPath
}
