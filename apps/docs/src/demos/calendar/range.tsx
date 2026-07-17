import { Calendar } from "@makeplane/propel/components/calendar";
import * as React from "react";

// Mirrors react-day-picker's `DateRange` shape without importing it (demos import
// only from `@makeplane/propel/components/*`).
type DateRange = { from: Date | undefined; to?: Date | undefined };

export default function RangeDemo() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 0, 13),
    to: new Date(2025, 0, 20),
  });

  return (
    <Calendar
      mode="range"
      defaultMonth={new Date(2025, 0, 1)}
      selected={range}
      onSelect={setRange}
    />
  );
}
