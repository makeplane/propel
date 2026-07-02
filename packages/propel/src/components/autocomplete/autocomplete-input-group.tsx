import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type * as React from "react";

import {
  AutocompleteInput,
  AutocompleteInputGroup as AutocompleteInputGroupElement,
  type AutocompleteMagnitude,
} from "../../elements/autocomplete";
import { ControlIcon } from "../../internal/control-icon";

export type AutocompleteInputGroupProps = Omit<
  BaseAutocomplete.Input.Props,
  "className" | "style" | "render"
> & {
  /** Visual size of the input row: height, padding, and icon/text sizing. Required. */
  magnitude: AutocompleteMagnitude;
  /** Input placeholder. */
  placeholder?: string;
  /**
   * Decorative leading glyph (e.g. a search magnifier), rendered in the group's `AutocompleteIcon`
   * slot at the inline-start.
   */
  icon?: React.ReactNode;
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
 * The ready-made autocomplete input row: grafts Base UI's `InputGroup` onto the styled bordered
 * frame and Base UI's `Input` onto the styled text field, laying out an optional leading `icon`
 * slot and the consumer-provided `clear`/`trigger` controls. All remaining props pass through to
 * the input (the element that carries the combobox behavior and accessible name).
 */
export function AutocompleteInputGroup({
  magnitude,
  icon,
  clear,
  trigger,
  ...props
}: AutocompleteInputGroupProps) {
  return (
    <BaseAutocomplete.InputGroup render={<AutocompleteInputGroupElement magnitude={magnitude} />}>
      {icon != null ? <ControlIcon>{icon}</ControlIcon> : null}
      <BaseAutocomplete.Input {...props} render={<AutocompleteInput magnitude={magnitude} />} />
      {clear != null ? <BaseAutocomplete.Clear render={clear} /> : null}
      {trigger != null ? <BaseAutocomplete.Trigger render={trigger} /> : null}
    </BaseAutocomplete.InputGroup>
  );
}
