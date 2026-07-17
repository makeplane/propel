import { Icon } from "@makeplane/propel/components/icon";
import { IconPill } from "@makeplane/propel/components/pill";
import { Plus, X } from "lucide-react";

export default function IconOnlyDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <IconPill magnitude="sm" aria-label="Remove label" icon={<Icon icon={X} />} />
      <IconPill magnitude="md" aria-label="Remove label" icon={<Icon icon={X} />} />
      <IconPill magnitude="lg" aria-label="Remove label" icon={<Icon icon={X} />} />
      <IconPill magnitude="md" aria-label="Add label" disabled icon={<Icon icon={Plus} />} />
      <IconPill magnitude="md" aria-label="Add label" loading icon={<Icon icon={Plus} />} />
    </div>
  );
}
