import { Button } from "@makeplane/propel/components/button";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { ToastProvider, useToast } from "@makeplane/propel/components/toast";
import { X } from "lucide-react";

function ProgressTrigger() {
  const { add } = useToast();
  return (
    <Button
      fillType="hug"
      variant="secondary"
      size="md"
      label="Export workspace"
      onClick={() =>
        add({
          title: "Exporting workspace",
          description: "Preparing your data for download.",
          data: {
            tone: "info",
            progress: 32,
            actions: [{ label: "Cancel" }],
          },
        })
      }
    />
  );
}

export default function WithProgressDemo() {
  return (
    <ToastProvider
      close={<IconButton variant="ghost" size="sm" aria-label="Dismiss" icon={<Icon icon={X} />} />}
    >
      <ProgressTrigger />
    </ToastProvider>
  );
}
