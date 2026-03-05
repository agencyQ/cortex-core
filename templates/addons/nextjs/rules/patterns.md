---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "app/**/*"
---
# Next.js Patterns

## App Router (Default)

Always use the App Router (`app/` directory). Do not use Pages Router for new work.

## Server vs Client Components

Default to Server Components. Add `'use client'` only when you need:
- `useState`, `useEffect`, or other React hooks
- Browser APIs (window, document)
- Event listeners

```typescript
// Server Component (default) — no directive needed
export default async function Page() {
  const data = await fetch('...').then(r => r.json())
  return <div>{data.title}</div>
}

// Client Component — explicit directive required
'use client'
export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

## Data Fetching

Fetch in Server Components. Use `cache` and `revalidate` appropriately:

```typescript
// Server Component with revalidation
const data = await fetch('/api/posts', { next: { revalidate: 60 } }).then(r => r.json())

// Force dynamic (no cache)
const data = await fetch('/api/live', { cache: 'no-store' }).then(r => r.json())
```

## Route Handlers

Use `app/api/` route handlers for API endpoints:

```typescript
// app/api/posts/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const posts = await getPosts()
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const body = await request.json()
  // validate body...
  const post = await createPost(body)
  return NextResponse.json(post, { status: 201 })
}
```

## Metadata

Use the `metadata` export for SEO:

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: {
    title: 'Page Title',
    images: ['/og.png'],
  },
}
```

## Loading and Error States

Always provide `loading.tsx` and `error.tsx` for meaningful UX:

```
app/
  posts/
    page.tsx
    loading.tsx     ← shown while page.tsx is suspending
    error.tsx       ← shown when page.tsx throws
```

## Image Optimization

Always use `next/image` for images:

```typescript
import Image from 'next/image'

<Image src="/hero.png" alt="Hero" width={1200} height={600} priority />
```
