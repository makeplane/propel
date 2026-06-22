import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Checkbox, CheckboxGlyph, CheckboxIndicator } from "./index";

// UI-tier story: composes the ATOMIC checkbox parts. `Checkbox` is the bare box
// (Base UI `Checkbox.Root`); the tick/dash only shows when you nest a
// `CheckboxIndicator` wrapping a `CheckboxGlyph`. The components-tier `Checkbox`
// story shows the ready-made (label row + icon slot). Here you assemble the raw
// parts and own the accessible name via `aria-label`.
const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  subcomponents: { CheckboxIndicator, CheckboxGlyph },
  args: { tone: "neutral", "aria-label": "Example" },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Root box with its indicator + glyph. Toggling mounts/unmounts the tick. */
export const Default: Story = {
  render: (args) => (
    <Checkbox {...args}>
      <CheckboxIndicator>
        <CheckboxGlyph />
      </CheckboxIndicator>
    </Checkbox>
  ),
  play: async ({ canvas, userEvent }) => {
    const box = canvas.getByRole("checkbox");
    await expect(box).toHaveAttribute("aria-checked", "false");
    await userEvent.click(box);
    await expect(box).toHaveAttribute("aria-checked", "true");
    await userEvent.click(box);
    await expect(box).toHaveAttribute("aria-checked", "false");
  },
};

/** Resting, checked, indeterminate (dash glyph), and the danger tone. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox tone="neutral" aria-label="Unchecked">
        <CheckboxIndicator>
          <CheckboxGlyph />
        </CheckboxIndicator>
      </Checkbox>
      <Checkbox tone="neutral" aria-label="Checked" defaultChecked>
        <CheckboxIndicator>
          <CheckboxGlyph />
        </CheckboxIndicator>
      </Checkbox>
      <Checkbox tone="neutral" aria-label="Indeterminate" indeterminate>
        <CheckboxIndicator>
          <CheckboxGlyph indeterminate />
        </CheckboxIndicator>
      </Checkbox>
      <Checkbox tone="neutral" aria-label="Disabled" disabled>
        <CheckboxIndicator>
          <CheckboxGlyph />
        </CheckboxIndicator>
      </Checkbox>
      <Checkbox tone="danger" aria-label="Error">
        <CheckboxIndicator>
          <CheckboxGlyph />
        </CheckboxIndicator>
      </Checkbox>
    </div>
  ),
  play: async ({ canvas }) => {
    const [unchecked, checked] = canvas.getAllByRole("checkbox");
    // The indicator is only mounted while checked/indeterminate, so the resting box is empty.
    await expect(unchecked).toBeEmptyDOMElement();
    await expect(checked).not.toBeEmptyDOMElement();
  },
};
