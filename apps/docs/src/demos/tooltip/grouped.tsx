import { Button } from "@makeplane/propel/components/button";
import { Tooltip, TooltipProvider } from "@makeplane/propel/components/tooltip";

export default function GroupedDemo() {
  return (
    <TooltipProvider closeDelay={100}>
      <div className="flex flex-wrap items-center gap-3">
        <Tooltip label="Bold the selection">
          <Button label="Bold" prominence="secondary" tone="neutral" magnitude="md" sizing="hug" />
        </Tooltip>
        <Tooltip label="Italicize the selection">
          <Button
            label="Italic"
            prominence="secondary"
            tone="neutral"
            magnitude="md"
            sizing="hug"
          />
        </Tooltip>
        <Tooltip label="Underline the selection">
          <Button
            label="Underline"
            prominence="secondary"
            tone="neutral"
            magnitude="md"
            sizing="hug"
          />
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
