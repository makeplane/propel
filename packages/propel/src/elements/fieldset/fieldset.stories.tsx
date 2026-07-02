import type { Meta, StoryObj } from "@storybook/react-vite";

import { Field, FieldLabel } from "../field/index";
import { Input, InputGroup } from "../input/index";
import {
  Fieldset,
  FieldsetBody,
  FieldsetDescription,
  FieldsetLegend,
  type FieldsetLegendProps,
} from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with the wiring Base UI's fieldset would add pinned statically
// (`aria-labelledby` on the `<fieldset>` pointing at the legend's `id`; `htmlFor`/`id` pairs on
// the filler fields). The fieldset cvas key off no `data-*`/aria state, so the configuration
// space is exactly the two variant axes: `bordered` on the root and `magnitude` on the legend.
// Grafting and aria behavior are demonstrated and tested in the components-tier story
// (Components/Fieldset).
const meta = {
  title: "Elements/Fieldset",
  component: Fieldset,
  args: { bordered: false },
  subcomponents: { FieldsetLegend, FieldsetDescription, FieldsetBody },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

const LEGEND_MAGNITUDES: FieldsetLegendProps["magnitude"][] = ["md", "lg", "xl"];

/**
 * The full anatomy assembled statically: `Fieldset` › `FieldsetLegend`, then `FieldsetBody`
 * stacking the grouped fields with the spec's consistent gap. `aria-labelledby` pins the group name
 * Base UI's `Fieldset.Root` would wire to the legend.
 */
export const Default: Story = {
  render: (args) => (
    <Fieldset {...args} aria-labelledby="fieldset-default-legend">
      <FieldsetLegend id="fieldset-default-legend" magnitude="md">
        Billing details
      </FieldsetLegend>
      <FieldsetBody>
        <Field>
          <FieldLabel magnitude="md" inset={false} htmlFor="fieldset-default-company">
            Company
          </FieldLabel>
          <InputGroup magnitude="md">
            <Input magnitude="md" id="fieldset-default-company" placeholder="Acme Inc." />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel magnitude="md" inset={false} htmlFor="fieldset-default-tax-id">
            Tax ID
          </FieldLabel>
          <InputGroup magnitude="md">
            <Input magnitude="md" id="fieldset-default-tax-id" placeholder="US-123" />
          </InputGroup>
        </Field>
      </FieldsetBody>
    </Fieldset>
  ),
};

/**
 * `bordered` draws the subtle rounded boundary around the group, and `FieldsetDescription` slots
 * between the legend and the body.
 */
export const Bordered: Story = {
  args: { bordered: true },
  render: (args) => (
    <Fieldset {...args} aria-labelledby="fieldset-bordered-legend">
      <FieldsetLegend id="fieldset-bordered-legend" magnitude="md">
        Billing details
      </FieldsetLegend>
      <FieldsetDescription>Enter your billing information below.</FieldsetDescription>
      <FieldsetBody>
        <Field>
          <FieldLabel magnitude="md" inset={false} htmlFor="fieldset-bordered-company">
            Company
          </FieldLabel>
          <InputGroup magnitude="md">
            <Input magnitude="md" id="fieldset-bordered-company" placeholder="Acme Inc." />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel magnitude="md" inset={false} htmlFor="fieldset-bordered-tax-id">
            Tax ID
          </FieldLabel>
          <InputGroup magnitude="md">
            <Input magnitude="md" id="fieldset-bordered-tax-id" placeholder="US-123" />
          </InputGroup>
        </Field>
      </FieldsetBody>
    </Fieldset>
  ),
};

/** Every `FieldsetLegend` magnitude side by side. */
export const LegendMagnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3">
      {LEGEND_MAGNITUDES.map((magnitude) => (
        <FieldsetLegend key={magnitude} magnitude={magnitude}>
          Billing details ({magnitude})
        </FieldsetLegend>
      ))}
    </div>
  ),
};
