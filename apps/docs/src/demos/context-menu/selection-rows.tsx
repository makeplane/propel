import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@makeplane/propel/components/context-menu";
import * as React from "react";

export default function SelectionRowsDemo() {
  const [wrap, setWrap] = React.useState(true);
  const [sort, setSort] = React.useState("manual");

  return (
    <ContextMenu>
      <ContextMenuTrigger render={<div />}>Right-click for view options</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuCheckboxItem
          tone="neutral"
          checked={wrap}
          onCheckedChange={setWrap}
          closeOnClick={false}
          label="Wrap titles"
        />
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={sort} onValueChange={setSort}>
          <ContextMenuRadioItem
            tone="neutral"
            value="manual"
            closeOnClick={false}
            label="Manual order"
          />
          <ContextMenuRadioItem
            tone="neutral"
            value="updated"
            closeOnClick={false}
            label="Last updated"
          />
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
