import { InputField, type InputMagnitude } from "@makeplane/propel/components/input-field";

const MAGNITUDES: InputMagnitude[] = ["md", "lg", "xl"];

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-col gap-4">
      {MAGNITUDES.map((magnitude) => (
        <InputField
          key={magnitude}
          magnitude={magnitude}
          orientation="vertical"
          label={magnitude}
          placeholder="you@example.com"
        />
      ))}
    </div>
  );
}
