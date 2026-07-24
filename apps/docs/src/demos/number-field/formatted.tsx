import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { NumberField } from "@makeplane/propel/components/number-field";
import { Minus, Plus } from "lucide-react";
import * as React from "react";

export default function FormattedDemo() {
  const [value, setValue] = React.useState<number | null>(250);

  return (
    <NumberField
      aria-label="Monthly budget"
      magnitude="xl"
      min={0}
      max={10000}
      step={50}
      value={value}
      onValueChange={setValue}
      format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
      decrement={
        <IconButton variant="ghost" size="xl" aria-label="Decrease" icon={<Icon icon={Minus} />} />
      }
      increment={
        <IconButton variant="ghost" size="xl" aria-label="Increase" icon={<Icon icon={Plus} />} />
      }
    />
  );
}
