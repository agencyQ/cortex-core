#!/usr/bin/env bash
# Sanity schema validation hook
# Runs after Edit or Write to schema files.
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

# Only run for Sanity schema files
[[ "$FILE" == *"/schemas/"* ]] || [[ "$FILE" == *"/schemaTypes/"* ]] || exit 0

# Run sanity schema validate if the CLI is available
if command -v sanity &>/dev/null; then
  printf '\033[36m[cortex/sanity] Validating schema...\033[0m\n' >&2
  sanity schema validate 2>/dev/null \
    && printf '\033[32m[cortex/sanity] Schema valid\033[0m\n' >&2 \
    || printf '\033[31m[cortex/sanity] Schema validation failed — run: sanity schema validate\033[0m\n' >&2
fi
