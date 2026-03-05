---
paths:
  - "**/schemas/**"
  - "**/schemaTypes/**"
  - "**/sanity/**"
  - "**/*.groq"
---
# Sanity CMS Patterns

## Schema Definition

Use `defineType` and `defineField` for full type safety:

```typescript
import { defineType, defineField } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
```

## GROQ Queries

Always use typed queries with `sanity-typegen` generated types:

```typescript
import { defineQuery } from 'next-sanity'

// Define queries at module level — never inline
export const ALL_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt
  }
`)

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    body
  }
`)
```

## Projections

Be explicit in projections — only fetch what you need:

```groq
// Good: explicit projection
*[_type == "post"] {
  _id,
  title,
  "slug": slug.current,
  "author": author->{ name, "image": image.asset->url }
}

// Bad: fetch everything
*[_type == "post"]
```

## Portable Text

Always render Portable Text with `@portabletext/react`:

```typescript
import { PortableText } from '@portabletext/react'

const components = {
  types: {
    image: ImageComponent,
    code: CodeComponent,
  },
  marks: {
    link: LinkComponent,
  },
}

<PortableText value={body} components={components} />
```

## Image URLs

Build image URLs with `@sanity/image-url`:

```typescript
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Usage
<Image src={urlFor(image).width(800).height(600).url()} alt={alt} />
```

## Type Generation

After every schema change:

```bash
npm run typegen   # generates sanity.types.ts
npm run build     # confirm no type errors
```
