---
paths:
  - "**/*.tsx"
  - "**/*.ts"
  - "**/*.cs"
---
# Sitecore Conventions

## Platform Target

Target Sitecore XM Cloud with JSS (JavaScript Services) and the Next.js SDK.

## Component Model

Every Sitecore component receives `ComponentProps` from the layout service:

```typescript
import { ComponentProps } from '@sitecore-jss/sitecore-jss-nextjs'

// Define typed fields
interface HeroFields {
  heading: Field<string>
  subheading: Field<string>
  backgroundImage: ImageField
  ctaLink: LinkField
}

type HeroProps = ComponentProps & { fields: HeroFields }

export default function Hero({ fields }: HeroProps): JSX.Element {
  return (
    <section>
      <JssText field={fields.heading} tag="h1" />
      <JssText field={fields.subheading} tag="p" />
      <JssLink field={fields.ctaLink} />
    </section>
  )
}
```

## Field Types

Always type fields using JSS types:

```typescript
import {
  Field,
  ImageField,
  LinkField,
  RichTextField,
  DateField,
} from '@sitecore-jss/sitecore-jss-nextjs'
```

## JSS Rendering Components

Use JSS rendering helpers — never render field values directly:

```typescript
import {
  Text as JssText,
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  DateField as JssDate,
} from '@sitecore-jss/sitecore-jss-nextjs'
```

## Experience Editor Support

All components must render correctly in Experience Editor (editing mode).
Use JSS field rendering helpers — they inject editing markup automatically.

## Rendering Parameters

Type rendering parameters explicitly:

```typescript
interface HeroRenderingParams {
  backgroundColor?: 'white' | 'gray' | 'navy'
  layout?: 'standard' | 'full-bleed'
}
```

## Placeholders

Use `Placeholder` for dynamic child rendering:

```typescript
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs'

<Placeholder name="jss-content" rendering={rendering} />
```
