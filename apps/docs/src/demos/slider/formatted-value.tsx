import { Slider } from "@makeplane/propel/components/slider";
import * as React from "react";

export default function FormattedValueDemo() {
  const [value, setValue] = React.useState(0.6);
  return (
    <Slider
      label="Opacity"
      magnitude="md"
      value={value}
      onValueChange={(next) => setValue(next as number)}
      min={0}
      max={1}
      step={0.01}
      format={{ style: "percent", maximumFractionDigits: 0 }}
    />
  );
}
