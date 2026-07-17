import { Icon } from "@makeplane/propel/components/icon";
import { CircleAlert, Folder, Hash, Users } from "lucide-react";

export default function TintsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Icon icon={Folder} tint="inherit" />
      <Icon icon={Users} tint="secondary" />
      <Icon icon={Hash} tint="tertiary" />
      <Icon icon={CircleAlert} tint="danger" />
    </div>
  );
}
