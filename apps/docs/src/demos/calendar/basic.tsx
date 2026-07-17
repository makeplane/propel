import { Calendar } from "@makeplane/propel/components/calendar";
import * as React from "react";

export default function BasicDemo() {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date(2025, 0, 24));

  return (
    <Calendar
      mode="single"
      defaultMonth={new Date(2025, 0, 1)}
      selected={selected}
      onSelect={setSelected}
    />
  );
}
