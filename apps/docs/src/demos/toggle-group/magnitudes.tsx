import { Icon } from "@makeplane/propel/components/icon";
import { Toggle, type ToggleMagnitude } from "@makeplane/propel/components/toggle";
import { ToggleGroup } from "@makeplane/propel/components/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

const MAGNITUDES: ToggleMagnitude[] = ["sm", "md", "lg"];

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {MAGNITUDES.map((magnitude) => (
        <ToggleGroup
          key={magnitude}
          magnitude={magnitude}
          multiple
          defaultValue={["bold"]}
          aria-label={`Text formatting (${magnitude})`}
        >
          <Toggle value="bold" aria-label={`Bold (${magnitude})`} icon={<Icon icon={Bold} />} />
          <Toggle
            value="italic"
            aria-label={`Italic (${magnitude})`}
            icon={<Icon icon={Italic} />}
          />
          <Toggle
            value="underline"
            aria-label={`Underline (${magnitude})`}
            icon={<Icon icon={Underline} />}
          />
        </ToggleGroup>
      ))}
    </div>
  );
}
