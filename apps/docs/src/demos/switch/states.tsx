import { Switch } from "@makeplane/propel/components/switch";

export default function StatesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Switch magnitude="md" defaultChecked aria-label="On" />
      <Switch magnitude="md" defaultChecked={false} aria-label="Off" />
      <Switch magnitude="md" defaultChecked disabled aria-label="Disabled on" />
      <Switch magnitude="md" defaultChecked={false} disabled aria-label="Disabled off" />
      <Switch magnitude="md" defaultChecked readOnly aria-label="Read only on" />
      <Switch magnitude="md" defaultChecked={false} readOnly aria-label="Read only off" />
    </div>
  );
}
