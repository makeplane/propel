import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Checkbox } from "./index";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["ai-generated"],
  args: {
    label: "Accept terms",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Interactive checkbox — toggle it from the controls or by clicking. */
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "true");
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
  },
};

/** The resting box, the checked box, and the mixed (indeterminate) box. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

/** A standalone box and a labeled box side by side. */
export const WithLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox aria-label="Standalone checkbox" />
      <Checkbox label="Send me product updates" defaultChecked />
    </div>
  ),
};

/** The mixed state renders `aria-checked="mixed"` and shows a dash. */
export const Indeterminate: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Checkbox label="Select all" indeterminate />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed");
  },
};

/** The Figma "Error" state: a danger-toned border. */
export const Error: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox tone="danger" label="Required" />
      <Checkbox tone="danger" label="Required (checked)" defaultChecked />
    </div>
  ),
};

/**
 * Pure interaction test: a disabled checkbox does not toggle when clicked.
 * Tagged `!dev`/`!autodocs`/`!manifest` so it stays out of the sidebar, docs,
 * and the AI/MCP manifest, but still runs under the default `test` tag.
 */
export const DisabledDoesNotToggle: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { label: "Disabled", disabled: true },
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
    await expect(checkbox).toHaveAttribute("aria-disabled", "true");
    // Clicking the disabled control must not flip its state.
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
  },
};
