import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, type DayPickerProps } from "react-day-picker";

import { calendarClassNames } from "./variants";

/**
 * Props for {@link Calendar}. Forwards every react-day-picker `DayPickerProps` (`mode`, `selected`,
 * `onSelect`, `disabled`, `month`, `defaultMonth`, …) but drops `className`/`style`/`classNames` —
 * styling is owned by propel tokens.
 */
// `DayPickerProps` is a discriminated union over `mode`; a plain `Omit` collapses
// it and de-correlates `selected`/`onSelect`. Omit distributively so each union
// member (and its mode↔selected↔onSelect relationship) is preserved.
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
export type CalendarProps = DistributiveOmit<DayPickerProps, "className" | "style" | "classNames">;

/**
 * A date picker built on react-day-picker and styled entirely with propel tokens. Supports `single`
 * and `range` selection via the `mode` prop and is fully keyboard- and screen-reader-accessible
 * (react-day-picker owns the grid semantics). Pass `selected`/`onSelect` to control the selection.
 */
export function Calendar(props: CalendarProps) {
  return (
    <DayPicker
      // react-day-picker handles month/grid/aria; we only restyle and swap the
      // nav chevrons for lucide icons (decorative, hidden from assistive tech).
      classNames={calendarClassNames}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft aria-hidden className="size-4 rtl:-scale-x-100" />
          ) : (
            <ChevronRight aria-hidden className="size-4 rtl:-scale-x-100" />
          ),
      }}
      {...props}
    />
  );
}
