import { CompositeItem as BaseCompositeItem } from "@base-ui/react/internals/composite";
import * as React from "react";

type BaseCompositeItemProps = BaseCompositeItem.Props<unknown, Record<string, never>>;

/**
 * The item half of Base UI's roving-tabindex `Composite`. Renders a `<div>` by default; pass
 * `render` (or `tag`) to make it the element the row needs — an `<a>` (like
 * `Toolbar.Link`/`Menu.LinkItem`) or a `<button>` (like `Toolbar.Button`/`Menu.Item`). It reads its
 * parent `Composite`'s context automatically, so it only works inside one. Unstyled — `ui` layers
 * the look on top.
 *
 * See the `@internal` isolation note on `Composite`.
 */
export type CompositeItemProps = Omit<
  BaseCompositeItemProps,
  "state" | "stateAttributesMapping" | "props" | "refs" | "metadata"
> &
  // Restore the element attributes CompositeItem.Props doesn't type (it spreads them at runtime);
  // element-specific attrs (href, type) ride on the `render` target. Minus the keys it already owns.
  Omit<React.HTMLAttributes<HTMLElement>, keyof BaseCompositeItemProps>;

export const CompositeItem = React.forwardRef<HTMLElement, CompositeItemProps>(
  function CompositeItem(props, forwardedRef) {
    return <BaseCompositeItem refs={[forwardedRef]} {...props} />;
  },
);

if (process.env.NODE_ENV !== "production") {
  CompositeItem.displayName = "CompositeItem";
}
