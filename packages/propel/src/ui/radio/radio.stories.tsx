import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Radio, RadioGroup, RadioIndicator } from "./index";

// UI-tier story: composes the atomic radio parts. `Radio` is the bare ring (Base UI
// `Radio.Root`); the selected dot only shows when you nest a `RadioIndicator`. A `Radio`
// must live inside a `RadioGroup`, which manages single-select state + roving focus.
// The components-tier story shows the ready-made `Radio` (ring + dot) inside a labelled
// fieldset. Here you assemble the raw parts and name each via `aria-label`.
const meta = {
  title: "UI/Radio",
  component: RadioGroup,
  subcomponents: { Radio, RadioIndicator },
  args: { density: "comfortable" },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function Option({ value, label }: { value: string; label: string }) {
  return (
    <Radio value={value} aria-label={label}>
      <RadioIndicator />
    </Radio>
  );
}

/** A group of atomic rings; the first is selected by default. */
export const Default: Story = {
  args: { density: "comfortable", defaultValue: "low" },
  render: (args) => (
    <RadioGroup {...args} aria-label="Priority">
      <Option value="low" label="Low" />
      <Option value="medium" label="Medium" />
      <Option value="high" label="High" />
    </RadioGroup>
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
  args: { density: "comfortable" },
  render: (args) => (
    <RadioGroup {...args} aria-label="Priority">
      <Option value="low" label="Low" />
      <Option value="medium" label="Medium" />
    </RadioGroup>
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
