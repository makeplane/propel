import { cva, type VariantProps } from "class-variance-authority";

import { linkChromeVariants } from "../../internal/link-chrome";
import { type StrictVariantProps } from "../../internal/variant-props";

// `AnchorButton` presents as a link (the shared link chrome) but defaults to a `<button>` (an
// action). For real navigation, the ready-made uses `nativeButton={false}` + `render={<a />}`.
// For a navigation `<a>` that looks like a *button*, use `Button` with the same `render` mechanics.
export const anchorButtonVariants = linkChromeVariants;

type AnchorButtonVariantConfig = VariantProps<typeof anchorButtonVariants>;
export type AnchorButtonVariant = NonNullable<AnchorButtonVariantConfig["variant"]>;
export type AnchorButtonSize = NonNullable<AnchorButtonVariantConfig["size"]>;

export type AnchorButtonVariantProps = StrictVariantProps<typeof anchorButtonVariants>;

// The text label inside an AnchorButton. Carries the underline (Figma: underline spans the text
// only, not the flanking icons). Loading mutes via the root chrome — same weight as any spinner.
export const anchorButtonLabelVariants = cva("underline underline-offset-2");
