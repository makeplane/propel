import { Button } from "@makeplane/propel/components/button";
import { Shortcut } from "@makeplane/propel/components/shortcut";

export default function InAButtonDemo() {
  return (
    <Button
      label="Search"
      prominence="secondary"
      tone="neutral"
      magnitude="md"
      sizing="hug"
      endIcon={<Shortcut keys="⌘ K" magnitude="sm" />}
    />
  );
}
