import type { AddonBundle } from './types.js'

export const ADDONS: AddonBundle[] = [
  // ── Framework / Platform ───────────────────────────────────────────────────
  {
    id: 'nextjs',
    label: 'Next.js',
    group: 'framework',
    description: 'Rules + scaffold skill',
    rulesDir: 'nextjs/rules',
    skillDirs: ['nextjs/skills/nextjs-scaffold'],
  },
  {
    id: 'tailwind',
    label: 'Tailwind CSS',
    group: 'framework',
    description: 'Rules + class helper skill',
    rulesDir: 'tailwind/rules',
    skillDirs: ['tailwind/skills/tailwind-classes'],
  },
  {
    id: 'bootstrap',
    label: 'Bootstrap',
    group: 'framework',
    description: 'Rules',
    rulesDir: 'bootstrap/rules',
  },
  {
    id: 'dotnet',
    label: '.NET / C#',
    group: 'framework',
    description: 'Rules + scaffold skill',
    rulesDir: 'dotnet/rules',
    skillDirs: ['dotnet/skills/dotnet-scaffold'],
  },
  {
    id: 'sitecore',
    label: 'Sitecore',
    group: 'framework',
    description: 'Rules + component skill',
    rulesDir: 'sitecore/rules',
    skillDirs: ['sitecore/skills/sitecore-component'],
  },
  {
    id: 'sanity',
    label: 'Sanity CMS',
    group: 'framework',
    description: 'Rules + GROQ skill + MCP server + schema hook',
    rulesDir: 'sanity/rules',
    skillDirs: ['sanity/skills/sanity-query'],
    hooksDir: 'sanity/hooks',
    hooksConfig: {
      PostToolUse: [
        {
          matcher: 'Edit|Write',
          hooks: [
            {
              type: 'command',
              command: '.claude/hooks/sanity/validate-schema.sh',
            },
          ],
        },
      ],
    },
    mcpConfig: {
      sanity: {
        command: 'npx',
        args: ['-y', '@sanity/mcp-server@latest'],
        env: {
          SANITY_PROJECT_ID: 'your-project-id',
          SANITY_DATASET: 'production',
          SANITY_API_TOKEN: 'your-api-token',
        },
      },
    },
  },
  {
    id: 'wordpress',
    label: 'WordPress',
    group: 'framework',
    description: 'Rules + block scaffold skill',
    rulesDir: 'wordpress/rules',
    skillDirs: ['wordpress/skills/wp-block'],
  },
  {
    id: 'drupal',
    label: 'Drupal',
    group: 'framework',
    description: 'Rules',
    rulesDir: 'drupal/rules',
  },
  {
    id: 'storybook',
    label: 'Storybook',
    group: 'framework',
    description: 'Rules + story generator skill + story check hook',
    rulesDir: 'storybook/rules',
    skillDirs: ['storybook/skills/storybook-story'],
    hooksDir: 'storybook/hooks',
    hooksConfig: {
      PostToolUse: [
        {
          matcher: 'Edit|Write',
          hooks: [
            {
              type: 'command',
              command: '.claude/hooks/storybook/check-stories.sh',
            },
          ],
        },
      ],
    },
  },

  // ── Claude Plugins ─────────────────────────────────────────────────────────
  {
    id: 'figma',
    label: 'Figma',
    group: 'plugin',
    description: 'Design-to-code plugin',
    plugins: {
      'figma/figma': true,
    },
  },
  {
    id: 'greptile',
    label: 'Greptile',
    group: 'plugin',
    description: 'Codebase search plugin',
    plugins: {
      'greptile/greptile': true,
    },
  },
  {
    id: 'impeccable',
    label: 'Impeccable',
    group: 'plugin',
    description: 'Design quality plugin',
    plugins: {
      'impeccable/impeccable': true,
    },
    marketplaces: ['https://marketplace.claude.ai/impeccable'],
  },
]

export const ADDON_MAP = new Map(ADDONS.map((a) => [a.id, a]))
