import { Icon } from "@makeplane/propel/components/icon";
import { Toggle } from "@makeplane/propel/components/toggle";
import { Heart } from "lucide-react";
import * as React from "react";

export default function ControlledDemo() {
  const [pressed, setPressed] = React.useState(false);
  return (
    <Toggle
      magnitude="md"
      aria-label="Favorite"
      pressed={pressed}
      onPressedChange={setPressed}
      icon={<Icon icon={<Heart fill={pressed ? "currentColor" : "none"} />} />}
    />
  );
}
