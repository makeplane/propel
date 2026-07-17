import { Icon } from "@makeplane/propel/components/icon";
import { Toggle } from "@makeplane/propel/components/toggle";
import { ToggleGroup } from "@makeplane/propel/components/toggle-group";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

export default function VerticalDemo() {
  return (
    <ToggleGroup
      magnitude="md"
      orientation="vertical"
      defaultValue={["left"]}
      aria-label="Text alignment"
    >
      <Toggle value="left" aria-label="Align left" icon={<Icon icon={AlignLeft} />} />
      <Toggle value="center" aria-label="Align center" icon={<Icon icon={AlignCenter} />} />
      <Toggle value="right" aria-label="Align right" icon={<Icon icon={AlignRight} />} />
    </ToggleGroup>
  );
}
