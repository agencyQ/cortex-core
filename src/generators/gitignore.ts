import fse from 'fs-extra'
import { readFile, appendFile } from 'fs/promises'
import { join } from 'path'

const ENTRY = '.claude/settings.local.json'

export async function patchGitignore(cwd: string, dryRun: boolean): Promise<string | null> {
  const gitignorePath = join(cwd, '.gitignore')

  if (await fse.pathExists(gitignorePath)) {
    const content = await readFile(gitignorePath, 'utf8')
    if (content.includes(ENTRY)) {
      return null // Already present
    }
  }

  if (!dryRun) {
    await appendFile(gitignorePath, `\n# Claude Code local settings\n${ENTRY}\n`)
  }

  return gitignorePath
}
