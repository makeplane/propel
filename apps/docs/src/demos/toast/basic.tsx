import { Button } from "@makeplane/propel/components/button";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { ToastProvider, useToast } from "@makeplane/propel/components/toast";
import { X } from "lucide-react";

function ToastTrigger() {
  const { add } = useToast();
  return (
    <Button
      fillType="hug"
      variant="secondary"
      size="md"
      label="Show notification"
      onClick={() =>
        add({
          title: "Project created",
          description: "Marketing site is ready for your team.",
          data: { tone: "success" },
        })
      }
    />
  );
}

export default function BasicDemo() {
  return (
    <ToastProvider
      close={<IconButton variant="ghost" size="sm" aria-label="Dismiss" icon={<Icon icon={X} />} />}
    >
      <ToastTrigger />
    </ToastProvider>
  );
}
