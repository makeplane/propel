import { cx } from "class-variance-authority";
import type { DayPickerProps } from "react-day-picker";

import { surfaceVariants } from "../../internal/surface";

// Propel-token class map for react-day-picker's UI parts. We never import its
// default stylesheet — every visual decision below comes from a propel utility
// (Figma node 1272-11630): 40px round day cells, accent endpoints, soft in-range
// fill, a bordered/elevated container. Keys mirror react-day-picker's `UI`/
// `DayFlag`/`SelectionState` enums.
export const calendarClassNames: Partial<NonNullable<DayPickerProps["classNames"]>> = {
  // Elevated, bordered surface: the shared floating-card surface (white
  // `surface-1`, subtle border) with `raised` overlay shadow and `lg` radius.
  root: cx(surfaceVariants({ elevation: "raised", radius: "lg" }), "relative inline-block p-4"),
  months: "flex flex-col gap-3",
  month: "flex flex-col gap-3",
  // Caption + nav share one row; the label leads, buttons sit at the end.
  month_caption: "flex items-center h-7",
  caption_label: "text-20 font-semibold text-primary",
  nav: "absolute inset-e-4 top-4 flex items-center gap-1",
  // 28px transparent icon buttons that tint on hover (Figma "Icon buttons").
  button_previous:
    "inline-flex size-7 items-center justify-center rounded-md text-icon-tertiary hover:bg-layer-transparent-hover aria-disabled:opacity-50",
  button_next:
    "inline-flex size-7 items-center justify-center rounded-md text-icon-tertiary hover:bg-layer-transparent-hover aria-disabled:opacity-50",
  // The nav chevron: 16px, mirrored in RTL. react-day-picker passes this class to its `Chevron`
  // component (default or a custom one), so the icon needs no className of its own.
  chevron: "size-4 rtl:-scale-x-100",
  month_grid: "border-collapse",
  weekdays: "flex",
  // Weekday column headers: body-sm-regular tertiary text on a 40px cell. The
  // composite `text-body-sm-regular` utility carries the 14px size plus the
  // propel regular weight/line-height (Figma "font/body-sm/regular").
  weekday: "flex size-10 items-center justify-center text-body-sm-regular text-tertiary",
  week: "flex w-full",
  // react-day-picker v10 applies the modifier classNames (`selected`, `today`,
  // `range_*`) and `aria-selected` to the gridcell (this `td`) itself — NOT to a
  // descendant — so we target the cell directly with `[&.foo]`/`[&[aria-selected]]`
  // and reach the inner button with `[&>button]`.
  //
  // The cell is the range backdrop: range cells (start/middle/end) get the soft
  // in-range fill, and only the outer corners of an endpoint round off so a
  // continuous range reads as one pill. A plain single-selected cell stays
  // transparent (its solid pill comes from the button below).
  day: "relative size-10 p-0 text-center [&.range-start]:bg-accent-subtle-hover [&.range-middle]:bg-accent-subtle-hover [&.range-end]:bg-accent-subtle-hover [&.range-start]:rounded-s-full [&.range-end]:rounded-e-full",
  // The actual button: 40px round, body-sm text, primary color.
  day_button:
    "relative inline-flex size-10 items-center justify-center rounded-full text-14 text-primary hover:bg-layer-transparent-hover",
  // Selected single day / range endpoints: solid accent button, inverse text.
  // (`selected` is set on the cell for every day in a range; `range_middle`
  // below resets the button back to transparent for the in-between days.)
  // `text-inverse` keeps AA contrast on the brand-blue surface in every theme.
  selected:
    "[&>button]:bg-accent-primary [&>button]:text-inverse [&>button:hover]:bg-accent-primary",
  // Endpoints are tagged so the cell can round the outer edge of the range.
  range_start: "range-start",
  range_end: "range-end",
  // Middle of a range: keep the button transparent so only the cell's soft fill
  // shows, and square the cell (the marker class also drives the fill above).
  range_middle:
    "range-middle [&>button]:bg-transparent [&>button]:text-primary [&>button:hover]:bg-transparent",
  // Today (when not selected): accent text so the current date stands out. When
  // the cell is also selected, the solid accent button (above) wins.
  today: "[&:not([aria-selected])>button]:text-accent-primary [&>button]:font-semibold",
  // Disabled days read as muted, non-interactive text.
  disabled: "[&>button]:text-disabled [&>button]:pointer-events-none",
  // Days from the adjacent month: dimmed.
  outside: "[&>button]:text-tertiary",
  hidden: "invisible",
};
