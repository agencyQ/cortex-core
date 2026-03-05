---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.css"
---
# Tailwind CSS Conventions

## Utility-First Approach

Compose styles from utility classes. Avoid custom CSS unless absolutely necessary.

```tsx
// Preferred: utility classes
<button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
  Submit
</button>
```

## Class Merging

Use `clsx` or `cn()` (clsx + tailwind-merge) for conditional classes:

```typescript
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage
<div className={cn('base-classes', isActive && 'active-classes', className)} />
```

## Responsive Design

Use mobile-first breakpoints:

```tsx
<div className="flex flex-col md:flex-row lg:gap-8">
  <aside className="w-full md:w-64">...</aside>
  <main className="flex-1">...</main>
</div>
```

## Dark Mode

Use `dark:` variant consistently:

```tsx
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
```

## Component Variants

Use `cva` (class-variance-authority) for component variants:

```typescript
import { cva } from 'class-variance-authority'

const button = cva('rounded-lg font-medium focus:outline-none', {
  variants: {
    intent: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
})
```

## Avoid

- Arbitrary values (`w-[347px]`) unless truly necessary
- Long class strings — extract to components
- Mixing Tailwind with other CSS frameworks on the same element
