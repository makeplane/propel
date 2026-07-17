import { Slider } from "@makeplane/propel/components/slider";
import * as React from "react";

export default function BasicDemo() {
  const [value, setValue] = React.useState(40);
  return (
    <Slider
      label="Volume"
      magnitude="md"
      value={value}
      onValueChange={(next) => setValue(next as number)}
      min={0}
      max={100}
      step={1}
    />
  );
}
