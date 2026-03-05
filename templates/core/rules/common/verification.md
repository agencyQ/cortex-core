# Verification — MANDATORY (NON-NEGOTIABLE)

NEVER report ANY work as done without proving it works. No exceptions.

## Before Claiming Completion

1. **Build**: Run the relevant build/lint/typecheck command and confirm it passes
2. **Visual**: If the change is visual (UI, Storybook, pages), open it in a browser via Playwright — confirm it renders, take a screenshot
3. **Tests**: Run relevant tests and confirm they pass
4. **Console**: Check browser console for JS errors — zero errors required
5. **State evidence**: When reporting done, cite exactly what you verified and how

## Rules

- If you cannot verify, say so explicitly. Never assume success.
- Never skip verification because "the code looks right" or "it should work"
- Never guess at outcomes — run the thing and check
- Mistakes and fix loops are expected and normal. Claiming something works without checking is not.
- This applies to ALL deliverables, not just code. Scripts, config files, documentation — verify it does what you say it does.

## Verification Examples By Task Type

### UI Component Implementation
- **Run tests**: `npm run test -- ComponentName` passes with zero failures
- **Open in browser**: Navigate to the component's Storybook story via Playwright, confirm it renders visually, screenshot it

### Storybook Story Creation
- **Render in Storybook**: Navigate to the story URL in Playwright, confirm all variants render with zero console errors
- **Build stories**: Run `npm run build-storybook` and confirm it compiles without errors

### Sanity Schema Changes
- **Generate types**: Run `npm run typegen` and confirm it completes without errors
- **Build the project**: Run `npm run build` to confirm queries and components consuming the schema still compile

### GROQ Query Writing
- **Execute the query**: Run the query against the dataset and confirm results match expectations
- **Type check**: Run `npm run typegen && npm run build` to confirm the query result types align with component props

### Bug Fixes
- **Reproduce then confirm**: Demonstrate the bug exists (failing test or broken UI), apply fix, then re-run to show it's resolved
- **Regression check**: Run the full related test suite to confirm nothing else broke

### API Routes / Server-Side Logic
- **Hit the endpoint**: `curl` the route and confirm the response status code and body
- **Run integration tests**: Execute tests that exercise the endpoint and confirm they pass

### Configuration Changes
- **Build**: Run `npm run build` to confirm the config change doesn't break compilation
- **Exercise the config**: Run the command or process the config affects and confirm it behaves as expected

### Scripts and Tooling
- **Run the script**: Execute it and confirm it exits with code 0 and produces expected output
- **Inspect the artifacts**: Read/check the output files to confirm they contain the expected content
