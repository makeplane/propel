import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type * as React from "react";

import { ComboboxChip as ComboboxChipElement } from "../../elements/combobox";
import { ComboboxChipRemove } from "./combobox-chip-remove";

export type ComboboxChipProps = Omit<
  BaseCombobox.Chip.Props,
  "children" | "className" | "style"
> & {
  /** Leading element before the label — an `<Icon icon={...} />`, an assignee `Avatar`, or similar. */
  startContent?: React.ReactNode;
  /** Trailing element after the label, before the remove control, e.g. a status `<Icon .../>`. */
  endContent?: React.ReactNode;
  /** The chip's label. Also sets the chip's own accessible name. */
  label: string;
  /** Accessible name for the remove button (localizable), e.g. `` `Remove ${label}` ``. */
  removeLabel: string;
};

/**
 * Ready-made chip: Base UI's chip behavior (arrow-key focus, Backspace/Delete removal) grafted onto
 * the styled tag, laying out an optional leading/trailing node around the label plus a
 * `ComboboxChipRemove`. Base UI derives which selected value a chip represents from its position
 * among its siblings — pass one per value from `ComboboxChips`' `children`.
 */
export function ComboboxChip({
  startContent,
  endContent,
  label,
  removeLabel,
  ...props
}: ComboboxChipProps) {
  return (
    <BaseCombobox.Chip {...props} aria-label={label} render={<ComboboxChipElement />}>
      {startContent}
      {label}
      {endContent}
      <ComboboxChipRemove aria-label={removeLabel} />
    </BaseCombobox.Chip>
  );
}
