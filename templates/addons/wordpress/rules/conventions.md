---
paths:
  - "**/*.php"
  - "**/*.js"
  - "**/block.json"
  - "**/theme.json"
---
# WordPress Conventions

## Block Editor (Gutenberg)

Build all new content areas as blocks. Use Full Site Editing (FSE) for themes.

## Block Structure

Each block lives in its own directory with a `block.json` manifest:

```
blocks/
  my-block/
    block.json
    edit.js      ← editor view (React)
    save.js      ← frontend render / null for dynamic blocks
    index.js     ← registers the block
    style.scss   ← shared styles
    editor.scss  ← editor-only styles
```

## block.json

Always define blocks with `block.json`:

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "agencyq/my-block",
  "title": "My Block",
  "category": "layout",
  "textdomain": "agencyq",
  "editorScript": "file:./index.js",
  "editorStyle": "file:./editor.css",
  "style": "file:./style.css",
  "attributes": {
    "heading": {
      "type": "string",
      "default": ""
    }
  },
  "supports": {
    "html": false,
    "align": ["wide", "full"]
  }
}
```

## Dynamic Blocks

Use PHP render callbacks for blocks with dynamic content (posts, user data):

```php
// render-callback.php
function agencyq_render_my_block( array $attributes ): string {
    ob_start();
    ?>
    <div class="wp-block-agencyq-my-block">
        <?php echo esc_html( $attributes['heading'] ?? '' ); ?>
    </div>
    <?php
    return ob_get_clean();
}
```

## theme.json

Define design tokens in `theme.json`. Never hardcode colors or spacing:

```json
{
  "settings": {
    "color": {
      "palette": [
        { "name": "Primary", "slug": "primary", "color": "#0057b8" }
      ]
    },
    "spacing": {
      "units": ["px", "rem", "em", "%", "vw"]
    }
  }
}
```

## PHP Standards

Follow PSR-12 and WordPress Coding Standards:
- Prefix all functions, hooks, and globals with the project namespace
- Use `wp_enqueue_script` / `wp_enqueue_style` for assets
- Escape all output: `esc_html()`, `esc_attr()`, `esc_url()`, `wp_kses()`
- Sanitize all input: `sanitize_text_field()`, `absint()`, etc.
- Use prepared statements: `$wpdb->prepare()`
