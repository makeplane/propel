import { ChevronDown } from "lucide-react";
import type * as React from "react";

import {
  SplitButton as SplitButtonElement,
  type SplitButtonProps as SplitButtonElementProps,
} from "../../elements/split-button";
import { Button } from "../button";
import { Icon } from "../icon";
import { IconButton } from "../icon-button";
import { MenuTrigger } from "../menu";

export type SplitButtonProps = Omit<SplitButtonElementProps, "children"> & {
  /** Visible label of the main action segment. */
  label: string;
  /** Click handler of the main action segment. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Element rendered before the main label (inline-start), e.g. `<Icon icon={Plus} />`. */
  startIcon?: React.ReactNode;
  /** Element rendered after the main label (inline-end), e.g. `<Icon icon={ArrowRight} />`. */
  endIcon?: React.ReactNode;
  /**
   * Shows a spinner on the main segment and makes both segments non-interactive (the main segment
   * stays focusable, Button's soft-disabled loading state).
   */
  loading?: boolean;
  /** Disables both segments. */
  disabled?: boolean;
  /**
   * Accessible name of the menu-opening segment (it is icon-only, so it must be labeled).
   *
   * @default "More options"
   */
  menuLabel?: string;
};

/**
 * The ready-made split button: a main action `Button` plus a chevron `IconButton` grafted as the
 * surrounding menu's `MenuTrigger`, connected by the styled `SplitButton` frame. It ships no menu
 * of its own — render it as a `Menu`'s child, with the surface as a sibling `MenuContent`:
 *
 * ```tsx
 * <Menu>
 *   <SplitButton
 *     prominence="primary"
 *     tone="neutral"
 *     magnitude="lg"
 *     label="Save"
 *     onClick={save}
 *   />
 *   <MenuContent>
 *     <MenuItem label="Save as draft" />
 *   </MenuContent>
 * </Menu>;
 * ```
 */
export function SplitButton({
  prominence,
  tone,
  magnitude,
  label,
  onClick,
  startIcon,
  endIcon,
  loading = false,
  disabled,
  menuLabel = "More options",
  ...props
}: SplitButtonProps) {
  return (
    <SplitButtonElement prominence={prominence} tone={tone} magnitude={magnitude} {...props}>
      <Button
        prominence={prominence}
        tone={tone}
        magnitude={magnitude}
        sizing="hug"
        label={label}
        onClick={onClick}
        startIcon={startIcon}
        endIcon={endIcon}
        loading={loading}
        disabled={disabled}
      />
      <MenuTrigger
        disabled={disabled || loading}
        render={
          <IconButton
            prominence={prominence}
            tone={tone}
            magnitude={magnitude}
            icon={<Icon icon={ChevronDown} />}
            aria-label={menuLabel}
          />
        }
      />
    </SplitButtonElement>
  );
}
