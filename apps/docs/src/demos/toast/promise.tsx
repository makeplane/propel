import { Button } from "@makeplane/propel/components/button";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { type ToastData, ToastProvider, useToast } from "@makeplane/propel/components/toast";
import { X } from "lucide-react";

function PromiseTrigger() {
  const { promise } = useToast();
  return (
    <Button
      sizing="hug"
      prominence="secondary"
      tone="neutral"
      magnitude="md"
      label="Upload files"
      onClick={() =>
        void promise<string, ToastData>(
          new Promise<string>((resolve) => {
            setTimeout(() => resolve("3 attachments"), 1500);
          }),
          {
            loading: {
              title: "Uploading files",
              description: "Your attachments are on their way.",
              data: { tone: "neutral" },
            },
            success: (uploaded) => ({
              title: "Upload complete",
              description: `${uploaded} uploaded.`,
              data: { tone: "success" },
            }),
            error: {
              title: "Upload failed",
              description: "Something went wrong — try again.",
              data: { tone: "danger" },
            },
          },
        )
      }
    />
  );
}

export default function PromiseDemo() {
  return (
    <ToastProvider
      close={
        <IconButton
          prominence="ghost"
          tone="neutral"
          magnitude="sm"
          aria-label="Dismiss"
          icon={<Icon icon={X} />}
        />
      }
    >
      <PromiseTrigger />
    </ToastProvider>
  );
}
