import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Checkbox } from "../checkbox/index";
import { CheckboxGroup } from "./index";

// Components-tier story: the ready-made `CheckboxGroup` holding ready-made `Checkbox`
// rows (each with its own label + box). The group owns spacing (`density`) and the
// selected-values array. The elements-tier story composes the atomic boxes instead.
const meta = {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  subcomponents: { Checkbox },
  args: { density: "comfortable" },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Labeled checkbox rows; the first is selected by default. */
export const Default: Story = {
  args: { density: "comfortable", defaultValue: ["https"] },
  render: (args) => (
    <CheckboxGroup {...args} aria-label="Allowed protocols">
      <Checkbox value="http" label="HTTP" />
      <Checkbox value="https" label="HTTPS" />
      <Checkbox value="ssh" label="SSH" />
    </CheckboxGroup>
  ),
};

/**
 * Interaction test: the default-selected row reports `aria-checked="true"`. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox", { name: "HTTPS" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  },
};

/** `compact` density tightens the gap between rows. */
export const Density: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-start gap-10">
      <CheckboxGroup density="comfortable" defaultValue={["daily"]} aria-label="Comfortable">
        <Checkbox value="daily" label="Daily" />
        <Checkbox value="weekly" label="Weekly" />
      </CheckboxGroup>
      <CheckboxGroup density="compact" defaultValue={["daily"]} aria-label="Compact">
        <Checkbox value="daily" label="Daily" />
        <Checkbox value="weekly" label="Weekly" />
      </CheckboxGroup>
    </div>
  ),
};

/** Selecting rows collects every checked value; multiple can be on at once. */
export const SelectionBehavior: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { density: "comfortable", defaultValue: [] },
  render: (args) => (
    <CheckboxGroup {...args} aria-label="Allowed protocols">
      <Checkbox value="http" label="HTTP" />
      <Checkbox value="https" label="HTTPS" />
    </CheckboxGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const http = canvas.getByRole("checkbox", { name: "HTTP" });
    const https = canvas.getByRole("checkbox", { name: "HTTPS" });
    await expect(http).toHaveAttribute("aria-checked", "false");

    await userEvent.click(http);
    await expect(http).toHaveAttribute("aria-checked", "true");

    await userEvent.click(https);
    await expect(http).toHaveAttribute("aria-checked", "true");
    await expect(https).toHaveAttribute("aria-checked", "true");
  },
};
