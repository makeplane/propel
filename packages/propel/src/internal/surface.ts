import { cva, type VariantProps } from "class-variance-authority";

// Shared floating-surface recipe. Several components render a "floating card" on
// top of the page (a dropdown menu, the toolbar floater, a toast, the calendar,
// the breadcrumb overflow menu). They all want the same surface: the white
// `surface-1` elevation, a hairline `subtle` border, an overlay shadow, and a
// rounded corner. Historically each call site hand-wrote those classes and the
// tokens drifted apart (surface-1 vs layer-2 vs surface-2, overlay-100 vs
// overlay-200, subtle vs subtle-1, radius lg vs md).
//
// This is NOT a component. Each call site keeps its own positioning / Base UI
// primitive and just consumes the class string. It is internal: it is not
// exported from any published entry (it lives outside `components/` and
// `hooks/`, the only folders the build turns into package subpaths).
//
// Tooltip intentionally opts out: it is a darker, smaller surface and does not
// use this recipe.
//
// Axes (both required, no `defaultVariants` so each call site is explicit):
// - `elevation`: shadow depth. `raised` is the standard overlay shadow used by
//   most floaters; `overlay` is the deeper shadow for menus that float well
//   above the page (the dropdown popup).
// - `radius`: corner radius. `lg` (8px) is the floating-card default; `md` (6px)
//   is the tighter corner used by compact menus.
export const surfaceVariants = cva("border border-subtle bg-surface-1", {
  variants: {
    elevation: {
      raised: "shadow-overlay-100",
      overlay: "shadow-overlay-200",
    },
    radius: {
      md: "rounded-md",
      lg: "rounded-lg",
    },
  },
});

export type SurfaceVariantProps = VariantProps<typeof surfaceVariants>;
