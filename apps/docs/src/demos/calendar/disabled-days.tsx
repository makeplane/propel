import { Calendar } from "@makeplane/propel/components/calendar";
import * as React from "react";

export default function DisabledDaysDemo() {
  const [selected, setSelected] = React.useState<Date | undefined>();

  return (
    <Calendar
      mode="single"
      defaultMonth={new Date(2025, 0, 1)}
      selected={selected}
      onSelect={setSelected}
      // Weekends (Sunday and Saturday) render muted and cannot be selected.
      disabled={{ dayOfWeek: [0, 6] }}
    />
  );
}
