import { Icon } from "@makeplane/propel/components/icon";
import { Input, InputGroup } from "@makeplane/propel/components/input";
import { Mail, Search } from "lucide-react";

export default function WithIconsDemo() {
  return (
    <InputGroup magnitude="md">
      <Icon icon={Search} tint="secondary" magnitude="md" />
      <Input magnitude="md" aria-label="Search" placeholder="Search people" />
      <Icon icon={Mail} tint="secondary" magnitude="md" />
    </InputGroup>
  );
}
