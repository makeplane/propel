import { Shortcut } from "@makeplane/propel/components/shortcut";

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Shortcut keys="⌘ K" magnitude="sm" />
      <Shortcut keys="⌘ K" magnitude="md" />
    </div>
  );
}
