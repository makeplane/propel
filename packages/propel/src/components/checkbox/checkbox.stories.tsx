import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Checkbox } from "./index";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["ai-generated"],
  args: {
    tone: "neutral",
    "aria-label": "Example",
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

/**
 * Interactive, label-less checkbox — just the box. Toggle it from the controls
 * or by clicking. With no visible `label`, the accessible name comes from
 * `aria-label`.
 */
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
      <Checkbox tone="neutral" label="Unchecked" />
      <Checkbox tone="neutral" label="Checked" defaultChecked />
      <Checkbox tone="neutral" label="Indeterminate" indeterminate />
      <Checkbox tone="neutral" label="Disabled" disabled />
      <Checkbox tone="neutral" label="Disabled checked" disabled defaultChecked />
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

/**
 * Label-less usage: omit `label` to render the bare box. Give it an accessible
 * name with `aria-label` (or `aria-labelledby`) — e.g. a checkbox in a table
 * row that selects the row.
 */
export const WithoutLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Checkbox tone="neutral" aria-label="Select row" />,
};

/** A single labeled checkbox; the whole row is the clickable label. */
export const WithLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Checkbox tone="neutral" label="Send me product updates" defaultChecked />,
};

/** The mixed state renders `aria-checked="mixed"` and shows a dash. */
export const Indeterminate: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Checkbox tone="neutral" label="Select all" indeterminate />,
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
 * Keyboard ARIA pattern (WAI-ARIA checkbox): Tab moves focus to the box, **Space**
 * toggles `aria-checked`, and **Enter** must NOT toggle (Enter is reserved for form
 * submission, not the checkbox). Tagged out of the sidebar/docs/manifest — it's a
 * behavior test — but still runs under the default `test` tag.
 */
export const KeyboardToggle: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { label: "Subscribe", defaultChecked: false },
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).toHaveAttribute("aria-checked", "false");

    // Tab moves focus onto the checkbox.
    await userEvent.tab();
    await expect(checkbox).toHaveFocus();

    // Space toggles aria-checked on and off.
    await userEvent.keyboard(" ");
    await expect(checkbox).toHaveAttribute("aria-checked", "true");
    await userEvent.keyboard(" ");
    await expect(checkbox).toHaveAttribute("aria-checked", "false");

    // Enter must NOT toggle a checkbox.
    await userEvent.keyboard(" ");
    await expect(checkbox).toHaveAttribute("aria-checked", "true");
    await userEvent.keyboard("{Enter}");
    await expect(checkbox).toHaveAttribute("aria-checked", "true");
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
