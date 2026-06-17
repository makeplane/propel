# oxlint-plugin-propel

Project-specific Oxlint rules for Propel.

This package is private to the workspace and is loaded by the root `vite.config.ts` through Oxlint's local `jsPlugins` support.

## Rules

### `propel/prefer-tailwind-v4-shorthand`

Enforces the Tailwind CSS v4 shorthand forms we use in component class strings.

Fixes exact CSS custom property arbitrary values:

```tsx
"h-[var(--accordion-panel-height)]";
"h-(--accordion-panel-height)";
```

Fixes presence-only data variants:

```tsx
"data-[highlighted]:text-primary";
"data-highlighted:text-primary";
```

It also handles grouped, peer, named, and negated presence data variants:

```tsx
"group-data-[popup-open]/trigger:text-primary";
"group-data-popup-open/trigger:text-primary";
```

The rule intentionally does not rewrite valued arbitrary data selectors such as `data-[state=open]:...` or arbitrary values with fallbacks such as `h-[var(--height,auto)]`.

## Development

Run the package tests:

```bash
vp run --filter oxlint-plugin-propel test
```

Run workspace validation:

```bash
vp check
vp test
```

The root config enables the rule as an error:

```ts
lint: {
  jsPlugins: ["./tools/oxlint-plugin-propel/src/index.ts"],
  rules: {
    "propel/prefer-tailwind-v4-shorthand": "error",
  },
}
```
