# Next.js Scaffold

Scaffold Next.js App Router pages, layouts, and route handlers following AgencyQ conventions.

## When to use

Invoke with `/nextjs-scaffold` when creating:
- A new page or route segment
- A layout or template
- An API route handler
- A loading or error boundary

## What to generate

### Page

```typescript
// app/<route>/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '<Title>',
  description: '<Description>',
}

export default async function <Name>Page() {
  return (
    <main>
      <h1><Title></h1>
    </main>
  )
}
```

### Layout

```typescript
// app/<route>/layout.tsx
export default function <Name>Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
```

### Route Handler

```typescript
// app/api/<resource>/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({ ... })

export async function GET() {
  // fetch data
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = schema.parse(await request.json())
  // create resource
  return NextResponse.json(result, { status: 201 })
}
```

## Instructions

1. Ask the user what route/resource to scaffold if not specified
2. Generate the minimal required files (page, layout, loading, error as needed)
3. Use TypeScript strict types throughout
4. Validate input with Zod for route handlers
5. Follow the AgencyQ immutability and error handling rules
