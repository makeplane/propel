import { Button } from "@makeplane/propel/components/button";
import { Tooltip } from "@makeplane/propel/components/tooltip";

export default function BasicDemo() {
  return (
    <Tooltip label="Create a new project">
      <Button label="New project" variant="secondary" size="md" fillType="hug" />
    </Tooltip>
  );
}
