import { cva, cx } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";
import { popupSurfaceClass } from "../../internal/popup-surface";
import { type StrictVariantProps } from "../../internal/variant-props";

// Navigation Menu wraps Base UI's parts and extends the anatomy with the styled regions
// inside a menu item (TriggerLabel, ContentList, LinkTitle, LinkDescription). Base UI drives
// open/active state through `data-*` attributes, so the only authored styling axis is the
// `Link`'s `presentation` (an inline `item` pill vs a stacked content `card`). The cva pairings
// below hold the static chrome for every styled part in one place, with no `className` at the
// boundary.

export const navigationMenuListVariants = cva("flex items-center gap-1");

// Trigger and Link share a pill chrome: highlights on hover and while its popup
// is open, with a focus-visible accent ring.
export const navigationMenuTriggerVariants = cva(
  cx(
    "group inline-flex h-8 items-center gap-1 rounded-md px-3 text-13 font-medium text-secondary outline-none",
    "hover:bg-layer-transparent-hover data-popup-open:bg-layer-transparent-selected",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
  ),
);

// The trigger's text label, sitting beside the disclosure `Icon`. Mirrors the
// `Title`/`Icon` split used by other triggers so the trigger renders parts, not raw text.
export const navigationMenuTriggerLabelVariants = cva("min-w-0 truncate");

// A `Link` is used two ways, so its arrangement is a required `presentation`: an `item`
// pill (a top-level nav entry beside the triggers) or a stacked `card` (a rich entry
// inside a `Content` panel, pairing a `Title` with an optional `Description`). The
// shared chrome — radius, highlight, focus ring — is baked in for both.
export const navigationMenuLinkVariants = cva(
  cx(
    "rounded-md text-13 font-medium text-secondary outline-none",
    "hover:bg-layer-transparent-hover data-popup-open:bg-layer-transparent-selected",
    "focus-visible:ring-2 focus-visible:ring-accent-strong",
  ),
  {
    variants: {
      presentation: {
        item: "inline-flex h-8 items-center gap-1 px-3",
        card: "flex flex-col gap-0.5 px-3 py-2 text-start",
      },
    },
  },
);

// The link's primary line: the navigable label. Bold, primary-tinted, single line.
export const navigationMenuLinkTitleVariants = cva(
  "block truncate text-14 font-medium text-primary",
);

// The link's optional secondary line: a muted one- or two-line description below the title.
export const navigationMenuLinkDescriptionVariants = cva("font-normal block text-12 text-tertiary");

// The vertical stack of links inside a `Content` panel. Per the spec, nav items stack
// vertically with a consistent gap; the surrounding `Popup` owns the padding.
export const navigationMenuContentListVariants = cva("flex w-72 flex-col gap-1");

// The disclosure caret slot inside a Trigger. Sizes its child SVG to `--node-size`
// (default 1rem, matching the trigger's line-height) and rotates while the popup is
// open; reads the parent Trigger's `group-data-popup-open` state.
export const navigationMenuIconVariants = cva(
  cx(
    nodeSlotClass,
    "[--node-size:1rem]",
    "text-icon-secondary transition-transform group-data-popup-open:rotate-180",
  ),
);

export const navigationMenuPopupVariants = cva(cx(popupSurfaceClass, "p-2"));

// Content morph container: Base UI exposes the active panel's size as
// `--popup-width`/`--popup-height`, transitioned for a smooth resize between items.
export const navigationMenuViewportVariants = cva(
  "relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) transition-[width,height] duration-150",
);

export type NavigationMenuLinkVariantProps = StrictVariantProps<typeof navigationMenuLinkVariants>;
