import { Select as BaseSelect } from "@base-ui/react/select";
import { ChevronsUpDown } from "lucide-react";
import type * as React from "react";

import {
  SelectTrigger as SelectTriggerElement,
  type SelectTriggerMagnitude,
  SelectValue,
} from "../../elements/select";
import { Icon as IconSlot } from "../../internal/icon";

export type SelectTriggerProps = Omit<
  BaseSelect.Trigger.Props,
  "children" | "className" | "render" | "style"
> & {
  /** Visual size of the trigger: controls its height, text, and icon size. Required. */
  magnitude: SelectTriggerMagnitude;
  /** Shown in the trigger while nothing is selected — Base UI's `Select.Value` placeholder. */
  placeholder?: React.ReactNode;
};

/**
 * The ready-made select trigger: grafts Base UI's `Select.Trigger` behavior onto the styled trigger
 * and bakes its anatomy — the selected value (Base UI's `Select.Value` grafted onto `SelectValue`)
 * plus the owned chevron indicator. Children are baked, so the prop is omitted.
 */
export function SelectTrigger({ magnitude, placeholder, ...props }: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger {...props} render={<SelectTriggerElement magnitude={magnitude} />}>
      <BaseSelect.Value render={<SelectValue />} placeholder={placeholder} />
      <IconSlot tint="secondary">
        <ChevronsUpDown aria-hidden />
      </IconSlot>
    </BaseSelect.Trigger>
  );
}
