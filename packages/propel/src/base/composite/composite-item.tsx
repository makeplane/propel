import { CompositeItem as BaseCompositeItem } from "@base-ui/react/internals/composite";
import * as React from "react";

type BaseCompositeItemProps = BaseCompositeItem.Props<unknown, Record<string, never>>;

/**
 * The item half of Base UI's roving-tabindex `Composite`. Renders a `<div>` by default; pass
 * `render` (or `tag`) to make it the element the row needs — an `<a>` (like
 * `Toolbar.Link`/`Menu.LinkItem`) or a `<button>` (like `Toolbar.Button`/`Menu.Item`). It reads its
 * parent `Composite`'s context automatically, so it only works inside one. Unstyled — `elements`
 * layers the look on top.
 *
 * See the `@internal` isolation note on `Composite`.
 */
export type CompositeItemProps = Omit<
  BaseCompositeItemProps,
  "state" | "stateAttributesMapping" | "props" | "refs" | "metadata"
> &
  // CompositeItem.Props only Picks render/className/style; it spreads the rest at runtime but doesn't
  // type them. The item is element-flexible (a/button/div), so restore the *all-element* attributes
  // (href for an <a>, type for a <button>, role, aria-*…) — minus the keys it already owns.
  Omit<React.AllHTMLAttributes<HTMLElement>, keyof BaseCompositeItemProps>;

export const CompositeItem = React.forwardRef<HTMLElement, CompositeItemProps>(
  function CompositeItem(props, forwardedRef) {
    return <BaseCompositeItem refs={[forwardedRef]} {...props} />;
  },
);

if (process.env.NODE_ENV !== "production") {
  CompositeItem.displayName = "CompositeItem";
}
