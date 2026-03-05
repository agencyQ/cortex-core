#!/usr/bin/env bash
# Post-edit hook: auto-format, typecheck, and audit console.log
# Runs after every Edit or Write tool invocation.
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
[ ! -f "$FILE" ] && exit 0

# JS/TS files only
[[ "$FILE" =~ \.(js|jsx|ts|tsx|mjs|cjs)$ ]] || exit 0

# Run Prettier if available
if command -v prettier &>/dev/null; then
  prettier --write "$FILE" --log-level warn 2>/dev/null || true
fi

# Run TypeScript type-check for TS files
if [[ "$FILE" =~ \.(ts|tsx)$ ]] && [ -f "tsconfig.json" ]; then
  npx --no tsc --noEmit 2>/dev/null \
    || printf '\033[33m[cortex] TypeScript errors detected — run: npx tsc --noEmit\033[0m\n' >&2
fi

# Warn about console.log
if grep -q "console\.log" "$FILE" 2>/dev/null; then
  COUNT=$(grep -c "console\.log" "$FILE")
  printf '\033[33m[cortex] %s console.log statement(s) found in %s\033[0m\n' "$COUNT" "$FILE" >&2
fi
