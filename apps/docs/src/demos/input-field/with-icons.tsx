import { Icon } from "@makeplane/propel/components/icon";
import { InputField } from "@makeplane/propel/components/input-field";
import { AtSign, Search } from "lucide-react";

export default function WithIconsDemo() {
  return (
    <InputField
      magnitude="md"
      orientation="vertical"
      label="Search members"
      placeholder="Search…"
      startIcon={<Icon icon={Search} tint="placeholder" />}
      endIcon={<Icon icon={AtSign} tint="placeholder" />}
    />
  );
}
