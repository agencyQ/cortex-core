# Tailwind Class Helper

Build polished Tailwind CSS component classes following AgencyQ conventions.

## When to use

Invoke with `/tailwind-classes` when you need to:
- Build a new UI component with Tailwind
- Refactor inline styles to Tailwind utilities
- Create a `cva` variant system for a component

## Process

1. Identify the component type (button, card, input, badge, etc.)
2. Define variants (intent, size, state)
3. Apply mobile-first responsive classes
4. Add dark mode variants
5. Use `cn()` for conditional merging

## Output format

```typescript
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const componentVariants = cva(
  // base classes
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-input bg-transparent hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}

export function Component({ className, variant, size, ...props }: ComponentProps) {
  return (
    <element
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    />
  )
}
```
