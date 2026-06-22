import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Field, RadioGroupField, RadioGroupFieldOption } from "../field/index";
import { Fieldset } from "../fieldset/index";
import { Radio, RadioGroup } from "./index";

const meta = {
  title: "Components/Radio",
  component: RadioGroup,
  // RadioGroup is composed of Radios, so document Radio's props alongside it
  // (adds a Radio tab to the args table + records the relationship in the manifest).
  subcomponents: { Radio, RadioGroupField, RadioGroupFieldOption },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1838-11057",
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A `RadioGroup` with three options; the first is selected by default. */
export const Default: Story = {
  args: { density: "comfortable", defaultValue: "low" },
  render: (args) => (
    <Field name="priority">
      <Fieldset legend="Priority" legendMagnitude="md" render={<RadioGroup {...args} />}>
        <RadioGroupFieldOption magnitude="md" value="low" label="Low" />
        <RadioGroupFieldOption magnitude="md" value="medium" label="Medium" />
        <RadioGroupFieldOption magnitude="md" value="high" label="High" />
      </Fieldset>
    </Field>
  ),
};

/** The ready-to-use field composition owns the legend, options, and helper text. */
export const FieldComposition: Story = {
  args: { density: "comfortable", defaultValue: "low" },
  render: (args) => (
    <RadioGroupField
      {...args}
      name="priority"
      label="Priority"
      magnitude="md"
      hint="Only one priority can be active."
    >
      <RadioGroupFieldOption value="low" label="Low" />
      <RadioGroupFieldOption value="medium" label="Medium" />
      <RadioGroupFieldOption value="high" label="High" />
    </RadioGroupField>
  ),
};

/**
 * Row spacing is the group's own `density` prop — `comfortable` (default, 8px gap) or `compact`
 * (flush rows, e.g. a settings panel where options read like menu items). Consumers set the axis on
 * the component rather than overriding the gap from the outside.
 */
export const Density: Story = {
  args: { density: "comfortable" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-start gap-10">
      <Field name="comfortableDensity">
        <Fieldset
          legend="Comfortable density"
          legendMagnitude="md"
          render={<RadioGroup density="comfortable" defaultValue="low" />}
        >
          <RadioGroupFieldOption magnitude="md" value="low" label="Comfortable" />
          <RadioGroupFieldOption magnitude="md" value="medium" label="8px gap" />
        </Fieldset>
      </Field>
      <Field name="compactDensity">
        <Fieldset
          legend="Compact density"
          legendMagnitude="md"
          render={<RadioGroup density="compact" defaultValue="low" />}
        >
          <RadioGroupFieldOption magnitude="md" value="low" label="Compact" />
          <RadioGroupFieldOption magnitude="md" value="medium" label="Flush rows" />
        </Fieldset>
      </Field>
    </div>
  ),
};

/**
 * The states from Figma side by side: unselected, selected, disabled, and read-only — each driven
 * by the primitive, not by a variant.
 *
 * Read-only is expressed via `disabled` rather than Base UI's `readOnly`: the primitive stamps
 * `aria-readonly` onto the `role="radio"` element, which ARIA does not permit on that role (axe
 * `aria-allowed-attr`). `disabled` conveys the same "selection can't be changed" intent through the
 * ARIA-valid `aria-disabled` while keeping the control non-interactive.
 */
export const States: Story = {
  args: { density: "comfortable" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-6">
      <RadioGroup density="comfortable" defaultValue="b">
        <Radio value="a" aria-label="Unselected" />
      </RadioGroup>
      <RadioGroup density="comfortable" defaultValue="b">
        <Radio value="b" aria-label="Selected" />
      </RadioGroup>
      <RadioGroup density="comfortable" defaultValue="b" disabled>
        <Radio value="a" aria-label="Disabled" />
      </RadioGroup>
      <RadioGroup density="comfortable" defaultValue="b" disabled>
        <Radio value="b" aria-label="Read only" />
      </RadioGroup>
    </div>
  ),
};

/**
 * With no `value`/`defaultValue`, the group starts with nothing checked. Selecting an option checks
 * it and clears any previously-selected one, so at most one radio is checked at a time. Tagged so
 * it stays out of the sidebar, docs, and AI manifest while still running under the default `test`
 * tag.
 */
export const SelectionBehavior: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { density: "comfortable" },
  render: () => (
    <RadioGroup density="comfortable">
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

/**
 * Keyboard ARIA pattern (WAI-ARIA radiogroup, roving focus): Tab lands on the currently-checked
 * radio, and **Arrow Down/Up (and Right/Left)** move both focus and selection through the group,
 * wrapping at the ends. Only one radio is checked at a time, and `aria-checked` follows the focused
 * radio. Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const KeyboardNavigation: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { density: "comfortable" },
  render: () => (
    <RadioGroup density="comfortable" defaultValue="low">
      <Radio value="low" aria-label="Low" />
      <Radio value="medium" aria-label="Medium" />
      <Radio value="high" aria-label="High" />
    </RadioGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const [low, medium, high] = canvas.getAllByRole("radio");
    if (!low || !medium || !high) throw new Error("expected three radio options");

    // Tab enters the group on the checked radio (the default value).
    await userEvent.tab();
    await expect(low).toHaveFocus();
    await expect(low).toHaveAttribute("aria-checked", "true");

    // Arrow Down moves focus + selection to the next radio (the previous clears).
    await userEvent.keyboard("{ArrowDown}");
    await expect(medium).toHaveFocus();
    await expect(medium).toHaveAttribute("aria-checked", "true");
    await expect(low).toHaveAttribute("aria-checked", "false");

    // Arrow Right behaves like Arrow Down in a vertical radiogroup.
    await userEvent.keyboard("{ArrowRight}");
    await expect(high).toHaveFocus();
    await expect(high).toHaveAttribute("aria-checked", "true");

    // Arrow Down at the end wraps back to the first radio.
    await userEvent.keyboard("{ArrowDown}");
    await expect(low).toHaveFocus();
    await expect(low).toHaveAttribute("aria-checked", "true");

    // Arrow Up moves backwards (wrapping to the last radio).
    await userEvent.keyboard("{ArrowUp}");
    await expect(high).toHaveFocus();
    await expect(high).toHaveAttribute("aria-checked", "true");

    // Throughout, exactly one radio stays checked.
    const checked = canvas
      .getAllByRole("radio")
      .filter((r) => r.getAttribute("aria-checked") === "true");
    await expect(checked).toHaveLength(1);
  },
};
