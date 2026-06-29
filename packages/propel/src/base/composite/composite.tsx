import { CompositeRoot as BaseComposite } from "@base-ui/react/internals/composite";
import * as React from "react";

type BaseCompositeProps = BaseComposite.Props<unknown, Record<string, never>>;

/**
 * The container half of Base UI's roving-tabindex `Composite` — the same engine `Toolbar` and
 * `Menu` are built on. Renders a `<div>` by default; one `CompositeItem` child is the tab stop and
 * the arrow keys move focus between them. Defaults to `vertical` (the common list case); pass
 * `orientation` to change it. Unstyled — `ui` layers the look on top.
 *
 * NOTE: Base UI's `CompositeRoot`/`CompositeItem` live under `@base-ui/react/internals` (marked
 * `@internal`). That dependency is isolated to `base/composite` on purpose: the Base UI version is
 * pinned, and if a future bump changes the composite surface, only these two files change.
 */
export type CompositeProps = Omit<
  BaseCompositeProps,
  "state" | "stateAttributesMapping" | "props" | "refs"
> &
  // CompositeRoot.Props only Picks render/className/children/style; it spreads the rest at runtime
  // but doesn't type them. Restore the element attributes (role, aria-*, id, onClick…) — minus the
  // composite props it already owns.
  Omit<React.HTMLAttributes<HTMLElement>, keyof BaseCompositeProps>;

export const Composite = React.forwardRef<HTMLElement, CompositeProps>(function Composite(
  { orientation = "vertical", ...props },
  forwardedRef,
) {
  return <BaseComposite orientation={orientation} refs={[forwardedRef]} {...props} />;
});

if (process.env.NODE_ENV !== "production") {
  Composite.displayName = "Composite";
}
