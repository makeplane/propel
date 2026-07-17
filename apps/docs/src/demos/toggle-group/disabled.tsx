import { Icon } from "@makeplane/propel/components/icon";
import { Toggle } from "@makeplane/propel/components/toggle";
import { ToggleGroup } from "@makeplane/propel/components/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

export default function DisabledDemo() {
  return (
    <ToggleGroup
      magnitude="md"
      disabled
      defaultValue={["bold"]}
      aria-label="Text formatting (disabled)"
    >
      <Toggle value="bold" aria-label="Bold" icon={<Icon icon={Bold} />} />
      <Toggle value="italic" aria-label="Italic" icon={<Icon icon={Italic} />} />
      <Toggle value="underline" aria-label="Underline" icon={<Icon icon={Underline} />} />
    </ToggleGroup>
  );
}
