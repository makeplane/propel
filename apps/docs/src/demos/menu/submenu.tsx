import { Badge } from "@makeplane/propel/components/badge";
import { Button } from "@makeplane/propel/components/button";
import { Icon } from "@makeplane/propel/components/icon";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSubmenu,
  MenuSubmenuContent,
  MenuSubmenuTrigger,
  MenuTrigger,
} from "@makeplane/propel/components/menu";
import {
  Circle,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleX,
  SignalHigh,
  SignalLow,
  SignalMedium,
} from "lucide-react";

export default function SubmenuDemo() {
  return (
    <Menu>
      <Button
        fillType="hug"
        variant="secondary"
        size="md"
        render={<MenuTrigger />}
        label="Filter by"
      />
      <MenuContent sizing="sm">
        <MenuSubmenu>
          <MenuSubmenuTrigger
            endContent={<Badge magnitude="sm" tone="neutral" label="4" />}
            label="Priority"
          />
          <MenuSubmenuContent sizing="sm">
            <MenuItem
              icon={<Icon icon={SignalHigh} tint="secondary" />}
              closeOnClick={false}
              label="Urgent"
            />
            <MenuItem
              icon={<Icon icon={SignalHigh} tint="secondary" />}
              closeOnClick={false}
              label="High"
            />
            <MenuItem
              icon={<Icon icon={SignalMedium} tint="secondary" />}
              closeOnClick={false}
              label="Medium"
            />
            <MenuItem
              icon={<Icon icon={SignalLow} tint="secondary" />}
              closeOnClick={false}
              label="Low"
            />
          </MenuSubmenuContent>
        </MenuSubmenu>
        <MenuSubmenu>
          <MenuSubmenuTrigger
            endContent={<Badge magnitude="sm" tone="neutral" label="5" />}
            label="State"
          />
          <MenuSubmenuContent sizing="sm">
            <MenuItem
              icon={<Icon icon={CircleDashed} tint="secondary" />}
              closeOnClick={false}
              label="Backlog"
            />
            <MenuItem
              icon={<Icon icon={Circle} tint="secondary" />}
              closeOnClick={false}
              label="Todo"
            />
            <MenuItem
              icon={<Icon icon={CircleDot} tint="secondary" />}
              closeOnClick={false}
              label="In progress"
            />
            <MenuItem
              icon={<Icon icon={CircleCheck} tint="secondary" />}
              closeOnClick={false}
              label="Done"
            />
            <MenuItem
              icon={<Icon icon={CircleX} tint="secondary" />}
              closeOnClick={false}
              label="Cancelled"
            />
          </MenuSubmenuContent>
        </MenuSubmenu>
      </MenuContent>
    </Menu>
  );
}
