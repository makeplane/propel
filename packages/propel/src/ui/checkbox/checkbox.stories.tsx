import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, Minus, Repeat } from "lucide-react";
import { expect } from "storybook/test";

import {
  Checkbox,
  CheckboxIndeterminateIndicator,
  CheckboxIndicator,
  CheckboxInlineStartNode,
  CheckboxLabel,
} from "./index";

// UI-tier story: composes the ATOMIC checkbox parts. `Checkbox` is the bare box
// (Base UI `Checkbox.Root`); the tick/dash only shows when you nest a
// `CheckboxIndicator` (check) and a `CheckboxIndeterminateIndicator` (dash). A
// labeled row is the `CheckboxLabel` chip wrapping the box, an optional
// `CheckboxInlineStartNode` icon slot, and the text. The components-tier `Checkbox`
// story shows the ready-made version. Here you assemble the raw parts and own the
// accessible name.
const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  subcomponents: {
    CheckboxIndicator,
    CheckboxIndeterminateIndicator,
    CheckboxLabel,
    CheckboxInlineStartNode,
  },
  args: { tone: "neutral", "aria-label": "Example" },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Root box with its check + indeterminate indicators. Toggling mounts/unmounts the tick. */
export const Default: Story = {
  render: (args) => (
    <Checkbox {...args}>
      <CheckboxIndicator>
        <Check aria-hidden />
      </CheckboxIndicator>
      <CheckboxIndeterminateIndicator>
        <Minus aria-hidden />
      </CheckboxIndeterminateIndicator>
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

/** Resting, checked, indeterminate (dash only), and the danger tone. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox tone="neutral" aria-label="Unchecked">
        <CheckboxIndicator>
          <Check aria-hidden />
        </CheckboxIndicator>
        <CheckboxIndeterminateIndicator>
          <Minus aria-hidden />
        </CheckboxIndeterminateIndicator>
      </Checkbox>
      <Checkbox tone="neutral" aria-label="Checked" defaultChecked>
        <CheckboxIndicator>
          <Check aria-hidden />
        </CheckboxIndicator>
        <CheckboxIndeterminateIndicator>
          <Minus aria-hidden />
        </CheckboxIndeterminateIndicator>
      </Checkbox>
      <Checkbox tone="neutral" aria-label="Indeterminate" indeterminate>
        <CheckboxIndicator>
          <Check aria-hidden />
        </CheckboxIndicator>
        <CheckboxIndeterminateIndicator>
          <Minus aria-hidden />
        </CheckboxIndeterminateIndicator>
      </Checkbox>
      <Checkbox tone="neutral" aria-label="Disabled" disabled>
        <CheckboxIndicator>
          <Check aria-hidden />
        </CheckboxIndicator>
        <CheckboxIndeterminateIndicator>
          <Minus aria-hidden />
        </CheckboxIndeterminateIndicator>
      </Checkbox>
      <Checkbox tone="danger" aria-label="Error">
        <CheckboxIndicator>
          <Check aria-hidden />
        </CheckboxIndicator>
        <CheckboxIndeterminateIndicator>
          <Minus aria-hidden />
        </CheckboxIndeterminateIndicator>
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

/**
 * A labeled row assembled from the atomic parts: a `CheckboxLabel` chip wrapping the box, an
 * optional `CheckboxInlineStartNode` icon slot, and the text. The label is associated with the box
 * via `htmlFor`, so clicking anywhere in the row toggles the box.
 */
export const Labeled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <CheckboxLabel disabled={false} htmlFor="ui-checkbox-labeled">
      <Checkbox id="ui-checkbox-labeled" tone="neutral">
        <CheckboxIndicator>
          <Check aria-hidden />
        </CheckboxIndicator>
        <CheckboxIndeterminateIndicator>
          <Minus aria-hidden />
        </CheckboxIndeterminateIndicator>
      </Checkbox>
      <CheckboxInlineStartNode>
        <Repeat aria-hidden />
      </CheckboxInlineStartNode>
      Sync automatically
    </CheckboxLabel>
  ),
  play: async ({ canvas, userEvent }) => {
    const box = canvas.getByRole("checkbox");
    await expect(box).toHaveAttribute("aria-checked", "false");
    // Clicking the label text toggles the associated box.
    await userEvent.click(canvas.getByText("Sync automatically"));
    await expect(box).toHaveAttribute("aria-checked", "true");
  },
};
