import { Button } from "@makeplane/propel/components/button";
import { Field } from "@makeplane/propel/components/field";
import { Form, FormActions, FormBody } from "@makeplane/propel/components/form";
import { Slider } from "@makeplane/propel/components/slider";
import * as React from "react";

export default function InAFormDemo() {
  const [submitted, setSubmitted] = React.useState<{ volume: number } | null>(null);
  return (
    <div className="flex flex-col gap-3">
      <Form<{ volume: number }> onFormSubmit={(values) => setSubmitted(values)}>
        <FormBody layout="single">
          <Field name="volume">
            <Slider label="Volume" magnitude="md" defaultValue={40} min={0} max={100} step={1} />
          </Field>
        </FormBody>
        <FormActions layout="inline">
          <Button
            sizing="hug"
            type="submit"
            prominence="primary"
            tone="neutral"
            magnitude="md"
            label="Save"
          />
        </FormActions>
      </Form>
      <output className="text-13 text-secondary">
        {submitted ? `Volume: ${submitted.volume}` : null}
      </output>
    </div>
  );
}
