import { Icon } from "@makeplane/propel/components/icon";
import { Toggle } from "@makeplane/propel/components/toggle";
import { Star } from "lucide-react";

export default function SizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle magnitude="sm" aria-label="Favorite (small)" icon={<Icon icon={Star} />} />
      <Toggle magnitude="md" aria-label="Favorite (medium)" icon={<Icon icon={Star} />} />
      <Toggle magnitude="lg" aria-label="Favorite (large)" icon={<Icon icon={Star} />} />
    </div>
  );
}
