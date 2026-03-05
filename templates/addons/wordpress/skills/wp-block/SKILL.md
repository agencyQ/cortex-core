# WordPress Block Scaffold

Scaffold a Gutenberg block following AgencyQ WordPress conventions.

## When to use

Invoke with `/wp-block` when creating a new custom WordPress block.

## What to generate

### block.json

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "agencyq/<block-name>",
  "title": "<Block Title>",
  "category": "layout",
  "textdomain": "agencyq",
  "editorScript": "file:./index.js",
  "style": "file:./style.css",
  "attributes": {
    "<attr>": { "type": "string", "default": "" }
  },
  "supports": { "html": false }
}
```

### edit.js (editor view)

```javascript
import { useBlockProps, RichText } from '@wordpress/block-editor'

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps()
  return (
    <div {...blockProps}>
      <RichText
        tagName="h2"
        value={attributes.heading}
        onChange={(heading) => setAttributes({ heading })}
        placeholder="Enter heading..."
      />
    </div>
  )
}
```

### save.js (static block)

```javascript
import { useBlockProps, RichText } from '@wordpress/block-editor'

export default function Save({ attributes }) {
  return (
    <div {...useBlockProps.save()}>
      <RichText.Content tagName="h2" value={attributes.heading} />
    </div>
  )
}
```

### index.js

```javascript
import { registerBlockType } from '@wordpress/blocks'
import metadata from './block.json'
import Edit from './edit'
import Save from './save'

registerBlockType(metadata, { edit: Edit, save: Save })
```

## Instructions

1. Ask for the block name, title, and key attributes
2. Determine if this is a static block (save.js renders HTML) or dynamic block (PHP callback, save returns null)
3. For dynamic blocks, also scaffold the PHP render callback
4. Generate all four files: block.json, edit.js, save.js (or null), index.js
5. Register the block in the plugin's main PHP file (show the `register_block_type` call to add)
