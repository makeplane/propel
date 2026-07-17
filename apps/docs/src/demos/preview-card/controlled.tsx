import { Button } from "@makeplane/propel/components/button";
import {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardBody,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardTitle,
  PreviewCardTrigger,
} from "@makeplane/propel/components/preview-card";
import * as React from "react";

const topics: Record<string, { title: string; description: string }> = {
  cycles: {
    title: "Cycles",
    description: "Time-boxed iterations for planning and shipping work in focused sprints.",
  },
  modules: {
    title: "Modules",
    description: "Larger bodies of related work items tracked together across cycles.",
  },
};

export default function ControlledDemo() {
  const [open, setOpen] = React.useState(false);
  const [triggerId, setTriggerId] = React.useState<string | null>(null);
  return (
    <div className="flex flex-col items-start gap-4">
      <PreviewCard
        open={open}
        triggerId={triggerId}
        onOpenChange={(nextOpen, eventDetails) => {
          setOpen(nextOpen);
          setTriggerId(eventDetails.trigger?.id ?? null);
        }}
      >
        {({ payload }) => {
          const topic = typeof payload === "string" ? topics[payload] : undefined;
          return (
            <>
              <p className="max-w-prose text-14 text-secondary">
                Group sprint work into{" "}
                <PreviewCardTrigger
                  id="cycles-trigger"
                  payload="cycles"
                  href="https://docs.plane.so/core-concepts/cycles"
                >
                  cycles
                </PreviewCardTrigger>{" "}
                or feature work into{" "}
                <PreviewCardTrigger
                  id="modules-trigger"
                  payload="modules"
                  href="https://docs.plane.so/core-concepts/modules"
                >
                  modules
                </PreviewCardTrigger>
                .
              </p>
              <PreviewCardContent sideOffset={8}>
                {topic === undefined ? null : (
                  <PreviewCardBody>
                    <PreviewCardTitle>{topic.title}</PreviewCardTitle>
                    <PreviewCardDescription>{topic.description}</PreviewCardDescription>
                  </PreviewCardBody>
                )}
                <PreviewCardArrow />
              </PreviewCardContent>
            </>
          );
        }}
      </PreviewCard>
      <Button
        prominence="secondary"
        tone="neutral"
        magnitude="lg"
        sizing="hug"
        onClick={() => {
          setTriggerId("modules-trigger");
          setOpen(true);
        }}
        label="Preview modules"
      />
    </div>
  );
}
