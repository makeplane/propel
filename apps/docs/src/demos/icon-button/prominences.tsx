import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { Plus } from "lucide-react";

export default function ProminencesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton
        prominence="primary"
        tone="neutral"
        magnitude="md"
        aria-label="Add member"
        icon={<Icon icon={Plus} />}
      />
      <IconButton
        prominence="secondary"
        tone="neutral"
        magnitude="md"
        aria-label="Add member"
        icon={<Icon icon={Plus} />}
      />
      <IconButton
        prominence="tertiary"
        tone="neutral"
        magnitude="md"
        aria-label="Add member"
        icon={<Icon icon={Plus} />}
      />
      <IconButton
        prominence="ghost"
        tone="neutral"
        magnitude="md"
        aria-label="Add member"
        icon={<Icon icon={Plus} />}
      />
    </div>
  );
}
