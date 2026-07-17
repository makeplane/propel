import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { Check, Trash2 } from "lucide-react";

export default function TonesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton
        prominence="primary"
        tone="neutral"
        magnitude="md"
        aria-label="Approve request"
        icon={<Icon icon={Check} />}
      />
      <IconButton
        prominence="primary"
        tone="danger"
        magnitude="md"
        aria-label="Delete project"
        icon={<Icon icon={Trash2} />}
      />
      <IconButton
        prominence="secondary"
        tone="danger"
        magnitude="md"
        aria-label="Delete project"
        icon={<Icon icon={Trash2} />}
      />
    </div>
  );
}
