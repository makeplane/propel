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
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1281-33726",
    },
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
  play: async ({ canvas }) => {
    const [unchecked, checked] = canvas.getAllByRole("checkbox");
    // No tick is rendered while unchecked (the indicator is not mounted).
    await expect(unchecked).toBeEmptyDOMElement();
    // The checked box renders its check icon.
    await expect(checked).not.toBeEmptyDOMElement();
  },
};

/** A single labeled checkbox; the whole row is the clickable label. */
export const WithLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Checkbox label="Send me product updates" defaultChecked />,
};

/** The mixed state renders `aria-checked="mixed"` and shows a dash. */
export const Indeterminate: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Checkbox label="Select all" indeterminate />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed");
  },
};

/**
 * The Figma "Error" state. The danger tone only colors the *unchecked* border
 * red; once checked, the fill is the same accent blue as every other tone.
 */
export const Error: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox tone="danger" label="Required" />
      <Checkbox tone="danger" label="Required (checked)" defaultChecked />
    </div>
  ),
  play: async ({ canvas }) => {
    const [unchecked, checked] = canvas.getAllByRole("checkbox");
    // Unchecked danger box: red border, no accent fill.
    await expect(unchecked).toHaveAttribute("aria-checked", "false");
    await expect(unchecked).toHaveClass("border-danger-strong");
    // Checked danger box: accent-blue fill, like every other tone.
    await expect(checked).toHaveAttribute("aria-checked", "true");
    await expect(checked).toHaveClass("data-[checked]:bg-accent-primary");
  },
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
