import { Icon } from "@makeplane/propel/components/icon";
import { Toggle } from "@makeplane/propel/components/toggle";
import { Star } from "lucide-react";

export default function BasicDemo() {
  return <Toggle magnitude="md" aria-label="Favorite" icon={<Icon icon={Star} />} />;
}
