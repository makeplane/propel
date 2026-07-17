import { Banner } from "@makeplane/propel/components/banner";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { X } from "lucide-react";

export default function DismissibleDemo() {
  return (
    <Banner
      placement="inline"
      tone="info"
      title="Invite your teammates to this project"
      description="They will get access to every cycle and work item once they join."
      actions={
        <IconButton
          prominence="ghost"
          tone="neutral"
          magnitude="md"
          aria-label="Dismiss"
          icon={<Icon icon={X} />}
        />
      }
    />
  );
}
