import { Icon } from "@makeplane/propel/components/icon";
import { Toolbar, ToolbarToggle } from "@makeplane/propel/components/toolbar";
import { Tooltip, TooltipProvider } from "@makeplane/propel/components/tooltip";
import { Bold, Italic, Underline } from "lucide-react";

export default function WithTooltipsDemo() {
  return (
    <TooltipProvider>
      <Toolbar elevation="raised" density="compact" aria-label="Text formatting">
        <Tooltip label="Bold" shortcut="⌘ B">
          <ToolbarToggle aria-label="Bold" aria-keyshortcuts="Meta+B" icon={<Icon icon={Bold} />} />
        </Tooltip>
        <Tooltip label="Italic" shortcut="⌘ I">
          <ToolbarToggle
            aria-label="Italic"
            aria-keyshortcuts="Meta+I"
            icon={<Icon icon={Italic} />}
          />
        </Tooltip>
        <Tooltip label="Underline" shortcut="⌘ U">
          <ToolbarToggle
            aria-label="Underline"
            aria-keyshortcuts="Meta+U"
            icon={<Icon icon={Underline} />}
          />
        </Tooltip>
      </Toolbar>
    </TooltipProvider>
  );
}
