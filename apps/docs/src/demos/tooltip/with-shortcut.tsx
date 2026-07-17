import { Button } from "@makeplane/propel/components/button";
import { Tooltip } from "@makeplane/propel/components/tooltip";

export default function WithShortcutDemo() {
  return (
    <Tooltip label="Open command menu" shortcut="⌘ K">
      <Button
        label="Command menu"
        prominence="secondary"
        tone="neutral"
        magnitude="md"
        sizing="hug"
        aria-keyshortcuts="Meta+K"
      />
    </Tooltip>
  );
}
