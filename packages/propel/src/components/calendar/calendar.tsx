import { ChevronLeft, ChevronRight } from "lucide-react";

import { Calendar as CalendarElement, type CalendarProps } from "../../ui/calendar";

export type { CalendarProps };

/**
 * The ready-made date picker: the styled `ui` `Calendar` with propel's lucide nav chevrons. The
 * icons carry no className — react-day-picker passes `classNames.chevron` (16px, RTL-mirrored)
 * through to them. A caller's own `components.Chevron` still wins.
 */
export function Calendar(props: CalendarProps) {
  return (
    <CalendarElement
      {...props}
      components={{
        Chevron: ({ orientation, className }) =>
          orientation === "left" ? (
            <ChevronLeft aria-hidden className={className} />
          ) : (
            <ChevronRight aria-hidden className={className} />
          ),
        ...props.components,
      }}
    />
  );
}
