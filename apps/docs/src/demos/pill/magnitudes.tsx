import { Icon } from "@makeplane/propel/components/icon";
import { PillButton } from "@makeplane/propel/components/pill";
import { Tag } from "lucide-react";

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <PillButton magnitude="sm" startIcon={<Icon icon={Tag} />} label="Small" />
      <PillButton magnitude="md" startIcon={<Icon icon={Tag} />} label="Medium" />
      <PillButton magnitude="lg" startIcon={<Icon icon={Tag} />} label="Large" />
    </div>
  );
}
