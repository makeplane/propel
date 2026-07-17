import { LinearProgress } from "@makeplane/propel/components/linear-progress";

export default function WithLabelDemo() {
  return (
    <LinearProgress
      value={60}
      magnitude="md"
      tone="brand"
      label="Uploading attachments"
      aria-label="Uploading attachments"
    />
  );
}
