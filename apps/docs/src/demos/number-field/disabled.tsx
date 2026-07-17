import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { NumberField } from "@makeplane/propel/components/number-field";
import { Minus, Plus } from "lucide-react";

export default function DisabledDemo() {
  return (
    <NumberField
      aria-label="Number of seats"
      magnitude="xl"
      defaultValue={12}
      min={1}
      max={64}
      disabled
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
