import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Radio, RadioGroup } from "./index";

const meta = {
  title: "Components/Radio",
  component: RadioGroup,
  // RadioGroup is composed of Radios, so document Radio's props alongside it
  // (adds a Radio tab to the args table + records the relationship in the manifest).
  subcomponents: { Radio },
  tags: ["ai-generated"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A `RadioGroup` with three options; the first is selected by default. */
export const Default: Story = {
  args: { defaultValue: "low" },
  render: (args) => (
    <RadioGroup {...args}>
      <label className="flex items-center gap-2 text-13 text-primary">
        <Radio value="low" />
        Low
      </label>
      <label className="flex items-center gap-2 text-13 text-primary">
        <Radio value="medium" />
        Medium
      </label>
      <label className="flex items-center gap-2 text-13 text-primary">
        <Radio value="high" />
        High
      </label>
    </RadioGroup>
  ),
};

/**
 * The states from Figma side by side: unselected, selected, disabled, and
 * read-only — each driven by the primitive, not by a variant.
 */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-6">
      <RadioGroup defaultValue="b">
        <Radio value="a" />
      </RadioGroup>
      <RadioGroup defaultValue="b">
        <Radio value="b" />
      </RadioGroup>
      <RadioGroup defaultValue="b" disabled>
        <Radio value="a" />
      </RadioGroup>
      <RadioGroup defaultValue="b" readOnly>
        <Radio value="b" />
      </RadioGroup>
    </div>
  ),
};

/**
 * Selecting an option checks it and clears any previously-selected one, so the
 * group always has exactly one checked radio. Tagged so it stays out of the
 * sidebar, docs, and AI manifest while still running under the default `test` tag.
 */
export const SelectionBehavior: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <RadioGroup>
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
