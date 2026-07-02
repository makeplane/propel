import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Radio, RadioGroup, RadioIndicator } from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// radio behavior grafts them via `render`. The group root and its single-select state come straight
// from `@base-ui/react` here. The components-tier story shows the ready-made `Radio` (ring + dot)
// inside a labelled fieldset; here you assemble the raw parts and name each via `aria-label`.
const meta = {
  title: "Elements/Radio",
  component: Radio,
  subcomponents: { RadioGroup, RadioIndicator },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

function Option({ value, label }: { value: string; label: string }) {
  return (
    <BaseRadio.Root render={<Radio />} value={value} aria-label={label}>
      <BaseRadio.Indicator render={<RadioIndicator />} />
    </BaseRadio.Root>
  );
}

/** A group of atomic rings; the first is selected by default. */
export const Default: Story = {
  render: () => (
    <BaseRadioGroup
      render={<RadioGroup density="comfortable" />}
      defaultValue="low"
      aria-label="Priority"
    >
      <Option value="low" label="Low" />
      <Option value="medium" label="Medium" />
      <Option value="high" label="High" />
    </BaseRadioGroup>
  ),
};

/**
 * Interaction test: the default-selected ring reports `aria-checked="true"`. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("radio", { name: "Low" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  },
};

/** Selecting one ring clears any other — at most one is checked at a time. */
export const SelectionBehavior: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <BaseRadioGroup render={<RadioGroup density="comfortable" />} aria-label="Priority">
      <Option value="low" label="Low" />
      <Option value="medium" label="Medium" />
    </BaseRadioGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const low = canvas.getByRole("radio", { name: "Low" });
    const medium = canvas.getByRole("radio", { name: "Medium" });
    await expect(low).toHaveAttribute("aria-checked", "false");

    await userEvent.click(low);
    await expect(low).toHaveAttribute("aria-checked", "true");

    await userEvent.click(medium);
    await expect(medium).toHaveAttribute("aria-checked", "true");
    await expect(low).toHaveAttribute("aria-checked", "false");
  },
};
