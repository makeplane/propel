import { CheckboxField } from "@makeplane/propel/components/checkbox-field";

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <CheckboxField
        name="notify-md"
        value="md"
        label="Comfortable"
        magnitude="md"
        description="Notify me when a work item is assigned to me."
        hint="You can change this later."
      />
      <CheckboxField
        name="notify-lg"
        value="lg"
        label="Roomy"
        magnitude="lg"
        description="Notify me when a work item is assigned to me."
        hint="You can change this later."
      />
      <CheckboxField
        name="notify-xl"
        value="xl"
        label="Spacious"
        magnitude="xl"
        description="Notify me when a work item is assigned to me."
        hint="You can change this later."
      />
    </div>
  );
}
