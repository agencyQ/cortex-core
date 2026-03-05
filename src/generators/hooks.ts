import fse from 'fs-extra'
import { join } from 'path'
import { readdir, chmod } from 'fs/promises'
import type { AddonBundle } from '../addons/types.js'

async function makeExecutable(dir: string): Promise<void> {
  const files = await readdir(dir)
  for (const f of files) {
    if (f.endsWith('.sh')) {
      await chmod(join(dir, f), '755')
    }
  }
}

export async function copyHooks(
  cwd: string,
  templatesDir: string,
  addons: AddonBundle[],
  dryRun: boolean,
): Promise<string[]> {
  const written: string[] = []

  // Always copy core hooks
  const coreHooksSrc = join(templatesDir, 'core', 'hooks')
  const coreHooksDst = join(cwd, '.claude', 'hooks')

  if (!dryRun) {
    await fse.ensureDir(coreHooksDst)
    await fse.copy(coreHooksSrc, coreHooksDst, { overwrite: true })
    await makeExecutable(coreHooksDst)
  }
  written.push(join('.claude', 'hooks', 'post-edit.sh'))
  written.push(join('.claude', 'hooks', 'pre-stop.sh'))

  // Copy addon hooks
  for (const addon of addons) {
    if (!addon.hooksDir) continue

    const src = join(templatesDir, 'addons', addon.hooksDir)
    const dst = join(cwd, '.claude', 'hooks', addon.id)

    if (!dryRun) {
      await fse.ensureDir(dst)
      await fse.copy(src, dst, { overwrite: true })
      await makeExecutable(dst)
    }
    written.push(join('.claude', 'hooks', addon.id))
  }

  return written
}
