import { Icon } from "@makeplane/propel/components/icon";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarToggle,
} from "@makeplane/propel/components/toolbar";
import type { ToolbarElevation } from "@makeplane/propel/components/toolbar";
import { Bold, Italic, Link, Underline } from "lucide-react";

function Formatting({ elevation }: { elevation: ToolbarElevation }) {
  return (
    <Toolbar elevation={elevation} density="compact" aria-label="Text formatting">
      <ToolbarGroup aria-label="Text formatting">
        <ToolbarToggle aria-label="Bold" icon={<Icon icon={Bold} />} />
        <ToolbarToggle aria-label="Italic" icon={<Icon icon={Italic} />} />
        <ToolbarToggle aria-label="Underline" icon={<Icon icon={Underline} />} />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Insert link" icon={<Icon icon={Link} />} />
    </Toolbar>
  );
}

export default function ElevationsDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Formatting elevation="raised" />
      <Formatting elevation="flat" />
    </div>
  );
}
