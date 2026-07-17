import { LinearProgress } from "@makeplane/propel/components/linear-progress";

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-col gap-3">
      <LinearProgress value={60} magnitude="sm" tone="brand" aria-label="Small bar" />
      <LinearProgress value={60} magnitude="md" tone="brand" aria-label="Medium bar" />
    </div>
  );
}
