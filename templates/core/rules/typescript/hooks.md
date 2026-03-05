---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.jsx"
---
# TypeScript/JavaScript Hooks

> This file extends [common/hooks.md](../common/hooks.md) with TypeScript/JavaScript specific content.

## PostToolUse Hooks

Configured in `.claude/settings.json` — fires after every Edit or Write:

- **Prettier**: Auto-format JS/TS files after edit
- **TypeScript check**: Run `tsc --noEmit` after editing `.ts`/`.tsx` files
- **console.log warning**: Warn about `console.log` in edited files

## Stop Hooks

- **console.log audit**: Check all git-modified files for `console.log` before session ends
