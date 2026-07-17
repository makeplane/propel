import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { NumberField } from "@makeplane/propel/components/number-field";
import { Minus, Plus } from "lucide-react";
import * as React from "react";

export default function BasicDemo() {
  const [value, setValue] = React.useState<number | null>(2);

  return (
    <NumberField
      aria-label="Number of instances"
      magnitude="xl"
      min={1}
      max={64}
      value={value}
      onValueChange={setValue}
      decrement={
        <IconButton
          prominence="ghost"
          tone="neutral"
          magnitude="xl"
          aria-label="Decrease"
          icon={<Icon icon={Minus} />}
        />
      }
      increment={
        <IconButton
          prominence="ghost"
          tone="neutral"
          magnitude="xl"
          aria-label="Increase"
          icon={<Icon icon={Plus} />}
        />
      }
    />
  );
}
