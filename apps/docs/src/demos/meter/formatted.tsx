import { Meter } from "@makeplane/propel/components/meter";

export default function FormattedDemo() {
  return <Meter value={0.42} max={1} label="Seats used" format={{ style: "percent" }} />;
}
