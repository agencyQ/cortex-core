import fse from 'fs-extra'
import { join, basename } from 'path'
import type { AddonBundle } from '../addons/types.js'

export async function copySkills(
  cwd: string,
  templatesDir: string,
  addons: AddonBundle[],
  dryRun: boolean,
): Promise<string[]> {
  const written: string[] = []

  for (const addon of addons) {
    if (!addon.skillDirs) continue

    for (const skillDir of addon.skillDirs) {
      const skillName = basename(skillDir)
      const src = join(templatesDir, 'addons', skillDir)
      const dst = join(cwd, '.claude', 'skills', skillName)

      if (!dryRun) {
        await fse.ensureDir(dst)
        await fse.copy(src, dst, { overwrite: true })
      }
      written.push(join('.claude', 'skills', skillName))
    }
  }

  return written
}
