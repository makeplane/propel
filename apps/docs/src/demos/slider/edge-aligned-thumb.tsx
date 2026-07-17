import { Slider } from "@makeplane/propel/components/slider";
import * as React from "react";

export default function EdgeAlignedThumbDemo() {
  const [value, setValue] = React.useState(25);
  return (
    <Slider
      label="Progress"
      magnitude="md"
      value={value}
      onValueChange={(next) => setValue(next as number)}
      min={0}
      max={100}
      step={1}
      thumbAlignment="edge"
    />
  );
}
