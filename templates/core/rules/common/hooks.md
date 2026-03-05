# Hooks System

## When a Hook Blocks You — STOP AND ASK (NON-NEGOTIABLE)

When a hook blocks an action, DO NOT work around it. Hooks are guardrails set by the user. Respect them.

The ONLY correct response when blocked by a hook:
1. Tell the user what you tried to do and that a hook blocked it
2. Explain which hook and why it blocked
3. Provide the intended content so the user can act on it themselves if they choose
4. Ask the user how they want to proceed

NEVER:
- Use a different tool to bypass the hook (e.g., Bash instead of Write)
- Stuff the content into an unrelated file to get around the restriction
- Treat the hook as an obstacle to creatively route around
- Reinterpret the rule to find a loophole

Hooks represent the user's intent. When in doubt, collaborate — don't freelance.

## Hook Types

- **PreToolUse**: Before tool execution (validation, parameter modification)
- **PostToolUse**: After tool execution (auto-format, checks)
- **Stop**: When session ends (final verification)

## Auto-Accept Permissions

Use with caution:
- Enable for trusted, well-defined plans
- Disable for exploratory work
- Never use dangerously-skip-permissions flag
- Configure `allowedTools` in `~/.claude.json` instead

## TodoWrite Best Practices

Use TodoWrite tool to:
- Track progress on multi-step tasks
- Verify understanding of instructions
- Enable real-time steering
- Show granular implementation steps

Todo list reveals:
- Out of order steps
- Missing items
- Extra unnecessary items
- Wrong granularity
- Misinterpreted requirements
