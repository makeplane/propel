import { Meter } from "@makeplane/propel/components/meter";

export default function ThresholdsDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Meter value={10} label="Low (warning)" low={25} high={75} optimum={90} />
      <Meter value={50} label="Middle (warning)" low={25} high={75} optimum={90} />
      <Meter value={90} label="High (success)" low={25} high={75} optimum={90} />
    </div>
  );
}
