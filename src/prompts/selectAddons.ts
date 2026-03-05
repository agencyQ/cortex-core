import { checkbox, Separator } from '@inquirer/prompts'
import { ADDONS } from '../addons/index.js'
import type { AddonBundle } from '../addons/types.js'

export async function selectAddons(): Promise<AddonBundle[]> {
  const frameworkChoices = ADDONS
    .filter((a) => a.group === 'framework')
    .map((a) => ({
      name: `${a.label.padEnd(16)} ${a.description}`,
      value: a.id,
      checked: false,
    }))

  const pluginChoices = ADDONS
    .filter((a) => a.group === 'plugin')
    .map((a) => ({
      name: `${a.label.padEnd(16)} ${a.description}`,
      value: a.id,
      checked: false,
    }))

  const selected = await checkbox({
    message: 'Select optional addons',
    choices: [
      new Separator('── Framework / Platform ──────────────────'),
      ...frameworkChoices,
      new Separator('── Claude Plugins ────────────────────────'),
      ...pluginChoices,
    ],
    instructions: '(space to select, enter to confirm)',
  })

  return selected
    .map((id) => ADDONS.find((a) => a.id === id))
    .filter((a): a is AddonBundle => a !== undefined)
}
