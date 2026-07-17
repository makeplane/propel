import { Fieldset } from "@makeplane/propel/components/fieldset";
import { InputField } from "@makeplane/propel/components/input-field";

export default function BorderedDemo() {
  return (
    <Fieldset
      legend="Billing details"
      legendMagnitude="md"
      bordered={true}
      description="Enter your billing information below."
    >
      <InputField
        magnitude="md"
        orientation="vertical"
        name="company"
        label="Company"
        placeholder="Acme Inc."
      />
      <InputField
        magnitude="md"
        orientation="vertical"
        name="taxId"
        label="Tax ID"
        placeholder="US-123"
      />
    </Fieldset>
  );
}
