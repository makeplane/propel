import {
  RadioGroupField,
  RadioGroupFieldOption,
} from "@makeplane/propel/components/radio-group-field";

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-wrap items-start gap-10">
      {(["md", "lg", "xl"] as const).map((magnitude) => (
        <RadioGroupField
          key={magnitude}
          name={`priority-${magnitude}`}
          label={magnitude}
          description="Pick one default priority."
          density="comfortable"
          magnitude={magnitude}
          defaultValue="medium"
        >
          <RadioGroupFieldOption value="low" label="Low" />
          <RadioGroupFieldOption value="medium" label="Medium" description="Recommended." />
          <RadioGroupFieldOption value="high" label="High" />
        </RadioGroupField>
      ))}
    </div>
  );
}
