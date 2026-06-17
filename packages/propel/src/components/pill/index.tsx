import { Toggle } from "@base-ui/react/toggle";
import { cva, cx } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import * as React from "react";

import { getLoadingButtonProps } from "../../internal/loading-button";
import { nodeSlotClass } from "../../internal/node-slot";

// The Figma "Pills" family (node 1121-11) is three small, 6px-rounded chips that share
// one chrome: a 1px-bordered `layer-2` rectangle that darkens its background + border
// on interaction. `PillButton` and `IconPill` are buttons (hover / active / disabled /
// loading); `PillSwitch` is a toggle (default / hover / selected). All three take the
// `magnitude` axis (`sm` / `md` / `lg`).
//
// Despite the name they are NOT fully-rounded — `radius/md` (6px). Per Figma the icon
// and text colors are the same token per state, so the slots inherit the chip's text
// color through `currentColor` (a single channel) rather than carrying their own.
export type PillMagnitude = "sm" | "md" | "lg";

// Shared chip chrome. The interaction colors are applied by each component (they differ
// between the button states and the toggle's selected state), so the base is only
// layout + the focus ring. The focus ring is a propel a11y addition (the Figma frames
// show no focus state). `transition-colors` covers the bg/border/text shifts.
const pillBase = cx(
  "inline-flex shrink-0 items-center justify-center rounded-md border-sm outline-none",
  "transition-colors focus-visible:ring-2 focus-visible:ring-accent-strong",
);

// The label chips (`PillButton`, `PillSwitch`) share their box metrics: 20/24/28px tall
// with 6/6/8px inline padding, a 4px gap, a 14px node at every magnitude, and a 120px
// cap so a long label truncates. The font size is layered on separately: `sm` is the
// 12px text, `md` the 13px text, and `lg` the `body-sm/regular` composite (14px size,
// regular weight, and its line-height/letter-spacing all in one utility).
const labelPillSize = cva(cx(pillBase, "max-w-[120px] gap-1 py-1 [--node-size:0.875rem]"), {
  variants: {
    magnitude: {
      sm: "h-5 px-1.5",
      md: "h-6 px-1.5",
      lg: "h-7 px-2",
    },
  },
});

const labelFontByMagnitude: Record<PillMagnitude, string> = {
  sm: "text-12",
  md: "text-13",
  lg: "text-body-sm-regular",
};

// The slotted node (a 14px leading/trailing icon) and the spinner. Icons inherit the
// chip's `currentColor`; the spinner matches the node size.
function PillNode({ children }: { children: React.ReactNode }) {
  return (
    <span aria-hidden className={nodeSlotClass}>
      {children}
    </span>
  );
}

function PillSpinner() {
  return <LoaderCircle aria-hidden className="size-(--node-size) shrink-0 animate-spin" />;
}

// The truncating label. `min-w-0` lets it shrink so the 120px cap can ellipsize it.
function PillLabel({ children }: { children: React.ReactNode }) {
  return <span className="min-w-0 truncate">{children}</span>;
}

const pillButtonColors = cx(
  "cursor-pointer border-subtle-1 bg-layer-2 text-secondary",
  "hover:border-strong hover:bg-layer-2-hover",
  "active:border-strong active:bg-layer-2-active active:text-primary",
  // Disabled + loading drop to a transparent fill with the disabled text/icon color.
  "disabled:cursor-not-allowed disabled:border-subtle-1 disabled:bg-layer-transparent disabled:text-disabled",
  "aria-busy:cursor-default aria-busy:border-subtle-1 aria-busy:bg-layer-transparent aria-busy:text-disabled",
);

export type PillButtonProps = Omit<React.ComponentProps<"button">, "className" | "style"> & {
  /** Box scale. `sm` 20px / `md` 24px / `lg` 28px. */
  magnitude: PillMagnitude;
  /** A 14px node (icon/avatar) before the label. */
  inlineStartNode?: React.ReactNode;
  /** A 14px node (icon/avatar) after the label. */
  inlineEndNode?: React.ReactNode;
  /**
   * Busy state: swaps the leading node for a spinner, dims the label, and blocks clicks while
   * staying a real, focusable button (`aria-busy`/`aria-disabled`).
   */
  loading?: boolean;
};

/**
 * A pill-shaped button — a compact, low-emphasis action chip (e.g. a filter or a "+ Add"
 * affordance). Holds a label with optional leading/trailing nodes. Hover and active are CSS states;
 * `disabled` and `loading` are props.
 */
export function PillButton({
  magnitude,
  inlineStartNode,
  inlineEndNode,
  loading = false,
  children,
  type = "button",
  disabled,
  onClick,
  ...props
}: PillButtonProps) {
  return (
    <button
      type={type}
      {...getLoadingButtonProps({ loading, disabled, onClick })}
      className={cx(
        labelPillSize({ magnitude }),
        labelFontByMagnitude[magnitude],
        pillButtonColors,
      )}
      {...props}
    >
      {loading ? <PillSpinner /> : inlineStartNode ? <PillNode>{inlineStartNode}</PillNode> : null}
      <PillLabel>{children}</PillLabel>
      {!loading && inlineEndNode ? <PillNode>{inlineEndNode}</PillNode> : null}
    </button>
  );
}

const pillSwitchColors = cx(
  "cursor-pointer border-subtle-1 bg-layer-2 text-secondary",
  "hover:border-strong hover:bg-layer-2-hover",
  // Selected (the toggle's pressed state) is the darker `-selected` fill + strong
  // border + primary label.
  "data-pressed:border-strong data-pressed:bg-layer-2-selected data-pressed:text-primary",
  "disabled:cursor-not-allowed disabled:border-subtle-1 disabled:bg-layer-transparent disabled:text-disabled",
);

export type PillSwitchProps = Omit<
  React.ComponentProps<typeof Toggle>,
  "className" | "render" | "style"
> & {
  /** Box scale. `sm` 20px / `md` 24px / `lg` 28px. */
  magnitude: PillMagnitude;
  /** A 14px node (icon/avatar) before the label. */
  inlineStartNode?: React.ReactNode;
  /** A 14px node (icon/avatar) after the label. */
  inlineEndNode?: React.ReactNode;
};

/**
 * A toggle pill — a selectable chip for segmented, on/off choices (e.g. the display properties in a
 * settings menu). Built on Base UI `Toggle`, so it reports `aria-pressed` and is keyboard-operable;
 * the selected look is its pressed state. Control it with `pressed` + `onPressedChange`, or leave
 * it uncontrolled with `defaultPressed`. Compose several inside a Base UI `ToggleGroup` for a
 * single-select set.
 */
export function PillSwitch({
  magnitude,
  inlineStartNode,
  inlineEndNode,
  children,
  ...props
}: PillSwitchProps) {
  return (
    <Toggle
      className={cx(
        labelPillSize({ magnitude }),
        labelFontByMagnitude[magnitude],
        pillSwitchColors,
      )}
      {...props}
    >
      {inlineStartNode ? <PillNode>{inlineStartNode}</PillNode> : null}
      <PillLabel>{children}</PillLabel>
      {inlineEndNode ? <PillNode>{inlineEndNode}</PillNode> : null}
    </Toggle>
  );
}

// The icon-only square chip. Fixed square boxes (the icon centers inside) with a 14px
// icon at `sm` and 16px at `md`/`lg`. Same button states as `PillButton`; the icon
// color is the only foreground, so it carries the icon tokens directly.
const iconPillVariants = cva(
  cx(
    pillBase,
    "cursor-pointer border-subtle-1 bg-layer-2 text-icon-secondary",
    "hover:border-strong hover:bg-layer-2-hover",
    "active:border-strong active:bg-layer-2-active",
    "disabled:cursor-not-allowed disabled:border-subtle-1 disabled:bg-layer-transparent disabled:text-icon-disabled",
    "aria-busy:cursor-default aria-busy:border-subtle-1 aria-busy:bg-layer-transparent aria-busy:text-icon-disabled",
  ),
  {
    variants: {
      magnitude: {
        sm: "size-5 [--node-size:0.875rem]",
        md: "size-6 [--node-size:1rem]",
        lg: "size-7 [--node-size:1rem]",
      },
    },
  },
);

export type IconPillProps = Omit<
  React.ComponentProps<"button">,
  "className" | "style" | "children"
> & {
  /** Box scale. `sm` 20px (14px icon) / `md` 24px / `lg` 28px (16px icon). */
  magnitude: PillMagnitude;
  /** The icon (a 14/16px lucide icon), sized and tinted by the pill. Required. */
  children: React.ReactNode;
  /** Accessible name — required because the content is an icon (icons are hidden). */
  "aria-label": string;
  /** Busy state: swaps the icon for a spinner and blocks clicks (stays focusable). */
  loading?: boolean;
};

/**
 * An icon-only square pill — a compact icon action chip. Requires an `aria-label` because its
 * content is an icon. Hover and active are CSS states; `disabled` and `loading` are props.
 */
export function IconPill({
  magnitude,
  loading = false,
  children,
  type = "button",
  disabled,
  onClick,
  ...props
}: IconPillProps) {
  return (
    <button
      type={type}
      {...getLoadingButtonProps({ loading, disabled, onClick })}
      className={iconPillVariants({ magnitude })}
      {...props}
    >
      {loading ? <PillSpinner /> : <PillNode>{children}</PillNode>}
    </button>
  );
}
