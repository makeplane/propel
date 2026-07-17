# apps/docs

The documentation site for `@makeplane/propel`. Astro 7 + React islands (MDX
component pages), styled with propel's own Tailwind v4 tokens
(`@makeplane/propel/styles`). See `README.md` for the build/deploy seam and how to
add a component page.

## Design Context

Strategic context lives in [`PRODUCT.md`](./PRODUCT.md) (who/what/why) and the
visual system in [`DESIGN.md`](./DESIGN.md) (how it looks — tokens, type, components,
do's & don'ts). Read both before any UI/design work here. In short:

- **Register:** product · **Platform:** web. A developer **reference tool**, not a
  marketing surface: design serves the task of looking up, copying, and correctly
  using components. Closest kin: Radix / Base UI, Stripe, and Tailwind / shadcn docs.
- **Audience:** internal-first — Plane's own engineers and designers adopting propel,
  then external `@makeplane/propel` consumers.
- **Success:** a developer can use any component correctly **without reading the
  library's source**.
- **Voice:** precise, calm, authoritative. The component is the hero; chrome recedes.
- **Not:** a SaaS/AI landing page, Material Design, cluttered raw-Storybook, or
  anything playful/over-animated.
- **Accessibility:** WCAG 2.2 AA, and the site honors propel's own light / dark /
  high-contrast themes and `prefers-reduced-motion`.

Guiding principles (full text in `PRODUCT.md`): accuracy over prose · the component
is the hero · show the real thing, twice · earned familiarity · practice what it
documents.
