import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { Plus } from "lucide-react";

export default function SizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton
        variant="secondary"
        size="sm"
        aria-label="Add label"
        icon={<Icon icon={Plus} />}
      />
      <IconButton
        variant="secondary"
        size="md"
        aria-label="Add label"
        icon={<Icon icon={Plus} />}
      />
      <IconButton
        variant="secondary"
        size="lg"
        aria-label="Add label"
        icon={<Icon icon={Plus} />}
      />
      <IconButton
        variant="secondary"
        size="xl"
        aria-label="Add label"
        icon={<Icon icon={Plus} />}
      />
    </div>
  );
}
