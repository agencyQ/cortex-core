# Storybook Story Generator

Generate Storybook CSF3 stories for React components following AgencyQ conventions.

## When to use

Invoke with `/storybook-story` when you need to:
- Create stories for a new component
- Add missing state stories (Loading, Error, Empty)
- Add play function interaction tests

## Process

1. Read the component file to understand props, variants, and states
2. Identify the key stories to write (Default, state variants, edge cases)
3. Generate a CSF3 story file co-located with the component
4. Verify stories render in Storybook via Playwright

## Output Template

```typescript
// <ComponentName>.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { <ComponentName> } from './<ComponentName>'

const meta = {
  title: '<Category>/<ComponentName>',
  component: <ComponentName>,
  tags: ['autodocs'],
  args: {
    // sensible defaults for all stories
  },
  argTypes: {
    // constrain enum props
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
  },
} satisfies Meta<typeof <ComponentName>>

export default meta
type Story = StoryObj<typeof meta>

// The primary use case
export const Default: Story = {}

// State and variant stories
export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Loading: Story = {
  args: { isLoading: true },
}

export const Empty: Story = {
  args: { items: [] },
}
```

## Instructions

1. Read the component source before generating stories
2. Generate stories for: Default + all meaningful prop combinations + edge cases
3. Use `satisfies Meta<typeof ComponentName>` (not `: Meta<>`) for better type inference
4. Always include `tags: ['autodocs']`
5. After writing, navigate to the story in Storybook via Playwright and take a screenshot to verify
