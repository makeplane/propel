import { CircularProgress } from "@makeplane/propel/components/circular-progress";

export default function IndeterminateDemo() {
  return <CircularProgress value={null} magnitude="md" tone="brand" aria-label="Syncing" />;
}
