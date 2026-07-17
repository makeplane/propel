import { Badge, type BadgeMagnitude } from "@makeplane/propel/components/badge";

const MAGNITUDES: BadgeMagnitude[] = ["sm", "md", "lg"];

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Badge key={magnitude} tone="brand" magnitude={magnitude} label={magnitude} />
      ))}
    </div>
  );
}
