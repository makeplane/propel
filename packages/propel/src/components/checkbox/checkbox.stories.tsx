import type { Meta, StoryObj } from "@storybook/react-vite";
import { Repeat } from "lucide-react";
import * as React from "react";
import { expect, userEvent } from "storybook/test";

import { Button } from "../button";
import { Field } from "../field";
import { Form, FormActions, FormBody } from "../form";
import {
  Checkbox,
  CheckboxIndeterminateIndicator,
  CheckboxIndicator,
  CheckboxLabel,
} from "./index";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  subcomponents: {
    CheckboxLabel,
    CheckboxIndicator,
    CheckboxIndeterminateIndicator,
  },
  args: {
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
 * Interactive, label-less checkbox — just the box. Toggle it from the controls or by clicking. With
 * no visible `label`, the accessible name comes from `aria-label`.
 */
export const Default: Story = {};

/**
 * Interaction test: clicking the box toggles `aria-checked` on and off. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag — so a browsing user never
 * sees the tick flip on its own.
 */
const Interaction: Story = {
  ...Default,
};

export const DefaultInteraction: Story = {
  ...Interaction,
  tags: ["!dev", "!autodocs", "!manifest"],
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

/**
 * Interaction test: the unchecked box mounts no tick while the checked box renders its check icon.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const StatesInteraction: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const [unchecked, checked] = canvas.getAllByRole("checkbox");
    // No tick is rendered while unchecked (the indicator is not mounted).
    await expect(unchecked).toBeEmptyDOMElement();
    // The checked box renders its check icon.
    await expect(checked).not.toBeEmptyDOMElement();
  },
};

/**
 * Label-less usage: omit `label` to render the bare box. Give it an accessible name with
 * `aria-label` (or `aria-labelledby`) — e.g. a checkbox in a table row that selects the row.
 */
export const WithoutLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Checkbox aria-label="Select row" />,
};

/** A single labeled checkbox; the whole row is the clickable label. */
export const WithLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Checkbox label="Send me product updates" defaultChecked />,
};

/**
 * An optional `icon` sits between the box and the label, matching the Figma "checkbox with label"
 * icon slot.
 */
export const WithIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Checkbox
      icon={<Repeat aria-hidden className="size-3.5" />}
      label="Sync automatically"
      defaultChecked
    />
  ),
};

/** The mixed state renders `aria-checked="mixed"` and shows a dash. */
export const Indeterminate: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Checkbox label="Select all" indeterminate />,
};

/**
 * Interaction test: the mixed state reports `aria-checked="mixed"`. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const IndeterminateInteraction: Story = {
  ...Indeterminate,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed");
  },
};

/**
 * The Figma "Error" state. The danger look is a STATE, not a prop: inside an invalid `Field.Root`
 * Base UI propagates `data-invalid` to the box, which recolors its _unchecked_ border red. Once
 * checked, the fill is the same accent blue as every other state. A resting checkbox is shown
 * alongside for contrast.
 */
export const Invalid: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox label="Resting" />
      <Field invalid>
        <Checkbox label="Required" />
      </Field>
      <Field invalid>
        <Checkbox label="Required (checked)" defaultChecked />
      </Field>
    </div>
  ),
};

/**
 * Interaction test: the invalid `Field` propagates `data-invalid` and the danger border, while the
 * checked box keeps the accent fill. Tagged out of the sidebar/docs/manifest while still running
 * under the default `test` tag.
 */
export const InvalidInteraction: Story = {
  ...Invalid,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const [resting, unchecked, checked] = canvas.getAllByRole("checkbox");
    // The resting box has no field-invalid state.
    await expect(resting).not.toHaveAttribute("data-invalid");
    // The invalid `Field` propagates `data-invalid` onto the box (Base UI Field -> Checkbox.Root).
    await expect(unchecked).toHaveAttribute("data-invalid");
    await expect(unchecked).toHaveAttribute("aria-checked", "false");
    // ...and the danger border actually renders: its border color differs from the resting box.
    await expect(getComputedStyle(unchecked).borderColor).not.toBe(
      getComputedStyle(resting).borderColor,
    );
    // Checked invalid box: accent-blue fill, like every other state.
    await expect(checked).toHaveAttribute("aria-checked", "true");
    await expect(checked).toHaveClass("data-checked:bg-accent-primary");
  },
};

/**
 * Form integration: wrap the checkbox in a `Field` with a `name` and Base UI wires the rest — the
 * field name flows onto the box, a hidden input serializes it with the form, and `Form`'s
 * `onFormSubmit` receives the checked state as a boolean. The checkbox itself needs no extra
 * wiring. Submit to see the captured value.
 */
export const FormIntegration: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    function SessionPreferencesForm() {
      const [submitted, setSubmitted] = React.useState<{ stayLoggedIn: boolean } | null>(null);
      return (
        <div className="flex w-80 flex-col gap-3">
          <Form<{ stayLoggedIn: boolean }> onFormSubmit={(values) => setSubmitted(values)}>
            <FormBody layout="single">
              <Field name="stayLoggedIn">
                <Checkbox label="Stay logged in for 7 days" />
              </Field>
            </FormBody>
            <FormActions layout="inline">
              <Button sizing="hug" type="submit" prominence="primary" tone="neutral" magnitude="md">
                Save
              </Button>
            </FormActions>
          </Form>
          <output className="text-13 text-secondary">
            {submitted ? `Stay logged in: ${submitted.stayLoggedIn ? "yes" : "no"}` : null}
          </output>
        </div>
      );
    }
    return <SessionPreferencesForm />;
  },
};

/**
 * Interaction test: the `Field` name serializes the checkbox into `Form`'s `onFormSubmit` values as
 * a boolean — `false` while unchecked, `true` once checked. Tagged out of the sidebar/docs/manifest
 * while still running under the default `test` tag.
 */
export const FormIntegrationInteraction: Story = {
  ...FormIntegration,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox", { name: "Stay logged in for 7 days" });
    const save = canvas.getByRole("button", { name: "Save" });

    // Submitting while unchecked serializes the field as `false`.
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
    await userEvent.click(save);
    await expect(canvas.getByText("Stay logged in: no")).toBeInTheDocument();

    // Checking the box and resubmitting serializes it as `true`.
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "true");
    await userEvent.click(save);
    await expect(canvas.getByText("Stay logged in: yes")).toBeInTheDocument();
  },
};

/**
 * Keyboard ARIA pattern (WAI-ARIA checkbox): Tab moves focus to the box, **Space** toggles
 * `aria-checked`, and **Enter** must NOT toggle (Enter is reserved for form submission, not the
 * checkbox). Tagged out of the sidebar/docs/manifest — it's a behavior test — but still runs under
 * the default `test` tag.
 */
export const KeyboardToggle: Story = {
  ...Interaction,
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
 * Regression test for the box-shift fix (the `align-top` change). A bare `inline-flex` box
 * baseline-aligns to its line box differently when empty vs. when it contains the check/dash
 * indicator, which used to nudge the box down ~2px on toggle. This asserts the box's
 * `getBoundingClientRect()` is identical across unchecked / checked / indeterminate so that shift
 * can't regress.
 *
 * Tagged `!dev`/`!autodocs`/`!manifest` so it stays out of the sidebar, docs, and the AI/MCP
 * manifest, but still runs under the default `test` tag.
 */
export const BoxDoesNotShiftOnToggle: Story = {
  ...Interaction,
  tags: ["!dev", "!autodocs", "!manifest"],
  parameters: { controls: { disable: true } },
  // A controlled wrapper so a single, stable box element can be driven through
  // unchecked -> checked -> indeterminate without remounting (so we measure the
  // very same DOM node across all three states).
  render: () => {
    function Harness() {
      const [indeterminate, setIndeterminate] = React.useState(false);
      return (
        <div>
          <Checkbox aria-label="Shift target" indeterminate={indeterminate} />
          <button type="button" onClick={() => setIndeterminate(true)}>
            make indeterminate
          </button>
        </div>
      );
    }
    return <Harness />;
  },
  play: async ({ canvas }) => {
    const box = canvas.getByRole("checkbox");

    // Sanity: it starts bare (no indicator mounted) and unchecked.
    await expect(box).toHaveAttribute("aria-checked", "false");
    await expect(box).toBeEmptyDOMElement();
    const unchecked = box.getBoundingClientRect();

    // Toggle to checked (the indicator mounts).
    await userEvent.click(box);
    await expect(box).toHaveAttribute("aria-checked", "true");
    await expect(box).not.toBeEmptyDOMElement();
    const checked = box.getBoundingClientRect();

    // Flip to indeterminate via the controlled prop (shows the dash).
    await userEvent.click(canvas.getByRole("button", { name: "make indeterminate" }));
    await expect(box).toHaveAttribute("aria-checked", "mixed");
    const indeterminate = box.getBoundingClientRect();

    // The box geometry must be identical across every state — this is what the
    // `align-top` fix guarantees. (Compare the same node, so x/y/w/h are exact.)
    for (const rect of [checked, indeterminate]) {
      await expect(rect.x).toBe(unchecked.x);
      await expect(rect.y).toBe(unchecked.y);
      await expect(rect.width).toBe(unchecked.width);
      await expect(rect.height).toBe(unchecked.height);
    }
  },
};

/**
 * Pure interaction test: a disabled checkbox does not toggle when clicked. Tagged
 * `!dev`/`!autodocs`/`!manifest` so it stays out of the sidebar, docs, and the AI/MCP manifest, but
 * still runs under the default `test` tag.
 */
export const DisabledDoesNotToggle: Story = {
  ...Interaction,
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { label: "Disabled", disabled: true },
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
    await expect(checkbox).toHaveAttribute("aria-disabled", "true");
    // The label row dims itself off the disabled box (`label:has([data-disabled])`), no prop needed:
    // the not-allowed cursor renders even though `CheckboxLabel` takes no `disabled` prop.
    const labelRow = checkbox.closest("label");
    await expect(labelRow).not.toBeNull();
    if (labelRow) await expect(getComputedStyle(labelRow).cursor).toBe("not-allowed");
    // Clicking the disabled control must not flip its state.
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
  },
};
