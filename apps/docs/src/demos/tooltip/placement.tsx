import { Button } from "@makeplane/propel/components/button";
import { Tooltip } from "@makeplane/propel/components/tooltip";

export default function PlacementDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tooltip label="Shown above the trigger" side="top">
        <Button label="Top" variant="secondary" size="md" fillType="hug" />
      </Tooltip>
      <Tooltip label="Shown to the right" side="right">
        <Button label="Right" variant="secondary" size="md" fillType="hug" />
      </Tooltip>
      <Tooltip label="Shown below the trigger" side="bottom">
        <Button label="Bottom" variant="secondary" size="md" fillType="hug" />
      </Tooltip>
      <Tooltip label="Shown to the left" side="left">
        <Button label="Left" variant="secondary" size="md" fillType="hug" />
      </Tooltip>
    </div>
  );
}
