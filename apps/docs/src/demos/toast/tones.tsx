import { Button } from "@makeplane/propel/components/button";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { type ToastTone, ToastProvider, useToast } from "@makeplane/propel/components/toast";
import { X } from "lucide-react";

const TONES: { tone: ToastTone; label: string; title: string; description: string }[] = [
  {
    tone: "success",
    label: "Success",
    title: "Project created",
    description: "Marketing site is ready for your team.",
  },
  {
    tone: "danger",
    label: "Danger",
    title: "Remove failed",
    description: "Could not remove the workspace member.",
  },
  {
    tone: "info",
    label: "Info",
    title: "Import in progress",
    description: "We're syncing your issues from GitHub.",
  },
  {
    tone: "warning",
    label: "Warning",
    title: "Storage almost full",
    description: "You've used 90% of your workspace storage.",
  },
  {
    tone: "neutral",
    label: "Neutral",
    title: "Draft saved",
    description: "Your changes are stored locally.",
  },
];

function ToneTriggers() {
  const { add } = useToast();
  return (
    <div className="flex flex-wrap items-center gap-3">
      {TONES.map(({ tone, label, title, description }) => (
        <Button
          key={tone}
          sizing="hug"
          prominence="secondary"
          tone="neutral"
          magnitude="md"
          label={label}
          onClick={() => add({ title, description, data: { tone } })}
        />
      ))}
    </div>
  );
}

export default function TonesDemo() {
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
      <ToneTriggers />
    </ToastProvider>
  );
}
