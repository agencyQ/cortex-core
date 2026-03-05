export interface HookCommand {
  type: 'command'
  command: string
}

export interface HookEntry {
  matcher: string
  hooks: HookCommand[]
}

export interface McpServerEntry {
  command: string
  args?: string[]
  env?: Record<string, string>
}

export interface AddonBundle {
  id: string
  label: string
  group: 'framework' | 'plugin'
  description: string
  // Each field is optional — addon contributes only what it defines
  rulesDir?: string       // relative to templates/addons/<id>/rules/
  skillDirs?: string[]    // relative to templates/addons/ (e.g. 'nextjs/skills/nextjs-scaffold')
  hooksDir?: string       // relative to templates/addons/ (e.g. 'sanity/hooks')
  hooksConfig?: {
    PostToolUse?: HookEntry[]
    Stop?: HookEntry[]
  }
  mcpConfig?: Record<string, McpServerEntry>
  plugins?: Record<string, boolean>
  marketplaces?: string[]
}
