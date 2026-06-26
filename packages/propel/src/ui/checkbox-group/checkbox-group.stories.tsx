import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, Minus } from "lucide-react";
import { expect } from "storybook/test";

import { Checkbox, CheckboxIndeterminateIndicator, CheckboxIndicator } from "../checkbox/index";
import { CheckboxGroup } from "./index";

// UI-tier story: composes the atomic group + atomic checkbox boxes. The group only
// manages the selected-values array and layout; each box owns its own indicator and
// accessible name. The components-tier story shows the ready-made group + ready-made
// `Checkbox` (label rows). No Field/Fieldset here — that's a components-tier concern.
const meta = {
  title: "UI/CheckboxGroup",
  component: CheckboxGroup,
  subcomponents: { Checkbox },
  args: { density: "comfortable" },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function Option({ value, label }: { value: string; label: string }) {
  return (
    <Checkbox value={value} aria-label={label}>
      <CheckboxIndicator>
        <Check aria-hidden />
      </CheckboxIndicator>
      <CheckboxIndeterminateIndicator>
        <Minus aria-hidden />
      </CheckboxIndeterminateIndicator>
    </Checkbox>
  );
}

/** A group of atomic boxes; the group tracks which values are selected. */
export const Default: Story = {
  args: { density: "comfortable", defaultValue: ["https"] },
  render: (args) => (
    <CheckboxGroup {...args} aria-label="Allowed protocols">
      <Option value="http" label="HTTP" />
      <Option value="https" label="HTTPS" />
      <Option value="ssh" label="SSH" />
    </CheckboxGroup>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox", { name: "HTTPS" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  },
};

/** Multiple boxes can be checked at once — the group collects every selected value. */
export const Multiple: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { density: "comfortable", defaultValue: [] },
  render: (args) => (
    <CheckboxGroup {...args} aria-label="Allowed protocols">
      <Option value="http" label="HTTP" />
      <Option value="https" label="HTTPS" />
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
