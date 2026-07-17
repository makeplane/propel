import { Fieldset } from "@makeplane/propel/components/fieldset";
import { InputField } from "@makeplane/propel/components/input-field";

export default function LegendSizesDemo() {
  return (
    <div className="flex flex-col items-start gap-6">
      <Fieldset legend="Workspace details" legendMagnitude="md" bordered={false}>
        <InputField
          magnitude="md"
          orientation="vertical"
          name="name-md"
          label="Name"
          placeholder="Acme Inc."
        />
      </Fieldset>
      <Fieldset legend="Workspace details" legendMagnitude="lg" bordered={false}>
        <InputField
          magnitude="md"
          orientation="vertical"
          name="name-lg"
          label="Name"
          placeholder="Acme Inc."
        />
      </Fieldset>
      <Fieldset legend="Workspace details" legendMagnitude="xl" bordered={false}>
        <InputField
          magnitude="md"
          orientation="vertical"
          name="name-xl"
          label="Name"
          placeholder="Acme Inc."
        />
      </Fieldset>
    </div>
  );
}
