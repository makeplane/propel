import { Icon } from "@makeplane/propel/components/icon";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarToggle,
} from "@makeplane/propel/components/toolbar";
import type { ToolbarDensity } from "@makeplane/propel/components/toolbar";
import { Bold, Italic, Link, Underline } from "lucide-react";

function Formatting({ density }: { density: ToolbarDensity }) {
  return (
    <Toolbar elevation="raised" density={density} aria-label="Text formatting">
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

export default function DensitiesDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Formatting density="compact" />
      <Formatting density="comfortable" />
    </div>
  );
}
