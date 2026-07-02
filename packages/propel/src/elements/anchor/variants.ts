import { type VariantProps } from "class-variance-authority";

import { linkChromeVariants } from "../../internal/link-chrome";
import { type StrictVariantProps } from "../../internal/variant-props";

// `Anchor` is the inline text link (an `<a>`). Its look is the shared link chrome; for a `<button>`
// that looks like a link use `ButtonAnchor`, for an `<a>` that looks like a button use `AnchorButton`.
export const anchorVariants = linkChromeVariants;

type AnchorVariantConfig = VariantProps<typeof anchorVariants>;
export type AnchorProminence = NonNullable<AnchorVariantConfig["prominence"]>;
export type AnchorMagnitude = NonNullable<AnchorVariantConfig["magnitude"]>;

export type AnchorVariantProps = StrictVariantProps<typeof anchorVariants>;
