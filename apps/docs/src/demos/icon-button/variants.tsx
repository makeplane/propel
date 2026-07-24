import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { Plus, Trash2 } from "lucide-react";

export default function VariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton variant="primary" size="md" aria-label="Add member" icon={<Icon icon={Plus} />} />
      <IconButton
        variant="secondary"
        size="md"
        aria-label="Add member"
        icon={<Icon icon={Plus} />}
      />
      <IconButton
        variant="tertiary"
        size="md"
        aria-label="Add member"
        icon={<Icon icon={Plus} />}
      />
      <IconButton variant="ghost" size="md" aria-label="Add member" icon={<Icon icon={Plus} />} />
      <IconButton
        variant="danger"
        size="md"
        aria-label="Delete project"
        icon={<Icon icon={Trash2} />}
      />
      <IconButton
        variant="danger-outline"
        size="md"
        aria-label="Delete project"
        icon={<Icon icon={Trash2} />}
      />
    </div>
  );
}
