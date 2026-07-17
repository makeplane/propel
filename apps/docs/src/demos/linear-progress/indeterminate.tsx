import { LinearProgress } from "@makeplane/propel/components/linear-progress";

export default function IndeterminateDemo() {
  return (
    <LinearProgress
      value={null}
      magnitude="md"
      tone="brand"
      showValue={false}
      aria-label="Loading workspace"
    />
  );
}
