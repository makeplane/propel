import { type VariantProps } from "class-variance-authority";

import { linkChromeVariants } from "../../internal/link-chrome";
import { type StrictVariantProps } from "../../internal/variant-props";

// `ButtonAnchor` presents as a link (the shared link chrome) but is a `<button>` (an action). Same
// look as `Anchor`, button behavior. For a navigation `<a>` that looks like a button, use `AnchorButton`.
export const buttonAnchorVariants = linkChromeVariants;

type ButtonAnchorVariantConfig = VariantProps<typeof buttonAnchorVariants>;
export type ButtonAnchorProminence = NonNullable<ButtonAnchorVariantConfig["prominence"]>;
export type ButtonAnchorMagnitude = NonNullable<ButtonAnchorVariantConfig["magnitude"]>;

export type ButtonAnchorVariantProps = StrictVariantProps<typeof buttonAnchorVariants>;
