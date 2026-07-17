import { Icon } from "@makeplane/propel/components/icon";
import { Toggle } from "@makeplane/propel/components/toggle";
import { Star } from "lucide-react";

export default function StatesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle magnitude="md" aria-label="Off" icon={<Icon icon={Star} />} />
      <Toggle magnitude="md" defaultPressed aria-label="On" icon={<Icon icon={Star} />} />
      <Toggle magnitude="md" disabled aria-label="Disabled" icon={<Icon icon={Star} />} />
    </div>
  );
}
