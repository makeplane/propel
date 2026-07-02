import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
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

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// checkbox behavior grafts them via `render`. `Checkbox` is the bare box (styled `Checkbox.Root`);
// the tick/dash only show when you nest a `CheckboxIndicator` (check) and a
// `CheckboxIndeterminateIndicator` (dash), each grafted onto a Base UI `Checkbox.Indicator`. A
// labeled row is the `CheckboxLabel` chip wrapping the box, an optional `CheckboxInlineStartNode`
// icon slot, and the text. The components-tier `Checkbox` story shows the ready-made version — here
// you assemble the raw parts and own the accessible name.
const meta = {
  title: "Elements/Checkbox",
  component: Checkbox,
  subcomponents: {
    CheckboxIndicator,
    CheckboxIndeterminateIndicator,
    CheckboxLabel,
    CheckboxInlineStartNode,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// A box grafted with its check + dash indicators. Kept in-story so the `elements` tier stays behavior-free
// (rule 2b) — the components-tier ready-made does this graft for consumers.
function CheckboxBox(props: BaseCheckbox.Root.Props) {
  return (
    <BaseCheckbox.Root render={<Checkbox />} {...props}>
      <BaseCheckbox.Indicator render={<CheckboxIndicator />}>
        <Check aria-hidden />
      </BaseCheckbox.Indicator>
      <BaseCheckbox.Indicator render={<CheckboxIndeterminateIndicator />}>
        <Minus aria-hidden />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}

/** Root box with its check + indeterminate indicators. Toggling mounts/unmounts the tick. */
export const Default: Story = {
  render: () => <CheckboxBox aria-label="Example" />,
};

/**
 * Interaction test: clicking the box toggles the tick on and off. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag — so a browsing user never
 * sees the tick flip on its own.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const box = canvas.getByRole("checkbox");
    await expect(box).toHaveAttribute("aria-checked", "false");
    await userEvent.click(box);
    await expect(box).toHaveAttribute("aria-checked", "true");
    await userEvent.click(box);
    await expect(box).toHaveAttribute("aria-checked", "false");
  },
};

/**
 * Resting, checked, indeterminate (dash only), disabled, and the danger look. The error look isn't
 * a prop — it's the `data-invalid` STATE: inside an invalid `Field.Root` Base UI sets it on the
 * box, and any host can set it directly (as the last box does here) to get the danger border.
 */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <CheckboxBox aria-label="Unchecked" />
      <CheckboxBox aria-label="Checked" defaultChecked />
      <CheckboxBox aria-label="Indeterminate" indeterminate />
      <CheckboxBox aria-label="Disabled" disabled />
      <CheckboxBox aria-label="Error" data-invalid="" />
    </div>
  ),
};

/**
 * Interaction test: the resting box is empty, the checked box mounts its indicator, and the
 * `data-invalid` box recolors its border to danger. Tagged out of the sidebar/docs/manifest while
 * still running under the default `test` tag.
 */
export const StatesInteraction: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const [unchecked, checked, , , error] = canvas.getAllByRole("checkbox");
    // The indicator is only mounted while checked/indeterminate, so the resting box is empty.
    await expect(unchecked).toBeEmptyDOMElement();
    await expect(checked).not.toBeEmptyDOMElement();
    // The `data-invalid` host state recolors the box border to danger (differs from resting).
    await expect(error).toHaveAttribute("data-invalid");
    await expect(getComputedStyle(error).borderColor).not.toBe(
      getComputedStyle(unchecked).borderColor,
    );
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
    <CheckboxLabel htmlFor="elements-checkbox-labeled">
      <CheckboxBox id="elements-checkbox-labeled" />
      <CheckboxInlineStartNode>
        <Repeat aria-hidden />
      </CheckboxInlineStartNode>
      Sync automatically
    </CheckboxLabel>
  ),
};

/**
 * Interaction test: clicking the label text toggles the associated box. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag — so a browsing user never
 * sees the tick flip on its own.
 */
export const LabeledInteraction: Story = {
  ...Labeled,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const box = canvas.getByRole("checkbox");
    await expect(box).toHaveAttribute("aria-checked", "false");
    // Clicking the label text toggles the associated box.
    await userEvent.click(canvas.getByText("Sync automatically"));
    await expect(box).toHaveAttribute("aria-checked", "true");
  },
};
