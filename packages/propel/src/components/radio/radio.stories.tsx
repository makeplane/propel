import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect } from "storybook/test";

import { Fieldset, FieldsetLegend } from "../../elements/fieldset/index";
import { Button } from "../button/index";
import { Field } from "../field/index";
import { Form, FormActions, FormBody } from "../form/index";
import { RadioGroupField, RadioGroupFieldOption } from "../radio-group-field/index";
import { Radio, RadioGroup, RadioIndicator, RadioRing } from "./index";

const meta = {
  title: "Components/Radio",
  component: RadioGroup,
  // RadioGroup is composed of Radios, so document Radio's props alongside it
  // (adds a Radio tab to the args table + records the relationship in the manifest).
  subcomponents: { Radio, RadioGroupField, RadioGroupFieldOption, RadioIndicator, RadioRing },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1838-11057",
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A `RadioGroup` with three options; the first is selected by default. */
export const Default: Story = {
  args: { density: "comfortable", defaultValue: "low" },
  render: (args) => (
    <Field name="priority">
      <Fieldset bordered={false} render={<RadioGroup {...args} />}>
        <FieldsetLegend magnitude="md">Priority</FieldsetLegend>
        <RadioGroupFieldOption magnitude="md" value="low" label="Low" />
        <RadioGroupFieldOption magnitude="md" value="medium" label="Medium" />
        <RadioGroupFieldOption magnitude="md" value="high" label="High" />
      </Fieldset>
    </Field>
  ),
};

/** The ready-to-use field composition owns the legend, options, and helper text. */
export const FieldComposition: Story = {
  args: { density: "comfortable", defaultValue: "low" },
  render: (args) => (
    <RadioGroupField
      {...args}
      name="priority"
      label="Priority"
      magnitude="md"
      hint="Only one priority can be active."
    >
      <RadioGroupFieldOption value="low" label="Low" />
      <RadioGroupFieldOption value="medium" label="Medium" />
      <RadioGroupFieldOption value="high" label="High" />
    </RadioGroupField>
  ),
};

/**
 * Row spacing is the group's own `density` prop — `comfortable` (default, 8px gap) or `compact`
 * (flush rows, e.g. a settings panel where options read like menu items). Consumers set the axis on
 * the component rather than overriding the gap from the outside.
 */
export const Density: Story = {
  args: { density: "comfortable" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-start gap-10">
      <Field name="comfortableDensity">
        <Fieldset bordered={false} render={<RadioGroup density="comfortable" defaultValue="low" />}>
          <FieldsetLegend magnitude="md">Comfortable density</FieldsetLegend>
          <RadioGroupFieldOption magnitude="md" value="low" label="Comfortable" />
          <RadioGroupFieldOption magnitude="md" value="medium" label="8px gap" />
        </Fieldset>
      </Field>
      <Field name="compactDensity">
        <Fieldset bordered={false} render={<RadioGroup density="compact" defaultValue="low" />}>
          <FieldsetLegend magnitude="md">Compact density</FieldsetLegend>
          <RadioGroupFieldOption magnitude="md" value="low" label="Compact" />
          <RadioGroupFieldOption magnitude="md" value="medium" label="Flush rows" />
        </Fieldset>
      </Field>
    </div>
  ),
};

/**
 * The states from Figma side by side: unselected, selected, disabled, and read-only — each driven
 * by the primitive, not by a variant.
 *
 * Read-only is expressed via `disabled` rather than Base UI's `readOnly`: the primitive stamps
 * `aria-readonly` onto the `role="radio"` element, which ARIA does not permit on that role (axe
 * `aria-allowed-attr`). `disabled` conveys the same "selection can't be changed" intent through the
 * ARIA-valid `aria-disabled` while keeping the control non-interactive.
 */
export const States: Story = {
  args: { density: "comfortable" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-6">
      <RadioGroup density="comfortable" defaultValue="b">
        <Radio value="a" aria-label="Unselected" />
      </RadioGroup>
      <RadioGroup density="comfortable" defaultValue="b">
        <Radio value="b" aria-label="Selected" />
      </RadioGroup>
      <RadioGroup density="comfortable" defaultValue="b" disabled>
        <Radio value="a" aria-label="Disabled" />
      </RadioGroup>
      <RadioGroup density="comfortable" defaultValue="b" disabled>
        <Radio value="b" aria-label="Read only" />
      </RadioGroup>
    </div>
  ),
};

/**
 * A radio renders as a `<span>` by default so an enclosing `<label>` stays valid HTML. When the
 * label is a sibling wired up with `htmlFor`/`id` instead, render the ring as a real `<button>`:
 * pass `nativeButton` and graft the styled `RadioRing` onto a `<button>` via `render`. The look is
 * unchanged, and clicking a sibling label still selects its radio.
 */
export const NativeButton: Story = {
  args: { density: "comfortable" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-2">
      <div id="storage-type-label" className="text-13 font-medium text-primary">
        Storage type
      </div>
      <RadioGroup density="comfortable" defaultValue="ssd" aria-labelledby="storage-type-label">
        <div className="flex items-center gap-2">
          <Radio
            value="ssd"
            id="storage-type-ssd"
            nativeButton
            render={<RadioRing render={<button type="button" />} />}
          />
          <label htmlFor="storage-type-ssd" className="text-13 text-secondary">
            SSD
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            value="hdd"
            id="storage-type-hdd"
            nativeButton
            render={<RadioRing render={<button type="button" />} />}
          />
          <label htmlFor="storage-type-hdd" className="text-13 text-secondary">
            HDD
          </label>
        </div>
      </RadioGroup>
    </div>
  ),
};

/**
 * Interaction test: the native-button pattern keeps the radio semantics — each ring IS a `<button>`
 * with `role="radio"`, the sibling `htmlFor` label names it, and clicking the label selects it.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const NativeButtonInteraction: Story = {
  ...NativeButton,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const ssd = canvas.getByRole("radio", { name: "SSD" });
    const hdd = canvas.getByRole("radio", { name: "HDD" });

    // Real <button> elements, named by their sibling labels.
    await expect(ssd.tagName).toBe("BUTTON");
    await expect(hdd.tagName).toBe("BUTTON");
    await expect(ssd).toHaveAttribute("aria-checked", "true");

    // Clicking a sibling label activates its radio, like any labelled native button.
    await userEvent.click(canvas.getByText("HDD"));
    await expect(hdd).toHaveAttribute("aria-checked", "true");
    await expect(ssd).toHaveAttribute("aria-checked", "false");
  },
};

/**
 * Form integration: `RadioGroupField` already owns the `Field` name, so inside a `Form` the group's
 * selected value serializes with the submission — `onFormSubmit` receives it under the field's
 * `name`, with no extra wiring on the radios. Submit to see the captured value.
 */
export const FormIntegration: Story = {
  args: { density: "comfortable" },
  parameters: { controls: { disable: true } },
  render: function Render() {
    const [submitted, setSubmitted] = React.useState<{ storageType: string } | null>(null);
    return (
      <div className="flex w-80 flex-col gap-3">
        <Form<{ storageType: string }> onFormSubmit={(values) => setSubmitted(values)}>
          <FormBody layout="single">
            <RadioGroupField
              name="storageType"
              label="Storage type"
              magnitude="md"
              density="comfortable"
              defaultValue="ssd"
            >
              <RadioGroupFieldOption value="ssd" label="SSD" />
              <RadioGroupFieldOption value="hdd" label="HDD" />
            </RadioGroupField>
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
          {submitted ? `Storage type: ${submitted.storageType}` : null}
        </output>
      </div>
    );
  },
};

/**
 * Interaction test: the `Field` name serializes the group's selected value into `Form`'s
 * `onFormSubmit` — the default selection first, then the newly picked option after resubmitting.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const FormIntegrationInteraction: Story = {
  ...FormIntegration,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const save = canvas.getByRole("button", { name: "Save" });

    // Submitting with the default selection serializes "ssd".
    await userEvent.click(save);
    await expect(canvas.getByText("Storage type: ssd")).toBeInTheDocument();

    // Picking another option and resubmitting serializes the new value.
    await userEvent.click(canvas.getByRole("radio", { name: "HDD" }));
    await userEvent.click(save);
    await expect(canvas.getByText("Storage type: hdd")).toBeInTheDocument();
  },
};

/**
 * With no `value`/`defaultValue`, the group starts with nothing checked. Selecting an option checks
 * it and clears any previously-selected one, so at most one radio is checked at a time. Tagged so
 * it stays out of the sidebar, docs, and AI manifest while still running under the default `test`
 * tag.
 */
export const SelectionBehavior: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { density: "comfortable" },
  render: () => (
    <RadioGroup density="comfortable">
      <Radio value="low" aria-label="Low" />
      <Radio value="medium" aria-label="Medium" />
      <Radio value="high" aria-label="High" />
    </RadioGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const [low, medium] = canvas.getAllByRole("radio");
    if (!low || !medium) throw new Error("expected radio options");

    // Nothing selected initially.
    await expect(low).toHaveAttribute("aria-checked", "false");
    await expect(medium).toHaveAttribute("aria-checked", "false");

    // Clicking an option selects it.
    await userEvent.click(low);
    await expect(low).toHaveAttribute("aria-checked", "true");

    // Selecting another deselects the first — only one checked at a time.
    await userEvent.click(medium);
    await expect(medium).toHaveAttribute("aria-checked", "true");
    await expect(low).toHaveAttribute("aria-checked", "false");

    const checked = canvas
      .getAllByRole("radio")
      .filter((r) => r.getAttribute("aria-checked") === "true");
    await expect(checked).toHaveLength(1);
  },
};

/**
 * Keyboard ARIA pattern (WAI-ARIA radiogroup, roving focus): Tab lands on the currently-checked
 * radio, and **Arrow Down/Up (and Right/Left)** move both focus and selection through the group,
 * wrapping at the ends. Only one radio is checked at a time, and `aria-checked` follows the focused
 * radio. Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const KeyboardNavigation: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { density: "comfortable" },
  render: () => (
    <RadioGroup density="comfortable" defaultValue="low">
      <Radio value="low" aria-label="Low" />
      <Radio value="medium" aria-label="Medium" />
      <Radio value="high" aria-label="High" />
    </RadioGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const [low, medium, high] = canvas.getAllByRole("radio");
    if (!low || !medium || !high) throw new Error("expected three radio options");

    // Tab enters the group on the checked radio (the default value).
    await userEvent.tab();
    await expect(low).toHaveFocus();
    await expect(low).toHaveAttribute("aria-checked", "true");

    // Arrow Down moves focus + selection to the next radio (the previous clears).
    await userEvent.keyboard("{ArrowDown}");
    await expect(medium).toHaveFocus();
    await expect(medium).toHaveAttribute("aria-checked", "true");
    await expect(low).toHaveAttribute("aria-checked", "false");

    // Arrow Right behaves like Arrow Down in a vertical radiogroup.
    await userEvent.keyboard("{ArrowRight}");
    await expect(high).toHaveFocus();
    await expect(high).toHaveAttribute("aria-checked", "true");

    // Arrow Down at the end wraps back to the first radio.
    await userEvent.keyboard("{ArrowDown}");
    await expect(low).toHaveFocus();
    await expect(low).toHaveAttribute("aria-checked", "true");

    // Arrow Up moves backwards (wrapping to the last radio).
    await userEvent.keyboard("{ArrowUp}");
    await expect(high).toHaveFocus();
    await expect(high).toHaveAttribute("aria-checked", "true");

    // Throughout, exactly one radio stays checked.
    const checked = canvas
      .getAllByRole("radio")
      .filter((r) => r.getAttribute("aria-checked") === "true");
    await expect(checked).toHaveLength(1);
  },
};
