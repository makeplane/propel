import type * as React from "react";

import { SolidCircleAlert } from "./solid-circle-alert";
import { SolidCircleCheck } from "./solid-circle-check";
import { SolidCircleX } from "./solid-circle-x";
import type { StatusIconProps } from "./solid-icon";
import { SolidInfo } from "./solid-info";
import { SolidTriangleAlert } from "./solid-triangle-alert";
import {
  type ToastTone,
  type ToastStatusIconVariantProps,
  toastStatusIconVariants,
} from "./variants";

export type { ToastStatusIconVariantProps, ToastTone } from "./variants";

type StatusIcon = (props: StatusIconProps) => React.JSX.Element;

// Each tone auto-selects a filled status icon (see the solid-* glyphs) and its color
// token — the caller never passes an icon. Filled glyphs match Figma's toast (node
// 1144-3158); lucide ships no filled status equivalents, so these are hand-authored.
const STATUS_ICON: Record<ToastTone, StatusIcon> = {
  success: SolidCircleCheck,
  danger: SolidCircleX,
  info: SolidInfo,
  warning: SolidTriangleAlert,
  neutral: SolidCircleAlert,
};

export type ToastStatusIconProps = Omit<StatusIconProps, "className"> & ToastStatusIconVariantProps;

/**
 * The tone-colored status glyph at a toast's inline-start. Owns both the tone→icon mapping and the
 * `size-4 shrink-0` + per-tone color cva, so consumers pick a `tone` and never style the icon.
 */
export function ToastStatusIcon({ tone, ...props }: ToastStatusIconProps) {
  const Icon = STATUS_ICON[tone];
  return <Icon aria-hidden className={toastStatusIconVariants({ tone })} {...props} />;
}
