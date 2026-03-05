---
paths:
  - "**/*.stories.ts"
  - "**/*.stories.tsx"
  - "**/*.stories.js"
  - "**/*.stories.jsx"
---
# Storybook Conventions

## CSF3 Format

Always use Component Story Format 3 (CSF3). Never use the older CSF2 pattern.

```typescript
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName } from './ComponentName'

const meta = {
  title: 'Category/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  args: {
    // default args shared across all stories
  },
} satisfies Meta<typeof ComponentName>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithCustomProp: Story = {
  args: {
    label: 'Custom Label',
    variant: 'secondary',
  },
}
```

## Story Naming

- `Default` — the most common/typical usage
- `WithX` — stories that demonstrate a specific prop or behavior
- `Loading` / `Error` / `Empty` — state stories

## Tags

Always include `tags: ['autodocs']` on the `meta` object to generate documentation automatically.

## Play Functions

Use play functions to test interactions:

```typescript
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

export const Interaction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /submit/i })
    await userEvent.click(button)
    await expect(canvas.getByText('Submitted!')).toBeInTheDocument()
  },
}
```

## Decorators

Use decorators for context providers (theme, router, etc.):

```typescript
const meta = {
  decorators: [
    (Story) => (
      <ThemeProvider theme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ComponentName>
```

## Args vs Controls

- Define args at the `meta` level for defaults
- Override in individual stories only when demonstrating a specific state
- Use `argTypes` to constrain controls to valid values

## File Co-location

Place story files next to the component:

```
components/
  Button/
    Button.tsx
    Button.stories.tsx   ← co-located
    Button.test.tsx
```
