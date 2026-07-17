import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { NumberField } from "@makeplane/propel/components/number-field";
import { Minus, Plus } from "lucide-react";

const MAGNITUDES = ["sm", "md", "lg", "xl"] as const;

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <NumberField
          key={magnitude}
          aria-label={`Number of seats (${magnitude})`}
          magnitude={magnitude}
          defaultValue={4}
          min={1}
          max={64}
          decrement={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude={magnitude}
              aria-label={`Decrease (${magnitude})`}
              icon={<Icon icon={Minus} />}
            />
          }
          increment={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude={magnitude}
              aria-label={`Increase (${magnitude})`}
              icon={<Icon icon={Plus} />}
            />
          }
        />
      ))}
    </div>
  );
}
