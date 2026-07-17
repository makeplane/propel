import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { RefreshCw } from "lucide-react";

export default function LoadingDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton
        prominence="primary"
        tone="neutral"
        magnitude="md"
        aria-label="Syncing workspace"
        loading
        icon={<Icon icon={RefreshCw} />}
      />
      <IconButton
        prominence="secondary"
        tone="neutral"
        magnitude="md"
        aria-label="Syncing workspace"
        loading
        icon={<Icon icon={RefreshCw} />}
      />
      <IconButton
        prominence="tertiary"
        tone="neutral"
        magnitude="md"
        aria-label="Syncing workspace"
        loading
        icon={<Icon icon={RefreshCw} />}
      />
    </div>
  );
}
