import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type * as React from "react";

import {
  ComboboxInput as ComboboxInputElement,
  ComboboxInputGroup as ComboboxInputGroupElement,
} from "../../elements/combobox";

export type ComboboxInputGroupProps = Omit<
  BaseCombobox.Input.Props,
  "className" | "style" | "render"
> & {
  /** Input placeholder. */
  placeholder?: string;
  /**
   * The clear control (e.g. an `IconButton`), grafted onto Base UI's `Clear` behavior. It carries
   * its own — localizable — `aria-label`; the group bakes no label or glyph.
   */
  clear?: React.ReactElement;
  /**
   * The popup-trigger control (e.g. an `IconButton`), grafted onto Base UI's `Trigger` behavior. It
   * carries its own — localizable — `aria-label`; the group bakes no label or glyph.
   */
  trigger?: React.ReactElement;
};

/**
 * The ready-made single-select input frame: grafts Base UI's `InputGroup` onto the styled bordered
 * frame and Base UI's `Input` onto the styled text field, laying out the consumer-provided
 * `clear`/`trigger` controls. All remaining props pass through to the input (the element that
 * carries the combobox behavior and accessible name).
 */
export function ComboboxInputGroup({ clear, trigger, ...props }: ComboboxInputGroupProps) {
  return (
    <BaseCombobox.InputGroup render={<ComboboxInputGroupElement />}>
      <BaseCombobox.Input {...props} render={<ComboboxInputElement />} />
      {clear != null ? <BaseCombobox.Clear render={clear} /> : null}
      {trigger != null ? <BaseCombobox.Trigger render={trigger} /> : null}
    </BaseCombobox.InputGroup>
  );
}
