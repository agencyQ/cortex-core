# @agencyq-007/cortex-core

AgencyQ Claude Code setup CLI. Bootstrap any repo with consistent rules, hooks, skills, and MCP servers.

## Usage

```bash
npx @agencyq-007/cortex-core init
```

### Options

```
--with-nextjs        Next.js rules and scaffold skill
--with-tailwind      Tailwind CSS rules and class helper skill
--with-bootstrap     Bootstrap rules
--with-dotnet        .NET/C# rules and scaffold skill
--with-sitecore      Sitecore rules and component skill
--with-sanity        Sanity CMS rules, GROQ skill, MCP server, schema hook
--with-wordpress     WordPress rules and block scaffold skill
--with-drupal        Drupal rules
--with-storybook     Storybook rules, story generator skill, story check hook
--with-figma         Figma design-to-code plugin
--with-greptile      Greptile codebase search plugin
--with-impeccable    Impeccable design quality plugin
-y, --yes            Skip interactive prompts (core only)
--dry-run            Print what would be written, write nothing
--force              Overwrite existing .claude/ setup
```

### Examples

```bash
# Interactive addon selection
npx @agencyq-007/cortex-core init

# Core only, no prompts
npx @agencyq-007/cortex-core init --yes

# Sanity + Storybook project
npx @agencyq-007/cortex-core init --with-sanity --with-storybook --yes

# Next.js + Tailwind + Figma
npx @agencyq-007/cortex-core init --with-nextjs --with-tailwind --with-figma --yes

# Preview without writing
npx @agencyq-007/cortex-core init --with-sanity --dry-run
```

## What Gets Written

```
.claude/
  settings.json        Merged hooks + plugins for all selected addons
  CLAUDE.md            @imports for all installed rule files
  rules/
    common/            9 AgencyQ base rules (always)
    typescript/        5 TypeScript rules (always)
    <addon>/           Addon-specific rules (if selected)
  skills/
    <skill-name>/      Addon skills with SKILL.md (if selected)
  hooks/
    post-edit.sh       Auto-format + typecheck + console.log audit (always)
    pre-stop.sh        Session-end console.log audit (always)
    sanity/            Schema validation hook (if Sanity selected)
    storybook/         Story format check hook (if Storybook selected)
.mcp.json              Sanity MCP server config (if Sanity selected)
.gitignore             Adds .claude/settings.local.json
```

## After Init

Open the project in Claude Code. Rules load automatically via CLAUDE.md @imports.

**For Sanity projects**: Set env vars in `.mcp.json`:
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_API_TOKEN`

## Development

```bash
npm install
npm run build
node dist/cli.js init --dry-run
```
