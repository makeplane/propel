import { Icon } from "@makeplane/propel/components/icon";
import { PillSwitch } from "@makeplane/propel/components/pill";
import { Check, Tag } from "lucide-react";

export default function SwitchDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <PillSwitch magnitude="md" startIcon={<Icon icon={Tag} />} label="Off" />
      <PillSwitch magnitude="md" startIcon={<Icon icon={Check} />} defaultPressed label="On" />
    </div>
  );
}
