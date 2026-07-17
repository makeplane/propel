import { CircularProgress } from "@makeplane/propel/components/circular-progress";

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <CircularProgress value={60} magnitude="sm" tone="brand" aria-label="Small ring" />
      <CircularProgress value={60} magnitude="md" tone="brand" aria-label="Medium ring" />
    </div>
  );
}
