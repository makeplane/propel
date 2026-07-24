import { Button } from "@makeplane/propel/components/button";
import { Tooltip } from "@makeplane/propel/components/tooltip";

export default function WithShortcutDemo() {
  return (
    <Tooltip label="Open command menu" shortcut="⌘ K">
      <Button
        label="Command menu"
        variant="secondary"
        size="md"
        fillType="hug"
        aria-keyshortcuts="Meta+K"
      />
    </Tooltip>
  );
}
