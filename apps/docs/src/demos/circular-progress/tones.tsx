import { CircularProgress } from "@makeplane/propel/components/circular-progress";

export default function TonesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <CircularProgress value={60} magnitude="md" tone="brand" aria-label="Sync progress" />
      <CircularProgress value={60} magnitude="md" tone="success" aria-label="Backup progress" />
      <CircularProgress value={60} magnitude="md" tone="warning" aria-label="Storage used" />
      <CircularProgress value={60} magnitude="md" tone="danger" aria-label="Quota used" />
    </div>
  );
}
