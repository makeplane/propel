import { Checkbox } from "@makeplane/propel/components/checkbox";
import { Icon } from "@makeplane/propel/components/icon";
import { Repeat } from "lucide-react";

export default function WithIconDemo() {
  return (
    <Checkbox
      icon={<Icon icon={Repeat} tint="secondary" magnitude="sm" />}
      label="Sync automatically"
      defaultChecked
    />
  );
}
