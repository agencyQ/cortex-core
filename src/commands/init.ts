import { Command } from 'commander'
import chalk from 'chalk'
import { existsSync } from 'fs'
import fse from 'fs-extra'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { ADDON_MAP, ADDONS } from '../addons/index.js'
import type { AddonBundle } from '../addons/types.js'
import { selectAddons } from '../prompts/selectAddons.js'
import { generateSettings } from '../generators/settings.js'
import { copyRules } from '../generators/rules.js'
import { copySkills } from '../generators/skills.js'
import { copyHooks } from '../generators/hooks.js'
import { writeMcp } from '../generators/mcp.js'
import { writeClaudeMd } from '../generators/claude-md.js'
import { patchGitignore } from '../generators/gitignore.js'

const TEMPLATES_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'templates')

// Flag name → addon ID mapping
const FLAG_ADDON_MAP: Record<string, string> = {
  withNextjs: 'nextjs',
  withTailwind: 'tailwind',
  withBootstrap: 'bootstrap',
  withDotnet: 'dotnet',
  withSitecore: 'sitecore',
  withSanity: 'sanity',
  withWordpress: 'wordpress',
  withDrupal: 'drupal',
  withStorybook: 'storybook',
  withFigma: 'figma',
  withGreptile: 'greptile',
  withImpeccable: 'impeccable',
}

export function createInitCommand(): Command {
  const cmd = new Command('init')

  cmd
    .description('Bootstrap .claude/ setup in the current repo')
    // Framework addons
    .option('--with-nextjs', 'Add Next.js rules and skills')
    .option('--with-tailwind', 'Add Tailwind CSS rules and skills')
    .option('--with-bootstrap', 'Add Bootstrap rules')
    .option('--with-dotnet', 'Add .NET/C# rules and skills')
    .option('--with-sitecore', 'Add Sitecore rules and skills')
    .option('--with-sanity', 'Add Sanity CMS rules, skills, MCP server, and schema hook')
    .option('--with-wordpress', 'Add WordPress rules and skills')
    .option('--with-drupal', 'Add Drupal rules')
    .option('--with-storybook', 'Add Storybook rules, skills, and story check hook')
    // Plugin addons
    .option('--with-figma', 'Enable Figma plugin')
    .option('--with-greptile', 'Enable Greptile plugin')
    .option('--with-impeccable', 'Enable Impeccable plugin')
    // Behavior
    .option('-y, --yes', 'Skip interactive prompts, install core only')
    .option('--dry-run', 'Print what would be written, write nothing')
    .option('--force', 'Overwrite existing .claude/ setup')
    .action(run)

  return cmd
}

async function run(options: Record<string, boolean | undefined>): Promise<void> {
  const cwd = process.cwd()
  const claudeDir = join(cwd, '.claude')
  const dryRun = Boolean(options.dryRun)
  const force = Boolean(options.force)
  const yes = Boolean(options.yes)

  console.log(chalk.bold('\n  cortex-core init\n'))

  // 1. Check for existing setup
  if (existsSync(claudeDir) && !force) {
    console.error(chalk.red(`  .claude/ already exists in ${cwd}`))
    console.error(chalk.dim('  Run with --force to overwrite, or --dry-run to preview'))
    process.exit(1)
  }

  if (dryRun) {
    console.log(chalk.yellow('  DRY RUN — no files will be written\n'))
  }

  // 2. Collect addon selections from flags or interactive prompt
  const flaggedIds = Object.entries(FLAG_ADDON_MAP)
    .filter(([flag]) => Boolean(options[flag]))
    .map(([, id]) => id)

  let selectedAddons: AddonBundle[]

  if (flaggedIds.length > 0) {
    selectedAddons = flaggedIds
      .map((id) => ADDON_MAP.get(id))
      .filter((a): a is AddonBundle => a !== undefined)
  } else if (!yes) {
    selectedAddons = await selectAddons()
  } else {
    selectedAddons = []
  }

  // 3. Ensure .claude/ dir exists
  if (!dryRun) {
    await fse.ensureDir(claudeDir)
  }

  const written: string[] = []

  // 4. Write settings.json
  const settingsPath = await generateSettings(cwd, selectedAddons, dryRun)
  written.push(settingsPath)

  // 5+6. Copy core rules + addon rules
  const rulePaths = await copyRules(cwd, TEMPLATES_DIR, selectedAddons, dryRun)
  written.push(...rulePaths)

  // 7+8. Copy addon skills
  const skillPaths = await copySkills(cwd, TEMPLATES_DIR, selectedAddons, dryRun)
  written.push(...skillPaths)

  // 9+10. Copy core hooks + addon hooks
  const hookPaths = await copyHooks(cwd, TEMPLATES_DIR, selectedAddons, dryRun)
  written.push(...hookPaths)

  // 11. Write CLAUDE.md
  const claudeMdPath = await writeClaudeMd(cwd, TEMPLATES_DIR, selectedAddons, dryRun)
  written.push(claudeMdPath)

  // 12. Write .mcp.json (only if at least one addon contributes MCP config)
  const mcpPath = await writeMcp(cwd, selectedAddons, dryRun)
  if (mcpPath) written.push(mcpPath)

  // 13. Patch .gitignore
  const gitignorePath = await patchGitignore(cwd, dryRun)
  if (gitignorePath) written.push(gitignorePath)

  // 14. Print success summary
  printSummary(written, selectedAddons, dryRun)
}

function printSummary(written: string[], addons: AddonBundle[], dryRun: boolean): void {
  const verb = dryRun ? 'Would write' : 'Written'
  const cwd = process.cwd()

  console.log(chalk.bold(`\n  ${dryRun ? 'Dry run complete' : 'Setup complete'}\n`))
  console.log(`  ${chalk.green(verb)}:`)
  for (const f of written) {
    const rel = f.startsWith(cwd) ? f.slice(cwd.length + 1) : f
    console.log(chalk.dim(`    ${rel}`))
  }

  // Per-addon next steps
  if (!dryRun) {
    const hasSanity = addons.some((a) => a.id === 'sanity')
    if (hasSanity) {
      console.log(chalk.bold('\n  Next steps for Sanity:'))
      console.log('    1. Open .mcp.json and set your SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN')
      console.log('    2. Or run: npx @sanity/mcp-server config')
    }

    const hasFigma = addons.some((a) => a.id === 'figma')
    if (hasFigma) {
      console.log(chalk.bold('\n  Next steps for Figma:'))
      console.log('    1. Open Claude Code settings and enable the Figma plugin')
      console.log('    2. Connect your Figma account')
    }

    console.log(chalk.bold('\n  Open this directory in Claude Code to get started\n'))
  }
}
