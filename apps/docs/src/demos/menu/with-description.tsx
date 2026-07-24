import { Button } from "@makeplane/propel/components/button";
import { Icon } from "@makeplane/propel/components/icon";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@makeplane/propel/components/menu";
import { Globe, Lock } from "lucide-react";
import * as React from "react";

export default function WithDescriptionDemo() {
  const [selected, setSelected] = React.useState("private");
  return (
    <Menu>
      <Button
        fillType="hug"
        variant="secondary"
        size="md"
        render={<MenuTrigger />}
        label="Visibility"
      />
      <MenuContent sizing="lg">
        <MenuItem
          icon={<Icon icon={Lock} tint="secondary" />}
          description="Accessible only by invite"
          selected={selected === "private"}
          closeOnClick={false}
          onClick={() => setSelected("private")}
          label="Private"
        />
        <MenuItem
          icon={<Icon icon={Globe} tint="secondary" />}
          description="Anyone in the workspace except Guests can join"
          selected={selected === "public"}
          closeOnClick={false}
          onClick={() => setSelected("public")}
          label="Public"
        />
      </MenuContent>
    </Menu>
  );
}
