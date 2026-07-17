import {
  RadioGroupField,
  RadioGroupFieldOption,
} from "@makeplane/propel/components/radio-group-field";

export default function DensityDemo() {
  return (
    <div className="flex flex-wrap items-start gap-10">
      <RadioGroupField
        name="comfortableDensity"
        label="Comfortable density"
        magnitude="md"
        density="comfortable"
        defaultValue="low"
      >
        <RadioGroupFieldOption value="low" label="Comfortable" />
        <RadioGroupFieldOption value="medium" label="8px gap" />
      </RadioGroupField>
      <RadioGroupField
        name="compactDensity"
        label="Compact density"
        magnitude="md"
        density="compact"
        defaultValue="low"
      >
        <RadioGroupFieldOption value="low" label="Compact" />
        <RadioGroupFieldOption value="medium" label="Flush rows" />
      </RadioGroupField>
    </div>
  );
}
