import { CircularProgress } from "@makeplane/propel/components/circular-progress";

export default function BasicDemo() {
  return <CircularProgress value={60} magnitude="md" tone="brand" aria-label="Sync progress" />;
}
