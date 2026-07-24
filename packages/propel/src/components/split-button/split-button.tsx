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
  /** Icon rendered beside the main label (inline-start by default), e.g. `<Icon icon={Plus} />`. */
  icon?: React.ReactNode;
  /**
   * Which side of the main label the icon sits on. The `loading` spinner takes the same slot.
   *
   * @default "start"
   */
  iconPosition?: "start" | "end";
  /**
   * Shows a spinner on the main segment and makes both segments non-interactive (the main segment
   * stays focusable, Button's soft-disabled loading state).
   */
  loading?: boolean;
  /** Disables both segments. */
  disabled?: boolean;
  /**
   * The main segment's form behavior.
   *
   * @default "button"
   */
  type?: "submit" | "reset" | "button";
  /**
   * Accessible name of the menu-opening segment (it is icon-only, so it must be labeled).
   *
   * @default "More options"
   */
  menuLabel?: string;
};

/**
 * The ready-made split button: a main action `Button` plus a chevron `IconButton` grafted as the
 * surrounding menu's `MenuTrigger`, laid out by the styled `SplitButton` frame (separate pills when
 * primary, connected outline when secondary). Neutral only — there is no danger/error split button.
 * It ships no menu of its own — render it as a `Menu`'s child, with the surface as a sibling
 * `MenuContent`:
 *
 * ```tsx
 * <Menu>
 *   <SplitButton variant="primary" size="lg" label="Save" onClick={save} />
 *   <MenuContent>
 *     <MenuItem label="Save as draft" />
 *   </MenuContent>
 * </Menu>;
 * ```
 */
export function SplitButton({
  variant,
  size,
  label,
  onClick,
  icon,
  iconPosition,
  loading = false,
  disabled,
  type = "button",
  menuLabel = "More options",
  ...props
}: SplitButtonProps) {
  return (
    <SplitButtonElement variant={variant} size={size} {...props}>
      <Button
        variant={variant}
        size={size}
        fillType="hug"
        label={label}
        onClick={onClick}
        icon={icon}
        iconPosition={iconPosition}
        loading={loading}
        disabled={disabled}
        type={type}
      />
      <MenuTrigger
        disabled={disabled || loading}
        render={
          <IconButton
            variant={variant}
            size={size}
            icon={<Icon icon={ChevronDown} />}
            aria-label={menuLabel}
          />
        }
      />
    </SplitButtonElement>
  );
}
