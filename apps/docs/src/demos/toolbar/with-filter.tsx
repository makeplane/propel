import { Icon } from "@makeplane/propel/components/icon";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarInput,
  ToolbarSeparator,
  ToolbarToggle,
} from "@makeplane/propel/components/toolbar";
import { Bold, Italic } from "lucide-react";

export default function WithFilterDemo() {
  return (
    <Toolbar elevation="raised" density="compact" aria-label="Issue actions">
      <ToolbarInput aria-label="Filter issues" placeholder="Filter…" />
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Text formatting">
        <ToolbarToggle aria-label="Bold" icon={<Icon icon={Bold} />} />
        <ToolbarToggle aria-label="Italic" icon={<Icon icon={Italic} />} />
      </ToolbarGroup>
    </Toolbar>
  );
}
