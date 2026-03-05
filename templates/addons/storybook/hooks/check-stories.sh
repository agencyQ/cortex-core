#!/usr/bin/env bash
# Storybook story format check hook
# Runs after Edit or Write to story files.
# Receives the tool input JSON on stdin.

set -euo pipefail

TOOL_INPUT=$(cat)

# Parse file path from tool input JSON
if command -v jq &>/dev/null; then
  FILE=$(echo "$TOOL_INPUT" | jq -r '.path // .file_path // ""' 2>/dev/null || echo "")
elif command -v python3 &>/dev/null; then
  FILE=$(echo "$TOOL_INPUT" | python3 -c \
    "import json,sys; d=json.load(sys.stdin); print(d.get('path') or d.get('file_path') or '')" \
    2>/dev/null || echo "")
else
  exit 0
fi

[ -z "$FILE" ] && exit 0

# Only run for story files
[[ "$FILE" =~ \.stories\.(ts|tsx|js|jsx)$ ]] || exit 0

# Check for required CSF3 patterns
if ! grep -qE "(satisfies Meta|: Meta)" "$FILE" 2>/dev/null; then
  printf '\033[33m[cortex/storybook] Missing Meta type annotation in %s\033[0m\n' "$FILE" >&2
  printf '  Expected: const meta = { ... } satisfies Meta<typeof ComponentName>\n' >&2
fi

if ! grep -q "tags.*autodocs" "$FILE" 2>/dev/null; then
  printf '\033[33m[cortex/storybook] Missing autodocs tag in %s\033[0m\n' "$FILE" >&2
  printf '  Expected: tags: ["autodocs"] in meta object\n' >&2
fi

# Check for CSF2 anti-patterns
if grep -qE "^export const \w+ = \(\) =>" "$FILE" 2>/dev/null; then
  printf '\033[31m[cortex/storybook] CSF2 pattern detected in %s — use CSF3 StoryObj format\033[0m\n' "$FILE" >&2
fi
