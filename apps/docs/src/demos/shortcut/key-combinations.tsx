import { Shortcut } from "@makeplane/propel/components/shortcut";

export default function KeyCombinationsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Shortcut keys="⌘ K" />
      <Shortcut keys="⌘ ⇧ P" />
      <Shortcut keys="⌘ Enter" />
      <Shortcut keys="Esc" />
    </div>
  );
}
