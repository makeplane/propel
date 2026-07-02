import type * as React from "react";

import {
  ToastStatusIcon as ToastStatusIconElement,
  type ToastStatusIconProps as ToastStatusIconElementProps,
  type ToastTone,
} from "../../elements/toast";
import { SolidCircleAlert } from "../../internal/solid-icons/solid-circle-alert";
import { SolidCircleCheck } from "../../internal/solid-icons/solid-circle-check";
import { SolidCircleX } from "../../internal/solid-icons/solid-circle-x";
import type { SolidIconProps } from "../../internal/solid-icons/solid-icon";
import { SolidInfo } from "../../internal/solid-icons/solid-info";
import { SolidTriangleAlert } from "../../internal/solid-icons/solid-triangle-alert";

type StatusGlyph = (props: SolidIconProps) => React.JSX.Element;

// Each tone auto-selects a filled status glyph (see the solid-* assets) — the caller never
// passes an icon. Filled glyphs match Figma's toast (node 1144-3158); lucide ships no filled
// status equivalents, so these are hand-authored. The elements `ToastStatusIcon` slot owns the
// `size-4 shrink-0` box + per-tone color; this ready-made owns only the tone→glyph mapping.
const STATUS_ICON: Record<ToastTone, StatusGlyph> = {
  success: SolidCircleCheck,
  danger: SolidCircleX,
  info: SolidInfo,
  warning: SolidTriangleAlert,
  neutral: SolidCircleAlert,
};

export type ToastStatusIconProps = Omit<ToastStatusIconElementProps, "children">;

/**
 * The tone-colored status icon at a toast's inline-start. Picks a filled glyph from `tone` and
 * renders it inside the elements `ToastStatusIcon` slot, so consumers choose a `tone` and never an
 * icon.
 */
export function ToastStatusIcon({ tone, ...props }: ToastStatusIconProps) {
  const Glyph = STATUS_ICON[tone];
  return (
    <ToastStatusIconElement tone={tone} {...props}>
      <Glyph />
    </ToastStatusIconElement>
  );
}
