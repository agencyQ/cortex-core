# Sitecore Component Scaffold

Scaffold a Sitecore JSS component for XM Cloud with proper field typing and Experience Editor support.

## When to use

Invoke with `/sitecore-component` when creating a new JSS rendering component.

## What to generate

```typescript
// src/components/<ComponentName>/<ComponentName>.tsx
import { ComponentProps } from '@sitecore-jss/sitecore-jss-nextjs'
import {
  Text as JssText,
  Image as JssImage,
  Link as JssLink,
  Field,
  ImageField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs'

interface <ComponentName>Fields {
  // Define fields here based on Sitecore template
  heading: Field<string>
}

interface <ComponentName>RenderingParams {
  // Optional rendering parameters from Sitecore
}

type <ComponentName>Props = ComponentProps & {
  fields: <ComponentName>Fields
  params: <ComponentName>RenderingParams
}

const Default = ({ fields, params }: <ComponentName>Props): JSX.Element => {
  const { heading } = fields

  return (
    <section className={`component-<component-name> ${params.styles ?? ''}`}>
      <JssText field={heading} tag="h2" />
    </section>
  )
}

export default Default
```

## Instructions

1. Ask for the component name and its Sitecore template fields
2. Map each field to the correct JSS field type
3. Always use JSS rendering helpers (JssText, JssImage, etc.) — never render field values raw
4. Apply the `.component-<name>` CSS class convention for Sitecore CSS targeting
5. Export as `Default` — required by JSS dynamic component loader
6. Add rendering parameters interface even if empty (for future use)
