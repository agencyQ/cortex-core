---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.html"
  - "**/*.scss"
  - "**/*.css"
---
# Bootstrap Conventions

## Version

Target Bootstrap 5.x. Do not use Bootstrap 4 patterns (jQuery dependency, `.show()` API).

## Component Usage

Use Bootstrap component classes as the foundation. Customize via SCSS variables, not inline overrides:

```scss
// _variables.scss — override before importing Bootstrap
$primary: #0057b8;
$border-radius: 0.375rem;
$font-family-sans-serif: 'Inter', system-ui, sans-serif;

@import 'bootstrap/scss/bootstrap';
```

## JavaScript Components

Use the Bootstrap JS component API, not jQuery:

```typescript
import { Modal, Tooltip } from 'bootstrap'

// Init tooltip
const tooltipEl = document.querySelector('[data-bs-toggle="tooltip"]')
if (tooltipEl) new Tooltip(tooltipEl)

// Programmatic modal
const modal = new Modal('#myModal')
modal.show()
```

## Grid System

Use the 12-column grid with responsive classes:

```html
<div class="container">
  <div class="row g-4">
    <div class="col-12 col-md-6 col-lg-4">...</div>
  </div>
</div>
```

## Utilities

Prefer Bootstrap utility classes over custom CSS for spacing, typography, and display:

```html
<p class="mb-0 text-muted fw-medium">...</p>
<div class="d-flex align-items-center gap-2">...</div>
```

## Avoid

- Overriding Bootstrap CSS with `!important`
- Mixing Bootstrap grid with other grid systems
- Using deprecated Bootstrap 4 class names
