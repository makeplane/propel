import { Icon } from "@makeplane/propel/components/icon";
import { Toggle } from "@makeplane/propel/components/toggle";
import { ToggleGroup } from "@makeplane/propel/components/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

export default function MultipleDemo() {
  return (
    <ToggleGroup
      magnitude="md"
      multiple
      defaultValue={["bold", "italic"]}
      aria-label="Text formatting"
    >
      <Toggle value="bold" aria-label="Bold" icon={<Icon icon={Bold} />} />
      <Toggle value="italic" aria-label="Italic" icon={<Icon icon={Italic} />} />
      <Toggle value="underline" aria-label="Underline" icon={<Icon icon={Underline} />} />
    </ToggleGroup>
  );
}
