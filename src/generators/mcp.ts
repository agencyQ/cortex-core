import fse from 'fs-extra'
import { join } from 'path'
import type { AddonBundle, McpServerEntry } from '../addons/types.js'

interface McpJson {
  mcpServers: Record<string, McpServerEntry>
}

export async function writeMcp(
  cwd: string,
  addons: AddonBundle[],
  dryRun: boolean,
): Promise<string | null> {
  const mcpAddons = addons.filter((a) => a.mcpConfig)
  if (mcpAddons.length === 0) return null

  const mcpServers: Record<string, McpServerEntry> = {}
  for (const addon of mcpAddons) {
    Object.assign(mcpServers, addon.mcpConfig)
  }

  const mcpJson: McpJson = { mcpServers }
  const outPath = join(cwd, '.mcp.json')

  if (!dryRun) {
    await fse.writeJson(outPath, mcpJson, { spaces: 2 })
  }

  return outPath
}
