# oxlint-plugin-propel

Project-specific Oxlint rules for Propel.

This package is private to the workspace and is loaded by the root `.oxlintrc.json` through Oxlint's local `jsPlugins` support.

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

Fixes logical inset arbitrary utilities:

```tsx
"data-[side=inline-start]:end-[-3px]";
"data-[side=inline-start]:inset-e-[-3px]";
```

Fixes logical inset scale utilities:

```tsx
"end-4";
"inset-e-4";
```

Fixes arbitrary pixel widths that map exactly to the spacing scale:

```tsx
"w-[340px]";
"w-85";
```

The rule intentionally does not rewrite valued arbitrary data selectors such as `data-[state=open]:...` or arbitrary values with fallbacks such as `h-[var(--height,auto)]`.

## Development

Run the package tests:

```bash
pnpm --filter oxlint-plugin-propel test
```

Run workspace validation:

```bash
pnpm check
pnpm test
```

The root `.oxlintrc.json` enables the rule as an error:

```jsonc
{
  "jsPlugins": ["./tools/oxlint-plugin-propel/src/index.ts"],
  "rules": {
    "propel/prefer-tailwind-v4-shorthand": "error",
  },
}
```
