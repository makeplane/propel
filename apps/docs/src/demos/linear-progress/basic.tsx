import { LinearProgress } from "@makeplane/propel/components/linear-progress";

export default function BasicDemo() {
  return <LinearProgress value={60} magnitude="md" tone="brand" aria-label="Upload progress" />;
}
