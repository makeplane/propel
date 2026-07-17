import {
  RadioGroupField,
  RadioGroupFieldOption,
} from "@makeplane/propel/components/radio-group-field";

export default function DensitiesDemo() {
  return (
    <div className="flex flex-wrap items-start gap-10">
      {(["comfortable", "compact"] as const).map((density) => (
        <RadioGroupField
          key={density}
          name={`priority-${density}`}
          label={density}
          description="Pick one default priority."
          density={density}
          magnitude="md"
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
