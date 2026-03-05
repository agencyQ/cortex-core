# Sanity GROQ Query

Write, test, and type-check GROQ queries for Sanity CMS projects.

## When to use

Invoke with `/sanity-query` when you need to:
- Write a new GROQ query for a component or page
- Debug a query returning unexpected results
- Add filtering, ordering, or pagination to an existing query

## Process

1. Check the schema (`schemaTypes/` or `schemas/`) to understand document types and field names
2. Write the query using `defineQuery()` for type inference
3. Use explicit projections — never fetch `*[_type == "foo"]` without a projection
4. Verify field types (single reference vs. array of references)
5. Test the query using the MCP `query_documents` tool
6. Run `npm run typegen && npm run build` to confirm types align

## Query Template

```typescript
import { defineQuery } from 'next-sanity'

export const RESOURCE_QUERY = defineQuery(`
  *[_type == "resourceType" && defined(slug.current)] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    // dereference references with ->
    "category": category->{ _id, title, "slug": slug.current },
    // image URL
    "image": mainImage.asset->url,
  }
`)

// Params type for use with client.fetch()
export type ResourceQueryParams = {
  start: number
  end: number
}
```

## Common Patterns

```groq
// Filter by reference
*[_type == "post" && author._ref == $authorId]

// Filter by array reference
*[_type == "post" && $tagId in tags[]._ref]

// Text search
*[_type == "post" && title match $query + "*"]

// Conditional field
*[_type == "post"] { "image": select(mainImage != null => mainImage.asset->url, "/default.jpg") }

// Count
count(*[_type == "post"])
```

## Instructions

After writing the query:
1. Use the Sanity MCP `query_documents` tool to execute it and verify results
2. Run `npm run typegen` to regenerate types
3. Update the consuming component to use the new query type
