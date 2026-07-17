import { Icon } from "@makeplane/propel/components/icon";
import { PillButton } from "@makeplane/propel/components/pill";
import { Tag } from "lucide-react";

export default function StatesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <PillButton magnitude="md" startIcon={<Icon icon={Tag} />} label="Default" />
      <PillButton magnitude="md" startIcon={<Icon icon={Tag} />} disabled label="Disabled" />
      <PillButton magnitude="md" loading label="Loading" />
    </div>
  );
}
