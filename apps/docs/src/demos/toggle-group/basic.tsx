import { Icon } from "@makeplane/propel/components/icon";
import { Toggle } from "@makeplane/propel/components/toggle";
import { ToggleGroup } from "@makeplane/propel/components/toggle-group";
import { List, ListOrdered } from "lucide-react";

export default function BasicDemo() {
  return (
    <ToggleGroup magnitude="md" defaultValue={["bulleted"]} aria-label="List style">
      <Toggle value="bulleted" aria-label="Bulleted list" icon={<Icon icon={List} />} />
      <Toggle value="numbered" aria-label="Numbered list" icon={<Icon icon={ListOrdered} />} />
    </ToggleGroup>
  );
}
