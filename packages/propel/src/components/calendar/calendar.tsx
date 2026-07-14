import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, type DayPickerProps } from "react-day-picker";

import { calendarClassNames } from "../../elements/calendar";

/**
 * Props for {@link Calendar}. Forwards react-day-picker's `DayPickerProps` (`mode`, `selected`,
 * `onSelect`, `disabled`, `month`, `defaultMonth`, …). `className`/`style`/`classNames` are dropped
 * because styling is owned by propel tokens (the `elements/calendar` `calendarClassNames` contract,
 * grafted below). `numberOfMonths`/`captionLayout`/`showWeekNumber` are dropped because
 * `calendarClassNames` does not style those layout modes — they would render with
 * react-day-picker's unstyled default classes (we never load its stylesheet), so we omit them
 * rather than accept a prop that silently breaks the layout. Add the `classNames` keys + stories
 * first if a mode is needed.
 */
// `DayPickerProps` is a discriminated union over `mode`; a plain `Omit` collapses
// it and de-correlates `selected`/`onSelect`. Omit distributively so each union
// member (and its mode↔selected↔onSelect relationship) is preserved.
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
export type CalendarProps = DistributiveOmit<
  DayPickerProps,
  "className" | "style" | "classNames" | "numberOfMonths" | "captionLayout" | "showWeekNumber"
>;

// Hoisted so its identity is stable across renders — react-day-picker keys its component registry
// by identity, so an inline definition would remount the chevron subtree on every render. It
// captures nothing, so module scope is safe.
const renderChevron: NonNullable<DayPickerProps["components"]>["Chevron"] = ({
  orientation,
  className,
}) =>
  orientation === "left" ? (
    <ChevronLeft aria-hidden className={className} />
  ) : (
    <ChevronRight aria-hidden className={className} />
  );

/**
 * The ready-made date picker: react-day-picker's `DayPicker` behavior grafted onto propel's
 * `elements/calendar` `calendarClassNames` styled contract, finished with propel's lucide nav
 * chevrons. Supports `single` and `range` selection via the `mode` prop and is fully keyboard- and
 * screen-reader-accessible (react-day-picker owns the grid semantics). Pass `selected`/`onSelect`
 * to control the selection. The chevron icons carry no className — react-day-picker passes
 * `classNames.chevron` (16px, RTL-mirrored) through to them; a caller's own `components.Chevron`
 * still wins.
 */
export function Calendar(props: CalendarProps) {
  return (
    <DayPicker
      classNames={calendarClassNames}
      {...props}
      components={{
        Chevron: renderChevron,
        ...props.components,
      }}
    />
  );
}
