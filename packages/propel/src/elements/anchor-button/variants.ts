import { cva, type VariantProps } from "class-variance-authority";

import { linkChromeVariants } from "../../internal/link-chrome";
import { type StrictVariantProps } from "../../internal/variant-props";

// `AnchorButton` presents as a link (the shared link chrome) but is a `<button>` (an action). Same
// look as `Anchor`, button behavior. For a navigation `<a>` that looks like a button, use `AnchorButton`.
export const anchorButtonVariants = linkChromeVariants;

type AnchorButtonVariantConfig = VariantProps<typeof anchorButtonVariants>;
export type AnchorButtonProminence = NonNullable<AnchorButtonVariantConfig["prominence"]>;
export type AnchorButtonMagnitude = NonNullable<AnchorButtonVariantConfig["magnitude"]>;

export type AnchorButtonVariantProps = StrictVariantProps<typeof anchorButtonVariants>;

// The text label inside an AnchorButton. When the parent is `aria-busy` (loading) it dims via the
// `group-aria-busy:` sibling of the `group` class on the root (mirrors ButtonLabel).
export const anchorButtonLabelVariants = cva("group-aria-busy:opacity-50");
