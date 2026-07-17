import { Icon } from "@makeplane/propel/components/icon";
import { Sparkles } from "lucide-react";

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Icon icon={Sparkles} magnitude="sm" />
      <Icon icon={Sparkles} magnitude="md" />
    </div>
  );
}
