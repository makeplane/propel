import { Button } from "@makeplane/propel/components/button";
import {
  Menu,
  MenuContent,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
} from "@makeplane/propel/components/menu";
import * as React from "react";

export default function RadioGroupDemo() {
  const [density, setDensity] = React.useState("comfortable");
  return (
    <Menu>
      <Button
        fillType="hug"
        variant="secondary"
        size="md"
        render={<MenuTrigger />}
        label="Density"
      />
      <MenuContent sizing="sm">
        <MenuRadioGroup value={density} onValueChange={setDensity}>
          <MenuRadioItem value="comfortable" closeOnClick={false} label="Comfortable" />
          <MenuRadioItem value="compact" closeOnClick={false} label="Compact" />
        </MenuRadioGroup>
      </MenuContent>
    </Menu>
  );
}
