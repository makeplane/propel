import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { Plus } from "lucide-react";

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton
        prominence="secondary"
        tone="neutral"
        magnitude="sm"
        aria-label="Add label"
        icon={<Icon icon={Plus} />}
      />
      <IconButton
        prominence="secondary"
        tone="neutral"
        magnitude="md"
        aria-label="Add label"
        icon={<Icon icon={Plus} />}
      />
      <IconButton
        prominence="secondary"
        tone="neutral"
        magnitude="lg"
        aria-label="Add label"
        icon={<Icon icon={Plus} />}
      />
      <IconButton
        prominence="secondary"
        tone="neutral"
        magnitude="xl"
        aria-label="Add label"
        icon={<Icon icon={Plus} />}
      />
    </div>
  );
}
