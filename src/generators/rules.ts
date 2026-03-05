import fse from 'fs-extra'
import { join } from 'path'
import type { AddonBundle } from '../addons/types.js'

export async function copyRules(
  cwd: string,
  templatesDir: string,
  addons: AddonBundle[],
  dryRun: boolean,
): Promise<string[]> {
  const written: string[] = []

  // Always copy core rules (common + typescript)
  const coreRulesSrc = join(templatesDir, 'core', 'rules')
  const coreRulesDst = join(cwd, '.claude', 'rules')

  if (!dryRun) {
    await fse.copy(coreRulesSrc, coreRulesDst, { overwrite: true })
  }
  written.push(join('.claude', 'rules', 'common'))
  written.push(join('.claude', 'rules', 'typescript'))

  // Copy addon rules
  for (const addon of addons) {
    if (!addon.rulesDir) continue

    const src = join(templatesDir, 'addons', addon.rulesDir)
    const dst = join(cwd, '.claude', 'rules', addon.id)

    if (!dryRun) {
      await fse.ensureDir(dst)
      await fse.copy(src, dst, { overwrite: true })
    }
    written.push(join('.claude', 'rules', addon.id))
  }

  return written
}
