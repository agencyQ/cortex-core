---
paths:
  - "**/*.php"
  - "**/*.twig"
  - "**/*.yml"
---
# Drupal Conventions

## Version Target

Target Drupal 10+. Do not use deprecated APIs from Drupal 7/8.

## Twig Templates

Override templates in `templates/` directory of your theme:

```twig
{# templates/node--article--teaser.html.twig #}
<article{{ attributes.addClass('node', 'node--type-article', 'node--view-mode-teaser') }}>
  {{ title_prefix }}
  <h3{{ title_attributes }}>
    <a href="{{ url }}" rel="bookmark">{{ label }}</a>
  </h3>
  {{ title_suffix }}

  {% if content.field_image %}
    {{ content.field_image }}
  {% endif %}

  <div{{ content_attributes }}>
    {{ content|without('field_image', 'links') }}
  </div>
</article>
```

## Configuration Management

Store all config in YAML files — never change config directly in the database on production:

```bash
# Export config from dev
drush config:export

# Import config on production
drush config:import
```

## Custom Modules

Follow the standard module structure:

```
modules/custom/my_module/
  my_module.info.yml
  my_module.module       ← hooks
  my_module.routing.yml  ← routes
  my_module.services.yml ← DI services
  src/
    Controller/
    Form/
    Plugin/
    Service/
```

## Hooks

Use hooks for integration points — never hack core or contrib:

```php
/**
 * Implements hook_preprocess_node().
 */
function my_module_preprocess_node(array &$variables): void {
    if ($variables['node']->bundle() === 'article') {
        $variables['custom_var'] = 'value';
    }
}
```

## Database Queries

Always use the Database API or entity queries — never raw SQL:

```php
// Entity query
$query = \Drupal::entityQuery('node')
    ->condition('type', 'article')
    ->condition('status', 1)
    ->sort('created', 'DESC')
    ->range(0, 10)
    ->accessCheck(TRUE);

$nids = $query->execute();
$nodes = Node::loadMultiple($nids);
```

## Caching

Tag caches correctly so invalidation works:

```php
$build['#cache'] = [
    'max-age' => Cache::PERMANENT,
    'tags' => $node->getCacheTags(),
    'contexts' => ['user.roles', 'languages'],
];
```
