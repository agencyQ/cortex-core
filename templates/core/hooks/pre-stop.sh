#!/usr/bin/env bash
# Pre-stop audit hook: runs before session ends.
# Audits all git-modified JS/TS files for console.log statements.

set -euo pipefail

FOUND=$(git diff --name-only --diff-filter=M 2>/dev/null \
  | grep -E '\.(js|jsx|ts|tsx)$' \
  | xargs grep -l "console\.log" 2>/dev/null \
  || true)

if [ -n "$FOUND" ]; then
  printf '\033[33m[cortex] console.log found in modified files:\033[0m\n' >&2
  echo "$FOUND" | while IFS= read -r f; do
    COUNT=$(grep -c "console\.log" "$f" 2>/dev/null || echo "?")
    printf '  %s  (%s occurrence(s))\n' "$f" "$COUNT" >&2
  done
fi
