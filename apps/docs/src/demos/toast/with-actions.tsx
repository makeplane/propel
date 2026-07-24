import { Button } from "@makeplane/propel/components/button";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { ToastProvider, useToast } from "@makeplane/propel/components/toast";
import { X } from "lucide-react";

function ActionTrigger() {
  const { add } = useToast();
  return (
    <Button
      fillType="hug"
      variant="secondary"
      size="md"
      label="Mark as done"
      onClick={() =>
        add({
          title: "Issue moved to Done",
          description: "PROJ-142 was marked complete.",
          data: {
            tone: "success",
            actions: [{ label: "Undo" }],
            primaryAction: { label: "View" },
          },
        })
      }
    />
  );
}

export default function WithActionsDemo() {
  return (
    <ToastProvider
      close={<IconButton variant="ghost" size="sm" aria-label="Dismiss" icon={<Icon icon={X} />} />}
    >
      <ActionTrigger />
    </ToastProvider>
  );
}
