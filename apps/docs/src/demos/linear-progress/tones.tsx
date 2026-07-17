import { LinearProgress } from "@makeplane/propel/components/linear-progress";

export default function TonesDemo() {
  return (
    <div className="flex flex-col gap-3">
      <LinearProgress value={60} magnitude="md" tone="brand" aria-label="Sync progress" />
      <LinearProgress value={60} magnitude="md" tone="success" aria-label="Import progress" />
      <LinearProgress value={60} magnitude="md" tone="warning" aria-label="Storage usage" />
      <LinearProgress value={60} magnitude="md" tone="danger" aria-label="Quota usage" />
    </div>
  );
}
