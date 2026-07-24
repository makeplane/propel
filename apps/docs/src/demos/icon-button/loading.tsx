import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { RefreshCw } from "lucide-react";

export default function LoadingDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <IconButton
        variant="primary"
        size="md"
        aria-label="Syncing workspace"
        loading
        icon={<Icon icon={RefreshCw} />}
      />
      <IconButton
        variant="secondary"
        size="md"
        aria-label="Syncing workspace"
        loading
        icon={<Icon icon={RefreshCw} />}
      />
      <IconButton
        variant="tertiary"
        size="md"
        aria-label="Syncing workspace"
        loading
        icon={<Icon icon={RefreshCw} />}
      />
    </div>
  );
}
