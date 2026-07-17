import { Meter } from "@makeplane/propel/components/meter";

export default function NoValueDemo() {
  return <Meter value={64} label="Disk usage" showValue={false} />;
}
