import * as React from "react";

import {
  Icon as IconSlot,
  type IconMagnitude,
  type IconProps as IconSlotProps,
  type IconTint,
} from "../../internal/icon";

export type { IconMagnitude, IconTint };

export type IconGlyph =
  | React.ComponentType<React.SVGProps<SVGSVGElement>>
  | React.ExoticComponent<React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>>;
export type IconSource = IconGlyph | React.ReactNode;

export type IconProps = Omit<IconSlotProps, "children" | "render"> & {
  /** SVG component or node rendered inside the shared icon slot, e.g. `icon={Plus}`. */
  icon: IconSource;
};

/**
 * Public decorative icon slot. Pass the element this creates into components with icon slots
 * (`startIcon`, `endIcon`, or `icon`) so those components render it directly.
 */
export function Icon({ icon: Glyph, ...props }: IconProps) {
  const icon = isIconGlyph(Glyph)
    ? React.createElement(Glyph, { "aria-hidden": true, focusable: false })
    : Glyph;
  return <IconSlot {...props}>{icon}</IconSlot>;
}

function isIconGlyph(icon: IconSource): icon is IconGlyph {
  if (typeof icon === "function") return true;
  if (typeof icon !== "object" || icon == null || React.isValidElement(icon)) return false;

  const reactType = (icon as { $$typeof?: symbol }).$$typeof;
  return reactType === Symbol.for("react.forward_ref") || reactType === Symbol.for("react.memo");
}
