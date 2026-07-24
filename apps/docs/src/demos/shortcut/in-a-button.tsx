import { Button } from "@makeplane/propel/components/button";
import { Shortcut } from "@makeplane/propel/components/shortcut";

export default function InAButtonDemo() {
  return (
    <Button
      label="Search"
      variant="secondary"
      size="md"
      fillType="hug"
      icon={<Shortcut keys="⌘ K" magnitude="sm" />}
      iconPosition="end"
    />
  );
}
