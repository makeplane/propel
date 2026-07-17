import { Button } from "@makeplane/propel/components/button";
import { Tooltip } from "@makeplane/propel/components/tooltip";

export default function PlacementDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tooltip label="Shown above the trigger" side="top">
        <Button label="Top" prominence="secondary" tone="neutral" magnitude="md" sizing="hug" />
      </Tooltip>
      <Tooltip label="Shown to the right" side="right">
        <Button label="Right" prominence="secondary" tone="neutral" magnitude="md" sizing="hug" />
      </Tooltip>
      <Tooltip label="Shown below the trigger" side="bottom">
        <Button label="Bottom" prominence="secondary" tone="neutral" magnitude="md" sizing="hug" />
      </Tooltip>
      <Tooltip label="Shown to the left" side="left">
        <Button label="Left" prominence="secondary" tone="neutral" magnitude="md" sizing="hug" />
      </Tooltip>
    </div>
  );
}
